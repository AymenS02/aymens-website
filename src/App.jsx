import React from "react";

import HeroTitle from "./components/HeroTitle";
import HeroCard from "./components/HeroCard";
// import Icons from "./components/Icons";
// import Swirls from "./components/Swirls";

const App = () => {
  return (
    <main>
      {/* Hero */}
      <section
        className="
          relative min-h-screen w-full
          overflow-hidden
          bg-[#8a2f19]
        "
      >
        {/* Background swirls */}
        {/* <div className="pointer-events-none absolute inset-0 z-0">
          <Swirls />
        </div> */}

        {/* Animated icons */}
        {/* <div className="absolute inset-0 z-10">
          <Icons />
        </div> */}

        {/* Profile card */}
        <div
          className="
            pointer-events-none
            absolute inset-0 z-20
            perspective-distant
          "
        >
          {/* Mobile position */}
          <div
            className="
              pointer-events-auto
              absolute left-1/2 top-[70%]
              -translate-x-1/2
              -translate-y-1/2

              lg:left-auto
              lg:right-[5%]
              lg:top-[70%]
              lg:translate-x-0
            "
          >
            <HeroCard />
          </div>
        </div>

        {/* Hero text */}
        <div
          className="
            h-screen
            justify-center
            pointer-events-none
            relative z-30
            flex flex-col
            items-start gap-20
            p-8
            sm:p-12
            lg:p-20
          "
        >
          <div className="pointer-events-auto">
            <HeroTitle />
          </div>

          {/* <HeroSubtitle /> */}
        </div>
      </section>
    </main>
  );
};

export default App;