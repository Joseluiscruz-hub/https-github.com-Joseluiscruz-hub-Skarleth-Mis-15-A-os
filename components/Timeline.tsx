import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const moments = [
  {
    age: '0 años',
    title: 'Mi Primer Día',
    photo: 'https://images.unsplash.com/photo-1604917869287-3ae73c77e227?auto=format&fit=crop&w=800&q=80',
    description: 'Comenzó esta historia llena de amor y sueños.',
  },
  {
    age: '4 años',
    title: 'Infancia Feliz',
    photo: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    description: 'Juegos, risas y una niñez inolvidable.',
  },
  {
    age: '8 años',
    title: 'Grandes Aprendizajes',
    photo: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
    description: 'Cada paso fue construyendo quien soy hoy.',
  },
  {
    age: '12 años',
    title: 'Nuevas Metas',
    photo: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=800&q=80',
    description: 'Descubriendo mis pasiones y mi esencia.',
  },
  {
    age: '15 años',
    title: 'Mi Gran Momento',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: 'Lista para celebrar esta noche de ensueño.',
  },
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-xv-bg/40 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Sparkles className="mx-auto text-xv-rose-gold mb-3" size={28} />
          <h2 className="titulos-cursiva text-6xl text-xv-rose-dark mb-2">
            Mi Historia
          </h2>
          <p className="texto-general uppercase tracking-[0.3em] text-xv-wine/70 text-xs">
            Desde mis primeros pasos hasta mis XV
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-[120px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-xv-rose-gold/40 to-transparent hidden md:block" />

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [scrollbar-width:thin]">
            {moments.map((moment, index) => (
              <motion.article
                key={moment.age}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="min-w-[260px] md:min-w-[320px] bg-white border border-xv-rose/20 rounded-3xl p-4 shadow-lg snap-start"
              >
                <div className="relative mb-4">
                  <img
                    src={moment.photo}
                    alt={moment.title}
                    className="w-full h-56 object-cover rounded-2xl"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-mont text-xv-wine tracking-wider uppercase">
                    {moment.age}
                  </span>
                </div>
                <h3 className="font-cormorant text-3xl text-xv-rose-dark leading-none mb-2">
                  {moment.title}
                </h3>
                <p className="font-mont text-sm text-gray-500 leading-relaxed">
                  {moment.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
