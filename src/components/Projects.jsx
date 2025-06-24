import React from "react";
import { projects } from "../data/projects";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-accent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-500 group overflow-hidden"
            >
              <div className="mb-4 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-white text-shadow-sm/10">
                    {project.title}
                  </h4>
                  <div className="flex gap-2">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors duration-200" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 text-gray-500" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 mb-4 leading-relaxed text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 bg-gradient-to-r from-orange-50 to-gray-50 text-primary rounded text-xs font-medium border-orange-200 hover:from-orange-100 hover:to-gray-200 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline font-medium flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline font-medium flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
