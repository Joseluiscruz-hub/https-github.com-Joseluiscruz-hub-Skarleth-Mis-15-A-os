import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export const DressCode: React.FC = () => {
  const suggestedColors = [
    { name: 'Dorado', color: '#D4AF37' },
    { name: 'Champagne', color: '#F7E7CE' },
    { name: 'Terracota', color: '#E2725B' },
    { name: 'Vino', color: '#722F37' },
    { name: 'Nude', color: '#E8C4A2' },
  ];

  const avoidColors = [
    { name: 'Blanco', color: '#FFFFFF' },
    { name: 'Rosa Fuerte', color: '#FF69B4' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-xv-bg relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Sparkles className="mx-auto text-xv-rose-gold mb-4" size={32} />
          <h2 className="font-vibes text-5xl text-xv-rose-gold mb-2">Código de Vestimenta</h2>
          <p className="font-cinzel text-xv-wine text-lg tracking-widest uppercase">Formal / Elegante</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Suggested Colors */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-xv-rose/10"
            >
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-xv-wine mb-4 text-center">
                🎨 Colores Sugeridos
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedColors.map((c, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="font-mont text-xs text-gray-500">{c.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Colors to Avoid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-xv-rose/10"
            >
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-xv-wine mb-4 text-center">
                🚫 Por Favor Evitar
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {avoidColors.map((c, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full shadow-md border-2 border-gray-200"
                        style={{ backgroundColor: c.color }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <X className="text-red-500" size={28} strokeWidth={3} />
                      </div>
                    </div>
                    <span className="font-mont text-xs text-gray-500">{c.name}</span>
                  </div>
                ))}
              </div>
              <p className="font-mont text-xs text-gray-400 text-center mt-4 italic">
                Estos colores están reservados para la quinceañera
              </p>
            </motion.div>
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-4 font-mont text-sm text-xv-wine/70">
              <span className="flex items-center gap-2">
                <span className="text-lg">👠</span> Tacón cómodo
              </span>
              <span className="text-xv-rose-gold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">👔</span> Caballeros: Traje
              </span>
              <span className="text-xv-rose-gold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">👗</span> Damas: Vestido largo
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
