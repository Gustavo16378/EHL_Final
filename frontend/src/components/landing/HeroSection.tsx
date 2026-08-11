import { useEffect, useMemo, useRef, useState, useCallback, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CloudSun, PlaySquare, ArrowRight, MapPin, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { fetchCollection, resolveLocale, getHeroSlides, type HeroSlide } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

type CmsConstructionAttributes = {
  name?: string;
  city?: string;
  uf?: string;
  situacao?: string;
  deliveryForecast?: string;
  type?: string;
  image?: unknown;
};

type ConstructionCard = {
  id: number;
  name: string;
  city: string;
  uf: string;
  status: string;
  deliveryForecast: string;
};

type HistoryPoint = { t: number; v: number };
type ExchangeRate = { bid: number; pct: number; history: HistoryPoint[] };
type ExchangeState =
  | { status: 'idle' | 'loading' }
  // quotedAt é o horário da própria cotação (timestamp da API), não o do fetch.
  | { status: 'ready'; usd: ExchangeRate; eur: ExchangeRate; quotedAt: Date }
  | { status: 'error' };

// Alta/baixa do câmbio. Par escolhido pelo validador de paleta: sob deuteranopia
// o verde/vermelho padrão (emerald-400/red-400) separa só ΔE 6.5; este separa 7.5
// e, ao contrário do rose-500 (ΔE 14 mas contraste 3.9), ainda passa como texto
// sobre o card — 8.25:1 e 5.34:1. A cor nunca é o único sinal: a seta e o número
// com sinal carregam a direção sozinhos.
const TREND_UP = '#4ade80';
const TREND_DOWN = '#fb7185';

type ForecastDay = { weekday: string; max: number; rainProb: number; emoji: string };
type WeatherState =
  | { status: 'idle' | 'loading' }
  | {
      status: 'ready';
      temperatureNow: number;
      apparentTemp: number;
      humidity: number | null;
      conditionKey: string;
      conditionEmoji: string;
      temperatureMax: number;
      temperatureMin: number;
      rainProbabilityMax: number;
      willRain: boolean;
      windSpeed: number;
      forecast: ForecastDay[];
      updatedAt: Date;
    }
  | { status: 'error' };

// Sede da EHL — Palmas/TO. O clima exibido é o da praça onde a empresa opera,
// não o de quem visita: é informação institucional, e não depende de o
// navegador conceder (ou negar) permissão de localização.
const PALMAS_TO = { latitude: -10.1842, longitude: -48.3339 } as const;

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

const SLIDE_INTERVAL = 5500;
const FADE_DURATION = 900;

const VIDEO_URL = 'https://www.youtube.com/watch?v=quH1knOa49M';

const LOCALE_TAGS: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

// Mapeia o weather_code (WMO) da Open-Meteo para uma categoria traduzível + emoji.
const weatherCondition = (code: number): { key: string; emoji: string } => {
  if (code === 0) return { key: 'clear', emoji: '☀️' };
  if (code === 1 || code === 2) return { key: 'partlyCloudy', emoji: '⛅' };
  if (code === 3) return { key: 'cloudy', emoji: '☁️' };
  if (code === 45 || code === 48) return { key: 'fog', emoji: '🌫️' };
  if (code >= 51 && code <= 57) return { key: 'drizzle', emoji: '🌦️' };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { key: 'rain', emoji: '🌧️' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { key: 'snow', emoji: '🌨️' };
  if (code >= 95) return { key: 'thunderstorm', emoji: '⛈️' };
  return { key: 'cloudy', emoji: '☁️' };
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();

  const locale = resolveLocale(i18n.language);
  const localeTag = LOCALE_TAGS[locale] ?? 'pt-BR';
  const slides = useMemo<HeroSlide[]>(() => getHeroSlides(locale), [locale]);

  const [current, setCurrent] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(true);

  const [constructions, setConstructions] = useState<ConstructionCard[]>([]);
  const [constructionsLoading, setConstructionsLoading] = useState(true);

  const [exchange, setExchange] = useState<ExchangeState>({ status: 'idle' });
  const [weather, setWeather] = useState<WeatherState>({ status: 'idle' });

  const youtubeVideoId = useMemo(() => getYouTubeVideoId(VIDEO_URL), []);

  // --- Carrossel: troca de slide com fade da legenda ---
  // O timeout do fade é guardado num ref e limpo no unmount — sem guarda de
  // "mounted" (que quebrava sob StrictMode por nunca voltar a true no remount).
  const fadeTimer = useRef<number | null>(null);
  useEffect(() => () => {
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    setCaptionVisible(false);
    fadeTimer.current = window.setTimeout(() => {
      setCurrent(idx);
      setCaptionVisible(true);
    }, 300);
  }, []);

  // Auto-avanço; o timer reinicia sempre que `current` muda — inclusive em clique
  // manual no indicador (corrige o bug de não resetar o intervalo).
  useEffect(() => {
    if (slides.length <= 1) return;
    // Respeita "prefers-reduced-motion": não auto-avança (indicadores manuais seguem funcionando)
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => window.clearTimeout(id);
  }, [current, slides.length, goTo]);

  // Mantém o índice válido caso a lista mude
  useEffect(() => {
    if (current > slides.length - 1) setCurrent(0);
  }, [slides.length, current]);

  // Preload das imagens
  useEffect(() => {
    slides.forEach((s) => { const img = new Image(); img.src = s.image; });
  }, [slides]);

  // --- Obras em andamento (faixa de cards) ---
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setConstructionsLoading(true);
      try {
        const items = await fetchCollection<CmsConstructionAttributes>('constructions', {
          locale,
          populate: 'image',
          sort: 'id:asc',
        });
        if (cancelled) return;
        const mapped = items
          .map((entity) => {
            const a = (entity.attributes ?? {}) as CmsConstructionAttributes;
            return {
              id: entity.id,
              name: a.name ?? '',
              city: a.city ?? '',
              uf: a.uf ?? '',
              status: a.situacao ?? '',
              deliveryForecast: a.deliveryForecast ?? '',
            } satisfies ConstructionCard;
          })
          .filter((c) => Boolean(c.name));
        setConstructions(mapped);
      } catch {
        if (!cancelled) setConstructions([]);
      } finally {
        if (!cancelled) setConstructionsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [locale, refetchTick]);

  // --- Câmbio (USD + EUR: cotação atual + histórico p/ mini-gráfico) ---
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const opts: RequestInit = { signal: abortController.signal, cache: 'no-store' };

    // Extrai os fechamentos (bid + data) do endpoint /daily, do mais antigo p/ o mais novo.
    // A data vem junto porque o gráfico rotula o período e mostra o ponto no hover.
    // Histórico é best-effort: se falhar, o card continua mostrando a cotação sem gráfico.
    const parseHistory = async (settled: PromiseSettledResult<Response>): Promise<HistoryPoint[]> => {
      if (settled.status !== 'fulfilled' || !settled.value.ok) return [];
      try {
        const arr = await settled.value.json();
        if (!Array.isArray(arr)) return [];
        return arr
          .map((x) => ({ t: Number(x?.timestamp) * 1000, v: Number(x?.bid) }))
          .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v))
          .reverse();
      } catch {
        return [];
      }
    };

    const fetchRates = async () => {
      setExchange((prev) => (prev.status === 'ready' ? prev : { status: 'loading' }));
      try {
        const [last, usdHist, eurHist] = await Promise.allSettled([
          fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL', opts),
          fetch('https://economia.awesomeapi.com.br/json/daily/USD-BRL/15', opts),
          fetch('https://economia.awesomeapi.com.br/json/daily/EUR-BRL/15', opts),
        ]);
        if (last.status !== 'fulfilled' || !last.value.ok) throw new Error('exchange');
        const data = await last.value.json();
        const usdBid = Number(data?.USDBRL?.bid);
        const usdPct = Number(data?.USDBRL?.pctChange);
        const eurBid = Number(data?.EURBRL?.bid);
        const eurPct = Number(data?.EURBRL?.pctChange);
        if (![usdBid, usdPct, eurBid, eurPct].every(Number.isFinite)) throw new Error('exchange-shape');
        const [usdHistory, eurHistory] = await Promise.all([parseHistory(usdHist), parseHistory(eurHist)]);
        // O timestamp da API é o momento da cotação; cair no relógio local só
        // acontece se a API omitir o campo. Mostrar a hora do fetch como se
        // fosse a da cotação seria enganoso num mercado fechado no fim de semana.
        const quotedTs = Number(data?.USDBRL?.timestamp) * 1000;
        if (!isMounted) return;
        setExchange({
          status: 'ready',
          usd: { bid: usdBid, pct: usdPct, history: usdHistory },
          eur: { bid: eurBid, pct: eurPct, history: eurHistory },
          quotedAt: Number.isFinite(quotedTs) && quotedTs > 0 ? new Date(quotedTs) : new Date(),
        });
      } catch {
        if (!isMounted) return;
        setExchange({ status: 'error' });
      }
    };
    fetchRates();
    const id = window.setInterval(fetchRates, 10 * 60 * 1000);
    return () => { isMounted = false; abortController.abort(); window.clearInterval(id); };
  }, []);

  // --- Clima de Palmas/TO (com vento e previsão de 2 dias) ---
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const fetchWeather = async () => {
      setWeather((prev) => (prev.status === 'ready' ? prev : { status: 'loading' }));
      try {
        const url = new URL('https://api.open-meteo.com/v1/forecast');
        url.searchParams.set('latitude', String(PALMAS_TO.latitude));
        url.searchParams.set('longitude', String(PALMAS_TO.longitude));
        url.searchParams.set('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m');
        url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum');
        url.searchParams.set('timezone', 'auto');
        const res = await fetch(url.toString(), { signal: abortController.signal, cache: 'no-store' });
        if (!res.ok) throw new Error('weather');
        const data = await res.json();
        const now = Number(data?.current?.temperature_2m);
        const wind = Number(data?.current?.wind_speed_10m);
        const apparent = Number(data?.current?.apparent_temperature);
        const humidity = Number(data?.current?.relative_humidity_2m);
        const code = Number(data?.current?.weather_code);
        const max = Number(data?.daily?.temperature_2m_max?.[0]);
        const min = Number(data?.daily?.temperature_2m_min?.[0]);
        const rainProbMax = Number(data?.daily?.precipitation_probability_max?.[0]);
        const precipitationSum = Number(data?.daily?.precipitation_sum?.[0]);
        // Temperatura e vento são obrigatórios; o resto é secundário e pode vir null/ausente
        if (![now, wind, max, min].every(Number.isFinite)) throw new Error('weather-shape');
        const safeRainProbMax = Number.isFinite(rainProbMax) ? Math.max(0, Math.min(100, rainProbMax)) : 0;
        const safePrecipSum = Number.isFinite(precipitationSum) ? precipitationSum : 0;
        const condition = weatherCondition(Number.isFinite(code) ? code : -1);

        const tag = LOCALE_TAGS[locale] ?? 'pt-BR';
        const days: unknown[] = Array.isArray(data?.daily?.time) ? data.daily.time : [];
        const forecast: ForecastDay[] = [];
        for (const idx of [1, 2]) {
          const dayMax = Number(data?.daily?.temperature_2m_max?.[idx]);
          const dayRain = Number(data?.daily?.precipitation_probability_max?.[idx]);
          const dayCode = Number(data?.daily?.weather_code?.[idx]);
          const dateStr = days[idx];
          if (typeof dateStr !== 'string' || !Number.isFinite(dayMax)) continue;
          const weekday = new Date(`${dateStr}T12:00:00`).toLocaleDateString(tag, { weekday: 'short' });
          forecast.push({
            weekday,
            max: dayMax,
            rainProb: Number.isFinite(dayRain) ? Math.max(0, Math.min(100, dayRain)) : 0,
            emoji: weatherCondition(Number.isFinite(dayCode) ? dayCode : -1).emoji,
          });
        }

        if (!isMounted) return;
        setWeather({
          status: 'ready',
          temperatureNow: now,
          apparentTemp: Number.isFinite(apparent) ? apparent : now,
          humidity: Number.isFinite(humidity) ? humidity : null,
          conditionKey: condition.key,
          conditionEmoji: condition.emoji,
          temperatureMax: max,
          temperatureMin: min,
          rainProbabilityMax: safeRainProbMax,
          willRain: safeRainProbMax >= 50 || safePrecipSum > 0,
          windSpeed: wind,
          forecast,
          updatedAt: new Date(),
        });
      } catch {
        if (!isMounted) return;
        setWeather({ status: 'error' });
      }
    };
    fetchWeather();
    const id = window.setInterval(fetchWeather, 10 * 60 * 1000);
    return () => { isMounted = false; abortController.abort(); window.clearInterval(id); };
  }, [locale]);

  const activeSlide = slides[current] ?? slides[0];

  return (
    <>
      {/* HERO — carrossel full-width, protagonista */}
      {/* mt-[72px] = altura do header fixo, pra imagem começar abaixo da navbar sólida */}
      <section id="home" className="relative overflow-hidden bg-background mt-[72px] h-[58vh] md:h-[85vh]">
        <h1 className="sr-only">EHL — Eletro Hidro Ltda. — Engenharia e infraestrutura no Brasil</h1>
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={i === current ? slide.title : ''}
            aria-hidden={i !== current}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: i === current ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          />
        ))}

        {/* Gradiente sutil na base — contraste só onde a legenda fica */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Legenda — bottom left, clicável, fade junto com o slide */}
        {activeSlide && (
          <Link
            to={activeSlide.href}
            className="absolute bottom-0 left-0 z-10 max-w-2xl px-6 md:px-12 pb-12 md:pb-14 group"
            style={{ opacity: captionVisible ? 1 : 0, transition: 'opacity 350ms ease' }}
          >
            <div className="w-9 h-[2px] gradient-red-line mb-4" />
            <h2 className="font-display uppercase tracking-wide text-2xl md:text-3xl font-medium text-white leading-tight">
              {activeSlide.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-2 text-silver text-sm font-light">
              <MapPin className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
              <span>{activeSlide.location} · {activeSlide.category}</span>
            </div>
            <span className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary">
              {t('hero.caption.viewWork')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        )}

        {/* Indicadores — canto inferior direito em todas as resoluções */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              aria-current={i === current}
              className="flex items-center px-1 py-3 -my-3"
            >
              <span
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '32px' : '14px',
                  background: i === current ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.4)',
                }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* FAIXA — Obras em andamento */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-light text-foreground">
              {t('constructions.inProgressTitle')}
            </h2>
            <Link
              to="/ConstructionsPage"
              className="inline-flex items-center gap-1.5 flex-shrink-0 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              {t('constructions.viewAll')}
              <ArrowRight size={14} />
            </Link>
          </div>

          {constructionsLoading ? (
            <div className="text-center py-12 text-muted-foreground text-sm font-light">
              {t('constructions.loading')}
            </div>
          ) : constructions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm font-light">
              {t('constructions.empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {constructions.map((obra) => (
                <Link
                  key={obra.id}
                  to="/ConstructionsPage"
                  className="group flex flex-col p-6 rounded-lg border border-border bg-card/80 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
                >
                  <span className="self-start flex items-center gap-1.5 mb-4 text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {obra.status}
                  </span>
                  <h3 className="flex-1 mb-4 text-base font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {obra.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {obra.city}/{obra.uf} · {t('constructions.delivery')} {obra.deliveryForecast}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VÍDEO + WIDGETS */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 lg:grid-cols-5">
            {/* Vídeo — menor no desktop */}
            <div className="lg:col-span-2 bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <PlaySquare size={16} className="text-primary" />
                <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.video')}</span>
              </div>
              {youtubeVideoId ? (
                <div className="relative w-full overflow-hidden rounded-md border border-border" style={{ paddingTop: '56.25%' }}>
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

            {/* Widgets — câmbio e clima lado a lado no desktop */}
            <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
              {/* Câmbio */}
              <div className="bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <DollarSign size={16} className="text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.exchange')}</span>
                </div>
                {exchange.status === 'ready' ? (
                  <div className="space-y-4">
                    <RateBlock code="USD" rate={exchange.usd} localeTag={localeTag} t={t} />
                    <div className="border-t border-border/60 pt-4">
                      <RateBlock code="EUR" rate={exchange.eur} localeTag={localeTag} t={t} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('hero.widgets.quotedAt')}:{' '}
                      {exchange.quotedAt.toLocaleString(localeTag, {
                        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                ) : exchange.status === 'error' ? (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.usdError')}</p>
                ) : (
                  <p className="text-sm text-silver font-light">{t('hero.widgets.loading')}</p>
                )}
              </div>

              {/* Clima */}
              <div className="bg-card/60 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <CloudSun size={16} className="text-primary" />
                  <span className="text-xs font-medium tracking-wide uppercase">{t('hero.widgets.weather')}</span>
                </div>
                {weather.status === 'ready' ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-sm text-silver font-light">
                        <span className="text-lg leading-none">{weather.conditionEmoji}</span>
                        {t(`hero.widgets.conditions.${weather.conditionKey}`)}
                      </span>
                      <p className="text-2xl font-light text-foreground leading-none">
                        {weather.temperatureNow.toFixed(0)}°C
                      </p>
                    </div>
                    <p className="text-sm text-silver font-light mt-2">
                      {t('hero.widgets.feelsLike')}: {weather.apparentTemp.toFixed(0)}°
                      {weather.humidity !== null && (
                        <> · {t('hero.widgets.humidity')}: {weather.humidity.toFixed(0)}%</>
                      )}
                    </p>
                    <p className="text-sm text-silver font-light mt-2">
                      {t('hero.widgets.todayRange')}: {weather.temperatureMin.toFixed(0)}°C – {weather.temperatureMax.toFixed(0)}°C
                    </p>
                    <p className="text-sm text-silver font-light mt-2">
                      {t('hero.widgets.rain')}: {weather.willRain ? t('hero.widgets.rainYes') : t('hero.widgets.rainNo')} ({weather.rainProbabilityMax.toFixed(0)}%)
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-silver font-light mt-2">
                      <Wind className="w-3.5 h-3.5 text-primary/70" />
                      {t('hero.widgets.wind')}: {weather.windSpeed.toFixed(0)} km/h
                    </p>
                    {weather.forecast.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/60">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                          {t('hero.widgets.forecast')}
                        </p>
                        <div className="space-y-1">
                          {weather.forecast.map((d, i) => (
                            <p key={i} className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5 capitalize">
                                <span>{d.emoji}</span>{d.weekday}
                              </span>
                              <span>{d.max.toFixed(0)}° · {d.rainProb.toFixed(0)}%</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
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
    </>
  );
};

// Um bloco de moeda: código, cotação, variação do dia, tendência e a escala do
// período. A escala é o que faltava — sem mín/máx o gráfico é um traço bonito
// que não diz se a oscilação foi de centavos ou de reais.
const RateBlock = ({
  code,
  rate,
  localeTag,
  t,
}: {
  code: string;
  rate: ExchangeRate;
  localeTag: string;
  t: TFunction;
}) => {
  const money = (v: number) =>
    v.toLocaleString(localeTag, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const values = rate.history.map((p) => p.v);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {code} · BRL
        </span>
        <VariationBadge pct={rate.pct} periodLabel={t('hero.widgets.today')} />
      </div>

      <p className="mt-1 text-2xl font-light leading-none text-foreground">R$ {money(rate.bid)}</p>

      <Sparkline data={rate.history} localeTag={localeTag} />

      {values.length >= 2 && (
        <div className="mt-1.5 flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {t('hero.widgets.low')} {money(Math.min(...values))} · {t('hero.widgets.high')}{' '}
            {money(Math.max(...values))}
          </span>
          <span>{t('hero.widgets.sessions', { n: values.length })}</span>
        </div>
      )}
    </div>
  );
};

const VariationBadge = ({ pct, periodLabel }: { pct: number; periodLabel: string }) => {
  // Abaixo de 0,005% o número arredonda para "0,00": desenhar seta aqui fazia o
  // card exibir "▼ 0,00%", que se contradiz. Nesse caso a variação é plana.
  const flat = !Number.isFinite(pct) || Math.abs(pct) < 0.005;
  const dir = flat ? 'flat' : pct > 0 ? 'up' : 'down';
  const color = dir === 'up' ? TREND_UP : dir === 'down' ? TREND_DOWN : undefined;
  const symbol = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '▪';
  const sign = dir === 'up' ? '+' : dir === 'down' ? '−' : '';
  const tone = color ? undefined : 'text-muted-foreground';

  return (
    <span className="inline-flex items-baseline gap-1">
      <span aria-hidden="true" className={`text-xs ${tone ?? ''}`} style={color ? { color } : undefined}>
        {symbol}
      </span>
      <span className={`text-sm font-medium tabular-nums ${tone ?? ''}`} style={color ? { color } : undefined}>
        {sign}
        {Math.abs(Number.isFinite(pct) ? pct : 0).toFixed(2)}%
      </span>
      <span className="text-xs text-muted-foreground">{periodLabel}</span>
    </span>
  );
};

// Mini-gráfico (sparkline) em SVG puro — tendência do câmbio no período.
// Verde se o período fechou acima de onde abriu, vermelho se abaixo.
//
// O traço usa preserveAspectRatio="none" para esticar na largura do card, o que
// deformaria qualquer círculo desenhado dentro do SVG. Por isso o ponto final e
// o do hover são <span> posicionados por porcentagem, fora do sistema de
// coordenadas do SVG — ficam redondos em qualquer largura.
const Sparkline = ({ data, localeTag }: { data: HistoryPoint[]; localeTag: string }) => {
  const [hover, setHover] = useState<number | null>(null);
  if (data.length < 2) return null;

  const H = 36;
  const PAD = 3; // respiro p/ o traço de 2px não encostar nas bordas
  const values = data.map((p) => p.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const xPct = (i: number) => (i / (data.length - 1)) * 100;
  const yUnits = (v: number) => PAD + (1 - (v - min) / range) * (H - PAD * 2);
  const yPct = (v: number) => (yUnits(v) / H) * 100;

  const pts = data.map((p, i) => `${xPct(i).toFixed(2)},${yUnits(p.v).toFixed(2)}`).join(' ');
  const up = values[values.length - 1] >= values[0];
  const color = up ? TREND_UP : TREND_DOWN;
  const active = hover ?? data.length - 1;

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHover(Math.round(frac * (data.length - 1)));
  };

  return (
    <div
      className="relative mt-2 touch-none"
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={() => setHover(null)}
      onPointerCancel={() => setHover(null)}
    >
      <svg viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" className="block h-9 w-full" aria-hidden="true">
        <polygon points={`0,${H} ${pts} 100,${H}`} fill={color} opacity={0.1} />
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {hover !== null && (
          <line
            x1={xPct(hover)}
            x2={xPct(hover)}
            y1={0}
            y2={H}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
            opacity={0.5}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Anel na cor do card p/ o ponto continuar legível sobre o traço. */}
      <span
        className="pointer-events-none absolute block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${xPct(active)}%`,
          top: `${yPct(values[active])}%`,
          backgroundColor: color,
          boxShadow: '0 0 0 2px hsl(var(--card))',
        }}
      />

      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded border border-border/70 bg-card px-1.5 py-0.5 text-[11px] tabular-nums text-silver shadow-lg"
          // Preso entre 12% e 88% p/ a caixa não vazar a borda do card nas pontas.
          style={{ left: `${Math.min(88, Math.max(12, xPct(hover)))}%` }}
        >
          {new Date(data[hover].t).toLocaleDateString(localeTag, { day: '2-digit', month: '2-digit' })}
          {' · R$ '}
          {values[hover].toLocaleString(localeTag, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
