import React from "react";

import HeroTitle from "./components/HeroTitle";
import HeroSubtitle from "./components/HeroSubtitle";
import HeroCard from "./components/HeroCard";

const App = () => {
  return (
    <main>
      {/* Hero */}
      <section
        className="
          relative min-h-screen w-full
          overflow-hidden
          bg-primary
        "
      >
        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-start gap-20 p-8 sm:p-12 lg:p-20">
          <HeroTitle />

          {/* <HeroSubtitle /> */}
        </div>

        {/* Full-screen animation stage */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            perspective-distant
          "
        >
          {/* This wrapper controls where the card lands */}
          <div
            className="
              pointer-events-auto
              absolute left-1/2 top-[70%]
              -translate-x-1/2 -translate-y-1/2
              lg:left-[85%] lg:top-[70%]
            "
          >
            <HeroCard />
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;