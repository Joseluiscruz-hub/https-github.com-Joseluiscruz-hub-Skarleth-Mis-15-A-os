import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white/60 backdrop-blur-sm border border-xv-rose-gold/30 rounded-full flex items-center justify-center relative overflow-hidden group shadow-lg">
        <div className="absolute inset-0 bg-xv-pink/20 transform scale-0 group-hover:scale-110 transition-transform duration-500 rounded-full" />
        <span className="texto-general text-2xl md:text-4xl text-xv-wine font-bold relative z-10">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="font-mont text-xs md:text-sm mt-3 tracking-widest text-xv-rose-dark/80 uppercase font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-r from-xv-bg via-white to-xv-bg relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h3 className="titulos-cursiva text-5xl text-xv-rose-gold mb-2 drop-shadow-sm">Faltan</h3>
          <div className="w-16 h-0.5 bg-xv-rose mx-auto mb-2"></div>
          <p className="texto-general text-xv-wine text-sm tracking-widest">PARA EL GRAN DÍA</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center">
          <TimeUnit value={timeLeft.days} label="Días" />
          <span className="text-2xl text-xv-rose-gold mb-8 hidden md:block titulos-cursiva">:</span>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <span className="text-2xl text-xv-rose-gold mb-8 hidden md:block titulos-cursiva">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <span className="text-2xl text-xv-rose-gold mb-8 hidden md:block titulos-cursiva">:</span>
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
};