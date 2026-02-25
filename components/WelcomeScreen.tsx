import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const letters = 'SKARLET'.split('');

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  useEffect(() => {
    const timer = window.setTimeout(onEnter, 4200);
    return () => window.clearTimeout(timer);
  }, [onEnter]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 4.2, times: [0, 0.78, 1] }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.24),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(194,65,12,0.30),transparent_45%),linear-gradient(145deg,#0f0804,#2f130b,#150904)]"
      >
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1, 1.08], opacity: [0, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.35, 1] }}
          className="relative text-center px-4"
        >
          <p className="font-mont uppercase text-[10px] md:text-xs tracking-[0.6em] text-amber-100/70 mb-6">
            Invitacion Exclusiva
          </p>

          <h1 className="nombre-skarleth text-5xl sm:text-6xl md:text-8xl tracking-[0.2em] text-amber-100 flex justify-center gap-1 md:gap-2">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: index * 0.14 }}
                className="gold-shimmer"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="titulos-cursiva text-amber-200/90 mt-6 text-3xl"
          >
            XV AÑOS
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
