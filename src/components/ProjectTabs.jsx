import React from 'react'
import { motion } from "framer-motion";

export default function ProjectTabs({ projectTabs, activeTab, onChange }) {
  return (
    <div className="sticky top-2 z-50 flex flex-wrap justify-center gap-2 p-2 bg-secondary rounded-2xl shadow-lg border border-primary mx-4">
      {projectTabs.map((tab, idx) => (
        <button
          key={tab.id}
          onClick={() => onChange(idx)}
          className={`relative px-5 py-3 text-sm font-medium rounded-full transition-all duration-300 ease-in-out z-20 group
            ${activeTab === tab.id ? "text-white" : "text-white hover:scale-115"}`}
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
  )
}
