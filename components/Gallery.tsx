import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const base = import.meta.env.BASE_URL + 'images/';

const backgroundPhoto = base + '1771824907894(1).png';

const photos = [
  { src: base + '20131221_224851.jpg', caption: 'Recuerdo 1' },
  { src: base + '20131221_224857.jpg', caption: 'Recuerdo 2' },
  { src: base + '20140517_174622.jpg', caption: 'Recuerdo 3' },
  { src: base + '20141101_173020.jpg', caption: 'Recuerdo 4' },
  { src: base + '20150218_125919-1.jpg', caption: 'Recuerdo 5' },
  { src: base + '20160325_143755.jpg', caption: 'Recuerdo 6' },
  { src: base + '20171101_182213.jpg', caption: 'Recuerdo 7' },
  { src: base + '20181223_153309.jpg', caption: 'Recuerdo 8' },
  { src: base + 'Foto0037.jpg', caption: 'Recuerdo 9' },
  { src: base + 'Foto0886.jpg', caption: 'Recuerdo 10' },
  { src: base + 'IMG_20200325_182037_1.jpg', caption: 'Recuerdo 12' },
  { src: base + 'QVZobTFTY19peV83R000cS1FaEpaSUVV.jpeg', caption: 'Recuerdo 13' },
  { src: base + 'QVZqX3Z2eDQ4WGVYYjVBLXFJOENDNGxN.jpeg', caption: 'Recuerdo 15' },
  { src: base + encodeURI('NombreArchivo16.jpg'), caption: 'Recuerdo 16' },  // ← rellena el filename
  { src: base + 'NombreArchivo18.jpg', caption: 'Recuerdo 18' },              // ← rellena el filename
  { src: base + encodeURI('WhatsApp Image 2026-02-22 at 9.39.58 PM.jpeg'), caption: 'Recuerdo 19.1' },
  { src: base + encodeURI('WhatsApp Image 2026-02-22 at 9.42.08 PM.jpeg'), caption: 'Recuerdo 19.2' },
  { src: base + 'NombreArchivo20.jpg', caption: 'Recuerdo 20' },              // ← rellena el filename
  { src: base + 'IMG-20260222-WA0038.jpg', caption: 'Recuerdo 21' },
  { src: base + 'IMG-20260222-WA0039.jpg', caption: 'Recuerdo 22' },
  { src: base + 'IMG-20260222-WA0041.jpg', caption: 'Recuerdo 23' },
  { src: base + 'foto1.jpg', caption: 'Recuerdo 24' },
  { src: base + 'foto2.jpg', caption: 'Recuerdo 25' },
  { src: base + 'foto3.jpg', caption: 'Recuerdo 26' },
  { src: base + 'foto4.jpg', caption: 'Recuerdo 27' },
  { src: base + '1771824780683.png', caption: 'Recuerdo 28' },
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
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) showNext();
    if (delta > 50) showPrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="gallery-section py-20 bg-white relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundPhoto})` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-dark mb-2">
            Galería
          </h2>
          <div className="w-16 h-1 bg-xv-rose-gold mx-auto mt-4 rounded-full" />
          <p className="font-mont text-gray-400 text-sm mt-4 tracking-wider uppercase">
            Recuerdos Inolvidables
          </p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.caption}
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
                <p className="text-xv-wine text-xs texto-general text-center tracking-wider">
                  {photo.caption}
                </p>
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
                <h3 className="titulos-cursiva text-white text-3xl mb-1 tracking-wide">
                  {photos[currentIndex].caption}
                </h3>
                <p className="text-gray-300 font-mont text-xs">
                  Desliza para cambiar
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};