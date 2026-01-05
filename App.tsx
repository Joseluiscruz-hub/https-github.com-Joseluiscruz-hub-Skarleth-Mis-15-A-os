import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Parents } from './components/Parents';
import { Events } from './components/Events';
import { Vals } from './components/Vals';
import { DressCode } from './components/DressCode';
import { Gallery } from './components/Gallery';
import { GiftRegistry } from './components/GiftRegistry';
import { RSVP } from './components/RSVP';
import { Hashtag } from './components/Hashtag';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { PapelPicado } from './components/PapelPicado';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnterInvitation = () => {
    setShowWelcome(false);
    setShowContent(true);
  };

  return (
    <>
      {showWelcome && <WelcomeScreen onEnter={handleEnterInvitation} />}
      
      <div className={`min-h-screen relative transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <PapelPicado />
        <MusicPlayer />
        
        <main className="relative z-10">
          <Hero />
          <Countdown targetDate="2026-05-23T16:00:00" />
          <Parents />
          <Events />
          <Vals />
          <DressCode />
          <Gallery />
          <GiftRegistry />
          <RSVP />
          <Hashtag />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;