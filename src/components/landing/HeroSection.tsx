import { useEffect, useMemo, useState } from 'react';
import { DollarSign, CloudSun, PlaySquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroImage from '@/assets/hero-infrastructure.jpg';
import { fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

type CmsHeroPageAttributes = {
  title1?: string;
  title2?: string;
  subtitle?: string;
  discoverLabel?: string;
  portfolioLabel?: string;
  videoUrl?: string;
  heroImage?: unknown;
};

type ExchangeState =
  | { status: 'idle' | 'loading' }
  | { status: 'ready'; brlPerUsd: number; updatedAt: Date }
  | { status: 'error' };

type WeatherState =
  | { status: 'idle' | 'loading' }
  | {
      status: 'ready';
      temperatureNow: number;
      temperatureMax: number;
      temperatureMin: number;
      rainProbabilityMax: number;
      willRain: boolean;
      updatedAt: Date;
    }
  | { status: 'error' | 'no-location' };

const getYouTubeVideoId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim();
      return id || null;
    }
    const id = parsed.searchParams.get('v');
    return id || null;
  } catch {
    return null;
  }
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const [cmsHero, setCmsHero] = useState<CmsHeroPageAttributes | null>(null);
  const [exchange, setExchange] = useState<ExchangeState>({ status: 'idle' });
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weather, setWeather] = useState<WeatherState>({ status: 'idle' });
  const [isVideoLarge, setIsVideoLarge] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const locale = resolveLocale(i18n.language);
        const page = await fetchSingle<CmsHeroPageAttributes>('hero-page', { locale, populate: 'heroImage' });
        if (cancelled) return;

        if ((import.meta as any).env?.DEV) {
          console.log('[CMS] hero-page loaded', { locale, page });
        }

        setCmsHero(page);
      } catch {
        if (cancelled) return;
        setCmsHero(null);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [i18n.language, refetchTick]);

  const videoUrl = cmsHero?.videoUrl || 'https://www.youtube.com/watch?v=quH1knOa49M';
  const youtubeVideoId = useMemo(() => getYouTubeVideoId(videoUrl), [videoUrl]);

  const heroTitle1 = cmsHero?.title1 || t('hero.title1');
  const heroTitle2 = cmsHero?.title2 || t('hero.title2');
  const heroSubtitle = cmsHero?.subtitle || t('hero.subtitle');
  const heroDiscover = cmsHero?.discoverLabel || t('hero.discover');
  const heroPortfolio = cmsHero?.portfolioLabel || t('hero.portfolio');
  const heroBgImage = getCmsImageUrl(cmsHero?.heroImage) ?? heroImage;
  useEffect(() => {
    if (!navigator.geolocation) {
      setWeather({ status: 'no-location' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => setWeather({ status: 'no-location' }),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 30 * 60 * 1000 }
    );
  }, []);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchUsdBrl = async () => {
      setExchange((prev) => (prev.status === 'ready' ? prev : { status: 'loading' }));
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD', {
          signal: abortController.signal,
        });
        if (!res.ok) throw new Error('exchange');
        const data = await res.json();
        const brl = Number(data?.rates?.BRL);
        const updatedUnix = Number(data?.time_last_update_unix);
        if (!Number.isFinite(brl) || !Number.isFinite(updatedUnix)) throw new Error('exchange-shape');

        if (!isMounted) return;
        setExchange({ status: 'ready', brlPerUsd: brl, updatedAt: new Date(updatedUnix * 1000) });
      } catch {
        if (!isMounted) return;
        setExchange({ status: 'error' });
      }
    };

    fetchUsdBrl();
    const id = window.setInterval(fetchUsdBrl, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      abortController.abort();
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!coords) return;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchWeather = async () => {
      setWeather((prev) => (prev.status === 'ready' ? prev : { status: 'loading' }));
      try {
        const url = new URL('https://api.open-meteo.com/v1/forecast');
        url.searchParams.set('latitude', String(coords.latitude));
        url.searchParams.set('longitude', String(coords.longitude));
        url.searchParams.set('current', 'temperature_2m');
        url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum');
        url.searchParams.set('timezone', 'auto');

        const res = await fetch(url.toString(), { signal: abortController.signal });
        if (!res.ok) throw new Error('weather');
        const data = await res.json();

        const now = Number(data?.current?.temperature_2m);
        const max = Number(data?.daily?.temperature_2m_max?.[0]);
        const min = Number(data?.daily?.temperature_2m_min?.[0]);
        const rainProbMax = Number(data?.daily?.precipitation_probability_max?.[0]);
        const precipitationSum = Number(data?.daily?.precipitation_sum?.[0]);

        if (![now, max, min, rainProbMax, precipitationSum].every(Number.isFinite)) throw new Error('weather-shape');

        if (!isMounted) return;
        setWeather({
          status: 'ready',
          temperatureNow: now,
          temperatureMax: max,
          temperatureMin: min,
          rainProbabilityMax: Math.max(0, Math.min(100, rainProbMax)),
          willRain: rainProbMax >= 50 || precipitationSum > 0,
          updatedAt: new Date(),
        });
      } catch {
        if (!isMounted) return;
        setWeather({ status: 'error' });
      }
    };

    fetchWeather();
    const id = window.setInterval(fetchWeather, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      abortController.abort();
      window.clearInterval(id);
    };
  }, [coords]);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBgImage}
            alt="Infrastructure engineering project"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="w-16 h-[2px] gradient-red-line mb-8" />
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-foreground leading-[1.05]">
                {heroTitle1}
                <br />
                <span className="font-light">{heroTitle2}</span>
                <span className="text-primary font-normal">.</span>
              </h1>
            </div>

            <p className="animate-fade-up opacity-0 animation-delay-400 text-silver text-lg sm:text-xl font-light mt-8 max-w-xl leading-relaxed" style={{ animationFillMode: 'forwards' }}>
              {heroSubtitle}
            </p>

            <div className="animate-fade-up opacity-0 animation-delay-600 flex gap-4 mt-12" style={{ animationFillMode: 'forwards' }}>
              <a
                href="#company"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {heroDiscover}
              </a>
              <a
                href="#portfolio"
                className="border border-border text-foreground px-8 py-3.5 rounded text-sm font-medium hover:bg-secondary transition-colors"
              >
                {heroPortfolio}
              </a>
            </div>

            <div className="animate-fade-up opacity-0 animation-delay-800 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12" style={{ animationFillMode: 'forwards' }}>
              <div className="bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <DollarSign size={16} className="text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.usd')}</span>
                </div>
                {exchange.status === 'ready' ? (
                  <>
                    <p className="text-2xl font-light text-foreground leading-none">
                      1 USD = {exchange.brlPerUsd.toFixed(4)} BRL
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('hero.widgets.updatedAt')}: {exchange.updatedAt.toLocaleString()}
                    </p>
                  </>
                ) : exchange.status === 'error' ? (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.usdError')}</p>
                ) : (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.loading')}</p>
                )}
              </div>

              <div className="bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <CloudSun size={16} className="text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.weather')}</span>
                </div>
                {weather.status === 'ready' ? (
                  <>
                    <p className="text-2xl font-light text-foreground leading-none">
                      {weather.temperatureNow.toFixed(0)}°C
                    </p>
                    <p className="text-sm text-silver font-light mt-2">
                      {t('hero.widgets.todayRange')}: {weather.temperatureMin.toFixed(0)}°C – {weather.temperatureMax.toFixed(0)}°C
                    </p>
                    <p className="text-sm text-silver font-light mt-2">
                      {t('hero.widgets.rain')}: {weather.willRain ? t('hero.widgets.rainYes') : t('hero.widgets.rainNo')} ({weather.rainProbabilityMax.toFixed(0)}%)
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('hero.widgets.updatedAt')}: {weather.updatedAt.toLocaleString()}
                    </p>
                  </>
                ) : weather.status === 'no-location' ? (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.weatherNoLocation')}</p>
                ) : weather.status === 'error' ? (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.weatherError')}</p>
                ) : (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.loading')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBgImage}
            alt="Infrastructure engineering project"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="w-full lg:max-w-5xl lg:mx-auto">
            <div className="bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <PlaySquare size={16} className="text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.video')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoLarge((v) => !v)}
                  aria-pressed={isVideoLarge}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded px-2 py-1"
                >
                  {isVideoLarge ? t('hero.widgets.videoCollapse') : t('hero.widgets.videoExpand')}
                </button>
              </div>
              {youtubeVideoId ? (
                <div
                  className="relative w-full overflow-hidden rounded-md border border-border"
                  style={{ paddingTop: isVideoLarge ? '50%' : '56.25%' }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}`}
                    title={t('hero.widgets.videoTitle')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-sm text-silver font-light">{t('hero.widgets.videoUnavailable')}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
