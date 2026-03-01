import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-xv-bg"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/generated-image (1).png')",
          backgroundPosition: 'center 22%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-amber-900/25 to-[#fef3e2]/95" />
      </div>

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

      <div className="relative z-20 w-full max-w-4xl mx-4 md:mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3 }}
          className="relative p-6 md:p-12 border-double border-4 border-white/30 rounded-[3rem] backdrop-blur-[2px] bg-black/30"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.7 }}
            className="texto-general text-white text-sm md:text-lg uppercase mb-2 tracking-[0.3em]"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
            }}
          >
            Te invito a celebrar mis
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="relative py-4"
          >
            <h1
              className="nombre-skarleth text-7xl md:text-9xl text-white relative z-10"
              style={{
                textShadow:
                  '0 0 30px rgba(251,191,36,0.9), 0 0 60px rgba(251,191,36,0.5), 0 3px 12px rgba(0,0,0,0.95)',
              }}
            >
              Skarlet
            </h1>
            <h1 className="nombre-skarlet text-7xl md:text-9xl text-amber-300 absolute top-0 left-0 right-0 blur-md opacity-65 z-0 translate-y-1">
              Skarlet
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="titulos-cursiva text-2xl md:text-5xl text-white mt-2 tracking-[0.2em]"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
            }}
          >
            XV AÑOS
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white shadow-lg" />
              <p
                className="font-mont text-white text-xl md:text-2xl tracking-widest font-semibold"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                23 • MAYO • 2026
              </p>
              <div className="h-[1px] w-12 bg-white shadow-lg" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          className="w-8 h-8 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};
