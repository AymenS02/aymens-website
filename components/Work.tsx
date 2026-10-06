"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useRef, useState } from "react";
import { experiences } from "@/data/experiences";

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

const Work = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(data.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(active + 1);
    if (e.key === "ArrowLeft") goTo(active - 1);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-10"
      onKeyDown={onKeyDown}
    >
      {/* title */}
      <h1 aria-label="Work" className="mb-10 flex items-center justify-center">
        <span aria-hidden className="-mr-4 font-nis text-7xl 2xl:text-9xl">
          W
        </span>
        <span aria-hidden className="font-zl text-6xl">
          ork
        </span>
      </h1>

      <div className="w-full max-w-5xl">
        {/* swipe track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Work experience, swipe to browse"
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.map((e, i) => {
            const isCurrent = /present/i.test(e.period);
            const isActive = i === active;

            return (
              <article
                key={e.company}
                aria-hidden={!isActive}
                className="w-full shrink-0 snap-center px-1"
              >
                <div
                  className={`grid gap-8 border border-white/10 p-6 transition-all duration-700 md:grid-cols-[5fr_6fr] md:gap-14 md:p-12 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {/* identity */}
                  <div>
                    <p className="mb-6 font-jbm text-xs tracking-[0.25em] text-neutral-500">
                      {pad(i + 1)} / {pad(data.length)}
                    </p>

                    <div className="mb-6 flex items-center gap-5">
                      <div className="h-16 w-16 shrink-0 md:h-20 md:w-20">
                        <img
                          src={src(e.image)}
                          alt={`${e.company} logo`}
                          className="h-full w-full object-contain"
                          draggable={false}
                        />
                      </div>

                      <p className="inline-flex items-center gap-2 font-jbm text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                        {isCurrent && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-100" />
                        )}
                        {e.period}
                      </p>
                    </div>

                    <h2
                      aria-label={e.company}
                      className="font-zl text-4xl leading-[1.05] tracking-tight text-neutral-100 lg:text-5xl"
                    >
                      <span
                        aria-hidden
                        className="-mr-[0.06em] font-nis text-[1.25em] leading-none"
                      >
                        {e.company.charAt(0)}
                      </span>
                      <span aria-hidden>{e.company.slice(1)}</span>
                    </h2>

                    {e.role !== e.company && (
                      <p className="mt-5 font-jbm text-xs uppercase tracking-[0.3em] text-neutral-400">
                        {e.role}
                      </p>
                    )}
                  </div>

                  {/* highlights */}
                  <ul className="flex flex-col justify-center gap-6 md:max-h-[55vh] md:overflow-y-auto md:pr-2">
                    {e.highlights.map((h, j) => (
                      <li key={j}>
                        <span className="mb-2 block font-jbm text-[10px] tracking-[0.25em] text-neutral-600">
                          {pad(j + 1)}
                        </span>
                        <p className="font-zl leading-snug text-neutral-100 md:text-md">
                          {h.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous job"
            className="flex h-11 w-11 items-center justify-center border border-white/15 font-jbm text-neutral-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent"
          >
            ←
          </button>

          <div className="flex items-center gap-3">
            {data.map((e, i) => (
              <button
                key={e.company}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${e.company}`}
                aria-current={i === active}
                className={`h-1.5 transition-all duration-500 ${
                  i === active
                    ? "w-8 bg-neutral-100"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === data.length - 1}
            aria-label="Next job"
            className="flex h-11 w-11 items-center justify-center border border-white/15 font-jbm text-neutral-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent"
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
};

export default Work;