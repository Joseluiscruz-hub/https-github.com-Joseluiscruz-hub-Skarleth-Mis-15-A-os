import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { src: 'https://picsum.photos/700/1050?random=21', caption: 'Sesión Casual' },
  { src: 'https://picsum.photos/900/650?random=22', caption: 'Momentos Inolvidables' },
  { src: 'https://picsum.photos/700/900?random=23', caption: 'Mi Sonrisa' },
  { src: 'https://picsum.photos/850/1200?random=24', caption: 'Con Mi Familia' },
  { src: 'https://picsum.photos/900/760?random=25', caption: 'Detalles de Ensueño' },
  { src: 'https://picsum.photos/700/980?random=26', caption: 'Cuenta Regresiva' },
  { src: 'https://picsum.photos/800/1200?random=27', caption: 'Princesa por un Día' },
];

export const Gallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showNext, showPrev]);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchStartX.current === null) {
      return;
    }
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) showNext();
    if (delta > 50) showPrev();
    touchStartX.current = null;
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-dark mb-2">Galería</h2>
          <div className="w-16 h-1 bg-xv-rose-gold mx-auto mt-4 rounded-full" />
          <p className="font-mont text-gray-400 text-sm mt-4 tracking-wider uppercase">Recuerdos Inolvidables</p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              onClick={() => openLightbox(index)}
              className="group relative mb-4 w-full overflow-hidden rounded-2xl border-4 border-white shadow-lg break-inside-avoid"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Expand size={28} className="text-white" />
              </div>
              <div className="absolute left-3 right-3 bottom-3 rounded-xl bg-white/90 backdrop-blur-sm py-2 px-3 translate-y-16 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xv-wine text-xs texto-general text-center tracking-wider">{photo.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors z-30 p-2"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 md:left-8 text-white transition-colors z-30 p-2"
              aria-label="Anterior"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-2 md:right-8 text-white transition-colors z-30 p-2"
              aria-label="Siguiente"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center z-20"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border-[6px] border-white"
              />

              <div className="absolute -bottom-14 left-0 right-0 text-center pointer-events-none">
                <h3 className="titulos-cursiva text-white text-3xl mb-1 tracking-wide">{photos[currentIndex].caption}</h3>
                <p className="text-gray-300 font-mont text-xs">Desliza para cambiar</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
