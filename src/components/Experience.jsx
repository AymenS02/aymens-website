import React from "react";
import { Code, Palette, Database, Users } from "lucide-react";
import { experiences } from "../data/experiences"; // adjust path accordingly

const iconMap = {
  Code: <Code className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
};

export default function Experience() {
  return (
    <div className="space-y-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="bg-accent rounded-2xl shadow-2xl border border-primary overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/4 bg-gradient-to-b lg:bg-gradient-to-r from-primary to-accent p-8 flex items-center justify-center">
              <img
                src={exp.image}
                alt={exp.company}
                className="w-36 h-auto rounded-sm object-cover"
              />
            </div>
            <div className="lg:w-3/4 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">{exp.company}</h2>
                  <p className="text-base lg:text-lg text-primary font-semibold mb-3">{exp.role}</p>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                  {/* You can import Calendar icon to add here if you want */}
                  <span className="text-sm font-medium">{exp.period}</span>
                </div>
              </div>
              <div className="grid gap-3 lg:gap-4 lg:grid-cols-2">
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-shrink-0 mt-1 mr-3 p-2 bg-white rounded-lg shadow-sm text-primary">
                      {iconMap[highlight.icon]}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{highlight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
