import React from 'react';

const Flag: React.FC<{ color: string; delay: string }> = ({ color, delay }) => (
  <div 
    className="w-12 h-16 md:w-20 md:h-28 relative origin-top animate-sway"
    style={{ animationDelay: delay }}
  >
    {/* String */}
    <div className="absolute -top-2 left-0 right-0 h-1 bg-white/80 -z-10 shadow-sm"></div>
    
    {/* Flag Body */}
    <div 
      className={`w-full h-full ${color} shadow-md relative opacity-90`}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)',
        maskImage: 'radial-gradient(circle at 50% 50%, transparent 10%, black 10%)',
        maskSize: '100% 100%',
        WebkitMaskImage: 'radial-gradient(circle at 50% 40%, transparent 15%, black 15%), radial-gradient(circle at 20% 70%, transparent 8%, black 8%), radial-gradient(circle at 80% 70%, transparent 8%, black 8%)'
      }}
    >
      <div className="absolute inset-2 border border-white/40 rounded-sm"></div>
    </div>
  </div>
);

export const PapelPicado: React.FC = () => {
  // Feminine pastel palette
  const flags = [
    { color: 'bg-xv-rose-dark', delay: '0s' },
    { color: 'bg-white', delay: '0.2s' },
    { color: 'bg-xv-pink', delay: '0.4s' },
    { color: 'bg-purple-300', delay: '0.6s' },
    { color: 'bg-xv-rose-gold', delay: '0.8s' },
    { color: 'bg-xv-rose-dark', delay: '0.1s' },
    { color: 'bg-white', delay: '0.3s' },
    { color: 'bg-xv-pink', delay: '0.5s' },
    { color: 'bg-purple-300', delay: '0.7s' },
    { color: 'bg-xv-rose-gold', delay: '0.9s' },
    { color: 'bg-xv-rose-dark', delay: '0s' },
    { color: 'bg-white', delay: '0.2s' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-40 pointer-events-none flex justify-between px-2 -mt-2 overflow-hidden">
       {/* Use a simple repetition logic for screen width coverage */}
       {[...flags, ...flags].map((flag, idx) => (
         <Flag key={idx} color={flag.color} delay={flag.delay} />
       ))}
    </div>
  );
};