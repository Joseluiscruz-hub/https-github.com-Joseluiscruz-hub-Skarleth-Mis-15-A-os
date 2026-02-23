import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Parents } from './components/Parents';
import { Timeline } from './components/Timeline';
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
import { FloatingRSVPButton } from './components/FloatingRSVPButton';
import { LoveWall } from './components/LoveWall';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}

      <div
        className={`theme-mexican min-h-screen relative transition-opacity duration-1000 ${showWelcome ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <PapelPicado />
        <MusicPlayer />
        <FloatingRSVPButton />

        <main className="relative z-10">
          <Hero />
          <Countdown targetDate="2026-05-23T16:00:00" />
          <Parents />
          <Timeline />
          <Events />
          <Vals />
          <DressCode />
          <Gallery />
          <GiftRegistry />
          <RSVP />
          <Hashtag />
          <LoveWall />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
