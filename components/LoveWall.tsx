import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const messages = [
  {
    id: 'family',
    name: 'Familia',
    message:
      'Que cada recuerdo de esta noche te acompañe siempre con amor y alegría.',
  },
  {
    id: 'friends',
    name: 'Amigos',
    message:
      'Gracias por permitirnos celebrar contigo una etapa tan especial de tu vida.',
  },
  {
    id: 'with-love',
    name: 'Con cariño',
    message:
      'Skarlet, que tus XV sean el comienzo de muchos sueños cumplidos.',
  },
];

export const LoveWall: React.FC = () => {
  return (
    <section id="memories" className="love-wall-section py-20 bg-xv-bg/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Heart
            className="mx-auto text-xv-rose-gold mb-3"
            fill="currentColor"
            aria-hidden="true"
          />
          <h2 className="titulos-cursiva text-5xl text-xv-rose-dark mb-2">
            Mensajes con amor
          </h2>
          <p className="font-mont text-sm text-xv-muted">
            Palabras que guardamos como parte de este recuerdo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {messages.map((message, index) => (
            <motion.article
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="love-message bg-white rounded-2xl p-6 border border-xv-rose/20 shadow-sm"
            >
              <h3 className="font-cormorant text-2xl text-xv-gold mb-3">
                {message.name}
              </h3>
              <p className="font-mont text-sm text-xv-muted leading-relaxed">
                “{message.message}”
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
