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
    <p>
      I’ve worked as a Full Stack Developer intern at XYZ Corp, building scalable applications using React, Node.js, and MongoDB. I also contributed to UI/UX improvements and performance optimizations.
    </p>
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
      LinkedIn: <a href="https://linkedin.com/in/aymenshoteri" target="_blank" rel="noopener noreferrer" className="underline">/aymenshoteri</a>
    </p>
  ),
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <div className="flex flex-col items-center mt-[10vh] px-4 space-y-10">
      {/* Tab Buttons */}
      <div className="flex space-x-2 bg-secondary p-2 rounded-full shadow-2xl relative border-2 border-primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 ease-in-out z-20"
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-primary mix-blend-difference rounded-full z-10"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="w-screen mx-auto text-black font-basic">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
