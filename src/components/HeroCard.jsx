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

  const animationCompleteRef = useRef(false);

  const depthLayers = Array.from(
    { length: CARD_DEPTH },
    (_, index) =>
      index - CARD_DEPTH / 2
  );

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    animationCompleteRef.current = false;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          x: window.innerWidth,
          y: -80,
          rotationX: -180,
          rotationY: -720,
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
            animationCompleteRef.current = true;
          },
        }
      );

      GSDevTools.create({
        animation: gsap,
        id: "hero-card",
      });
      
    }, cardRef);

    return () => {
      animationCompleteRef.current = false;
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    // Ignore hovering during the entrance animation
    if (!animationCompleteRef.current) return;

    gsap.to(cardRef.current, {
      y: -12,
      rotationX: 2,
      rotationY: -12,
      rotationZ: 2,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    // Ignore hovering during the entrance animation
    if (!animationCompleteRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      rotationX: 6,
      rotationY: -24,
      rotationZ: 6,
      duration: 0.7,
      ease: "elastic.out(1, 0.2)",
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
        h-[420px] w-[294px]
        transform-3d
        cursor-pointer
        will-change-transform
        lg:h-[500px] lg:w-[350px]
        sm:h-[300px] sm:w-[200px]
      "
    >
      {/* Rounded 3D thickness */}
      {depthLayers.map((depth) => (
        <div
          key={depth}
          className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            border border-black/5
            bg-[#afb3ac]
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
          rounded-2xl
          bg-[#9da19a]
          backface-hidden
        "
      />

      {/* Front face */}
      <div
        className="
          absolute inset-0
          translate-z-[10px]
          overflow-hidden rounded-2xl
          border border-foreground/10
          bg-accent p-4
          shadow-2xl
          backface-hidden
        "
      >
        <img
          src="/img2.jpeg"
          alt="Hero Card"
          className="
            h-full w-full
            rounded-xl object-cover
            border-2 border-foreground/10
            shadow-md
          "
        />
      </div>
    </div>
  );
};

export default HeroCard;