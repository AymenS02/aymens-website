import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(GSDevTools);

const CARD_DEPTH = 20;

const HeroCard = () => {
  const cardRef = useRef(null);
  const animationCompleteRef =
    useRef(false);

  const depthLayers = Array.from(
    { length: CARD_DEPTH },
    (_, index) =>
      index - CARD_DEPTH / 2
  );

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    animationCompleteRef.current =
      false;

    let devTools;

    const ctx = gsap.context(() => {
      const entranceAnimation =
        gsap.fromTo(
          card,
          {
            x: window.innerWidth,
            y: -80,
            rotationX: -180,
            rotationY: -950,
            rotationZ: 18,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotationX: 6,
            rotationY: -24,
            rotationZ: 6,
            opacity: 1,
            duration: 2,
            ease: "back.out(1.9)",

            onComplete: () => {
              animationCompleteRef.current =
                true;
            },
          }
        );

      // Only show GSDevTools during development
      if (import.meta.env.DEV) {
        devTools =
          GSDevTools.create({
            animation:
              entranceAnimation,
            id: "hero-card",
          });
      }
    }, cardRef);

    return () => {
      animationCompleteRef.current =
        false;

      devTools?.kill();
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (
      !animationCompleteRef.current
    ) {
      return;
    }

    gsap.to(cardRef.current, {
      y: -14,
      rotationX: 2,
      rotationY: -12,
      rotationZ: 2,
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (
      !animationCompleteRef.current
    ) {
      return;
    }

    gsap.to(cardRef.current, {
      y: 0,
      rotationX: 6,
      rotationY: -24,
      rotationZ: 6,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        h-[300px] w-[210px]
        cursor-pointer
        transform-3d
        will-change-transform
        sm:h-[420px] sm:w-[294px]
        lg:h-[500px] lg:w-[350px]
      "
    >
      {/* Rounded dark 3D thickness */}
      {depthLayers.map((depth) => (
        <div
          key={depth}
          className="
            pointer-events-none
            absolute inset-0
            rounded-[1.4rem]
            border border-slate-900/20
            bg-slate-800
          "
          style={{
            transform: `translateZ(${depth}px)`,
          }}
        />
      ))}

      {/* Back face */}
      <div
        className="
          absolute inset-0
          -translate-z-[10px]
          rotate-y-180
          rounded-[1.4rem]
          border-2 border-white/60
          bg-orange-600
          backface-hidden
        "
      >
        <div className="flex h-full items-center justify-center">
          <span className="font-fun text-4xl text-white">
            AS
          </span>
        </div>
      </div>

      {/* Front face */}
      <div
        className="
          absolute inset-0
          translate-z-[10px]
          overflow-hidden
          rounded-[1.4rem]
          border-[3px] border-white/80
          bg-orange-500
          p-3
          shadow-[10px_10px_0_#1e293b]
          backface-hidden
        "
      >
        {/* Profile image */}
        <div
          className="
            relative h-full w-full
            overflow-hidden rounded-xl
            border-[3px] border-slate-800
            bg-yellow-200
          "
        >
          <img
            src="/img2.jpeg"
            alt="Aymen Shoteri"
            className="
              h-full w-full
              object-cover
              [object-position:center_20%]
            "
          />

          {/* Subtle image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

          {/* Top label */}
          <div
            className="
              absolute left-3 top-3
              -rotate-2
              rounded-lg
              border-2 border-slate-800
              bg-yellow-300
              px-3 py-1.5
              font-basic text-[10px]
              font-bold uppercase
              tracking-[0.15em]
              text-slate-900
              shadow-[3px_3px_0_#1e293b]
              sm:text-xs
            "
          >
            Software Engineer
          </div>

          {/* Bottom information */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="font-fun text-2xl leading-none sm:text-4xl">
              Aymen
            </p>

            <p className="mt-1 font-basic text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-200 sm:text-xs">
              Full-Stack | Azure Cloud
            </p>
          </div>

          {/* Decorative dots */}
          <div className="absolute right-3 top-3 flex gap-1.5">
            <span className="size-2 rounded-full border border-slate-800 bg-orange-500" />
            <span className="size-2 rounded-full border border-slate-800 bg-yellow-300" />
            <span className="size-2 rounded-full border border-slate-800 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;