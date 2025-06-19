import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Code, Database, Palette, Mail, Linkedin, Github, ExternalLink } from "lucide-react";

const tabs = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact" },
];

const experiences = [
  {
    company: "The Win Column",
    period: "May 2024 - Aug 2024",
    role: "Full Stack Developer",
    image: "./experience/thewin.png",
    highlights: [
      { 
        text: "Spearheaded the development of a dynamic educational platform using JavaScript, incorporating Coursera-like course management.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Implemented SCSS into the design to increase manageability and readability.",
        icon: <Palette className="w-4 h-4" />
      },
      { 
        text: "Integrated secure payment gateways and user authentication systems using Collect.js, Tokenization, and Public Security Keys for smooth transactions.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Designed and maintained RESTful APIs and optimized database queries to enhance platform performance and reliability with MongoDB Atlas.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Ensured smooth operation for over 100 active users, effectively managing their data and maintaining high performance.",
        icon: <Users className="w-4 h-4" />
      },
      { 
        text: "Engineered a responsive and intuitive user interface, ensuring seamless usability across various screen sizes.",
        icon: <Code className="w-4 h-4" />
      }
    ]
  },
  {
    company: "Freelancing Web Developer",
    period: "December 2023 - Present",
    role: "Full Stack Developer",
    image: "./experience/logoN.png",
    highlights: [
      { 
        text: "Developed custom websites using React and Next.js, aligned with client demands and requirements.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Implemented Tailwind CSS to streamline the styling process, resulting in faster development and consistent design across projects.",
        icon: <Palette className="w-4 h-4" />
      },
      { 
        text: "Integrated secure payment gateways and subscription models using Stripe and PayPal APIs, ensuring smooth and reliable transactions.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Created interactive and animated websites using Framer Motion, engaging users with dynamic content and seamless transitions.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Managed client databases using MongoDB, ensuring secure storage and quick access for over 50 active clients.",
        icon: <Users className="w-4 h-4" />
      },
      { 
        text: "Designed responsive and user-friendly interfaces with Figma and implemented them with React, improving client satisfaction.",
        icon: <Palette className="w-4 h-4" />
      }
    ]
  },
  {
    company: "Road 2 Righteousness",
    period: "October 2024 - Present",
    role: "Front-End Developer",
    image: "./experience/r2r.png",
    highlights: [
      { 
        text: "Developed a custom website for a self-development retreat company using React and Tailwind CSS, catering to over 200 visitors.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Implemented Tailwind CSS to streamline styling, ensuring a modern, responsive design that enhanced visual appeal.",
        icon: <Palette className="w-4 h-4" />
      },
      { 
        text: "Utilized GSAP animations to create engaging and dynamic user experiences with smooth transitions and interactive elements.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Managed secure user registrations and data using a scalable backend for personal development session sign-ups.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Designed and implemented a booking system allowing users to seamlessly register for retreats.",
        icon: <Users className="w-4 h-4" />
      },
      { 
        text: "Optimized the website for high traffic, ensuring smooth performance and quick load times during peak usage.",
        icon: <Database className="w-4 h-4" />
      }
    ]
  },
  {
    company: "McMaster MSA",
    period: "October 2024 - Present",
    role: "Website and Software Engineer",
    image: "./experience/macmsa.png",
    highlights: [
      { 
        text: "Collaborated in a team of 6 to develop a full-stack website and portal for McMaster MSA, providing a seamless platform.",
        icon: <Users className="w-4 h-4" />
      },
      { 
        text: "Developed a responsive front-end using React, Next.js, and Tailwind CSS with modern design for students and admins.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Implemented secure portal access for administrators using Firebase Authentication for efficient management.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Utilized Firebase Firestore as the backend to store and manage user data with real-time database solution.",
        icon: <Database className="w-4 h-4" />
      },
      { 
        text: "Incorporated GSAP animations to enhance user experience with smooth transitions and interactive elements.",
        icon: <Code className="w-4 h-4" />
      },
      { 
        text: "Designed and implemented admin dashboards for easy management of portal content, improving operational efficiency.",
        icon: <Palette className="w-4 h-4" />
      },
      { 
        text: "Optimized the website for performance, ensuring fast load times and smooth functionality during high traffic periods.",
        icon: <Database className="w-4 h-4" />
      }
    ]
  }
];

const skills = [
  { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion", "GSAP"] },
  { category: "Backend", items: ["Node.js", "Express", "RESTful APIs", "Firebase", "Authentication"] },
  { category: "Database", items: ["MongoDB", "MongoDB Atlas", "Firebase Firestore", "Database Optimization"] },
  { category: "Tools & Technologies", items: ["Git", "Docker", "Figma", "Stripe API", "PayPal API", "Collect.js"] },
  { category: "Soft Skills", items: ["Team Collaboration", "UI/UX Design", "Problem Solving", "Project Management"] }
];

const projects = [
  {
    title: "Educational Platform",
    description: "A Coursera-like platform with course management, payment integration, and user authentication for 100+ active users.",
    tech: ["JavaScript", "MongoDB", "SCSS", "Collect.js"],
    link: "#"
  },
  {
    title: "Self-Development Retreat Website",
    description: "Modern website with booking system, GSAP animations, and optimized performance for 200+ visitors.",
    tech: ["React", "Tailwind CSS", "GSAP", "Backend Integration"],
    link: "#"
  },
  {
    title: "University Portal System",
    description: "Full-stack platform for McMaster MSA with admin dashboards, Firebase authentication, and real-time data.",
    tech: ["React", "Next.js", "Firebase", "Tailwind CSS"],
    link: "#"
  }
];

const tabContent = {
  experience: (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div 
          key={index}
          className="bg-accent rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden border border-primary"
        >
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/4 bg-gradient-to-r from-primary to-accent p-8 flex items-center justify-center">
              <div className="relative">
                <img
                  src={exp.image}
                  className="w-36 h-36 lg:w-36 lg:h-36 rounded-sm object-cover "
                  alt="Aymen Shoteri"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/4 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white text-shadow-sm/10 mb-2">{exp.company}</h2>
                  <p className="text-base lg:text-lg text-primary font-semibold mb-3">{exp.role}</p>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{exp.period}</span>
                </div>
              </div>

              <div className="grid gap-3 lg:gap-4 lg:grid-cols-2">
                {exp.highlights.map((highlight, hIndex) => (
                  <div 
                    key={hIndex}
                    className="flex items-start p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 mt-1 mr-3 p-2 bg-white rounded-lg shadow-sm">
                      <div className="text-primary">
                        {highlight.icon}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {highlight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  skills: (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skillGroup, index) => (
        <div key={index} className="bg-accent rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary">
          <h3 className="text-lg font-bold text-white text-shadow-sm/10 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill, skillIndex) => (
              <span 
                key={skillIndex}
                className="px-3 py-1 bg-gradient-to-r from-orange-50 to-gray-50 text-primary rounded-full text-sm font-medium border border-orange-200 hover:from-orange-100 hover:to-gray-200 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  projects: (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div key={index} className="bg-accent rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary group">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-white text-shadow-sm/10 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-200" />
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Visit my <a href="#" className="text-primary hover:underline font-medium">GitHub</a> to explore more projects
          </div>
        </div>
      ))}
    </div>
  ),
  about: (
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
  ),
  contact: (
    <div className="bg-accent rounded-2xl p-8 shadow-lg border border-primary">
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
  ),
};

// Define animation variants using a direction passed through 'custom'
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

export default function Experience() {
  const [[activeIndex, direction], setTab] = useState([0, 0]);

  const activeTab = tabs[activeIndex].id;

  const changeTab = (newIndex) => {
    if (newIndex === activeIndex) return;
    const dir = newIndex > activeIndex ? 1 : -1;
    setTab([newIndex, dir]);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-col items-center pt-20 px-4 space-y-10">
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 bg-secondary p-2 rounded-2xl shadow-lg border border-primary">
          {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => changeTab(idx)}
            className={`relative px-5 py-4 text-sm font-medium rounded-full transition-all duration-300 ease-in-out z-20 group
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

        {/* Animated Content */}
        <div className="flex justify-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full  p-6 rounded-2xl"
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}