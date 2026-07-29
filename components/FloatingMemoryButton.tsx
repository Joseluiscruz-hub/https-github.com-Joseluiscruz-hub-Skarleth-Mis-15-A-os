import React from 'react';
import { Camera } from 'lucide-react';

export const FloatingMemoryButton: React.FC = () => {
  return (
    <a
      href="#gallery"
      aria-label="Ir a la galería de recuerdos"
      className="memory-fab fixed right-3 bottom-4 md:right-4 md:bottom-6 z-[55] w-12 h-12 md:w-auto md:h-auto bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white md:px-5 md:py-3 rounded-full shadow-xl text-xs md:text-sm font-mont tracking-wide hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
    >
      <Camera size={17} aria-hidden="true" />
      <span className="hidden md:inline">Ver recuerdos</span>
    </a>
  );
};
