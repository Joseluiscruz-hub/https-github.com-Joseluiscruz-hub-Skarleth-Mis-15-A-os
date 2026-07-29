import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Parents } from './components/Parents';
import { Timeline } from './components/Timeline';
import { MensajeSkarlet } from './components/MensajeSkarlet';
import { Events } from './components/Events';
import { Vals } from './components/Vals';
import { Gallery } from './components/Gallery';
import { Hashtag } from './components/Hashtag';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { PapelPicado } from './components/PapelPicado';
import { WelcomeScreen } from './components/WelcomeScreen';
import { FloatingMemoryButton } from './components/FloatingMemoryButton';
import { LoveWall } from './components/LoveWall';
import { MemoryHighlights } from './components/MemoryHighlights';
import { invitation } from './lib/invitation';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}

      <div
        aria-hidden={showWelcome}
        inert={showWelcome}
        data-experience={invitation.status}
        className={`theme-mexican min-h-screen relative transition-opacity duration-1000 ${showWelcome ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <PapelPicado />
        <MusicPlayer />
        <FloatingMemoryButton />

        <main className="relative z-10">
          <Hero />
          <Countdown targetDate={invitation.eventDateIso} />
          <MemoryHighlights />
          <Gallery />
          <MensajeSkarlet />
          <Timeline />
          <Parents />
          <Events />
          <Vals />
          <Hashtag />
          <LoveWall />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;
