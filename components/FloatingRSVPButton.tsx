import React from 'react';
import { Send } from 'lucide-react';

export const FloatingRSVPButton: React.FC = () => {
  return (
    <a
      href="#rsvp"
      className="fab-floating fixed right-3 bottom-4 md:right-4 md:bottom-6 z-[55] bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white px-4 md:px-5 py-3 rounded-full shadow-xl text-xs md:text-sm font-mont tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-2"
    >
      <Send size={15} />
      ¿Asistirás?
    </a>
  );
};
