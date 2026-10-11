"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PersonalLife = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const btn = buttonRef.current;
    const label = labelRef.current;
    if (!btn || !label) return;

    // Uses offsetHeight (untransformed) so the mid-animation scales don't skew the math
    const coverScale = () => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(cx, window.innerWidth - cx);
      const dy = Math.max(cy, window.innerHeight - cy);
      return (Math.hypot(dx, dy) * 2) / btn.offsetHeight + 0.1;
    };

    tl.current = gsap
      .timeline({ paused: true })
      // 1. Squash: pill presses down, text blurs out, ring drops
      .to(label, { opacity: 0, filter: "blur(6px)", y: -6, duration: 0.14, ease: "power2.out" })
      .to(btn, { outlineColor: "transparent", duration: 0.12 }, "<")
      .to(btn, { scaleX: 1.06, scaleY: 0.86, duration: 0.14, ease: "power2.out" }, "<")
      // 2. Stretch: pinch the width and spring up into a tall oval
      .to(btn, {
        width: () => btn.offsetHeight,
        scaleX: 0.78,
        scaleY: 1.38,
        duration: 0.22,
        ease: "power3.in",
      })
      // 3. Wobble: settle into a circle
      .to(btn, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1.1, 0.4)" })
      // 4. Breath in...
      .to(btn, { scale: 0.86, duration: 0.14, ease: "power2.inOut" })
      .set(document.documentElement, { overflow: "hidden" })
      // ...and burst
      .to(btn, { scale: coverScale, duration: 0.7, ease: "expo.in" });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tl.current.timeScale(50);
    }
  });

  const handleClick = () => {
    const t = tl.current;
    if (!t) return;
    if (t.reversed() || t.progress() === 0) t.play();
    else t.reverse();
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-16 text-center">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <h1 className="text-7xl 2xl:text-9xl font-nis -mr-4">P</h1>
          <h1 className="text-6xl font-zl">ersonal</h1>
        </div>
        <div className="flex items-center">
          <h1 className="text-7xl 2xl:text-9xl font-nis -mr-2">L</h1>
          <h1 className="text-6xl font-zl">ife</h1>
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className="relative z-50 w-80 cursor-pointer overflow-hidden whitespace-nowrap rounded-full bg-foreground py-6 text-3xl font-nis text-background outline-2 outline-solid outline-foreground outline-offset-8 transition-[outline-offset] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:outline-offset-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        <span ref={labelRef} className="block leading-[1.2]">
          Coming Soon...
        </span>
      </button>
    </section>
  );
};

export default PersonalLife;