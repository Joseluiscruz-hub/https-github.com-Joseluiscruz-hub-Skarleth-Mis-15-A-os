import React from 'react';
import { Church, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { invitation } from '../lib/invitation';

interface EventCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  time: string;
  location: string;
  description: string;
  delay: number;
}

const EventCard: React.FC<EventCardProps> = ({
  number,
  icon,
  title,
  time,
  location,
  description,
  delay,
}) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="event-card bg-white shadow-lg border border-xv-rose/20 overflow-hidden p-7 md:p-8"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="itinerario-number w-10 h-10 rounded-full flex items-center justify-center texto-general text-sm">
        {number}
      </div>
      <div className="text-xv-rose-gold" aria-hidden="true">
        {icon}
      </div>
    </div>

    <h3 className="titulos-cursiva text-4xl text-xv-rose-dark mb-1">
      {title}
    </h3>
    <p className="font-mont text-sm tracking-[0.2em] uppercase text-xv-muted mb-3">
      {time}
    </p>
    <p className="font-mont text-sm text-xv-muted leading-relaxed">
      {location}
    </p>
    <p className="font-mont text-xs text-xv-muted/75 leading-relaxed mt-5">
      {description}
    </p>
  </motion.article>
);

export const Events: React.FC = () => {
  return (
    <section className="py-24 bg-xv-bg relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="titulos-cursiva text-6xl md:text-7xl text-xv-rose-gold mb-4">
            Así lo celebramos
          </h2>
          <p className="texto-general text-sm md:text-base tracking-[0.25em] uppercase max-w-2xl mx-auto">
            Una tarde de fe, familia, música y momentos que permanecerán para
            siempre
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <EventCard
            number={1}
            icon={<Church size={36} strokeWidth={1.5} />}
            title={invitation.ceremony.title}
            time={invitation.ceremony.time}
            location={invitation.ceremony.location}
            description="Ahí comenzó una celebración llena de gratitud, emoción y bendiciones."
            delay={0.1}
          />

          <EventCard
            number={2}
            icon={<Music size={36} strokeWidth={1.5} />}
            title={invitation.reception.title}
            time={invitation.reception.time}
            location={invitation.reception.location}
            description="Compartimos la mesa, el vals y una noche inolvidable con quienes más queremos."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};
