import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { tabs } from "../data/tabs";
import { projectTabs } from "../data/projectTabs";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Tabs from "./Tabs";
import ProjectTabs from "./ProjectTabs";

const tabContent = {
  experience: <Experience />,
  skills: <Skills />,
  projects: (activeProjectTab) => <Projects activeCategory={activeProjectTab} />,
  about: <About />,
  contact: <Contact />,
};

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
    transition: { type: "spring", duration: 0.2 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    filter: "blur(5px)",
    transition: { ease: "easeIn", duration: 0.2 },
  }),
};

export default function Catalog() {
  const [[activeIndex, direction], setTab] = useState([0, 0]);
  const [activeProjectTab, setActiveProjectTab] = useState("all");

  const activeTab = tabs[activeIndex].id;

  const changeTab = (newIndex) => {
    if (newIndex === activeIndex) return;
    const dir = newIndex > activeIndex ? 1 : -1;
    setTab([newIndex, dir]);
    setActiveProjectTab("all"); // Reset project filter when changing tabs
  };

  return (
    <div className="min-h-screen font-basic">
      <div className="w-full flex flex-col items-center pt-20 space-y-10">
        {/* Main Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={changeTab} />

        {/* Project Category Tabs */}
        {activeTab === "projects" && (
          <ProjectTabs
            projectTabs={projectTabs}
            activeTab={activeProjectTab}
            onChange={(index) => setActiveProjectTab(projectTabs[index].id)}
          />
        )}

        {/* Animated Tab Content */}
        <div className="flex justify-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full py-6 rounded-2xl"
            >
              {activeTab === "projects"
                ? tabContent.projects(activeProjectTab)
                : tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
