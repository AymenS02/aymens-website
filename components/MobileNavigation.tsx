"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* local typing so this doesn't clash with any global Window.lenis declaration */
type LenisLike = {
  scrollTo: (
    target: HTMLElement | number | string,
    options?: { immediate?: boolean; force?: boolean }
  ) => void;
  start: () => void;
  stop: () => void;
};
const getLenis = () => (window as unknown as { lenis?: LenisLike }).lenis;

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Work", id: "work" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
  { name: "Personal Life", id: "personal" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aymen-shoteri/" },
  { label: "Github", href: "https://github.com/aymen-shoteri" },
  { label: "Resume", href: "/ShoteriAresume.pdf" },
  { label: "Email", href: "mailto:aymen.shoteri@gmail.com" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const lockScroll = () => {
  getLenis()?.stop();
  document.body.style.overflow = "hidden";
};
const unlockScroll = () => {
  getLenis()?.start();
  document.body.style.overflow = "";
};

// near-instant playback for reduced-motion users
const speed = (normal: number) =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : normal;

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60";

const MobileNavigation = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const btnTl = useRef<gsap.core.Timeline | null>(null);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  /* ------------------------------ build timelines ----------------------------- */
  useIsoLayoutEffect(() => {
    const overlay = overlayRef.current;
    const button = buttonRef.current;
    const bar = barRef.current;
    if (!overlay || !button || !bar) return;

    overlay.setAttribute("inert", "");

    const ctx = gsap.context(() => {
      const lines = overlay.querySelectorAll("[data-m-line]");
      const scripts = overlay.querySelectorAll("[data-m-script]");
      const masks = overlay.querySelectorAll("[data-m-mask]");
      const fades = overlay.querySelectorAll("[data-m-fade]");

      menuTl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "expo.out" },
          onReverseComplete: () => {
            gsap.set(overlay, { visibility: "hidden" });
          },
        })
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
          0
        )
        .fromTo(
          lines,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power3.inOut", stagger: 0.06 },
          0.3
        )
        .fromTo(
          scripts,
          {
            opacity: 0,
            scale: 1.25,
            filter: "blur(10px)",
            transformOrigin: "50% 60%",
          },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.07 },
          0.35
        )
        .fromTo(masks, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07 }, 0.35)
        .fromTo(
          fades,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 },
          0.6
        );

      // Menu <-> Close roll + hamburger -> X
      btnTl.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.7, ease: "expo.out" } })
        .to(button.querySelector("[data-line-a]"), { y: 3.5, rotate: 45 }, 0)
        .to(button.querySelector("[data-line-b]"), { y: -3.5, rotate: -45 }, 0)
        .to(button.querySelector("[data-track]"), { yPercent: -50 }, 0);

      // bar entrance
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(bar, {
        opacity: 1,
        duration: reduce ? 0 : 1.2,
        delay: reduce ? 0 : 1.2,
        ease: "power2.out",
      });
    });

    return () => {
      unlockScroll();
      ctx.revert();
      menuTl.current = null;
      btnTl.current = null;
    };
  }, []);

  /* -------------------------------- scroll spy -------------------------------- */
  useEffect(() => {
    const triggers = NAV_ITEMS.map((item, i) => {
      const el = document.getElementById(item.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  /* label swap on section change */
  useEffect(() => {
    gsap.fromTo(
      labelRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
    );
  }, [active]);

  /* --------------------------------- open/close -------------------------------- */
  const openMenu = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.removeAttribute("inert");
    gsap.set(overlay, { visibility: "visible" });
    lockScroll();
    setOpen(true);

    menuTl.current?.timeScale(speed(1)).play();
    btnTl.current?.timeScale(speed(1)).play();

    requestAnimationFrame(() =>
      overlay.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true })
    );
  }, []);

  const closeMenu = useCallback((focusButton = true) => {
    unlockScroll();
    setOpen(false);
    overlayRef.current?.setAttribute("inert", "");

    menuTl.current?.timeScale(speed(1.6)).reverse();
    btnTl.current?.timeScale(speed(1)).reverse();

    if (focusButton) buttonRef.current?.focus();
  }, []);

  /* Escape to close, and bail out if the viewport grows to desktop while open */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu(false);
    };

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open, closeMenu]);

  /* ----------------------------------- navigate -------------------------------- */
  const go = (id: string, i: number) => {
    unlockScroll();

    const target = document.getElementById(id);
    if (target) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView({ behavior: "auto" });
    }

    setActive(i);
    closeMenu(false); // overlay lifts away to reveal the destination
  };

  return (
    <div className="md:hidden">
      {/* ------------------------------- top bar ------------------------------- */}
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 pt-6 mr-4 opacity-0 mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="font-jbm text-[11px] uppercase tracking-[0.3em] text-white/70"
        >
          {pad(active + 1)} — {NAV_ITEMS[active].name}
        </span>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? closeMenu() : openMenu())}
          className={`flex items-center gap-3 py-2 pl-4 font-jbm text-[11px] uppercase tracking-[0.3em] text-white ${focusRing}`}
        >
          <span aria-hidden className="relative block h-4 overflow-hidden leading-4">
            <span data-track className="block">
              <span className="block h-4">Menu</span>
              <span className="block h-4">Close</span>
            </span>
          </span>

          <span aria-hidden className="relative block h-2 w-5">
            <span data-line-a className="absolute left-0 top-0 h-px w-full bg-white" />
            <span data-line-b className="absolute bottom-0 left-0 h-px w-full bg-white" />
          </span>
        </button>
      </div>

      {/* -------------------------------- overlay ------------------------------- */}
      <div
        ref={overlayRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible mr-4 fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-[#252525] px-6 pb-8 pt-28"
      >
        <nav aria-label="Sections" className="flex flex-1 flex-col justify-center">
          <ul>
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === i;

              return (
                <li key={item.id} className="relative">
                  <span
                    data-m-line
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-white/15"
                  />

                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id, i);
                    }}
                    className={`flex items-center justify-between py-4 ${focusRing}`}
                  >
                    <span
                      className={`flex items-center transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      <span
                        data-m-script
                        className="mr-px inline-block font-nis text-5xl leading-none"
                      >
                        {item.name[0]}
                      </span>
                      <span className="block overflow-hidden pb-[0.15em]">
                        <span data-m-mask className="block font-zl text-4xl">
                          {item.name.slice(1)}
                        </span>
                      </span>
                    </span>

                    <span
                      data-m-fade
                      className="font-jbm text-[10px] tracking-[0.25em] text-white/40"
                    >
                      {pad(i + 1)}
                    </span>
                  </a>
                </li>
              );
            })}

            <li aria-hidden className="relative h-px">
              <span data-m-line className="absolute left-0 top-0 h-px w-0 bg-white/15" />
            </li>
          </ul>
        </nav>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-jbm text-[11px] uppercase tracking-[0.2em] text-neutral-400">
          {SOCIALS.map((s) => {
            const newTab = !s.href.startsWith("mailto:");
            return (
              <a
                key={s.label}
                data-m-fade
                href={s.href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className={`transition-colors duration-300 hover:text-white ${focusRing}`}
              >
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;