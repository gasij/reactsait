'use client';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Each context owns its tweens and triggers, including React StrictMode remounts.
export default function useStoryMotion(root, catalogKey, paused) {
  useLayoutEffect(() => {
    if (!root.current || typeof window.matchMedia !== 'function' || paused) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.9
        }
      });
      const rootElement = root.current;
      const letters = rootElement.querySelectorAll('.hero-letter');
      intro.from(letters.length ? letters : rootElement.querySelectorAll('.hero-word'), {
        yPercent: 70, opacity: 0, stagger: 0.065
      }).from('.hero-topline', { opacity: 0, y: 8, duration: 0.6 }, 0.15)
        .from('.hero-copy > p:not(.hero-topline), .hero-actions, .hero-proof', { opacity: 0, y: 18, stagger: 0.12 }, 0.45)
        .from('.hero-visual', { opacity: 0, scale: 0.97, duration: 1.2 }, 0.2);
      gsap.utils.toArray('.section-heading, .about-heading').forEach(heading => {
        gsap.from(heading, {
          opacity: 0,
          y: 24,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 92%',
            once: true
          }
        });
      });
      gsap.utils.toArray('.collection-feature, .production-photo').forEach(frame => {
        gsap.from(frame, {
          clipPath: 'inset(0 0 12% 0)',
          opacity: 0.35,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 90%',
            once: true
          }
        });
      });
      gsap.from('.closing h2', {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.closing',
          start: 'top 80%',
          once: true
        }
      });
      gsap.from('.closing-flower', {
        rotation: -35,
        scale: 0.7,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.closing',
          start: 'top 80%',
          once: true
        }
      });
      // Refresh once layout has settled, without keeping callbacks after unmount.
      let live = true;
      document.fonts?.ready.then(() => {
        if (live) ScrollTrigger.refresh();
      });
      const images = Array.from(root.current.querySelectorAll('img'));
      const refresh = () => ScrollTrigger.refresh();
      images.forEach(img => img.addEventListener('load', refresh));
      return () => {
        live = false;
        images.forEach(img => img.removeEventListener('load', refresh));
      };
    }, root);
    return () => media.revert();
  }, [root, paused]);
  useLayoutEffect(() => {
    if (!root.current || typeof window.matchMedia !== 'function' || paused) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.product-card', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.055,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 95%',
          once: true
        }
      });
      ScrollTrigger.refresh();
    }, root);
    return () => media.revert();
  }, [root, catalogKey, paused]);
}
