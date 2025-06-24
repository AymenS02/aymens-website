import React from "react";

export default function experienceCard({ experiences }) {
  return (
    <div className="bg-accent rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden border border-primary">
      <div className="lg:flex">
        {/* Image Section */}
        <div className="lg:w-1/4 bg-gradient-to-b lg:bg-gradient-to-r from-primary to-accent p-8 flex items-center justify-center">
          <div className="relative">
            <img
              src={experiences.image}
              className="w-36 h-auto lg:w-36 lg:h-auto rounded-sm object-fit"
              alt={`${experiences.company} logo`}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-3/4 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-white text-shadow-sm/10 mb-2">
                {experiences.company}
              </h2>
              <p className="text-base lg:text-lg text-primary font-semibold mb-3">
                {experiences.role}
              </p>
            </div>
            <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
              {/** Assuming Calendar icon passed as part of highlights? Or import separately if needed */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">{experiences.period}</span>
            </div>
          </div>

          <div className="grid gap-3 lg:gap-4 lg:grid-cols-2">
            {experiences.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-1 mr-3 p-2 bg-white rounded-lg shadow-sm">
                  <div className="text-primary">{highlight.icon}</div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
