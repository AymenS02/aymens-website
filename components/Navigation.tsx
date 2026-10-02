"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Work", id: "work" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
  { name: "Personal Life", id: "personal" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const placed = useRef(false);

  const [active, setActive] = useState(0);

  /* ------------------- entrance, scroll-spy, magnetic hover ------------------ */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(dotRef.current, { yPercent: -50 });

    /* entrance */
    const entrance = gsap.matchMedia();
    entrance.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set("[data-rail]", { scaleY: 0, transformOrigin: "top center" });
      gsap.set("[data-row]", { opacity: 0, x: 24 });
      gsap.set(dotRef.current, { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 1.2 })
        .to("[data-rail]", { scaleY: 1, duration: 1.6, ease: "power3.inOut" }, 0)
        .to("[data-row]", { opacity: 1, x: 0, duration: 1.2, stagger: 0.08 }, 0.2)
        .to(dotRef.current, { opacity: 1, duration: 0.8 }, 1);
    });

    /* scroll-spy + per-section progress fill */
    const triggers: ScrollTrigger[] = [];

    NAV_ITEMS.forEach((item, i) => {
      const section = document.getElementById(item.id);
      const fill = fillRefs.current[i];
      if (!section || !fill) return;

      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      const setFill = gsap.quickSetter(fill, "scaleX") as (v: number) => void;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          refreshPriority: -1, // refresh after any pinned sections have added spacing
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
          onUpdate: (self) => setFill(self.progress),
        })
      );
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    /* magnetic labels (fine pointers only) */
    const magnet = gsap.matchMedia();
    magnet.add("(hover: hover) and (pointer: fine)", () => {
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"));
      const cleanups: Array<() => void> = [];

      links.forEach((link) => {
        const inner = link.querySelector("[data-mag]");
        if (!inner) return;

        const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const r = link.getBoundingClientRect();
          xTo(gsap.utils.clamp(-8, 8, (e.clientX - (r.left + r.width / 2)) * 0.12));
          yTo(gsap.utils.clamp(-4, 4, (e.clientY - (r.top + r.height / 2)) * 0.2));
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        link.addEventListener("pointermove", onMove);
        link.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          link.removeEventListener("pointermove", onMove);
          link.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    });

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
      entrance.revert();
      magnet.revert();
    };
  }, []);

  /* ------------------------------ gliding marker ----------------------------- */
  useEffect(() => {
    const place = (animate: boolean) => {
      const row = rowRefs.current[active];
      if (!row || !dotRef.current) return;
      gsap.to(dotRef.current, {
        y: row.offsetTop + row.offsetHeight / 2,
        duration: animate ? 0.9 : 0,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    place(placed.current);
    placed.current = true;

    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  /* ---------------------------------- scroll --------------------------------- */
  const scrollToSection = (id: string, i: number) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActive(i);

    const lenis = (window as unknown as { __lenis?: LenisInstance }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { immediate: true });
    } else {
      target.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Sections"
      className="fixed right-[8vw] top-1/2 z-30 hidden -translate-y-1/2 mix-blend-difference md:block"
    >
      <ul className="relative flex flex-col items-end gap-3">
        {/* rail + gliding marker */}
        <span
          data-rail
          aria-hidden
          className="absolute bottom-0 right-[7.5px] top-0 w-px bg-white/20"
        />
        <span
          ref={dotRef}
          aria-hidden
          className="absolute right-1 top-0 h-2 w-2 rounded-full bg-white"
        />

        {NAV_ITEMS.map((item, i) => {
          const isActive = active === i;

          return (
            <li
              key={item.id}
              data-row
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
            >
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id, i);
                }}
                className="group flex items-center py-2 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
              >
                <span data-mag className="flex items-center gap-4">
                  {/* index */}
                  <span
                    className={`w-5 text-right font-jbm text-[10px] transition-colors duration-500 ${
                      isActive
                        ? "text-white/60"
                        : "text-transparent group-hover:text-white/40"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>

                  {/* label: script initial + serif */}
                  <span
                    className={`inline-flex items-baseline text-sm transition-all duration-700 group-hover:tracking-[0.06em] ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                    }`}
                  >
                    <span className="mr-px font-nis text-[1.5em] leading-none">
                      {item.name[0]}
                    </span>
                    <span className="font-zl">{item.name.slice(1)}</span>
                  </span>

                  {/* hairline: fixed cell so the label never shifts; line grows leftward */}
                  <span className="flex w-14 justify-end">
                    <span
                      className={`relative h-px bg-white/25 transition-[width] duration-500 ease-out ${
                        isActive ? "w-14" : "w-5 group-hover:w-10"
                      }`}
                    >
                      <span
                        ref={(el) => {
                          fillRefs.current[i] = el;
                        }}
                        className={`absolute inset-0 bg-white transition-opacity duration-500 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </span>
                  </span>
                </span>

                {/* rail tick */}
                <span className="ml-3 flex w-4 justify-center">
                  <span className="h-1 w-1 rounded-full bg-white/30 transition-colors duration-500 group-hover:bg-white/70" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;