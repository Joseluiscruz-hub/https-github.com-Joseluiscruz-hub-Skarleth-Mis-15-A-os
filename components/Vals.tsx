import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Heart } from 'lucide-react';

export const Vals: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-xv-bg to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-xv-rose-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-xv-pink rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Vals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Music2
            className="mx-auto text-xv-rose-gold mb-4"
            size={40}
            strokeWidth={1.5}
          />
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-gold mb-4">
            El Vals
          </h2>
          <div className="w-16 h-0.5 bg-xv-rose-gold/50 mx-auto mb-6"></div>
        </motion.div>

        {/* Vals Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-xv-rose/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart
                className="text-xv-rose-gold"
                size={20}
                fill="currentColor"
              />
              <span className="nombres-padrinos">Vals con mi Papá</span>
              <Heart
                className="text-xv-rose-gold"
                size={20}
                fill="currentColor"
              />
            </div>

            <h3 className="titulos-cursiva text-4xl text-xv-rose-dark mb-2">
              "Tu Sangre en Mi Cuerpo"
            </h3>
            <p className="font-mont text-gray-500 text-sm italic mb-4">
              Pepe Aguilar y Ángela Aguilar
            </p>

            <div className="h-[1px] w-24 bg-xv-rose-gold/30 mx-auto my-6"></div>

            <p className="font-mont text-gray-400 text-sm leading-relaxed">
              El primer vals será un momento mágico junto a mi papá, seguido por
              el vals sorpresa.
            </p>
          </div>
        </motion.div>

        {/* Thank you note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center titulos-cursiva text-2xl text-xv-rose-dark mt-12"
        >
          Gracias por acompañarme en este sueño 💫
        </motion.p>
      </div>
    </section>
  );
};