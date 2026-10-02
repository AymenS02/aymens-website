"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as rawProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  description: string;
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  image: string;
  category: string;
  featured?: boolean;
};

const projects = rawProjects as Project[];
const CATEGORIES = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const Chars = ({ text }: { text: string }) => (
  <>
    {text.split("").map((c, i) => (
      <span
        key={i}
        aria-hidden
        className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
      >
        <span data-char className="inline-block">
          {c}
        </span>
      </span>
    ))}
  </>
);

const SectionHead = ({ label, count }: { label: string; count: number }) => (
  <div data-section className="mb-4 mt-20 flex items-center justify-between">
    <span
      data-fade
      className="font-jbm text-xs uppercase tracking-[0.3em] text-neutral-500"
    >
      {label}
    </span>
    <span data-fade className="font-jbm text-xs text-neutral-500">
      ({String(count).padStart(2, "0")})
    </span>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Row                                                                       */
/* -------------------------------------------------------------------------- */

function Row({ p, n, large }: { p: Project; n: number; large: boolean }) {
  const href = p.liveLink ?? p.githubLink;
  const [name, subtitle] = p.title.split(" — ");

  return (
    <li data-row data-image={p.image} className="relative opacity-0">
      <div
        className={`relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 md:grid-cols-[4rem_1fr_15rem_8rem] md:items-center md:gap-x-8 ${
          large ? "py-10 md:py-14" : "py-6 md:py-8"
        }`}
      >
        {/* index */}
        <span
          data-fade
          className="pt-2 font-jbm text-xs text-neutral-500 md:pt-0"
        >
          {String(n).padStart(2, "0")}
        </span>

        {/* title block */}
        <div className="min-w-0">
          <p
            data-fade
            className="mb-3 font-jbm text-[10px] uppercase tracking-[0.3em] text-neutral-500"
          >
            {p.category}
          </p>

          <h3
            data-shift
            className={`font-zl leading-[1.05] tracking-tight text-neutral-100 ${
              large ? "text-4xl md:text-6xl" : "text-2xl md:text-4xl"
            }`}
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-mask className="block">
                {name}
              </span>
            </span>
          </h3>

          {subtitle && (
            <p data-fade className="mt-2 font-nis text-sm text-neutral-400">
              {subtitle}
            </p>
          )}

          {large && (
            <p
              data-fade
              className="mt-4 hidden max-w-xl font-nis text-sm leading-relaxed text-neutral-500 md:block"
            >
              {p.description}
            </p>
          )}

          {/* mobile-only thumbnail + tech */}
          <img
            data-fade
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="mt-5 aspect-[16/10] w-full object-cover md:hidden"
          />
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-jbm text-[10px] uppercase tracking-widest text-neutral-500 md:hidden">
            {p.tech.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* desktop tech */}
        <ul
          data-fade
          className="hidden flex-col gap-1 font-jbm text-[11px] uppercase tracking-widest text-neutral-500 md:flex"
        >
          {p.tech.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {/* actions (pointer-events-none so the overlay link still catches clicks) */}
        <div
          data-fade
          className="pointer-events-none relative z-20 flex items-center justify-end gap-5"
        >
          {p.githubLink && p.liveLink && (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto hidden font-jbm text-[10px] uppercase tracking-[0.25em] text-neutral-500 transition-colors hover:text-neutral-100 md:block"
            >
              Code
            </a>
          )}
          <span
            data-arrow
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-neutral-200"
          >
            ↗
          </span>
        </div>
      </div>

      {/* hairlines */}
      <span data-line className="absolute bottom-0 left-0 h-px w-full bg-white/15" />
      <span data-fill className="absolute bottom-0 left-0 h-px w-full bg-neutral-100" />

      {/* click target */}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.title}`}
          className="absolute inset-0 z-10"
        />
      )}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ProjectsPage() {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImg = useRef<HTMLImageElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const switching = useRef(false);

  const [active, setActive] = useState("all"); // drives the tab underline instantly
  const [filter, setFilter] = useState("all"); // drives the list (after fade-out)

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );
  const featured = filtered.filter((p) => p.featured);
  const archive = filtered.filter((p) => !p.featured);

  /* ------------------------------ hero intro ------------------------------ */
  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-title]", { opacity: 1 });
      gsap.set("[data-char]", { yPercent: 115 });
      gsap.set("[data-script]", {
        opacity: 0,
        scale: 1.25,
        rotate: -6,
        filter: "blur(14px)",
        transformOrigin: "50% 60%",
      });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-line]", { width: "0%" });

      const count = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });

      tl.to("[data-script]", {
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.8,
      })
        .to("[data-char]", { yPercent: 0, duration: 1.4, stagger: 0.06 }, 0.25)
        .to("[data-hero-line]", { width: "100%", duration: 1.8, ease: "power3.inOut" }, 0.6)
        .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.9)
        .to(
          count,
          {
            v: projects.length,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(count.v)).padStart(2, "0");
            },
          },
          0.9
        );

      // slow parallax on the heading as you scroll away
      gsap.to("[data-hero-title]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* --------------------------- filter underline --------------------------- */
  useIsoLayoutEffect(() => {
    const move = () => {
      const el = tabRefs.current[active];
      if (!el || !indicator.current) return;
      gsap.to(indicator.current, {
        x: el.offsetLeft,
        width: el.offsetWidth,
        duration: 0.8,
        ease: "expo.out",
        overwrite: "auto",
      });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  /* ------------------- rows: scroll reveal + hover preview ------------------ */
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set(list, { opacity: 1, y: 0 });

      const reveal = (el: Element) => {
        const masks = el.querySelectorAll("[data-mask]");
        const fades = el.querySelectorAll("[data-fade]");
        const lines = el.querySelectorAll("[data-line]");
        const fills = el.querySelectorAll("[data-fill]");

        gsap.set(masks, { yPercent: 110 });
        gsap.set(fades, { opacity: 0, y: 18 });
        gsap.set(lines, { width: "0%" });
        gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(el, { opacity: 1 });

        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          })
          .to(lines, { width: "100%", duration: 1.4, ease: "power3.inOut" }, 0)
          .to(masks, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.1)
          .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.3);
      };

      list.querySelectorAll("[data-row]").forEach(reveal);
      list.querySelectorAll("[data-section]").forEach(reveal);
    }, list);

    /* hover preview (desktop pointers only) */
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const preview = previewRef.current;
      const img = previewImg.current;
      if (!preview || !img) return;

      const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));
      const OFFSET_X = 220;
      const HIDDEN = "inset(50% 0% 50% 0%)";
      const SHOWN = "inset(0% 0% 0% 0%)";

      gsap.set(preview, { xPercent: -50, yPercent: -50, clipPath: HIDDEN });

      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
      const rTo = gsap.quickTo(preview, "rotation", { duration: 0.6, ease: "power3" });

      let shown = false;
      let lastX = 0;
      let settle: gsap.core.Tween | null = null;

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX + OFFSET_X);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.35));
        lastX = e.clientX;
        settle?.kill();
        settle = gsap.delayedCall(0.1, () => rTo(0));
      };

      const enters: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];

      rows.forEach((row) => {
        const shift = row.querySelector("[data-shift]");
        const fill = row.querySelector("[data-fill]");
        const arrow = row.querySelector("[data-arrow]");

        const onEnter = (e: MouseEvent) => {
          const src = row.dataset.image;
          if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);

          if (!shown) {
            gsap.set(preview, { x: e.clientX + OFFSET_X, y: e.clientY });
            gsap.to(preview, { clipPath: SHOWN, duration: 0.9, ease: "expo.out", overwrite: "auto" });
            shown = true;
          }
          gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: "expo.out" });

          rows.forEach((r) =>
            gsap.to(r, { opacity: r === row ? 1 : 0.3, duration: 0.5, ease: "power2.out", overwrite: "auto" })
          );

          gsap.to(shift, { x: 20, duration: 0.7, ease: "expo.out" });
          gsap.set(fill, { transformOrigin: "left center" });
          gsap.to(fill, { scaleX: 1, duration: 0.9, ease: "expo.out" });
          gsap.to(arrow, { backgroundColor: "#ededed", color: "#252525", rotate: 45, duration: 0.5, ease: "power3.out" });
        };

        const onLeave = () => {
          gsap.to(shift, { x: 0, duration: 0.7, ease: "expo.out" });
          gsap.set(fill, { transformOrigin: "right center" });
          gsap.to(fill, { scaleX: 0, duration: 0.7, ease: "expo.inOut" });
          gsap.to(arrow, { backgroundColor: "rgba(0,0,0,0)", color: "#e5e5e5", rotate: 0, duration: 0.5, ease: "power3.out" });
        };

        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
        enters.push([row, onEnter, onLeave]);
      });

      const onListLeave = () => {
        shown = false;
        gsap.to(preview, { clipPath: HIDDEN, duration: 0.7, ease: "expo.inOut", overwrite: "auto" });
        gsap.to(rows, { opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        rTo(0);
      };

      list.addEventListener("mousemove", onMove);
      list.addEventListener("mouseleave", onListLeave);

      return () => {
        list.removeEventListener("mousemove", onMove);
        list.removeEventListener("mouseleave", onListLeave);
        enters.forEach(([row, a, b]) => {
          row.removeEventListener("mouseenter", a);
          row.removeEventListener("mouseleave", b);
        });
        settle?.kill();
        gsap.set(preview, { clipPath: HIDDEN });
      };
    });

    switching.current = false;

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [filter]);

  /* ------------------------------ filter change ---------------------------- */
  const changeFilter = (next: string) => {
    if (next === active || switching.current) return;
    switching.current = true;
    setActive(next);
    gsap.to(listRef.current, {
      opacity: 0,
      y: -24,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setFilter(next),
    });
  };

  const countFor = (c: string) =>
    c === "all" ? projects.length : projects.filter((p) => p.category === c).length;

  let n = 0;

  return (
    <main
      ref={root}
      className="min-h-screen bg-[#252525] text-neutral-200 selection:bg-neutral-100 selection:text-[#252525]"
    >
      {/* cursor-follow preview */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/3] w-[24rem] overflow-hidden [clip-path:inset(50%_0%_50%_0%)] md:block"
      >
        <img ref={previewImg} alt="" className="h-full w-full object-cover" />
      </div>

      {/* ------------------------------- HERO -------------------------------- */}
      <section data-hero className="relative flex min-h-[85vh] items-end pb-16 pt-40">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <p
            data-hero-fade
            className="mb-8 font-jbm text-xs uppercase tracking-[0.3em] text-neutral-500"
          >
            Selected Work
          </p>

          <div data-hero-title>
            <h1
              data-title
              aria-label="Projects"
              className="font-zl text-[clamp(4rem,14vw,12rem)] leading-none tracking-tight text-neutral-100 opacity-0"
            >
              <span aria-hidden className="inline-block">
                <span
                  data-script
                  className="mr-[0.02em] inline-block align-baseline font-zti text-[1.3em] leading-none"
                >
                  P
                </span>
                <Chars text="rojects" />
              </span>
            </h1>
          </div>

          <div className="mt-14">
            <div className="relative h-px w-full">
              <span
                data-hero-line
                className="absolute left-0 top-0 h-px w-full bg-white/20"
              />
            </div>

            <div className="mt-6 flex items-end justify-between gap-8">
              <p
                data-hero-fade
                className="max-w-md font-nis text-base leading-relaxed text-neutral-400"
              >
                Production sites, tools and experiments — built end to end, from interface to
                database.
              </p>
              <p
                data-hero-fade
                className="shrink-0 font-jbm text-xs uppercase tracking-[0.25em] text-neutral-500"
              >
                <span ref={countRef}>00</span> projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ FILTERS ------------------------------ */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="relative flex gap-8 overflow-x-auto border-b border-white/10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              ref={(el) => {
                tabRefs.current[c] = el;
              }}
              onClick={() => changeFilter(c)}
              className={`relative whitespace-nowrap pb-4 font-jbm text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                active === c ? "text-neutral-100" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {c}
              <sup className="ml-1 text-[9px] text-neutral-600">{countFor(c)}</sup>
            </button>
          ))}
          <span
            ref={indicator}
            className="absolute bottom-0 left-0 h-px w-0 bg-neutral-100"
          />
        </div>
      </div>

      {/* -------------------------------- LIST -------------------------------- */}
      <div ref={listRef} className="mx-auto max-w-6xl px-6 pb-40 md:px-10">
        {featured.length > 0 && (
          <section>
            <SectionHead label="Featured" count={featured.length} />
            <ul>
              {featured.map((p) => (
                <Row key={p.title} p={p} n={++n} large />
              ))}
            </ul>
          </section>
        )}

        {archive.length > 0 && (
          <section>
            <SectionHead label="Archive" count={archive.length} />
            <ul>
              {archive.map((p) => (
                <Row key={p.title} p={p} n={++n} large={false} />
              ))}
            </ul>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="mt-20 font-jbm text-xs uppercase tracking-[0.3em] text-neutral-500">
            Nothing here yet.
          </p>
        )}
      </div>
    </main>
  );
}