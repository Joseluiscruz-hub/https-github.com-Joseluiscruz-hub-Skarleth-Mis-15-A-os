import React, { useState, useRef } from 'react';
import { Disc, Pause, Play, Volume2 } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <audio 
        ref={audioRef} 
        loop
        src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_5145b2b250.mp3?filename=waltz-of-the-flowers-tchaikovsky-11603.mp3" 
      />
      
      {/* Tooltip hint */}
      <div className={`bg-white text-xv-rose-dark text-xs font-mont py-2 px-4 rounded-full shadow-lg transition-opacity duration-500 mb-2 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        Música 🎵
      </div>

      <button
        onClick={togglePlay}
        className="group relative w-14 h-14 rounded-full bg-white border-2 border-xv-rose-gold shadow-[0_5px_15px_rgba(234,159,140,0.4)] flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
      >
        <div className={`absolute inset-0 rounded-full border border-xv-rose/50 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}></div>
        
        {isPlaying ? (
          <Pause size={24} className="text-xv-rose-dark relative z-10" />
        ) : (
          <Play size={24} className="text-xv-rose-dark relative z-10 ml-1" />
        )}

        {/* Floating notes animation when playing */}
        {isPlaying && (
          <>
            <Volume2 size={16} className="absolute -top-4 -right-2 text-xv-rose-gold animate-bounce opacity-70" />
            <Disc size={16} className="absolute -top-8 right-4 text-xv-pink animate-pulse opacity-50" />
          </>
        )}
      </button>
    </div>
  );
};