import React, { useEffect, useMemo, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatUnit = (value: number) => value.toString().padStart(2, '0');

const getTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const FlipUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(formatUnit(value));
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const nextValue = formatUnit(value);
    if (nextValue === displayValue) {
      return;
    }

    setIsFlipping(true);
    const timer = window.setTimeout(() => {
      setDisplayValue(nextValue);
      setIsFlipping(false);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [value, displayValue]);

  return (
    <div className="flip-unit flex flex-col items-center mx-1 md:mx-3">
      <div className="relative w-20 h-24 md:w-28 md:h-32 perspective-[1000px]">
        <div className="flip-card absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#3b1f14] to-[#1a0e08] shadow-[0_12px_25px_rgba(28,11,4,0.45)] border border-amber-200/20">
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-200/25 z-10" />

          <div className="absolute top-0 left-0 right-0 h-1/2 flex items-end justify-center pb-1 text-3xl md:text-5xl font-cormorant text-amber-100 tracking-wider">
            {displayValue}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-start justify-center pt-1 text-3xl md:text-5xl font-cormorant text-amber-100 tracking-wider">
            {displayValue}
          </div>

          {isFlipping && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1/2 origin-bottom bg-gradient-to-b from-[#4a291b] to-[#1f1008] animate-flip-top flex items-end justify-center pb-1 text-3xl md:text-5xl font-cormorant text-amber-100">
                {displayValue}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 origin-top bg-gradient-to-b from-[#341c12] to-[#1b0f09] animate-flip-bottom flex items-start justify-center pt-1 text-3xl md:text-5xl font-cormorant text-amber-100">
                {formatUnit(value)}
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="flip-label font-mont text-[11px] md:text-xs mt-3 tracking-[0.2em] text-xv-wine/80 uppercase">
        {label}
      </span>
    </div>
  );
};

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const parts = useMemo(
    () => [
      { key: 'days', label: 'Dias', value: timeLeft.days },
      { key: 'hours', label: 'Horas', value: timeLeft.hours },
      { key: 'minutes', label: 'Minutos', value: timeLeft.minutes },
      { key: 'seconds', label: 'Segundos', value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <section className="countdown-section py-20 bg-[linear-gradient(180deg,#fdf2df_0%,#fff8ee_50%,#fdf2df_100%)] relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h3 className="titulos-cursiva text-5xl text-xv-rose-gold mb-2">Faltan</h3>
          <p className="texto-general text-xv-wine text-sm tracking-[0.3em] uppercase">
            PARA MI GRAN NOCHE
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-4">
          {parts.map((part, index) => (
            <React.Fragment key={part.key}>
              <FlipUnit value={part.value} label={part.label} />
              {index < parts.length - 1 && (
                <span className="hidden md:block text-2xl text-xv-wine/70 px-2">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
