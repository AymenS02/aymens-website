"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experiences";

gsap.registerPlugin(ScrollTrigger);

type Experience = {
  company: string;
  period: string;
  role: string;
  image: string;
  highlights: { icon: string; text: string }[];
};

const data = experiences as Experience[];
const pad = (n: number) => String(n).padStart(2, "0");
const src = (s: string) => s.replace(/^\.\//, "/");

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Script first letter + masked characters, word-safe wrapping */
const Title = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, wi) => (
      <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
        {word.split("").map((c, ci) =>
          wi === 0 && ci === 0 ? (
            <span
              key={ci}
              data-script
              aria-hidden
              className="-mr-[0.06em] inline-block font-nis text-[1.25em] leading-none"
            >
              {c}
            </span>
          ) : (
            <span
              key={ci}
              aria-hidden
              className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
            >
              <span data-char className="inline-block">
                {c}
              </span>
            </span>
          )
        )}
      </span>
    ))}
  </>
);

const Work = () => {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* ------------------------------- intro ------------------------------ */
      const iScript = root.querySelector("[data-i-script]");
      const iChars = root.querySelectorAll("[data-i-char]");
      const iFades = root.querySelectorAll("[data-i-fade]");
      const iLine = root.querySelector("[data-i-line]");

      gsap.set(root.querySelector("[data-i-title]"), { opacity: 1 });
      gsap.set(iScript, {
        opacity: 0,
        scale: 1.3,
        filter: "blur(16px)",
        transformOrigin: "50% 60%",
      });
      gsap.set(iChars, { yPercent: 115 });
      gsap.set(iFades, { opacity: 0, y: 14 });

      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.2 })
        .to(iScript, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8 })
        .to(iChars, { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.35)
        .to(iFades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 1);

      gsap.fromTo(
        iLine,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.4, ease: "power2.inOut", repeat: -1, yoyo: true, repeatDelay: 0.3 }
      );

      /* ------------------------------ articles ---------------------------- */
      root.querySelectorAll<HTMLElement>("[data-article]").forEach((article) => {
        const q = (s: string) => article.querySelectorAll(s);

        const chars = q("[data-char]");
        const script = q("[data-script]");
        const fades = q("[data-fade]");
        const logo = q("[data-logo]");
        const topLine = q("[data-top-line]");
        const progress = q("[data-progress]");
        const left = q("[data-left]");
        const items = Array.from(q("[data-hl]"));

        gsap.set(chars, { yPercent: 115 });
        gsap.set(script, {
          opacity: 0,
          scale: 1.25,
          filter: "blur(12px)",
          transformOrigin: "50% 60%",
        });
        gsap.set(fades, { opacity: 0, y: 20 });
        gsap.set(logo, { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(topLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        // chapter intro
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: article, start: "top 70%", once: true },
          })
          .to(topLine, { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0)
          .to(logo, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, 0.1)
          .to(script, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5 }, 0.2)
          .to(chars, { yPercent: 0, duration: 1.2, stagger: 0.035 }, 0.3)
          .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.6);

        // how far through this role you are
        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: article,
            start: "top 50%",
            end: "bottom 50%",
            scrub: true,
          },
        });

        // left pane lifts away as the chapter ends
        gsap.to(left, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: article,
            start: "bottom 70%",
            end: "bottom 35%",
            scrub: true,
          },
        });

        // highlights: dim -> bright -> dim, scrubbed to scroll position
        items.forEach((li, i) => {
          const isLast = i === items.length - 1;
          gsap.set(li, { opacity: 0.15, x: 24 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: li,
              start: "top 85%",
              end: isLast ? "top 50%" : "bottom 15%",
              scrub: true,
            },
          });

          if (isLast) {
            tl.to(li, { opacity: 1, x: 0, duration: 1, ease: "none" });
          } else {
            tl.to(li, { opacity: 1, x: 0, duration: 0.35, ease: "none" })
              .to({}, { duration: 0.3 })
              .to(li, { opacity: 0.15, duration: 0.35, ease: "none" });
          }
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef}>
      {/* ------------------------------- INTRO ------------------------------- */}
      <section className="relative flex h-screen items-center justify-center text-center">
        <div>
          <h1
            data-i-title
            aria-label="Work"
            className="flex items-center justify-center opacity-0"
          >
            <span
              data-i-script
              aria-hidden
              className="-mr-4 font-nis text-7xl 2xl:text-9xl"
            >
              W
            </span>
            <span aria-hidden className="font-zl text-6xl">
              {"ork".split("").map((c, i) => (
                <span
                  key={i}
                  className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
                >
                  <span data-i-char className="inline-block">
                    {c}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p
            data-i-fade
            className="mt-6 font-jbm text-[11px] uppercase tracking-[0.3em] text-neutral-500"
          >
            Experience
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span
            data-i-fade
            className="font-jbm text-[10px] uppercase tracking-[0.3em] text-neutral-500"
          >
            Scroll
          </span>
          <span data-i-line className="block h-12 w-px bg-white/40" />
        </div>
      </section>

      {/* ----------------------------- EXPERIENCES --------------------------- */}
      {data.map((e, i) => {
        const isCurrent = /present/i.test(e.period);
        return (
          <article key={e.company} data-article className="px-6 md:px-10">
            <div className="relative mx-auto grid max-w-6xl gap-10 pb-24 pt-24 md:grid-cols-[5fr_6fr] md:gap-20 md:py-0">
              {/* hairline */}
              <span
                data-top-line
                className="absolute left-0 top-0 h-px w-full bg-white/15"
              />

              {/* left: sticky identity */}
              <div>
                <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
                  <div data-left className="w-full">
                    <p
                      data-fade
                      className="mb-8 font-jbm text-xs tracking-[0.25em] text-neutral-500"
                    >
                      {pad(i + 1)} / {pad(data.length)}
                    </p>

                    <div className="mb-8 flex items-center gap-5">
                      <div
                        data-logo
                        className="h-16 w-16 shrink-0 bg-neutral-200 p-2.5 md:h-20 md:w-20"
                      >
                        <img
                          src={src(e.image)}
                          alt={`${e.company} logo`}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <p
                        data-fade
                        className="inline-flex items-center gap-2 font-jbm text-[11px] uppercase tracking-[0.3em] text-neutral-500"
                      >
                        {isCurrent && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-100" />
                        )}
                        {e.period}
                      </p>
                    </div>

                    <h2
                      aria-label={e.company}
                      className="font-zl text-5xl leading-[1.05] tracking-tight text-neutral-100 lg:text-6xl"
                    >
                      <Title text={e.company} />
                    </h2>

                    {e.role !== e.company && (
                      <p
                        data-fade
                        className="mt-6 font-jbm text-xs uppercase tracking-[0.3em] text-neutral-400"
                      >
                        {e.role}
                      </p>
                    )}

                    {/* role progress */}
                    <div data-fade className="relative mt-10 hidden h-px w-full bg-white/15 md:block">
                      <span
                        data-progress
                        className="absolute inset-0 bg-neutral-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* right: highlights */}
              <ul className="md:py-[30vh]">
                {data[i].highlights.map((h, j) => (
                  <li key={j} data-hl className="py-6 md:py-14">
                    <span className="mb-3 block font-jbm text-[10px] tracking-[0.25em] text-neutral-600">
                      {pad(j + 1)}
                    </span>
                    <p className="font-zl text-2xl leading-snug text-neutral-100 md:text-3xl">
                      {h.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}

      {/* breathing room at the end */}
      <div className="h-[30vh]" />
    </main>
  );
};

export default Work;