import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ChevronDown, ChevronUp } from 'lucide-react';

interface GiftOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
  delay: number;
}

const GiftOption: React.FC<GiftOptionProps> = ({
  icon,
  title,
  description,
  action,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-xv-rose/10 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-xv-rose-gold/20 to-xv-pink/20 text-xv-rose-gold mb-4">
        {icon}
      </div>
      <h3 className="texto-general text-lg text-xv-wine mb-2">{title}</h3>
      <p className="font-mont text-gray-500 text-sm mb-4">{description}</p>
      {action}
    </div>
  </motion.div>
);

const WISH_CATEGORIES = [
  {
    emoji: '💄',
    label: 'Belleza & Skincare',
    items: [
      'Sérum facial (Niacinamida o Vitamina C)',
      'Paleta de sombras shimmer/glitter',
      'Set de brochas de maquillaje',
      'Perfume floral o frutal',
    ],
  },
  {
    emoji: '👗',
    label: 'Moda & Accesorios',
    items: [
      'Bolsa mini tipo crossbody',
      'Aretes colgantes o argollas doradas',
      'Conjunto aesthetic (hoodie + jogger)',
      'Gorra o bucket hat de moda',
    ],
  },
  {
    emoji: '📱',
    label: 'Tech & Gadgets',
    items: [
      'Tiras LED RGB para cuarto',
      'Auriculares Bluetooth inalámbricos',
      'Cámara Polaroid Instax',
      'Ring light pequeño',
    ],
  },
  {
    emoji: '🎀',
    label: 'Detalles Especiales',
    items: [
      'Collar con inicial en plata',
      'Set de papelería aesthetic',
      'Libro de diario/journal decorado',
      'Tarjeta de regalo (cualquier tienda)',
    ],
  },
];

export const GiftRegistry: React.FC = () => {
  const [wishOpen, setWishOpen] = useState(false);

  return (
    <section className="py-20 bg-xv-bg relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Gift
            className="mx-auto text-xv-rose-gold mb-4"
            size={40}
            strokeWidth={1.5}
          />
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-gold mb-4">
            Mesa de Regalos
          </h2>
          <p className="font-mont text-gray-500 max-w-lg mx-auto leading-relaxed">
            Tu presencia es el mejor regalo. Sin embargo, si deseas obsequiarme
            algo, aquí te dejo algunas opciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Lluvia de Sobres */}
          <GiftOption
            icon={<Gift size={28} />}
            title="Lluvia de Sobres"
            description="El día del evento habrá un buzón especial para tu regalo"
            delay={0.2}
            action={
              <span className="inline-block font-mont text-xs text-xv-rose-gold bg-xv-rose-gold/10 px-4 py-2 rounded-full">
                💌 En la fiesta
              </span>
            }
          />

          {/* Lista de Deseos interactiva */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-xv-rose/10 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-xv-rose-gold/20 to-xv-pink/20 text-xv-rose-gold mb-4">
                <Gift size={28} />
              </div>
              <h3 className="texto-general text-lg text-xv-wine mb-2">
                Lista de Deseos
              </h3>
              <p className="font-mont text-gray-500 text-sm mb-4">
                Productos seleccionados con mucho cariño 🎀
              </p>

              {/* Botón toggle */}
              <button
                onClick={() => setWishOpen((o) => !o)}
                className="inline-flex items-center gap-2 font-mont font-bold text-sm px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #c9a96e, #f0d9a0)',
                  color: '#3d2b1a',
                }}
              >
                🎁 {wishOpen ? 'Ocultar Lista' : 'Ver Lista de Deseos'}
                {wishOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Lista desplegable */}
            <AnimatePresence>
              {wishOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 text-left space-y-4">
                    {WISH_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <p className="font-mont font-bold text-sm text-xv-wine mb-1.5">
                          {cat.emoji} {cat.label}
                        </p>
                        <ul className="space-y-1">
                          {cat.items.map((item) => (
                            <li
                              key={item}
                              className="font-mont text-xs text-gray-600 flex items-start gap-1.5"
                            >
                              <span className="mt-0.5 text-xv-rose-gold">
                                ✦
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Thank you note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-vibes text-2xl text-xv-rose-dark mt-12"
        >
          ¡Gracias por ser parte de mi celebración! 💖
        </motion.p>
      </div>
    </section>
  );
};
