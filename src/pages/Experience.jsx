import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact" },
];

const tabContent = {
  experience: <p>Here’s some experience content...</p>,
  skills: (
    <ul className="list-disc pl-6">
      <li>JavaScript / TypeScript</li>
      <li>React, Tailwind CSS</li>
      <li>Node.js, Express</li>
      <li>MongoDB, Firebase</li>
      <li>Git, Docker</li>
    </ul>
  ),
  projects: (
    <p>
      Visit my GitHub to see projects like a budgeting app, a community ranking platform, and real-time multiplayer games.
    </p>
  ),
  about: (
    <p>
      I'm a 4th year Mathematics & Computer Science student at McMaster University, passionate about problem solving, UI design, and building things that matter.
    </p>
  ),
  contact: (
    <p>
      Email: <a href="mailto:aymen@example.com" className="underline">aymen@example.com</a><br />
      LinkedIn: <a href="https://linkedin.com/in/aymenshoteri" className="underline">/aymenshoteri</a>
    </p>
  ),
};

// Define animation variants using a direction passed through 'custom'
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    filter: "blur(5px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.5 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    filter: "blur(5px)",
    transition: { ease: "easeIn", duration: 0.5 },
  }),
};

export default function Experience() {
  const [[activeIndex, direction], setTab] = useState([0, 0]);

  const activeTab = tabs[activeIndex].id;

  const changeTab = (newIndex) => {
    if (newIndex === activeIndex) return;
    const dir = newIndex > activeIndex ? 1 : -1;
    setTab([newIndex, dir]);
  };

  return (
    <div className="flex flex-col items-center mt-[10vh] px-4 space-y-10">
      {/* Tab Buttons */}
      <div className="flex space-x-2 bg-secondary p-0.5 rounded-xl shadow-2xl relative border-2 border-primary">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => changeTab(idx)}
            className="relative px-5 py-4 text-sm font-medium text-white rounded-full transition-all duration-300 ease-in-out z-20"
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-primary mix-blend-difference rounded-xl z-10"
                transition={{ type: "linear", duration: 0.3 }}
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="w-screen mx-auto text-black font-basic px-8 max-w-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
