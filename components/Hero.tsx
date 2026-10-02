"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = ["Full Stack Developer", "Azure Certified", "React & AI Engineer"];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aymen-shoteri/" },
  { label: "Github", href: "https://github.com/aymen-shoteri" },
  { label: "Resume", href: "/ShoteriAresume.pdf" },
  { label: "Email", href: "mailto:aymen.shoteri@gmail.com" },
];

/* ------------------------------ roll-over link ----------------------------- */
const RollLink = ({ href, children }: { href: string; children: string }) => {
  const newTab = !href.startsWith("mailto:");

  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-label={children}
      className="group inline-flex overflow-hidden outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
    >
      {children.split("").map((char, i) => (
        <span key={i} aria-hidden="true" className="relative inline-block">
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char}
          </span>
          <span
            className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </Link>
  );
};

/* ------------------------ name: script initial + caps ---------------------- */
const NamePart = ({ initial, rest }: { initial: string; rest: string }) => (
  <span aria-hidden className="inline-flex items-center gap-2">
    <span
      data-script
      className="-mr-2 inline-block font-nis text-5xl sm:text-6xl sm:-mr-3 md:-mr-4 md:text-7xl 2xl:text-9xl"
    >
      {initial}
    </span>
    <span className="whitespace-nowrap font-zl text-4xl sm:text-5xl md:text-6xl">
      {rest.split("").map((c, i) => (
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
  </span>
);

/* ---------------------------------- hero ---------------------------------- */
const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = (s: string) => root.querySelectorAll(s);
    const one = (s: string) => root.querySelector(s);

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine) and (min-width: 768px)",
      },
      (context) => {
        const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };

        // reduced motion: just show everything
        if (!motion) {
          gsap.set(q("[data-name],[data-tag-item],[data-photo],[data-meta]"), { autoAlpha: 1 });
          gsap.set(q("[data-rule]"), { width: "100%" });
          return;
        }

        /* ------------------------- initial hidden states ------------------------ */
        gsap.set(q("[data-script]"), {
          autoAlpha: 0,
          scale: 1.3,
          filter: "blur(16px)",
          transformOrigin: "50% 60%",
        });
        gsap.set(q("[data-char]"), { yPercent: 115 });
        gsap.set(q("[data-name]"), { autoAlpha: 1 }); // chars are hidden, safe to reveal the h1
        gsap.set(q("[data-tag-item]"), { autoAlpha: 0, y: 14 });
        gsap.set(q("[data-photo]"), { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(q("[data-photo-img]"), { scale: 1.35, filter: "brightness(0.5)" });
        gsap.set(q("[data-meta]"), { autoAlpha: 0, y: 14 });
        gsap.set(q("[data-rule]"), { width: "0%" });

        /* -------------------------------- entrance ------------------------------ */
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
          .to(q("[data-script]"), {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.8,
          })
          .to(q("[data-char]"), { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.3)
          .to(
            q("[data-photo]"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" },
            0.2
          )
          .to(q("[data-photo-img]"), { scale: 1, filter: "brightness(1)", duration: 2.4 }, 0.2)
          .to(q("[data-tag-item]"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.9)
          .to(q("[data-rule]"), { width: "100%", duration: 1.8, ease: "power3.inOut" }, 0.9)
          .to(q("[data-meta]"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, 1.2);

        /* ----------------------- scroll: layers drift apart ---------------------- */
        const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-name-wrap]"), { yPercent: -6, ease: "none", scrollTrigger: scrub });
        gsap.to(q("[data-photo-wrap]"), { yPercent: -12, ease: "none", scrollTrigger: scrub });

        /* -------------------- pointer: name and photo counter-drift ------------- */
        if (fine) {
          const nameWrap = one("[data-name-wrap]");
          const photoWrap = one("[data-photo-wrap]");
          const opts = { duration: 1.2, ease: "power3" };

          const nX = gsap.quickTo(nameWrap, "x", opts);
          const nY = gsap.quickTo(nameWrap, "y", opts);
          const pX = gsap.quickTo(photoWrap, "x", opts);
          const pY = gsap.quickTo(photoWrap, "y", opts);

          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            nX(nx * -16);
            nY(ny * -10);
            pX(nx * 22);
            pY(ny * 14);
          };

          root.addEventListener("pointermove", onMove);
          return () => root.removeEventListener("pointermove", onMove);
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 md:px-10 2xl:max-w-300"
    >
      {/* main composition */}
      <div className="flex flex-1 flex-col justify-center py-24 md:flex-row md:items-center md:py-0">
        {/* name + roles */}
        <div data-name-wrap className="relative z-20 md:mb-24">
          <h1
            data-name
            aria-label="Aymen Shoteri"
            className="flex items-center gap-x-2 opacity-0 md:flex-nowrap"
          >
            <NamePart initial="A" rest="YMEN" />
            <NamePart initial="S" rest="HOTERI" />
          </h1>

          <ul
            aria-label="Roles"
            className="mt-5 flex flex-col gap-2 font-zl text-[11px] uppercase tracking-[0.22em] text-neutral-300 sm:text-xs md:mt-4 md:flex-row md:items-center md:gap-4 2xl:text-sm"
          >
            {ROLES.map((role, i) => (
              <Fragment key={role}>
                {i > 0 && (
                  <li
                    data-tag-item
                    role="presentation"
                    aria-hidden
                    className="hidden h-3 w-px bg-white/30 opacity-0 md:block"
                  />
                )}
                <li data-tag-item className="opacity-0">
                  {role}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>

        {/* portrait */}
        <div
          data-photo-wrap
          className="relative z-10 mt-12 w-full max-w-[21.5rem] shrink-0 md:mt-0 md:-ml-20 min-[1736px]:-ml-28 min-[1736px]:max-w-[34rem]"
        >
          <div data-photo className="relative aspect-[6/7] w-full overflow-hidden opacity-0">
            <Image
              data-photo-img
              src="/profileO.jpeg"
              alt="Portrait of Aymen Shoteri"
              fill
              priority
              sizes="(min-width: 1736px) 544px, 344px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative pb-10">
        <span data-rule className="absolute left-0 top-0 h-px w-0 bg-white/20" />

        <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between">
          <p
            data-meta
            className="font-jbm text-sm leading-relaxed text-neutral-300 opacity-0"
          >
            24 years old,
            <br />
            born &amp; raised in Canada
          </p>

          <nav
            data-meta
            aria-label="Links"
            className="flex items-center gap-3 font-jbm text-sm opacity-0"
          >
            {LINKS.map((l, i) => (
              <Fragment key={l.label}>
                {i > 0 && (
                  <span aria-hidden className="text-neutral-600">
                    |
                  </span>
                )}
                <RollLink href={l.href}>{l.label}</RollLink>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Hero;