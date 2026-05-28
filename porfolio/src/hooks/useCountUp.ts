import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpOptions {
  target: number;
  /** Suffix to append after the number e.g. "+" or "%" */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
}

/**
 * useCountUp — animates a number element from 0 to its target value
 * when it scrolls into view. Returns a ref to attach to the element.
 */
export function useCountUp({ target, suffix = '', decimals = 0 }: CountUpOptions): RefObject<HTMLSpanElement | null> {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obj = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: prefersReduced ? 0.01 : 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals) + suffix;
          },
          onComplete: () => {
            el.textContent = target.toFixed(decimals) + suffix;
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [target, suffix, decimals]);

  return elRef;
}
