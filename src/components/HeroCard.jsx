import React from "react";

const CARD_DEPTH = 20;

const HeroCard = () => {
  const depthLayers = Array.from(
    { length: CARD_DEPTH },
    (_, index) => index - CARD_DEPTH / 2
  );

  return (
    <div className="flex min-h-screen items-start justify-start perspective-distant">
      <div
        className="
          relative h-[500px] w-[350px]
          transform-3d
          rotate-x-6 -rotate-y-24 rotate-z-6
          transition-transform duration-500 ease-out
          hover:-translate-y-3
          hover:rotate-x-2
          hover:-rotate-y-3
          hover:rotate-z-0
        "
      >
        {/* Stacked layers create rounded 3D thickness */}
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
      </div>
    </div>
  );
};

export default HeroCard;