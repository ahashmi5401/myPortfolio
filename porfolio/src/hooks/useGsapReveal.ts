import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useGsapReveal — attaches GSAP ScrollTrigger reveal animations to all
 * elements with `data-gsap="reveal"` inside the given container ref.
 *
 * Optionally you can pass `data-gsap-delay="0.2"` on an element to stagger it.
 * Pass `data-gsap-from="left"` for a slide-in from the left.
 */
export function useGsapReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = prefersReduced ? 0.01 : 0.85;

    const elements = container.querySelectorAll<HTMLElement>('[data-gsap="reveal"]');
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const delay = parseFloat(el.dataset.gsapDelay ?? '0');
      const fromDir = el.dataset.gsapFrom ?? 'bottom';

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: dur,
        delay,
        ease: 'power3.out',
      };

      if (fromDir === 'left') {
        fromVars.x = -40;
      } else if (fromDir === 'right') {
        fromVars.x = 40;
      } else {
        fromVars.y = 36;
      }

      // Set to invisible immediately so there's no flash before GSAP takes over
      gsap.set(el, { opacity: 0, y: fromDir === 'bottom' ? 36 : 0, x: fromDir === 'left' ? -40 : fromDir === 'right' ? 40 : 0 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: dur,
            delay,
            ease: 'power3.out',
          });
        },
      });

      triggers.push(st);
    });

    // Stagger groups — elements with data-gsap="stagger-group" get batch animation
    const groups = container.querySelectorAll<HTMLElement>('[data-gsap="stagger-group"]');
    groups.forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('[data-gsap="stagger-item"]');
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 28 });

      const st = ScrollTrigger.create({
        trigger: group,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: prefersReduced ? 0.01 : 0.65,
            stagger: prefersReduced ? 0 : 0.1,
            ease: 'power3.out',
          });
        },
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [containerRef]);
}
