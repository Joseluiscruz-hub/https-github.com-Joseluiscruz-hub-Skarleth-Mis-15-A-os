import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const MensajeSkarlet: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-xv-bg/60 to-white overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-xv-rose-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-xv-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-2xl">

        {/* Ornamento superior */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xv-rose-gold/70 text-2xl tracking-[0.4em] select-none">✿ ❧ ✿</p>
        </motion.div>

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-16 bg-xv-rose-gold/40" />
            <Heart className="text-xv-rose-gold" size={18} fill="currentColor" />
            <div className="h-[1px] w-16 bg-xv-rose-gold/40" />
          </div>
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-gold mb-2">
            Mis Palabras
          </h2>
          <p className="texto-general uppercase tracking-[0.3em] text-xv-wine/60 text-xs">
            Un mensaje desde mi corazón
          </p>
        </motion.div>

        {/* Carta / Blockquote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Comillas decorativas */}
          <span className="absolute -top-6 -left-2 titulos-cursiva text-8xl text-xv-rose-gold/20 leading-none select-none">
            "
          </span>

          <div className="bg-white/80 backdrop-blur-sm border border-xv-rose-gold/20 rounded-3xl px-8 py-10 shadow-xl shadow-xv-rose/10">
            <p className="nombres-padrinos text-xl md:text-2xl text-xv-wine/80 leading-relaxed text-center italic">
              Agradezco a Dios por cada bendición en mi vida,
              a mis padres por hacer este sueño realidad,
              por estar a mi lado en cada momento.
            </p>

            <div className="flex items-center justify-center my-6">
              <div className="h-[1px] w-12 bg-xv-rose-gold/30" />
              <span className="mx-3 text-xv-rose-gold/50 text-sm">✦</span>
              <div className="h-[1px] w-12 bg-xv-rose-gold/30" />
            </div>

            <p className="nombres-padrinos text-xl md:text-2xl text-xv-wine/80 leading-relaxed text-center italic">
              A partir de hoy comienzan nuevos caminos por recorrer,
              nuevas etapas para mi vida. Este día tan anhelado
              ha llegado y hoy quiero compartir un momento
              inolvidable con cada uno de ustedes.
            </p>
          </div>

          {/* Comillas de cierre */}
          <span className="absolute -bottom-4 -right-2 titulos-cursiva text-8xl text-xv-rose-gold/20 leading-none select-none rotate-180">
            "
          </span>
        </motion.div>

        {/* Firma */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="titulos-cursiva text-3xl text-xv-rose-dark">
            — Skarlet
          </p>
          <span className="text-xv-rose-gold text-xl">💖</span>
        </motion.div>

        {/* Ornamento inferior */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xv-rose-gold/70 text-2xl tracking-[0.4em] select-none">✿ ❧ ✿</p>
        </motion.div>

      </div>
    </section>
  );
};

export default MensajeSkarlet;