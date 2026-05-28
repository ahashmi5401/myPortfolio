import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * CursorEffect — custom gold cursor dot with magnetic button pull.
 * Desktop only. Respects prefers-reduced-motion.
 */
export const useCursorEffect = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (prefersReduced || isMobile) return;

    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(ring);

    const moveDotLeft = gsap.quickTo(dot, 'left', { duration: 0.08, ease: 'none' });
    const moveDotTop = gsap.quickTo(dot, 'top', { duration: 0.08, ease: 'none' });
    const moveRingLeft = gsap.quickTo(ring, 'left', { duration: 0.35, ease: 'power2.out' });
    const moveRingTop = gsap.quickTo(ring, 'top', { duration: 0.35, ease: 'power2.out' });

    // Track raw mouse
    const onMove = (e: MouseEvent) => {
      moveDotLeft(e.clientX);
      moveDotTop(e.clientY);
      moveRingLeft(e.clientX);
      moveRingTop(e.clientY);
    };

    // Hide on leave, show on enter
    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // Magnetic pull on interactive elements
    const magneticEls = document.querySelectorAll<HTMLElement>('button, a, .btn, .project-card, .contact-card-horizontal');

    const magneticHandlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void; move: (e: MouseEvent) => void }> = [];

    magneticEls.forEach((el) => {
      const enter = () => {
        ring.classList.add('cursor-ring--hover');
      };
      const leave = () => {
        ring.classList.remove('cursor-ring--hover');
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
      };
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.22;
        const dy = (e.clientY - cy) * 0.22;
        gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
      };

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('mousemove', move);
      magneticHandlers.push({ el, enter, leave, move });
    });

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      magneticHandlers.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('mousemove', move);
      });
      dot.remove();
      ring.remove();
    };
  }, []);
};
