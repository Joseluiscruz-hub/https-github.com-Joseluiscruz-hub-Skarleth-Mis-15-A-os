import React, { useState, useRef, useEffect } from 'react';
import { Disc, Pause, Play, Volume2, SkipForward } from 'lucide-react';

const songs = [
  // agrega aquí tus canciones favoritas del evento (se recomienda colocarlas
  // en la carpeta public/ y referenciarlas con "/nombre.mp3" para evitar
  // problemas de CORS y rangos 416 como los que viste antes).
  {
    name: 'El Vals (Papá & Yo)',
    src: '/el-valz.mp3', // reemplaza con la ruta real
  },
  {
    name: 'Quinceañera (Marco Flores)',
    src: '/quinceanera.mp3',
  },
  {
    name: 'Viva la Quinceañera',
    src: '/viva-la-quince.mp3',
  },
  {
    name: 'Canción 1',
    // Enlaces proporcionados por el usuario. Si no se reproducen por CORS, 
    // descarga los archivos y ponlos en la carpeta `public/`.
    src: 'https://image2url.com/r2/default/files/1771800814308-317b033a-3d3d-47e7-8e68-b9b086970aaf.mp3',
  },
  {
    name: 'Canción 2',
    src: 'https://image2url.com/r2/default/files/1771800873547-af7c9453-bd24-4b33-acf7-2c4b6f483db3.mp3',
  },
  {
    name: 'Jarabe Tapatío - Mariachi',
    // Enlace de prueba desde Archive.org; este host permite streaming directo.
    src: 'https://archive.org/download/musicamexicana-soloparausted_201910/18%20El%20Sinaloense%20-%20Mariachi%20Juvenil%20Tecatitl%C3%A1n.mp3',
  },
  {
    name: 'La Culebra - Mariachi',
    src: 'https://archive.org/download/musicamexicana-soloparausted_201910/19%20La%20Culebra%20-%20Mariachi%20Juvenil%20Tecatitl%C3%A1n.mp3',
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
  }, [currentSongIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setLoadError(false); // Reset error al intentar play
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
    // El useEffect se encargará de reproducir la nueva canción
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <audio ref={audioRef} src={currentSong.src} />
      {loadError && (
        <div className="mt-2 text-[10px] text-red-500 bg-white p-1 rounded shadow">
          Error al cargar audio.
        </div>
      )}

      <div className="bg-white text-xv-rose-dark text-xs font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-500 mb-2 border border-xv-rose-gold">
        {isPlaying ? `🎺 ${currentSong.name}` : '🎺 Música de la Fiesta 🎵'}
      </div>

      <div className="flex items-center gap-2">
        {isPlaying && (
          <button
            onClick={nextSong}
            className="w-10 h-10 rounded-full bg-white border-2 border-xv-rose-gold shadow-lg flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
            title="Siguiente"
          >
            <SkipForward size={18} className="text-xv-rose-dark" />
          </button>
        )}

        <button
          onClick={togglePlay}
          className="group relative w-14 h-14 rounded-full bg-white border-2 border-xv-rose-gold shadow-[0_5px_15px_rgba(234,159,140,0.4)] flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
        >
          <div
            className={`absolute inset-0 rounded-full border border-xv-rose-gold/50 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '3s' }}
          ></div>

          {isPlaying ? (
            <Pause size={24} className="text-xv-rose-dark relative z-10" />
          ) : (
            <Play size={24} className="text-xv-rose-dark relative z-10 ml-1" />
          )}

          {isPlaying && (
            <>
              <Volume2
                size={16}
                className="absolute -top-4 -right-2 text-xv-rose-gold animate-bounce opacity-70"
              />
              <Disc
                size={16}
                className="absolute -top-8 right-4 text-xv-rose-gold animate-pulse opacity-50"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
