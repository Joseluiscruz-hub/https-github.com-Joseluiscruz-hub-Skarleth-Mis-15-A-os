import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Gallery: React.FC = () => {
  // Photos with captions
  const photos = [
    { src: "https://picsum.photos/600/800?random=1", caption: "Sesión Casual" },
    { src: "https://picsum.photos/600/400?random=2", caption: "Momentos Inolvidables" },
    { src: "https://picsum.photos/600/800?random=3", caption: "Mis XV Años" },
    { src: "https://picsum.photos/600/400?random=4", caption: "Con mi Familia" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
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

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-dark mb-2">Galería</h2>
            <div className="w-16 h-1 bg-xv-rose-gold mx-auto mt-4 rounded-full"></div>
            <p className="font-mont text-gray-400 text-sm mt-4 tracking-wider uppercase">Recuerdos Inolvidables</p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((photo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className={`relative group overflow-hidden rounded-xl border-4 border-white shadow-lg cursor-pointer ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={photo.src} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-xv-rose-dark/20 group-hover:bg-xv-rose-dark/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <ZoomIn className="text-white drop-shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
              </div>
              
              {/* Grid Caption on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xv-wine text-xs texto-general text-center tracking-wider">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-xv-wine hover:text-xv-rose-dark transition-colors z-30 p-2"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={showPrev}
              className="absolute left-2 md:left-8 text-xv-wine hover:text-xv-rose-dark transition-colors z-30 p-2 bg-white/50 rounded-full shadow-sm hover:bg-white group"
              aria-label="Anterior"
            >
              <ChevronLeft size={40} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={showNext}
              className="absolute right-2 md:right-8 text-xv-wine hover:text-xv-rose-dark transition-colors z-30 p-2 bg-white/50 rounded-full shadow-sm hover:bg-white group"
              aria-label="Siguiente"
            >
              <ChevronRight size={40} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Image Container */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center z-20"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={photos[currentIndex].src} 
                alt={photos[currentIndex].caption}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border-[8px] border-white"
              />
              
              <div className="absolute -bottom-16 md:-bottom-20 left-0 right-0 text-center pointer-events-none">
                <h3 className="titulos-cursiva text-xv-rose-dark text-3xl md:text-4xl mb-1 tracking-wide">
                  {photos[currentIndex].caption}
                </h3>
                <p className="text-gray-400 font-mont text-sm">
                  {currentIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            {/* Keyboard Shortcuts Hint */}
            <div className="absolute bottom-6 w-full hidden md:flex justify-center items-center gap-8 text-gray-400 text-xs font-mont z-10 pointer-events-none select-none">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <span className="border border-gray-300 px-2 py-1 rounded bg-white">←</span>
                        <span className="border border-gray-300 px-2 py-1 rounded bg-white">→</span>
                    </div>
                    <span>Navegar</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="border border-gray-300 px-2 py-1 rounded bg-white w-12 text-center">ESC</span>
                    <span>Cerrar</span>
                </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};