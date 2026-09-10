import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

const Swirls = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paths =
        gsap.utils.toArray(
          ".swirl-path"
        );

      const decorations =
        gsap.utils.toArray(
          ".swirl-decoration"
        );

      /*
       * Prepare every path for the
       * drawing animation.
       */
      paths.forEach((path) => {
        const pathLength =
          path.getTotalLength();

        gsap.set(path, {
          strokeDasharray:
            pathLength,
          strokeDashoffset:
            pathLength,
          opacity: 0,
        });
      });

      /*
       * Draw the swirls when the
       * page first loads.
       */
      gsap.to(paths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2.5,
        stagger: 0.18,
        ease: "power2.inOut",
        delay: 0.4,
      });

      /*
       * Reveal dots and stars.
       */
      gsap.fromTo(
        decorations,
        {
          scale: 0,
          opacity: 0,
          rotation: -90,
          transformOrigin: "center",
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.1,
          delay: 1.5,
          ease: "back.out(2)",
        }
      );

      /*
       * Gentle continuous movement.
       */
      gsap.to(".swirl-left", {
        x: 10,
        y: -8,
        rotation: 1,
        transformOrigin: "center",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".swirl-right", {
        x: -10,
        y: 10,
        rotation: -1,
        transformOrigin: "center",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".swirl-bottom", {
        x: 8,
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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
        overflow-hidden
      "
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* =========================
            TOP-LEFT SWIRL
        ========================== */}
        <g className="swirl-left">
          <path
            className="swirl-path"
            d="
              M -80 240
              C 90 50, 310 40, 360 170
              C 400 275, 215 310, 175 205
              C 145 125, 275 95, 320 160
            "
            stroke="#1e293b"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M -80 228
              C 90 38, 310 28, 360 158
              C 400 263, 215 298, 175 193
              C 145 113, 275 83, 320 148
            "
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M -80 228
              C 90 38, 310 28, 360 158
              C 400 263, 215 298, 175 193
              C 145 113, 275 83, 320 148
            "
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle
            className="swirl-decoration"
            cx="380"
            cy="165"
            r="11"
            fill="#f97316"
            stroke="#1e293b"
            strokeWidth="5"
          />

          <path
            className="swirl-decoration"
            d="M110 85 L118 105 L140 112 L118 120 L110 142 L102 120 L80 112 L102 105 Z"
            fill="#FFFD77"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>

        {/* =========================
            RIGHT-SIDE SWIRL
        ========================== */}
        <g className="swirl-right">
          <path
            className="swirl-path"
            d="
              M 1500 120
              C 1270 90, 1180 220, 1275 300
              C 1360 370, 1480 275, 1400 210
              C 1335 155, 1235 255, 1295 345
              C 1365 450, 1510 425, 1540 520
            "
            stroke="#1e293b"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M 1500 108
              C 1270 78, 1180 208, 1275 288
              C 1360 358, 1480 263, 1400 198
              C 1335 143, 1235 243, 1295 333
              C 1365 438, 1510 413, 1540 508
            "
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M 1500 108
              C 1270 78, 1180 208, 1275 288
              C 1360 358, 1480 263, 1400 198
              C 1335 143, 1235 243, 1295 333
              C 1365 438, 1510 413, 1540 508
            "
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle
            className="swirl-decoration"
            cx="1225"
            cy="360"
            r="10"
            fill="#FFFD77"
            stroke="#1e293b"
            strokeWidth="5"
          />
        </g>

        {/* =========================
            BOTTOM SWIRL
        ========================== */}
        <g className="swirl-bottom">
          <path
            className="swirl-path"
            d="
              M 100 830
              C 310 710, 430 855, 610 800
              C 760 755, 785 650, 705 625
              C 625 600, 575 690, 650 735
              C 780 815, 975 730, 1120 790
              C 1245 840, 1370 825, 1510 720
            "
            stroke="#1e293b"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M 100 818
              C 310 698, 430 843, 610 788
              C 760 743, 785 638, 705 613
              C 625 588, 575 678, 650 723
              C 780 803, 975 718, 1120 778
              C 1245 828, 1370 813, 1510 708
            "
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            className="swirl-path"
            d="
              M 100 818
              C 310 698, 430 843, 610 788
              C 760 743, 785 638, 705 613
              C 625 588, 575 678, 650 723
              C 780 803, 975 718, 1120 778
              C 1245 828, 1370 813, 1510 708
            "
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            className="swirl-decoration"
            d="M1090 690 L1098 710 L1120 718 L1098 726 L1090 748 L1082 726 L1060 718 L1082 710 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default Swirls;