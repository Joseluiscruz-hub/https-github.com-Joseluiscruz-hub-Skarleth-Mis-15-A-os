import React, { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const songs = [
  {
    name: 'Es Mi Niña Bonita - Vicente Fernández',
    src: `${BASE}music/Es mi niña bonita.mp3`,
  },
  {
    name: 'Tu Sangre en Mi Cuerpo - Pepe Aguilar y Ángela Aguilar',
    src: `${BASE}music/Tu Sangre en Mi Cuerpo.mp3`,
  },
];

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setLoadError(false);
    audio.muted = isMuted;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const nextSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <div className="fixed left-4 bottom-6 z-[56] flex flex-col items-start gap-2 max-w-[280px]">
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="auto"
        onError={() => setLoadError(true)}
        onEnded={handleEnded}
      />

      <div className="bg-white/95 backdrop-blur border border-xv-rose-gold/40 text-xv-rose-dark text-[11px] font-mont py-2 px-3 rounded-full shadow-lg truncate max-w-[280px]">
        {isPlaying ? `🎵 ${currentSong.name}` : '🎵 Música ambiental'}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlayback}
          className="w-12 h-12 rounded-full bg-white border-2 border-xv-rose-gold shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <Pause size={20} className="text-xv-rose-dark" />
          ) : (
            <Play size={20} className="text-xv-rose-dark ml-0.5" />
          )}
        </button>

        <button
          onClick={nextSong}
          className="w-10 h-10 rounded-full bg-white border border-xv-rose-gold/60 shadow-md flex items-center justify-center hover:scale-105 transition-transform"
          title="Siguiente canción"
        >
          <SkipForward size={16} className="text-xv-rose-dark" />
        </button>

        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white border border-xv-rose-gold/60 shadow-md flex items-center justify-center hover:scale-105 transition-transform"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? (
            <VolumeX size={16} className="text-xv-rose-dark" />
          ) : (
            <Volume2 size={16} className="text-xv-rose-dark" />
          )}
        </button>

        <div className="w-10 h-10 rounded-full bg-xv-rose-dark text-white flex items-center justify-center shadow-md">
          <Music2 size={16} />
        </div>
      </div>

      {loadError && (
        <p className="text-[10px] font-mont text-red-600 bg-white rounded-md px-2 py-1 border border-red-200">
          No se encontró el archivo de audio.
        </p>
      )}
    </div>
  );
};