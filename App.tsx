import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Events } from './components/Events';
import { RSVP } from './components/RSVP';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { PapelPicado } from './components/PapelPicado';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  // Simple entrance animation trigger
  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className={`min-h-screen relative transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <PapelPicado />
      <MusicPlayer />
      
      <main className="relative z-10">
        <Hero />
        <Countdown targetDate="2025-04-05T16:00:00" />
        <Events />
        <Gallery />
        <RSVP />
      </main>

      <Footer />
    </div>
  );
};

export default App;