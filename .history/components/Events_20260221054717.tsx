import React from 'react';
import { MapPin, Church, Gift, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  time: string;
  location: string;
  link?: string;
  description?: string;
  delay: number;
}

const EventCard: React.FC<EventCardProps> = ({ number, icon, title, time, location, link, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group relative h-full"
  >
    {/* Card Container - Elegant White Paper Style */}
    <div className="bg-white h-full rounded-t-full rounded-b-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-xv-rose/20 relative overflow-hidden">
        {/* Top Decorative Arc */}
       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-xv-pink/30 to-transparent -z-10 rounded-t-full"></div>
       
       <div className="p-8 pt-12 flex flex-col items-center text-center">
          
          {/* Number */}
          <div className="w-10 h-10 rounded-full bg-xv-bg border border-xv-rose-gold flex items-center justify-center font-cinzel text-xv-wine mb-6 text-sm shadow-inner">
             {number}
          </div>

          {/* Icon */}
          <div className="text-xv-rose-gold mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
             {icon}
          </div>

          {/* Title */}
          <h3 className="font-vibes text-4xl text-xv-rose-dark mb-2">
             {title}
          </h3>
          <div className="w-8 h-0.5 bg-xv-rose-gold/50 mb-6"></div>

          {/* Details */}
          <div className="font-mont text-gray-600 space-y-2 text-sm flex-grow">
              {time && <p className="font-bold text-xv-wine uppercase tracking-wider">{time}</p>}
              <p className="px-4">{location}</p>
              {description && <p className="italic text-xs mt-4 text-gray-400 max-w-[200px] mx-auto">{description}</p>}
          </div>

          {/* Button */}
          {link && (
              <a 
                  href={link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-xv-wine hover:text-white border border-xv-wine/30 hover:bg-xv-wine px-6 py-2 rounded-full transition-all duration-300"
              >
                  <MapPin size={12} />
                  Ver Mapa
              </a>
          )}
       </div>
    </div>
  </motion.div>
);

export const Events: React.FC = () => {
  return (
    <section className="py-24 bg-xv-bg relative overflow-hidden">
        {/* Background Texture - Soft Sparkles */}
        <div className="absolute inset-0 opacity-30 bg-sparkle-pattern"></div>
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-vibes text-6xl md:text-7xl text-xv-rose-gold mb-4 drop-shadow-sm">Itinerario</h2>
                  <p className="font-cinzel text-sm md:text-base text-xv-wine/70 tracking-[0.3em] uppercase">
                    Acompáñanos en este día especial
                  </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <EventCard 
                    number={1}
                    icon={<Church size={40} strokeWidth={1.5} />}
                    title="Ceremonia"
                    time="4:00 PM"
                    location="Iglesia Del Divino Niño (Manzana 022, Loma de la Cruz, 54475 Cdad. Nicolás Romero, Méx.)"
                    link="https://www.google.com/maps/search/?api=1&query=Iglesia+Del+Divino+Ni%C3%B1o+Manzana+022+Loma+de+la+Cruz"
                    delay={0.2}
                />
                
                <EventCard 
                    number={2}
                    icon={<Music size={40} strokeWidth={1.5} />}
                    title="Recepción"
                    time="7:00 PM"
                    location="SALÓN Y ALBERCAS EL MIRADOR (Calle 13 de Enero S/N, Loma de la Cruz, 54775 Cdad. Nicolás Romero, Méx.)"
                    link="https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+y+Albercas+El+Mirador+Calle+13+de+Enero"
                    delay={0.4}
                />

                <EventCard 
                    number={3}
                    icon={<Gift size={40} strokeWidth={1.5} />}
                    title="Regalos"
                    time=""
                    location="Lluvia de Sobres"
                    description="Tu presencia es mi mayor regalo."
                    delay={0.6}
                />
            </div>
        </div>
    </section>
  );
};