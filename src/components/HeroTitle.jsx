import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

const TITLE = "Aymen Shoteri";

const HeroTitle = () => {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters =
        letterRefs.current.filter(Boolean);

      gsap.set(letters, {
        y: () => -window.innerHeight,
        opacity: 0,
        rotation: () =>
          gsap.utils.random(-15, 15),
      });

      gsap.to(letters, {
        y: 0,
        opacity: 1,
        rotation: 0,
        skewX: -10,
        duration: 1.6,
        stagger: 0.08,
        ease: "elastic.out(1, 0.9)",
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = (index) => {
    const currentLetter =
      letterRefs.current[index];

    const previousLetter =
      letterRefs.current[index - 1];

    const nextLetter =
      letterRefs.current[index + 1];

    // Return to its original horizontal position
    // while moving upward.
    gsap.to(currentLetter, {
      x: 0,
      y: -14,
      scale: 1.12,
      rotation: gsap.utils.random(-6, 6),
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    });

    if (previousLetter) {
      gsap.to(previousLetter, {
        x: -12,
        y: -7,
        scale: 1.05,
        rotation: -3,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (nextLetter) {
      gsap.to(nextLetter, {
        x: 12,
        y: -7,
        scale: 1.05,
        rotation: 3,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = (index) => {
    const affectedLetters = [
      letterRefs.current[index - 1],
      letterRefs.current[index],
      letterRefs.current[index + 1],
    ].filter(Boolean);

    gsap.to(affectedLetters, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center overflow-visible"
    >
      <h1
        aria-label={TITLE}
        className="flex flex-wrap justify-center text-center font-title text-6xl sm:text-8xl lg:text-9xl"
      >
        {TITLE.split("").map(
          (character, index) => (
            <span
              key={`${character}-${index}`}
              ref={(element) => {
                letterRefs.current[index] =
                  element;
              }}
              aria-hidden="true"
              className="hero-letter relative inline-block cursor-default will-change-transform"
              onMouseEnter={() =>
                handleMouseEnter(index)
              }
              onMouseLeave={() =>
                handleMouseLeave(index)
              }
            >
              {character === " " ? (
                <span className="inline-block w-[0.3em]">
                  &nbsp;
                </span>
              ) : (
                <>
                  {/* Outer white border */}
                  <span className="absolute inset-0 text-transparent [-webkit-text-stroke:10px_white]">
                    {character}
                  </span>

                  {/* Inner orange border */}
                  <span className="absolute inset-0 text-transparent [-webkit-text-stroke:6px_#f97316]">
                    {character}
                  </span>

                  {/* Main white letter */}
                  <span className="relative text-white">
                    {character}
                  </span>
                </>
              )}
            </span>
          )
        )}
      </h1>
    </div>
  );
};

export default HeroTitle;