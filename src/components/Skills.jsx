import React from "react";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {skills.map((skillGroup, idx) => (
        <div
          key={idx}
          className="bg-accent rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary h-full flex flex-col"
        >
          <h3 className="text-lg font-bold text-white text-shadow-sm/10 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-2 mt-auto">
            {skillGroup.items.map((skill, skillIdx) => (
              <span
                key={skillIdx}
                className="px-3 py-1 bg-gradient-to-r from-orange-50 to-gray-50 text-primary rounded-full text-sm font-medium border border-orange-200 hover:from-orange-100 hover:to-gray-200 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
