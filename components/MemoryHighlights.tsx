import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Images, Music2, Share2, Sparkles } from 'lucide-react';
import { heroImage, invitation } from '../lib/invitation';

const highlights = [
  {
    icon: <HeartHandshake size={22} />,
    label: 'Familia',
    value: 'Amor presente',
  },
  {
    icon: <Music2 size={22} />,
    label: 'Vals',
    value: 'Un momento eterno',
  },
  {
    icon: <Images size={22} />,
    label: 'Recuerdos',
    value: '15 etapas',
  },
];

const shareText = encodeURIComponent(
  `Revive los XV Años de ${invitation.celebrant}: ${invitation.hashtag}`,
);

export const MemoryHighlights: React.FC = () => {
  return (
    <section className="memory-highlights relative overflow-hidden py-20 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <p className="font-mont mb-3 text-xs uppercase tracking-[0.32em] text-xv-muted">
            Álbum digital
          </p>
          <h2 className="font-cormorant text-5xl leading-none text-xv-gold md:text-7xl">
            Una noche convertida en recuerdo
          </h2>
          <p className="mt-5 max-w-2xl font-mont text-sm leading-7 text-xv-muted md:text-base">
            Este espacio reúne la emoción de la ceremonia, la alegría de la
            fiesta y las fotos que guardan la esencia de los XV de Skarlet.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="highlight-metric">
                <span className="text-xv-gold" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="font-mont text-[0.65rem] uppercase tracking-[0.22em] text-xv-muted">
                  {item.label}
                </span>
                <strong className="font-cormorant text-2xl font-semibold text-[#fff6e6]">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#gallery" className="hero-action">
              <Images size={16} aria-hidden="true" />
              Ver álbum
            </a>
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
              className="hero-action hero-action-secondary"
            >
              <Share2 size={16} aria-hidden="true" />
              Compartir
            </a>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="memory-feature"
        >
          <img
            src={heroImage}
            alt="Ilustración principal de los XV años de Skarlet"
            width={1304}
            height={1518}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <Sparkles size={16} aria-hidden="true" />
            {invitation.dateDisplay}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};
