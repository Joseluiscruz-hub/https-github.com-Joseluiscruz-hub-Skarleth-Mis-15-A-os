import React from 'react';
import { motion } from 'framer-motion';

const heroBg = `url('${import.meta.env.BASE_URL}images/skarlet-portada.png')`;

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-xv-bg"
    >
      {/* ── Imagen de fondo ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: heroBg,
          backgroundPosition: 'center top',
        }}
      />

      {/* ── Gradiente SOLO en la parte superior (protege legibilidad del título) ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-1"
        style={{
          height: '40vh',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        }}
      />

      {/* ── Gradiente inferior (protege legibilidad de la fecha) ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-1"
        style={{
          height: '28vh',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        }}
      />

      {/* ── Pétalos animados ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={`petal-${i}`}
            initial={{
              y: -40,
              x: `${Math.random() * 100}vw`,
              opacity: 0,
              rotate: Math.random() * 35,
            }}
            animate={{
              y: '115vh',
              x: `calc(${Math.random() * 100}vw + ${Math.random() * 120 - 60}px)`,
              rotate: 300,
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 13,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
            className="absolute w-3 h-4 rounded-[55%_45%_50%_50%] blur-[0.4px]"
            style={{
              background: i % 2 === 0 ? '#f59e0b' : '#fb923c',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.35)',
            }}
          />
        ))}
      </div>

      {/* ── Destellos ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={`spark-${i}`}
            initial={{
              opacity: 0,
              scale: 0,
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
            className="absolute w-1.5 h-1.5 bg-amber-100 rounded-full"
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          SECCIÓN SUPERIOR — título debajo de los banderines
          padding-top: ~10vh para quedar bajo el papel picado (z-40, ~7rem)
          ════════════════════════════════════════════════ */}
      <header
        className="relative z-20 text-center px-6"
        style={{ paddingTop: 'clamp(5rem, 12vh, 9rem)' }}
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="texto-general text-white uppercase tracking-[0.3em] mb-1"
          style={{
            fontSize: 'clamp(0.7rem, 2.5vw, 1.05rem)',
            textShadow:
              '2px 4px 10px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.7)',
          }}
        >
          Te invito a celebrar mis
        </motion.p>

        {/* Nombre con efecto glow — sin backdrop-blur que tape la imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="relative inline-block"
        >
          <h1
            className="nombre-skarleth relative z-10 leading-none text-amber-300"
            style={{
              fontSize: 'clamp(3.8rem, 14vw, 7rem)',
              textShadow:
                '3px 5px 14px rgba(0,0,0,0.95), 0 0 28px rgba(212,175,55,0.75), 0 0 55px rgba(212,175,55,0.35)',
            }}
          >
            Skarlet
          </h1>
          {/* Capa glow desenfocada — decorativa, detrás del texto */}
          <h1
            aria-hidden="true"
            className="nombre-skarlet absolute top-0 left-0 right-0 text-center leading-none text-amber-300 blur-md opacity-50 select-none pointer-events-none translate-y-1"
            style={{ fontSize: 'clamp(3.8rem, 14vw, 7rem)' }}
          >
            Skarlet
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="titulos-cursiva text-white mt-1 tracking-[0.2em]"
          style={{
            fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
            textShadow:
              '2px 4px 10px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.7)',
          }}
        >
          XV AÑOS
        </motion.h2>
      </header>

      {/* ════════════════════════════════════════════════
          ZONA CENTRAL — "resorte" que mantiene los rostros despejados
          flex-grow empuja header hacia arriba y footer hacia abajo
          ════════════════════════════════════════════════ */}
      <div className="relative z-20 flex-1" style={{ minHeight: '30vh' }} />

      {/* ════════════════════════════════════════════════
          SECCIÓN INFERIOR — fecha + flecha scroll
          ════════════════════════════════════════════════ */}
      <footer className="relative z-20 text-center pb-8 px-6 flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-10 md:w-14 bg-white/80 shadow" />
          <p
            className="font-mont text-white font-semibold tracking-widest"
            style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.4rem)',
              textShadow: '2px 4px 10px rgba(0,0,0,0.85)',
            }}
          >
            23 • MAYO • 2026
          </p>
          <div className="h-px w-10 md:w-14 bg-white/80 shadow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="animate-bounce"
        >
          <svg
            className="w-7 h-7 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </footer>
    </section>
  );
};
