import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-xv-bg text-xv-wine/60 py-10 text-center border-t border-xv-rose/20">
      <div className="container mx-auto px-4">
        <p className="nombre-skarlet text-4xl mb-2 text-xv-rose-dark">Skarlet Guadalupe</p>
        <p className="texto-general text-xs uppercase tracking-[0.3em] mb-4 text-xv-rose-gold">Mis Quince Años</p>
        <p className="text-[10px] font-mont opacity-50">© 2026. Hecho con ❤️ para una noche de ensueño.</p>
        <p className="font-mont text-xs text-xv-rose-gold/60 mt-2">#LosXVDeSkarleth</p>
      </div>
    </footer>
  );
};