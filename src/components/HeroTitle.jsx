import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

// const TITLE = "Aymen Shoteri";

// const HeroTitle = () => {
//   const containerRef = useRef(null);
//   const letterRefs = useRef([]);
//   const animationCompleteRef =
//     useRef(false);

//   useLayoutEffect(() => {
//     animationCompleteRef.current =
//       false;

//     const ctx = gsap.context(() => {
//       const letters =
//         letterRefs.current.filter(
//           Boolean
//         );

//       gsap.set(letters, {
//         y: () =>
//           -window.innerHeight,
//         opacity: 0,
//         rotation: () =>
//           gsap.utils.random(
//             -15,
//             15
//           ),
//       });

//       gsap.to(letters, {
//         y: 0,
//         opacity: 1,
//         rotation: 0,
//         skewX: -8,
//         duration: 1.6,
//         stagger: 0.08,
//         ease: "elastic.out(1, 0.9)",

//         onComplete: () => {
//           animationCompleteRef.current =
//             true;
//         },
//       });
//     }, containerRef);

//     return () => {
//       animationCompleteRef.current =
//         false;

//       ctx.revert();
//     };
//   }, []);

//   const getAdjacentLetter = (
//     index,
//     direction
//   ) => {
//     let adjacentIndex =
//       index + direction;

//     // Skip spaces when looking for
//     // the neighboring visible letter.
//     while (
//       adjacentIndex >= 0 &&
//       adjacentIndex < TITLE.length &&
//       TITLE[adjacentIndex] === " "
//     ) {
//       adjacentIndex += direction;
//     }

//     return letterRefs.current[
//       adjacentIndex
//     ];
//   };

//   const handleMouseEnter = (
//     index
//   ) => {
//     if (
//       !animationCompleteRef.current
//     ) {
//       return;
//     }

//     const currentLetter =
//       letterRefs.current[index];

//     const previousLetter =
//       getAdjacentLetter(index, -1);

//     const nextLetter =
//       getAdjacentLetter(index, 1);

//     // Main hovered letter
//     gsap.to(currentLetter, {
//       x: 0,
//       y: -16,
//       scale: 1.13,
//       rotation: gsap.utils.random(
//         -5,
//         5
//       ),
//       duration: 0.25,
//       ease: "power2.out",
//       overwrite: true,
//     });

//     // Previous letter moves left
//     if (previousLetter) {
//       gsap.to(previousLetter, {
//         x: -12,
//         y: -7,
//         scale: 1.05,
//         rotation: -3,
//         duration: 0.3,
//         ease: "power2.out",
//         overwrite: true,
//       });
//     }

//     // Next letter moves right
//     if (nextLetter) {
//       gsap.to(nextLetter, {
//         x: 12,
//         y: -7,
//         scale: 1.05,
//         rotation: 3,
//         duration: 0.3,
//         ease: "power2.out",
//         overwrite: true,
//       });
//     }
//   };

//   const handleMouseLeave = (
//     index
//   ) => {
//     if (
//       !animationCompleteRef.current
//     ) {
//       return;
//     }

//     const affectedLetters = [
//       getAdjacentLetter(index, -1),
//       letterRefs.current[index],
//       getAdjacentLetter(index, 1),
//     ].filter(Boolean);

//     gsap.to(affectedLetters, {
//       x: 0,
//       y: 0,
//       rotation: 0,
//       scale: 1,
//       duration: 0.65,
//       ease: "elastic.out(1, 0.4)",
//       overwrite: true,
//     });
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="
//         relative
//         flex w-full
//         justify-center
//         overflow-visible
//       "
//     >
//       <h1
//         aria-label={TITLE}
//         className="
//           flex whitespace-nowrap
//           text-center
//           font-fun
//           text-5xl leading-none
//           sm:text-7xl
//           md:text-8xl
//           lg:text-9xl
//         "
//       >
//         {TITLE.split("").map(
//           (character, index) => {
//             const isSpace =
//               character === " ";

//             return (
//               <span
//                 key={`${character}-${index}`}
//                 ref={(element) => {
//                   letterRefs.current[
//                     index
//                   ] = element;
//                 }}
//                 aria-hidden="true"
//                 className={`
//                   hero-letter
//                   relative inline-block
//                   select-none
//                   will-change-transform
//                   ${
//                     isSpace
//                       ? ""
//                       : "cursor-pointer"
//                   }
//                 `}
//                 onMouseEnter={
//                   isSpace
//                     ? undefined
//                     : () =>
//                         handleMouseEnter(
//                           index
//                         )
//                 }
//                 onMouseLeave={
//                   isSpace
//                     ? undefined
//                     : () =>
//                         handleMouseLeave(
//                           index
//                         )
//                 }
//               >
//                 {isSpace ? (
//                   <span className="inline-block w-[0.28em]">
//                     &nbsp;
//                   </span>
//                 ) : (
//                   <>
//                     {/* Dark offset shadow */}
//                     <span
//                       className="
//                         pointer-events-none
//                         absolute inset-0
//                         translate-x-[6px]
//                         translate-y-[7px]
//                         text-transparent
//                         [-webkit-text-stroke:8px_#1e293b]
//                         sm:[-webkit-text-stroke:10px_#1e293b]
//                         lg:[-webkit-text-stroke:12px_#1e293b]
//                       "
//                     >
//                       {character}
//                     </span>

//                     {/* Outer white outline */}
//                     <span
//                       className="
//                         pointer-events-none
//                         absolute inset-0
//                         text-transparent
//                         [-webkit-text-stroke:6px_white]
//                         sm:[-webkit-text-stroke:8px_white]
//                         lg:[-webkit-text-stroke:10px_white]
//                       "
//                     >
//                       {character}
//                     </span>

//                     {/* Inner orange outline */}
//                     <span
//                       className="
//                         pointer-events-none
//                         absolute inset-0
//                         text-transparent
//                         [-webkit-text-stroke:3px_#f97316]
//                         sm:[-webkit-text-stroke:5px_#f97316]
//                         lg:[-webkit-text-stroke:6px_#f97316]
//                       "
//                     >
//                       {character}
//                     </span>

//                     {/* Main letter */}
//                     <span
//                       className="
//                         pointer-events-none
//                         relative text-white
//                       "
//                     >
//                       {character}
//                     </span>
//                   </>
//                 )}
//               </span>
//             );
//           }
//         )}
//       </h1>
//     </div>
//   );
// };


const HeroTitle = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      <h1 className="hero-title text-5xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
        Aymen
      </h1>

      <h1 className="hero-title text-5xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
        Shoteri
      </h1>

      <h2 className="hero-title text-lg text-white/80 mt-4 sm:text-xl md:text-2xl">
        Full Stack Developer | Azure Cloud Engineer | DevOps Enthusiast
      </h2>
    </div>
  );
};

export default HeroTitle;