import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ChevronDown, Heart } from 'lucide-react';
import { heroImage, invitation } from '../lib/invitation';

const petals = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  startX: (index * 23) % 100,
  endX: ((index * 31) % 100) + ((index % 3) - 1) * 18,
  rotate: 160 + index * 19,
  duration: 13 + (index % 5) * 1.7,
  delay: (index % 8) * 0.55,
  color: index % 2 === 0 ? '#f59e0b' : '#e11d48',
}));

const sparkles = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  x: (index * 29) % 100,
  y: (index * 47) % 100,
  delay: index * 0.35,
}));

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-xv-bg"
    >
      {/* ── Imagen principal completa ── */}
      <div
        className="hero-bg absolute inset-0 z-0 bg-cover bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      />

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_56%,transparent_0%,rgba(10,4,4,0.04)_44%,rgba(10,4,4,0.34)_100%)] pointer-events-none" />

      {/* ── Gradiente superior (protege legibilidad del título) ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-[1]"
        style={{
          height: '30vh',
          background:
            'linear-gradient(to bottom, rgba(18,5,7,0.52) 0%, rgba(35,10,12,0.18) 62%, transparent 100%)',
        }}
      />

      {/* ── Gradiente inferior (protege legibilidad de la fecha) ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-[1]"
        style={{
          height: '32vh',
          background:
            'linear-gradient(to top, rgba(12,4,4,0.68) 0%, rgba(12,4,4,0.18) 64%, transparent 100%)',
        }}
      />

      {/* ── Pétalos animados ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.span
            key={`petal-${petal.id}`}
            initial={{
              y: -40,
              x: `${petal.startX}vw`,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: '115vh',
              x: `${petal.endX}vw`,
              rotate: petal.rotate,
              opacity: [0, 0.62, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: petal.delay,
            }}
            className="absolute w-3 h-4 rounded-[55%_45%_50%_50%] blur-[0.4px]"
            style={{
              background: petal.color,
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.28)',
            }}
          />
        ))}
      </div>

      {/* ── Destellos ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {sparkles.map((sparkle) => (
          <motion.span
            key={`spark-${sparkle.id}`}
            initial={{
              opacity: 0,
              scale: 0,
              x: `${sparkle.x}vw`,
              y: `${sparkle.y}vh`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: sparkle.delay }}
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
        style={{ paddingTop: 'clamp(4rem, 8vh, 6.5rem)' }}
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="texto-general text-white uppercase tracking-[0.3em] mb-1"
          style={{
            fontSize: 'clamp(0.7rem, 2.5vw, 1.05rem)',
            textShadow:
              '1px 3px 8px rgba(0,0,0,0.68), 0 0 4px rgba(0,0,0,0.48)',
          }}
        >
          Gracias por ser parte de
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
              fontSize: 'clamp(3rem, 11vw, 5.6rem)',
              textShadow:
                '2px 4px 12px rgba(0,0,0,0.72), 0 0 22px rgba(212,175,55,0.55), 0 0 42px rgba(212,175,55,0.22)',
            }}
          >
            Skarlet
          </h1>
          {/* Capa glow desenfocada — decorativa, detrás del texto */}
          <span
            aria-hidden="true"
            className="nombre-skarleth absolute top-0 left-0 right-0 text-center leading-none text-amber-300 blur-md opacity-30 select-none pointer-events-none translate-y-1"
            style={{ fontSize: 'clamp(3rem, 11vw, 5.6rem)' }}
          >
            Skarlet
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="titulos-cursiva text-white mt-1 tracking-[0.2em]"
          style={{
            fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
            textShadow:
              '1px 3px 8px rgba(0,0,0,0.62), 0 0 4px rgba(0,0,0,0.44)',
          }}
          >
            {invitation.headline}
          </motion.h2>
      </header>

      <figure className="hero-image-frame">
        <img
          src={heroImage}
          alt="Skarlet Guadalupe en su invitación de XV años"
          className="hero-main-image"
          fetchPriority="high"
        />
      </figure>

      {/* ════════════════════════════════════════════════
          SECCIÓN INFERIOR — fecha + flecha scroll
          ════════════════════════════════════════════════ */}
      <footer className="relative z-20 text-center pb-24 md:pb-8 px-6 flex flex-col items-center gap-4">
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
            {invitation.dateShort.toUpperCase()}
          </p>
          <div className="h-px w-10 md:w-14 bg-white/80 shadow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <a
            href="#gallery"
            className="hero-action"
          >
            <Camera size={16} aria-hidden="true" />
            Ver galería
          </a>
          <a
            href="#memories"
            className="hero-action hero-action-secondary"
          >
            <Heart size={16} aria-hidden="true" />
            Mensajes
          </a>
        </motion.div>

        <motion.a
          href="#countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="animate-bounce text-white/80 hover:text-white"
          aria-label="Bajar a la invitación"
        >
          <ChevronDown size={30} strokeWidth={1.5} />
        </motion.a>
      </footer>
    </section>
  );
};
