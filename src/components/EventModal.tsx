import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react";

export type EventData = {
  name: string;
  date: string;
  desc: string;
  location?: string;
  participants?: string;
  details?: string;
  images: string[];
};

type Props = {
  event: EventData;
  onClose: () => void;
};

const EventModal = ({ event, onClose }: Props) => {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? event.images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === event.images.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Carousel */}
        <div className="relative aspect-video bg-surface-dark rounded-t-2xl overflow-hidden">
          <img
            src={event.images[idx]}
            alt={`${event.name} - Foto ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          {event.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {event.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`w-2 h-2 rounded-full transition ${i === idx ? "bg-accent" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="p-8">
          <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">{event.name}</h3>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground font-body text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> {event.date}</span>
            {event.location && (
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {event.location}</span>
            )}
            {event.participants && (
              <span className="flex items-center gap-1.5"><Users size={14} className="text-accent" /> {event.participants}</span>
            )}
          </div>
          <p className="font-body text-foreground/80 leading-relaxed mb-4">{event.desc}</p>
          {event.details && (
            <p className="font-body text-muted-foreground leading-relaxed">{event.details}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
