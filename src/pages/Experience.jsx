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
  experience: (
    <div className="flex justify-evenly gap-4">
      <img
        src="./aymen.png"
        className="h-[25vh] rounded-xl border-2 border-primary object-contain"
        alt="Aymen Shoteri"
      />
      <div className="p-4 bg-accent rounded-xl border-2 border-primary">
        <h2 className="text-2xl font-bold mb-4">The Win Column</h2>
        <p className="text-lg mb-2">
          I have worked on various projects, including web applications and games, utilizing technologies like React, Node.js, and MongoDB.
        </p>
        <p className="text-lg">
          My experience includes internships and personal projects where I focused on full-stack development, UI design, and problem-solving.
        </p>
      </div>
    </div>
  ),
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
    <div className="w-full flex flex-col items-center mt-[10vh] px-4 space-y-10">
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
      <div className="flex justify-center w-screen text-black font-basic px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-[1000px] rounded-xl border-2 border-primary bg-secondary p-6 shadow-2xl"
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
