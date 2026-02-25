import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-xv-bg via-white to-xv-pink/20"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [null, Math.random() * -200],
                  x: [null, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute w-2 h-2 bg-xv-rose-gold/40 rounded-full"
              />
            ))}
          </div>

          {/* Envelope Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-8 border-2 border-xv-rose-gold/20 rounded-3xl pointer-events-none"></div>
            <div className="absolute -inset-4 border border-xv-rose-gold/30 rounded-2xl pointer-events-none"></div>

            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 md:p-16 text-center max-w-md mx-4 border border-xv-rose-gold/20 relative overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-xv-rose-gold/30 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-xv-rose-gold/30 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-xv-rose-gold/30 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-xv-rose-gold/30 rounded-br-2xl"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles
                  className="mx-auto text-xv-rose-gold mb-4"
                  size={32}
                />

                <p className="font-cinzel text-xv-wine text-sm tracking-[0.2em] uppercase mb-4">
                  Tienes una invitación
                </p>

                <h1 className="font-cinzel text-5xl md:text-6xl text-xv-rose-dark mb-2">
                  Skarlet
                </h1>

                <p className="font-cinzel text-xv-rose-gold text-lg tracking-widest mb-6">
                  XV AÑOS
                </p>

                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-[1px] w-12 bg-xv-rose-gold/40"></div>
                  <Heart
                    className="text-xv-rose-gold"
                    size={16}
                    fill="currentColor"
                  />
                  <div className="h-[1px] w-12 bg-xv-rose-gold/40"></div>
                </div>

                <p className="font-mont text-gray-500 text-sm mb-8">
                  23 de Mayo, 2026
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white font-cinzel text-sm tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <span className="relative z-10">Abrir Invitación</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    💌
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-xv-wine to-xv-rose-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Hashtag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <p className="font-mont text-xv-rose-gold/60 text-sm tracking-wider">
              #LosXVDeSkarlet
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-white"
        />
      )}
    </AnimatePresence>
  );
};
