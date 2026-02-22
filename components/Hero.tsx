import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-xv-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          // Keeping the horse image as requested, but the overlay will change the mood
          backgroundImage:
            "url('https://i.ibb.co/B2hLG2s4/Caballo-charro-crema-y-blanco-con-hacienda-mexicana-de-fondo.jpg')",
          backgroundPosition: 'center 20%',
        }}
      >
        {/* Soft Pink/Purple Overlay for feminine touch */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 via-amber-500/20 to-xv-bg mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-xv-bg via-transparent to-black/20" />
      </div>

      {/* Floating Rose Petals (Pink/Peach) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: Math.random() * 100 + 'vw',
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: '110vh',
              opacity: [0, 0.8, 0],
              x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
            className="absolute w-4 h-4 bg-xv-pink/80 rounded-full blur-[1px] shadow-sm"
            style={{
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', // Organic petal shape
              backgroundColor: i % 2 === 0 ? '#fcd34d' : '#f97316', // Alternating pink shades
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-4xl mx-4 md:mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative p-6 md:p-12 border-double border-4 border-white/30 rounded-full backdrop-blur-[2px]"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="texto-general text-white text-sm md:text-lg uppercase mb-2 tracking-[0.3em] text-shadow-soft"
          >
            Te invito a celebrar mis
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="relative py-4"
          >
            <h1 className="nombre-skarleth text-7xl md:text-9xl text-white drop-shadow-md z-10 relative">
              Skarleth
            </h1>
            <h1 className="nombre-skarleth text-7xl md:text-9xl text-amber-300 absolute top-0 left-0 right-0 blur-md opacity-70 z-0 transform translate-y-1">
              Skarleth
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="titulos-cursiva text-2xl md:text-5xl text-white mt-2 tracking-[0.2em] font-bold text-shadow-soft"
          >
            XV AÑOS
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white shadow-lg"></div>
              <p className="font-mont text-white text-xl md:text-2xl tracking-widest font-semibold text-shadow-soft">
                23 • MAYO • 2026
              </p>
              <div className="h-[1px] w-12 bg-white shadow-lg"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          className="w-8 h-8 text-white/80 drop-shadow-md"
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
