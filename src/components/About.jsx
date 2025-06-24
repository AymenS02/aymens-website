import React from "react";
import { MapPin, Calendar } from "lucide-react";

export default function About() {
  return (
    <div className="bg-accent rounded-2xl p-8 shadow-lg border border-primary">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="flex-shrink-0">
          <img
            src="./aymen.png"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
            alt="Aymen Shoteri"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-white text-shadow-sm/10 mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            I'm a 4th year Mathematics & Computer Science student at McMaster University, passionate about problem solving, UI design, and building things that matter. With experience across the full stack, I love creating seamless user experiences and robust backend systems that make a real impact.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-center lg:justify-start">
              <MapPin className="w-4 h-4 text-primary mr-2" />
              <span className="text-gray-600">Hamilton, ON</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <Calendar className="w-4 h-4 text-primary mr-2" />
              <span className="text-gray-600">4th Year Student</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
