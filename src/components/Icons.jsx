import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  Braces,
  Cloud,
  Code2,
  Database,
  Server,
  Terminal,
} from "lucide-react";

const icons = [
  {
    Icon: Code2,
    label: "Frontend Development",
    position:
      "left-[8%] top-[20%]",
    direction: "left",
    color: "bg-orange-500",
    rotation: -12,
  },
  {
    Icon: Database,
    label: "Database Development",
    position:
      "left-[20%] top-[75%]",
    direction: "bottom",
    color: "bg-yellow-300",
    rotation: 10,
  },
  {
    Icon: Cloud,
    label: "Azure Cloud",
    position:
      "right-[8%] top-[15%]",
    direction: "right",
    color: "bg-sky-400",
    rotation: 12,
  },
  {
    Icon: Server,
    label: "Backend Development",
    position:
      "right-[12%] top-[72%]",
    direction: "bottom",
    color: "bg-emerald-400",
    rotation: -8,
  },
  {
    Icon: Terminal,
    label: "Software Engineering",
    position:
      "left-[42%] top-[12%]",
    direction: "top",
    color: "bg-purple-400",
    rotation: 8,
  },
  {
    Icon: Braces,
    label: "Programming",
    position:
      "left-[45%] top-[82%]",
    direction: "bottom",
    color: "bg-pink-400",
    rotation: -10,
  },
];

const getStartingPosition = (
  direction
) => {
  switch (direction) {
    case "left":
      return {
        x: -window.innerWidth,
        y: 0,
      };

    case "right":
      return {
        x: window.innerWidth,
        y: 0,
      };

    case "top":
      return {
        x: 0,
        y: -window.innerHeight,
      };

    case "bottom":
      return {
        x: 0,
        y: window.innerHeight,
      };

    default:
      return {
        x: 0,
        y: 0,
      };
  }
};

const Icons = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const iconElements =
        gsap.utils.toArray(
          ".hero-icon-motion"
        );

      const timeline = gsap.timeline();

      iconElements.forEach(
        (icon, index) => {
          const direction =
            icon.dataset.direction;

          const startingPosition =
            getStartingPosition(
              direction
            );

          timeline.fromTo(
            icon,
            {
              ...startingPosition,
              scale: 0.3,
              rotation:
                index % 2 === 0
                  ? -360
                  : 360,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: Number(
                icon.dataset.rotation
              ),
              opacity: 1,
              duration: 1.4,
              ease: "back.out(1.7)",
            },

            // Overlap the icon entrances
            index * 0.12
          );
        }
      );

      // Begin floating after entrance
      timeline.to(
        iconElements,
        {
          y: (index) =>
            index % 2 === 0
              ? -12
              : 12,
          rotation: (index, icon) =>
            Number(
              icon.dataset.rotation
            ) +
            (index % 2 === 0
              ? 3
              : -3),
          duration: (index) =>
            1.8 + index * 0.15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
        },
        ">"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        z-20 overflow-hidden
      "
    >
      {icons.map(
        (
          {
            Icon,
            label,
            position,
            direction,
            color,
            rotation,
          },
          index
        ) => (
          /*
           * This wrapper controls the
           * final position.
           */
          <div
            key={label}
            className={`
              absolute
              -translate-x-1/2
              -translate-y-1/2
              ${position}
            `}
          >
            {/*
             * GSAP controls this layer.
             */}
            <div
              data-direction={
                direction
              }
              data-rotation={rotation}
              className="
                hero-icon-motion
                pointer-events-auto
                will-change-transform
              "
            >
              {/*
               * Tailwind hover controls
               * this inner layer.
               */}
              <div
                className={`
                  flex size-16
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-2xl
                  border-2 border-white/70
                  text-slate-900
                  shadow-[6px_6px_0_#1e293b]
                  transition-transform
                  duration-300
                  hover:-translate-y-2
                  hover:rotate-6
                  hover:scale-110
                  ${color}

                  sm:size-20
                `}
              >
                <Icon
                  aria-label={label}
                  className="size-8 sm:size-10"
                  strokeWidth={2.2}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Icons;