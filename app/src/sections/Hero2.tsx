import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PillButton from '@/components/PillButton';
import ScriptWord from '@/components/ScriptWord';
import MorphingShape from '@/components/MorphingShape';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const illustrationRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);
    const { reducedMotion } = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            // Animate headline words
            const words = headlineRef.current?.querySelectorAll('.word');
            if (words) {
                gsap.from(words, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    delay: 0.2,
                });
            }

            // Animate illustration
            gsap.from(illustrationRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5,
            });

            // Animate decorative shapes
            gsap.from(shapesRef.current?.children || [], {
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                delay: 0.8,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [reducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-warm-cream flex items-center pt-[72px] overflow-hidden"
        >
            {/* Decorative Shapes */}
            <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
                <MorphingShape
                    type="spiral"
                    color="#3A7056"
                    size={120}
                    className="absolute top-[15%] left-[45%]"
                />
                <MorphingShape
                    type="starburst"
                    color="#C8563B"
                    size={80}
                    className="absolute top-[60%] left-[8%]"
                />
                <MorphingShape
                    type="blob"
                    color="#E2A74F"
                    size={100}
                    className="absolute bottom-[15%] right-[12%]"
                />
            </div>

            <div className="container-main w-full py-16 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    {/* Left Column - Text */}
                    <div ref={headlineRef} className="lg:w-[55%] relative z-10">
                        <h1 className="font-display font-extrabold text-deep-charcoal leading-[0.95] tracking-[-0.03em]" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                            <span className="word inline-block">Hi,</span>{' '}
                            <span className="word inline-block">I'm</span>{' '}
                            <span className="word inline-block">Raghav</span>{' '}
                            <span className="word inline-block">Juneja.</span>
                        </h1>

                        <h2 className="mt-6 font-display font-bold text-deep-charcoal leading-[1.0] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                            <span className="word inline-block">I</span>{' '}
                            <span className="word inline-block">construct</span>{' '}
                            <span className="word inline-block"><ScriptWord>impactful</ScriptWord></span>{' '}
                            <span className="word inline-block"><ScriptWord>digital products,</ScriptWord></span>{' '}
                            <span className="word inline-block">build</span>{' '}
                            <span className="word inline-block">and</span>{' '}
                            <span className="word inline-block">grow</span>{' '}
                            <span className="word inline-block">design</span>{' '}
                            <span className="word inline-block">cultures,</span>{' '}
                            <span className="word inline-block">and</span>{' '}
                            <span className="word inline-block">solve</span>{' '}
                            <span className="word inline-block">complex</span>{' '}
                            <span className="word inline-block">user</span>{' '}
                            <span className="word inline-block">problems.</span>
                        </h2>

                        <div className="word mt-10">
                            <PillButton href="#work">View Work</PillButton>
                        </div>
                    </div>

                    {/* Right Column - Illustration */}
                    <div
                        ref={illustrationRef}
                        className="lg:w-[45%] relative flex justify-center items-center mt-12 lg:mt-0"
                    >
                        {/* Main Illustration */}
                        <img
                            src="/images/hero-illustration.png"
                            alt="Raghav sketching on iPad Pro at drafting desk"
                            className="w-[130%] lg:w-[150%] max-w-none animate-float lg:translate-x-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
