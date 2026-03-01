import React from 'react';
import { Church, Gift, MapPin, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  time: string;
  location: string;
  delay: number;
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
  description?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  number,
  icon,
  title,
  time,
  location,
  delay,
  mapEmbedUrl,
  mapLinkUrl,
  description,
}) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-3xl shadow-lg border border-xv-rose/20 overflow-hidden"
  >
    <div className="p-7 md:p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="itinerario-number w-10 h-10 rounded-full bg-xv-bg border border-xv-rose-gold flex items-center justify-center texto-general text-xv-wine text-sm">
          {number}
        </div>
        <div className="text-xv-rose-gold">{icon}</div>
      </div>

      <h3 className="titulos-cursiva text-4xl text-xv-rose-dark mb-1">{title}</h3>
      {time && <p className="font-mont text-sm tracking-[0.2em] uppercase text-xv-wine mb-2">{time}</p>}
      <p className="font-mont text-sm text-gray-600 leading-relaxed">{location}</p>

      {description && <p className="font-mont text-xs italic text-gray-400 mt-4">{description}</p>}
    </div>

    {mapEmbedUrl && (
      <div className="px-5 pb-5">
        <div className="rounded-2xl overflow-hidden border border-xv-rose/20 shadow-sm">
          <iframe
            title={`Mapa de ${title}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-56"
          />
        </div>
        <a
          href={mapLinkUrl || mapEmbedUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-xv-wine hover:text-xv-rose-dark"
        >
          <MapPin size={12} /> Abrir mapa completo
        </a>
      </div>
    )}
  </motion.article>
);

export const Events: React.FC = () => {
  return (
    <section className="py-24 bg-xv-bg relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="titulos-cursiva text-6xl md:text-7xl text-xv-rose-gold mb-4">Itinerario</h2>
            <p className="texto-general text-sm md:text-base text-xv-wine/70 tracking-[0.3em] uppercase">
              Acompañanos en este dia especial
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <EventCard
            number={1}
            icon={<Church size={36} strokeWidth={1.5} />}
            title="Ceremonia"
            time="2:00 PM"
            location="Iglesia Del Divino Niño, Loma de la Cruz, Nicolás Romero"
            mapEmbedUrl="https://www.google.com/maps?q=Iglesia+Del+Divino+Niño+Loma+de+la+Cruz+Nicolás+Romero&output=embed"
            mapLinkUrl="https://www.google.com/maps/search/?api=1&query=Iglesia+Del+Divino+Ni%C3%B1o+Loma+de+la+Cruz+Nicol%C3%A1s+Romero"
            delay={0.1}
          />

          <EventCard
            number={2}
            icon={<Music size={36} strokeWidth={1.5} />}
            title="Recepción"
            time="3:00 PM"
            location="Salón y Albercas El Mirador, Calle 13 de Enero S/N, Nicolás Romero"
            mapEmbedUrl="https://www.google.com/maps?q=Salón+y+Albercas+El+Mirador+Calle+13+de+Enero+Nicolás+Romero&output=embed"
            mapLinkUrl="https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+y+Albercas+El+Mirador+Calle+13+de+Enero+Nicol%C3%A1s+Romero"
            delay={0.2}
          />

          <EventCard
            number={3}
            icon={<Gift size={36} strokeWidth={1.5} />}
            title="Regalos"
            time=""
            location="Lluvia de sobres"
            description="Tu presencia es mi mayor regalo."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};
