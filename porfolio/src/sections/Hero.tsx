import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCursorEffect } from '../hooks/useCursorEffect';
import { gsap } from 'gsap';

// Lazy-load Three.js canvas to avoid blocking initial paint
const HeroCanvas = lazy(() => import('../components/HeroCanvas'));

const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const showCanvas = !isMobile && !prefersReduced;

const roles = [
  'MERN Stack Developer',
  'React & TypeScript Expert',
  'Agentic AI Architect',
  'UI/UX Implementer',
];

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1800;

const useTypewriter = (words: string[]) => {
  const [display, setDisplay] = React.useState('');
  const [wordIdx, setWordIdx] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setWordIdx(prev => prev + 1);
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIdx, words]);

  return display;
};

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onProjectsClick }) => {
  const typedText = useTypewriter(roles);
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useCursorEffect();

  useEffect(() => {
    const elements = [badgeRef.current, titleRef.current, roleRef.current, descRef.current, ctasRef.current];
    if (elements.some(el => !el)) return;

    if (prefersReduced) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states to invisible
    tl.set(badgeRef.current, { opacity: 0, y: 20 })
      .set(titleRef.current, { opacity: 0, y: 24 })
      .set(roleRef.current, { opacity: 0, y: 16 })
      .set(descRef.current, { opacity: 0, y: 20 })
      .set(ctasRef.current, { opacity: 0, y: 20 });

    // Play a choreographed staggered reveal immediately on mount
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.85 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.85 }, '-=0.7')
      .to(roleRef.current, { opacity: 1, y: 0, duration: 0.75 }, '-=0.65')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.85 }, '-=0.6')
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.85 }, '-=0.55');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section hero-section"
      style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '3rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Three.js particle background */}
      {showCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas theme={theme} />
        </Suspense>
      )}

      {/* Content sits above canvas */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div ref={badgeRef}>
          <div className="badge badge-green" style={{ marginBottom: '2rem' }}>
            <span className="status-dot"></span>
            Available for work
          </div>
        </div>

        <h1
          ref={titleRef}
          style={{ fontWeight: 300, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}
        >
          Muhammad Ayan Hashmi
        </h1>

        {/* Typewriter role subtitle */}
        <div
          ref={roleRef}
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontSize: '1.15rem',
            marginBottom: '2rem',
            minHeight: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span>{typedText}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--accent)',
              marginLeft: '2px',
              animation: 'blink-caret 0.9s step-end infinite',
              verticalAlign: 'middle',
            }}
          />
        </div>

        <p
          ref={descRef}
          style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.7' }}
        >
          Based in Karachi, Pakistan. Specialized in building full-stack MERN applications —
          translating design mockups into pixel-perfect responsive interfaces, architecting
          scalable Node/Express APIs and MongoDB schemas, and shipping secure,
          data-driven user experiences end-to-end.
        </p>

        <div
          ref={ctasRef}
          className="hero-ctas"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <button onClick={onProjectsClick} className="btn btn-primary">
            View Projects <ArrowRight size={16} />
          </button>
          <button onClick={onContactClick} className="btn btn-secondary">
            Get In Touch <Mail size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
