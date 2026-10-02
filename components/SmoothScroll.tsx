"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisInstance = {
  scrollTo: (
    target: HTMLElement | number | string,
    options?: {
      duration?: number;
      immediate?: boolean;
      force?: boolean;
    }
  ) => void;
  start: () => void;
  stop: () => void;
};

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    (window as unknown as { lenis?: LenisInstance }).lenis = {
      scrollTo: lenis.scrollTo.bind(lenis),
      start: lenis.start.bind(lenis),
      stop: lenis.stop.bind(lenis),
    };

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.lenis = undefined;
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}

export {};