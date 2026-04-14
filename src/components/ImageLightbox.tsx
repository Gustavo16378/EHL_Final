import { useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { X } from "lucide-react";

type LightboxCtx = { open: (src: string, alt: string) => void };
const LightboxContext = createContext<LightboxCtx>({ open: () => {} });

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => setImg({ src, alt }), []);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {img && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setImg(null)}
        >
          <button
            onClick={() => setImg(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition"
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <img
            src={img.src}
            alt={img.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </LightboxContext.Provider>
  );
};

/** Clickable image that opens in the lightbox */
export const LightboxImage = ({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { open } = useLightbox();
  return (
    <img
      src={src}
      alt={alt ?? ""}
      className={`cursor-pointer ${className ?? ""}`}
      onClick={() => open(src ?? "", alt ?? "")}
      {...props}
    />
  );
};
