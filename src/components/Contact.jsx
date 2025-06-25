import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-accent rounded-2xl p-8 shadow-lg border border-primary max-lg:mx-4 font-basic">
      <h2 className="text-2xl font-bold text-white text-shadow-sm/10 mb-6 text-center">Get In Touch</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <a
          href="mailto:shoteriaymen@gmail.com"
          className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group border border-blue-200"
        >
          <div className="text-center">
            <Mail className="w-8 h-8 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-sm text-gray-600 mt-1">shoteriaymen@gmail.com</p>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/aymen-shoteri/"
          className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group border border-purple-200"
        >
          <div className="text-center">
            <Linkedin className="w-8 h-8 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900">LinkedIn</h3>
            <p className="text-sm text-gray-600 mt-1">/aymenshoteri</p>
          </div>
        </a>

        <a
          href="https://github.com/AymenS02"
          className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group border border-gray-200"
        >
          <div className="text-center">
            <Github className="w-8 h-8 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900">GitHub</h3>
            <p className="text-sm text-gray-600 mt-1">View Projects</p>
          </div>
        </a>
      </div>
    </div>
  );
}
