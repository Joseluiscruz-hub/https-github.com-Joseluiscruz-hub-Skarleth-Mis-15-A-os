import React from 'react';

export const FloatingRSVPButton: React.FC = () => {
  return (
    <a
      href="#rsvp"
      className="fixed right-4 bottom-6 z-[55] bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white px-5 py-3 rounded-full shadow-xl text-xs md:text-sm font-mont tracking-wide hover:scale-105 transition-transform"
    >
      ¿Asistirás? ✉️
    </a>
  );
};
