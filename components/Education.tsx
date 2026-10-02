"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = (s: string) => root.querySelectorAll(s);
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const { motion } = context.conditions as { motion: boolean };

      // reduced motion: show the final state
      if (!motion) {
        gsap.set(q("[data-title],[data-logo],[data-fade]"), { autoAlpha: 1 });
        return;
      }

      /* ----------------------------- hidden states ----------------------------- */
      gsap.set(q("[data-script]"), {
        autoAlpha: 0,
        scale: 1.3,
        filter: "blur(16px)",
        transformOrigin: "50% 60%",
      });
      gsap.set(q("[data-char]"), { yPercent: 115 });
      gsap.set(q("[data-title]"), { autoAlpha: 1 });
      gsap.set(q("[data-logo]"), { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(q("[data-logo-img]"), { scale: 1.2 });
      gsap.set(q("[data-vline]"), { scaleY: 0, transformOrigin: "top center" });
      gsap.set(q("[data-hline]"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q("[data-mask]"), { yPercent: 110 });
      gsap.set(q("[data-fade]"), { autoAlpha: 0, y: 14 });

      /* -------------------------------- entrance -------------------------------- */
      gsap
        .timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: root, start: "top 60%", once: true },
        })
        .to(q("[data-script]"), {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.8,
        })
        .to(q("[data-char]"), { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.2)
        .to(
          q("[data-logo]"),
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
          0.6
        )
        .to(q("[data-logo-img]"), { scale: 1, duration: 2 }, 0.6)
        .to(q("[data-vline],[data-hline]"), { scaleX: 1, scaleY: 1, duration: 1.4, ease: "power3.inOut" }, 1)
        .to(q("[data-mask]"), { yPercent: 0, duration: 1.2 }, 1.2)
        .to(q("[data-fade]"), { autoAlpha: 1, y: 0, duration: 1 }, 1.4);

      /* ---------------------- logo drifts as you scroll past -------------------- */
      gsap.fromTo(
        q("[data-logo]"),
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="education"
      className="flex min-h-[40vh] flex-col items-center justify-center px-6 py-24 text-center mt-20 md:mt-48"
    >
      <h2
        data-title
        aria-label="Education"
        className="flex items-center justify-center opacity-0"
      >
        <span
          data-script
          aria-hidden
          className="-mr-4 font-nis text-7xl 2xl:text-9xl"
        >
          E
        </span>
        <span aria-hidden className="font-zl text-6xl">
          {"ducation".split("").map((c, i) => (
            <span
              key={i}
              className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
            >
              <span data-char className="inline-block">
                {c}
              </span>
            </span>
          ))}
        </span>
      </h2>

      <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
        <div data-logo className="shrink-0 overflow-hidden opacity-0">
          <Image
            data-logo-img
            src="/mac.png"
            alt="McMaster University"
            width={400}
            height={400}
            className="h-auto max-w-[70vw] opacity-80 md:max-w-none"
          />
        </div>

        {/* divider: vertical beside the logo on desktop, horizontal when stacked */}
        <span
          data-vline
          aria-hidden
          className="hidden h-[20vh] w-px bg-white/70 md:block"
        />
        <span
          data-hline
          aria-hidden
          className="block h-px w-24 bg-white/70 md:hidden"
        />

        <div className="mt-4 flex flex-col items-center justify-center gap-6 text-center md:items-start md:text-start">
          <h3 className="block max-w-xs overflow-hidden pb-1 font-zl text-2xl">
            <span data-mask className="block">
              Honours in Mathematics and Computer Science
            </span>
          </h3>
          <p data-fade className="font-jbm text-white/70">
            2021–2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;