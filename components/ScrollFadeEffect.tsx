"use client";

import { useEffect } from 'react';

export function useScrollFadeEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const title = document.querySelector('.moon-title');
      if (title && title instanceof HTMLElement) {
        title.style.opacity = Math.max(0, 1 - scrollProgress * 2.5).toString();
        const scale = 1 + scrollProgress;
        title.style.transform = `translateY(-50%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}