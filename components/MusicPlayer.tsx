import React, { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const VALS_TRACK = {
  name: 'Mi Princesa - David Bisbal',
  src: `${import.meta.env.BASE_URL}music/mi-princesa-david-bisbal.mp3`,
};

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [loadError, setLoadError] = useState(false);

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

  return (
    <div className="fixed left-4 bottom-6 z-[56] flex flex-col items-start gap-2 max-w-[240px]">
      <audio
        ref={audioRef}
        src={VALS_TRACK.src}
        loop
        preload="auto"
        onError={() => setLoadError(true)}
      />

      <div className="bg-white/95 backdrop-blur border border-xv-rose-gold/40 text-xv-rose-dark text-[11px] font-mont py-2 px-3 rounded-full shadow-lg">
        {isPlaying ? `🎵 ${VALS_TRACK.name}` : '🎵 Vals ambiental'}
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
          No se encontró el archivo del vals en <code>/public/music/mi-princesa-david-bisbal.mp3</code>.
        </p>
      )}
    </div>
  );
};
