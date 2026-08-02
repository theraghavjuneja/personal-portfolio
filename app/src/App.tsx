import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ReducedMotionContext, useReducedMotionInit } from '@/hooks/useReducedMotion';
// import NewSection from './sections/WorkSection3';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import SpecializingSection from '@/sections/SpecializingSection';
import TalksSection from '@/sections/TalksSection';
import Footer from '@/sections/Footer';

import CustomCursor from '@/components/CustomCursor';
import CaseStudies from './sections/CaseStudies';
import Summary from './sections/Summary';
import { Routes, Route } from 'react-router';
import CaseStudyPage from '@/pages/CaseStudyPage';

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
          <Routes>
            <Route path="/" element={
              <>
                <AboutSection />
                <Summary />
                <CaseStudies />
                <ExperienceSection />
                <SpecializingSection />
                <TalksSection />
                <Footer />
              </>
            } />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
          </Routes>
        </main>
      </div>
    </ReducedMotionContext.Provider>
  );
}

export default App;
