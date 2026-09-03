import React from "react";
import { projects } from "../data/projects";
import {
  ArrowUpRight,
  Github,
} from "lucide-react";

export default function Projects({
  activeCategory,
}) {
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) =>
          Array.isArray(project.category)
            ? project.category.includes(
                activeCategory
              )
            : project.category ===
              activeCategory
        );

  return (
    <section className="w-full font-basic">
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2">
          {filteredProjects.map(
            (project, idx) => (
              <article
                key={project.title ?? idx}
                className="group flex h-full flex-col"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-orange-500 bg-accent">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                </div>

                {/* Project Content */}
                <div className="flex flex-1 flex-col pt-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-xl font-bold leading-snug text-white sm:text-2xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 max-w-[95%] text-sm leading-6 text-gray-400">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Links */}
                    <div className="flex shrink-0 items-center gap-2">
                      {project.githubLink && (
                        <a
                          href={
                            project.githubLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/40 text-gray-400 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 hover:scale-105"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {project.tech.map(
                      (tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="whitespace-nowrap rounded-full border border-orange-500/30 bg-accent px-3 py-1 text-xs text-gray-300 transition-colors duration-200 hover:border-primary hover:text-primary"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-sm text-gray-400">
            No projects found for this
            category.
          </p>
        </div>
      )}
    </section>
  );
}