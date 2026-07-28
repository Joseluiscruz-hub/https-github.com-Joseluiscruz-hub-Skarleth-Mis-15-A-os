import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';
import { invitation } from '../lib/invitation';

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

const getEventState = (targetDate: string) => {
  const now = Date.now();
  const start = +new Date(targetDate);
  const celebrationWindowMs = 18 * 60 * 60 * 1000;

  if (now < start) return 'upcoming';
  if (now <= start + celebrationWindowMs) return 'today';
  return 'past';
};

const Separator: React.FC = () => (
  <motion.span
    className="countdown-separator"
    animate={{ opacity: [1, 0.35, 1], scale: [1, 0.92, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
  >
    :
  </motion.span>
);

const GoldenCard: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => {
  const [displayValue, setDisplayValue] = useState(formatUnit(value));
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const next = formatUnit(value);
    if (next === displayValue) return;

    setIsFlipping(true);
    const timer = window.setTimeout(() => {
      setDisplayValue(next);
      setIsFlipping(false);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [displayValue, value]);

  return (
    <div className="countdown-item">
      <motion.div
        whileHover={{ y: -4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="flip-card countdown-card-box"
      >
        <span className="countdown-card-line" />
        <AnimatePresence mode="wait">
          <motion.span
            key={displayValue}
            className="countdown-number"
            initial={{ opacity: 0, y: isFlipping ? -10 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28 }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="countdown-label">{label}</span>
    </div>
  );
};

const EventMessage: React.FC<{ state: 'today' | 'past' }> = ({ state }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="text-center px-4 py-5"
  >
    {state === 'today' ? (
      <motion.p
        animate={{ opacity: [1, 0.55, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="font-cormorant text-4xl md:text-5xl text-xv-gold"
      >
        Hoy es el gran día
      </motion.p>
    ) : (
      <p className="font-cormorant text-4xl md:text-5xl text-xv-gold">
        Gracias por acompañarme
      </p>
    )}
    <p className="mt-3 font-mont text-sm md:text-base uppercase tracking-[0.2em] text-xv-muted">
      {state === 'today'
        ? 'Hoy Skarlet celebra sus XV Años'
        : `${invitation.dateDisplay} quedó guardado como un recuerdo especial.`}
    </p>
  </motion.div>
);

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetDate]);

  const eventState = getEventState(targetDate);
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

  return (
    <section
      id="countdown"
      className="countdown-section py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="countdown-shell max-w-4xl mx-auto text-center"
        >
          <CalendarHeart className="mx-auto text-xv-gold mb-3" size={34} />

          {isZero ? (
            <EventMessage state={eventState === 'past' ? 'past' : 'today'} />
          ) : (
            <>
              <p className="countdown-title">Faltan</p>
              <div className="countdown-container">
                {units.map((unit, index) => (
                  <React.Fragment key={unit.label}>
                    <GoldenCard value={unit.value} label={unit.label} />
                    {index < units.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
              <p className="font-mont text-xs md:text-sm uppercase tracking-[0.22em] text-xv-muted mt-3">
                {invitation.dateDisplay} · Ceremonia {invitation.ceremony.time}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
