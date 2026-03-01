import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  onEnter: () => void;
}

/* ── Confetti burst ─────────────────────────────────── */
const fireConfetti = () => {
  const gold = ['#d4a830', '#f0c84a', '#c9952a', '#fcd34d'];
  const rose = ['#e8a0b4', '#e74c6f', '#ff8fa3', '#f9a8d4'];
  const all = [...gold, ...rose, '#fff7c2'];

  confetti({
    particleCount: 100,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    colors: all,
    gravity: 0.65,
    scalar: 1.1,
    ticks: 200,
  });
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.55 },
      colors: gold,
      ticks: 180,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.55 },
      colors: rose,
      ticks: 180,
    });
  }, 300);
  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 180,
      origin: { x: 0.5, y: 0.25 },
      colors: all,
      shapes: ['star'],
      scalar: 1.4,
      ticks: 220,
    });
  }, 700);
};

/* ── Falling light sparkle ──────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 6,
  dur: 5 + Math.random() * 5,
  drift: (Math.random() - 0.5) * 60,
}));

const SparkleParticle: React.FC<{
  x: number;
  size: number;
  delay: number;
  dur: number;
  drift: number;
}> = ({ x, size, delay, dur, drift }) => (
  <motion.div
    className="absolute pointer-events-none rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: '-5%',
      background:
        'radial-gradient(circle, #fde68a 0%, rgba(251,191,36,0.3) 60%, transparent 100%)',
      boxShadow: `0 0 ${size * 2}px ${size}px rgba(253,230,138,0.5)`,
    }}
    initial={{ opacity: 0, y: 0, x: 0 }}
    animate={{ opacity: [0, 0.9, 0.6, 0], y: ['0vh', '110vh'], x: [0, drift] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
  />
);

/* ── main component ──────────────────────────────────── */
type Phase = 'sealed' | 'opening' | 'revealed' | 'expanding' | 'exit';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<Phase>('sealed');
  const [sealGlow, setSealGlow] = useState(false);

  const handleOpen = useCallback(() => {
    if (phase !== 'sealed') return;

    /* 1. Sello brilla y se disuelve */
    setSealGlow(true);
    setTimeout(() => setPhase('opening'), 400);

    /* 2. Solapa abre → tarjeta sube */
    setTimeout(() => {
      setPhase('revealed');
      fireConfetti();
    }, 1200);

    /* 3. Tarjeta se expande a pantalla completa */
    setTimeout(() => {
      setPhase('expanding');
    }, 3800);

    /* 4. Fade out total → página real */
    setTimeout(() => {
      setPhase('exit');
    }, 5200);

    setTimeout(() => {
      onEnter();
    }, 6000);
  }, [phase, onEnter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleOpen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleOpen]);

  const isAfter = (...phases: Phase[]) => phases.includes(phase);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="welcome-root"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(253,216,160,0.22) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(220,100,120,0.18) 0%, transparent 55%), linear-gradient(160deg, #1a0e1f 0%, #2d1230 40%, #1a0a10 100%)',
          }}
        >
          {/* ── falling sparkles ── */}
          {PARTICLES.map((p) => (
            <SparkleParticle
              key={p.id}
              x={p.x}
              size={p.size}
              delay={p.delay}
              dur={p.dur}
              drift={p.drift}
            />
          ))}

          {/* ── pearl shimmer overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, transparent 2px, transparent 8px, rgba(255,255,255,0.04) 10px)',
            }}
          />

          {/* ══════════ ENVELOPE WRAPPER ══════════ */}
          <motion.div
            className="relative select-none"
            style={{ perspective: 1400 }}
            onClick={handleOpen}
            whileHover={phase === 'sealed' ? { scale: 1.04, y: -4 } : {}}
            whileTap={phase === 'sealed' ? { scale: 0.97 } : {}}
            animate={
              isAfter('revealed', 'expanding')
                ? {
                    y: 80,
                    opacity: 0,
                    scale: 0.88,
                    transition: { duration: 0.9, ease: 'easeInOut' },
                  }
                : {}
            }
          >
            {/* ── Envelope body ── */}
            <div
              className="relative"
              style={{ width: 'min(340px, 88vw)', height: 'min(240px, 60vw)' }}
            >
              {/* Back panel – pearl paper */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  background:
                    'linear-gradient(145deg, #f5efe8 0%, #ede2d4 40%, #e8d8c8 100%)',
                  border: '2px solid rgba(201,149,42,0.55)',
                  boxShadow:
                    '0 24px 70px rgba(0,0,0,0.55), 0 0 50px rgba(201,149,42,0.1), inset 0 2px 0 rgba(255,255,255,0.7)',
                }}
              >
                {/* pearl lustre */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.55) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(255,220,180,0.3) 0%, transparent 50%)',
                  }}
                />
                {/* V-fold lines – bottom triangle */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 340 240"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="240"
                    x2="170"
                    y2="120"
                    stroke="rgba(201,149,42,0.2)"
                    strokeWidth="1"
                  />
                  <line
                    x1="340"
                    y1="240"
                    x2="170"
                    y2="120"
                    stroke="rgba(201,149,42,0.2)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* ── Inner card (slides up) ── */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 rounded-xl overflow-hidden flex flex-col items-center justify-center"
                style={{
                  width: 'calc(100% - 28px)',
                  height: '75%',
                  top: 12,
                  background:
                    'linear-gradient(160deg, #fdf6ee 0%, #f3e6d0 100%)',
                  border: '1.5px solid rgba(201,149,42,0.5)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  zIndex: 2,
                }}
                initial={{ y: 0, opacity: 0.6 }}
                animate={
                  isAfter('revealed', 'expanding', 'exit')
                    ? {
                        y: '-55%',
                        opacity: 1,
                        scale: 1.08,
                        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      }
                    : isAfter('opening')
                      ? {
                          y: '-12%',
                          opacity: 0.75,
                          transition: { duration: 0.6 },
                        }
                      : {}
                }
              >
                <p
                  className="font-mont uppercase text-[7px] tracking-[0.55em] mb-1"
                  style={{ color: 'rgba(120,80,30,0.55)' }}
                >
                  Te invito a celebrar
                </p>
                <p
                  className="titulos-cursiva text-3xl sm:text-4xl"
                  style={{
                    color: '#9a6a1a',
                    textShadow: '0 1px 6px rgba(201,149,42,0.35)',
                  }}
                >
                  Mis XV Años
                </p>
                <p
                  className="font-mont text-2xl sm:text-3xl mt-1 tracking-widest"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#c49a2a',
                    letterSpacing: '0.25em',
                  }}
                >
                  SKARLET
                </p>
                <div
                  className="w-16 mt-2"
                  style={{
                    height: 1,
                    background:
                      'linear-gradient(90deg, transparent, rgba(201,149,42,0.6), transparent)',
                  }}
                />
                <p
                  className="font-mont text-[8px] tracking-[0.35em] mt-2"
                  style={{ color: 'rgba(120,80,30,0.5)' }}
                >
                  23 · MAYO · 2026
                </p>

                {/* small floral ornament */}
                <motion.p
                  className="mt-2 text-base"
                  style={{ color: 'rgba(201,149,42,0.5)' }}
                  initial={{ opacity: 0 }}
                  animate={
                    isAfter('revealed', 'expanding')
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ delay: 0.8 }}
                >
                  ✦ ❀ ✦
                </motion.p>
              </motion.div>

              {/* Bottom front flap (hides card bottom) */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b-xl"
                style={{
                  height: '56%',
                  background:
                    'linear-gradient(170deg, #f0e6d8 0%, #e8d5c0 100%)',
                  clipPath:
                    'polygon(0 45%, 50% 0, 100% 45%, 100% 100%, 0 100%)',
                  zIndex: 4,
                  borderTop: '1px solid rgba(201,149,42,0.15)',
                  boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.06)',
                }}
              />

              {/* ── FLAP (top / back panel folds open) ── */}
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '56%',
                  transformOrigin: 'top center',
                  zIndex: isAfter('opening', 'revealed', 'expanding', 'exit')
                    ? 3
                    : 5,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ rotateX: 0 }}
                animate={
                  isAfter('opening', 'revealed', 'expanding', 'exit')
                    ? {
                        rotateX: -185,
                        transition: {
                          duration: 0.75,
                          ease: [0.33, 1, 0.68, 1],
                        },
                      }
                    : { rotateX: 0 }
                }
              >
                {/* front face of flap */}
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background:
                      'linear-gradient(170deg, #f5ede0 0%, #e8d5c0 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    backfaceVisibility: 'hidden',
                  }}
                />
                {/* back face of flap */}
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background:
                      'linear-gradient(170deg, #e0d0be 0%, #d4c0a8 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transform: 'rotateX(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                />

                {/* ── WAX SEAL ── */}
                <AnimatePresence>
                  {!isAfter('opening', 'revealed', 'expanding', 'exit') && (
                    <motion.div
                      key="wax-seal"
                      className="absolute left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        width: 52,
                        height: 52,
                        bottom: '-8px',
                        background: sealGlow
                          ? 'radial-gradient(circle, #ff8fa3 0%, #e0102a 40%, #8a0a14 100%)'
                          : 'radial-gradient(circle, #d4203a 0%, #9a0a1a 60%, #6a0610 100%)',
                        border: '2.5px solid rgba(201,149,42,0.8)',
                        boxShadow: sealGlow
                          ? '0 0 30px 12px rgba(255,100,130,0.7), 0 4px 20px rgba(176,16,32,0.6)'
                          : '0 4px 20px rgba(176,16,32,0.55), inset 0 -2px 6px rgba(0,0,0,0.3)',
                        zIndex: 10,
                        transition: 'box-shadow 0.3s, background 0.3s',
                      }}
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{
                        scale: 1.6,
                        opacity: 0,
                        transition: { duration: 0.45, ease: 'easeOut' },
                      }}
                      animate={sealGlow ? {} : { scale: [1, 1.07, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span
                        style={{
                          fontFamily: "'Pinyon Script', cursive",
                          fontSize: 24,
                          color: '#fde68a',
                          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                          lineHeight: 1,
                        }}
                      >
                        S
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* gold foil border */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none z-[6]"
                style={{
                  border: '1px solid rgba(201,149,42,0.25)',
                  boxShadow: 'inset 0 0 18px rgba(201,149,42,0.07)',
                }}
              />
            </div>
          </motion.div>

          {/* ══════════ EXPANDING CARD OVERLAY ══════════ */}
          <AnimatePresence>
            {isAfter('expanding', 'exit') && (
              <motion.div
                key="card-expand"
                className="fixed inset-0 z-[210] flex flex-col items-center justify-center overflow-hidden"
                initial={{ scale: 0.18, borderRadius: 24, opacity: 0.7 }}
                animate={{ scale: 1, borderRadius: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    'linear-gradient(160deg, #fdf6ee 0%, #f3e6d0 100%)',
                }}
              >
                {/* Main photo */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{
                    backgroundImage: "url('/images/skarlet-portada.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(80,20,10,0.2) 40%, rgba(20,5,5,0.7) 100%)',
                  }}
                />

                {/* Content on expand */}
                <motion.div
                  className="relative z-10 flex flex-col items-center text-center px-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <p
                    className="font-mont uppercase tracking-[0.55em] text-[9px] mb-3"
                    style={{ color: 'rgba(253,230,138,0.75)' }}
                  >
                    Con gran alegría te invito a celebrar
                  </p>
                  <p
                    className="titulos-cursiva text-5xl sm:text-6xl"
                    style={{
                      color: '#fde68a',
                      textShadow: '0 2px 20px rgba(201,149,42,0.6)',
                    }}
                  >
                    Mis XV Años
                  </p>
                  <p
                    className="text-4xl sm:text-5xl mt-2 tracking-[0.3em]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: '#fcd34d',
                      textShadow: '0 2px 16px rgba(201,149,42,0.5)',
                    }}
                  >
                    SKARLET
                  </p>
                  <div
                    className="w-32 my-4"
                    style={{
                      height: 1,
                      background:
                        'linear-gradient(90deg, transparent, rgba(253,230,138,0.7), transparent)',
                    }}
                  />
                  <p
                    className="font-mont uppercase tracking-[0.4em] text-[10px]"
                    style={{ color: 'rgba(253,230,138,0.6)' }}
                  >
                    23 · Mayo · 2026
                  </p>
                  <motion.p
                    className="mt-4 text-xl"
                    style={{ color: 'rgba(253,230,138,0.5)' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✦ ❀ ✦
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════ "TOCA PARA ABRIR" BELOW ENVELOPE ══════════ */}
          <motion.div
            className="relative z-10 mt-8 text-center pointer-events-none"
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === 'sealed'
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -10, transition: { duration: 0.4 } }
            }
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <motion.p
              className="font-mont uppercase text-[11px] tracking-[0.55em]"
              style={{ color: 'rgba(253,230,138,0.6)' }}
              animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              Toca para abrir
            </motion.p>
            <motion.div
              className="mt-3 mx-auto w-5 h-5"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(253,230,138,0.45)"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>

          {/* subtitle after revealed */}
          <motion.p
            className="relative z-10 font-mont uppercase text-[9px] tracking-[0.55em] mt-5"
            style={{ color: 'rgba(253,230,138,0.5)' }}
            initial={{ opacity: 0 }}
            animate={phase === 'revealed' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.9 }}
          >
            Una celebración única te espera ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
