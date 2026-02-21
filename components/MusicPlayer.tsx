import React, { useState, useRef, useEffect } from 'react';
import { Disc, Pause, Play, Volume2, SkipForward } from 'lucide-react';

const songs = [
  {
    name: 'Es mi niña bonita - Vicente Fernández',
    // It's best to place the MP3 in your project's public/static folder
    // and reference it with a relative URL (e.g. `/mi-nina-bonita.mp3`).
    // Google Drive links often block streaming due to CORS and can't be
    // used reliably in the browser, which is why the audio wasn't heard.
    src: '/mi-nina-bonita.mp3',
  },
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentSongIndex];
  const [loadError, setLoadError] = useState(false);

  // Cambiar a la siguiente canción cuando termina
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
    };

    const handleError = () => {
      console.error('MusicPlayer: audio failed to load', audio.error);
      setLoadError(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSongIndex]);

  // Reproducir automáticamente cuando cambia la canción (si ya estaba sonando)
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Audio play prevented'));
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log('Audio autoplay prevented'));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current && isPlaying) {
      audioRef.current.load();
      audioRef.current.play().catch((e) => console.log('Audio play prevented'));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <audio ref={audioRef} src={currentSong.src} />
      {loadError && (
        <div className="mt-2 text-xs text-red-500">
          No se pudo cargar la música. Asegúrate de que el archivo exista en la
          carpeta pública o usa un enlace directo con CORS habilitado.
        </div>
      )

      {/* Song name & tooltip */}
      <div
        className={`bg-white text-xv-rose-dark text-xs font-mont py-2 px-4 rounded-full shadow-lg transition-all duration-500 mb-2 ${isPlaying ? 'opacity-100' : 'opacity-100'}`}
      >
        {isPlaying ? `🎺 ${currentSong.name}` : '🎺 Música 🎵'}
      </div>

      <div className="flex items-center gap-2">
        {/* Next Song Button */}
        {isPlaying && (
          <button
            onClick={nextSong}
            className="w-10 h-10 rounded-full bg-white border-2 border-xv-rose-gold shadow-lg flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
            title="Siguiente canción"
          >
            <SkipForward size={18} className="text-xv-rose-dark" />
          </button>
        )}

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="group relative w-14 h-14 rounded-full bg-white border-2 border-xv-rose-gold shadow-[0_5px_15px_rgba(234,159,140,0.4)] flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
        >
          <div
            className={`absolute inset-0 rounded-full border border-xv-rose/50 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '3s' }}
          ></div>

          {isPlaying ? (
            <Pause size={24} className="text-xv-rose-dark relative z-10" />
          ) : (
            <Play size={24} className="text-xv-rose-dark relative z-10 ml-1" />
          )}

          {/* Floating notes animation when playing */}
          {isPlaying && (
            <>
              <Volume2
                size={16}
                className="absolute -top-4 -right-2 text-xv-rose-gold animate-bounce opacity-70"
              />
              <Disc
                size={16}
                className="absolute -top-8 right-4 text-xv-pink animate-pulse opacity-50"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
