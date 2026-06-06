import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ReducedMotionContext, useReducedMotionInit } from '@/hooks/useReducedMotion';

import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/sections/HeroSection';
import WorkSection from '@/sections/WorkSection';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import SpecializingSection from '@/sections/SpecializingSection';
import TalksSection from '@/sections/TalksSection';
import Footer from '@/sections/Footer';

import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { reducedMotion, setReducedMotion } = useReducedMotionInit();
  useSmoothScroll();

  useEffect(() => {
    if (reducedMotion) {
      gsap.globalTimeline.timeScale(100);
      ScrollTrigger.getAll().forEach((st) => st.disable());
    } else {
      gsap.globalTimeline.timeScale(1);
      ScrollTrigger.getAll().forEach((st) => st.enable());
    }
  }, [reducedMotion]);

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion, setReducedMotion }}>
      <div className="relative">
        <CustomCursor />
        <GrainOverlay />
        <Navigation />
        <main>
          <HeroSection />
          <WorkSection />
          <AboutSection />
          <ExperienceSection />
          <SpecializingSection />
          <TalksSection />
        </main>
        <Footer />
      </div>
    </ReducedMotionContext.Provider>
  );
}

export default App;
