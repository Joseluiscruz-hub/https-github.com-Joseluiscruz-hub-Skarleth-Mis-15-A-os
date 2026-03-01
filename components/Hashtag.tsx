import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Camera, Hash } from 'lucide-react';

const INSTAGRAM_URL =
  'https://www.instagram.com/skarleth__mj?utm_source=qr&igsh=MXg0bWZ3ZnM1aGJ5Mg==';

export const Hashtag: React.FC = () => {
  const hashtag = '#LosXVDeSkarlet';

  return (
    <section className="py-12 bg-gradient-to-r from-xv-wine via-xv-rose-dark to-xv-wine relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute text-white/20"
            style={{ left: `${i * 10}%`, top: `${(i * 13 + 7) % 100}%` }}
          >
            <Hash size={24 + i * 4} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="text-white/70" size={24} />
            <span className="font-mont text-white/80 text-sm uppercase tracking-widest">
              Comparte tus fotos con los XV de Skarlet
            </span>
            <Instagram className="text-white/70" size={24} />
          </div>

          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block"
          >
            <h2 className="titulos-cursiva text-4xl md:text-6xl text-white drop-shadow-lg cursor-pointer">
              {hashtag}
            </h2>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 font-mont text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Ver en Instagram ✨
            </span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-mont text-white/60 text-sm mt-8"
          >
            ¡Queremos ver tus mejores momentos! 📸✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};