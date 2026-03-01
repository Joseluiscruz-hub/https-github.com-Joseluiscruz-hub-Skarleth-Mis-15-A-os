import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Separator: React.FC = () => (
  <motion.span
    className="countdown-separator"
    animate={{ opacity: [1, 0.25, 1], scale: [1, 0.9, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      color: '#FFD700',
      fontWeight: 'bold',
      textShadow: '0 0 15px rgba(255,215,0,0.8)',
      marginTop: '-12px',
      lineHeight: 1,
      userSelect: 'none',
    }}
  >
    :
  </motion.span>
);

const GoldenCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(formatUnit(value));
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const next = formatUnit(value);
    if (next === displayValue) return;
    setIsFlipping(true);
    const t = window.setTimeout(() => {
      setDisplayValue(next);
      setIsFlipping(false);
    }, 320);
    return () => window.clearTimeout(t);
  }, [value, displayValue]);

  return (
    <div className="countdown-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div
        whileHover={{ y: -4, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="flip-card countdown-card-box"
        style={{
          background: 'linear-gradient(145deg, rgba(255,215,0,0.15), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,215,0,0.4)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow:
            '0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 1,
            background: 'rgba(255,215,0,0.25)',
            zIndex: 10,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.span
            key={displayValue}
            className="countdown-number"
            initial={{ opacity: 0, y: isFlipping ? -10 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28 }}
            style={{
              fontWeight: 800,
              color: '#FFD700',
              textShadow:
                '0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
              fontFamily: "'Georgia', serif",
              letterSpacing: 2,
              lineHeight: 1,
              zIndex: 20,
              position: 'relative',
            }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <span
        className="countdown-label"
        style={{
          marginTop: 10,
          letterSpacing: 3,
          color: 'rgba(255,215,0,0.85)',
          textTransform: 'uppercase',
          fontWeight: 600,
          textShadow: '0 0 8px rgba(255,215,0,0.5)',
        }}
      >
        {label}
      </span>
    </div>
  );
};

const GrandDayMessage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    style={{ textAlign: 'center', padding: '20px 12px' }}
  >
    <motion.p
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        fontSize: '2rem',
        color: '#FFD700',
        textShadow: '0 0 20px gold, 0 0 40px rgba(255,215,0,0.5)',
        letterSpacing: 4,
        fontFamily: "'Georgia', serif",
        marginBottom: 8,
      }}
    >
      ✨ ¡HOY ES EL GRAN DÍA! ✨
    </motion.p>
    <p
      style={{
        fontSize: '1rem',
        color: 'rgba(255,215,0,0.85)',
        textShadow: '0 0 10px rgba(255,215,0,0.4)',
        letterSpacing: 2,
      }}
    >
      Hoy Skarlet cumple sus XV Años 💖
    </p>
  </motion.div>
);

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  const isZero =
    timeLeft.days <= 0 &&
    timeLeft.hours <= 0 &&
    timeLeft.minutes <= 0 &&
    timeLeft.seconds <= 0;

  const units = useMemo(
    () => [
      { value: timeLeft.days, label: 'Días' },
      { value: timeLeft.hours, label: 'Horas' },
      { value: timeLeft.minutes, label: 'Minutos' },
      { value: timeLeft.seconds, label: 'Segundos' },
    ],
    [timeLeft],
  );

  if (isZero) {
    return (
      <div className="countdown-container" style={{ justifyContent: 'center', padding: 20 }}>
        <GrandDayMessage />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p
        className="countdown-title"
        style={{
          fontSize: '0.8rem',
          letterSpacing: 4,
          color: 'rgba(255,215,0,0.7)',
          textTransform: 'uppercase',
          marginBottom: 20,
          textShadow: '0 0 10px rgba(255,215,0,0.4)',
        }}
      >
        Faltan
      </p>

      <div
        className="countdown-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          padding: 20,
        }}
      >
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <GoldenCard value={unit.value} label={unit.label} />
            {i < units.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};