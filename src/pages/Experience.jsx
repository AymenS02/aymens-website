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
    role: "Full Stack Developer Intern",
    image: "./experience/thewin.png",
    highlights: [
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Spearheaded the development of a dynamic educational platform</strong> using JavaScript, incorporating Coursera-like course management.
          </p>
        ),
      },
      {
        icon: <Palette className="w-4 h-4" />,
        text: (
          <p>
            <strong>Implemented SCSS</strong> into the design to increase manageability and readability.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            Integrated <strong>secure payment gateways and user authentication</strong> using Collect.js, Tokenization, and Public Security Keys.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Designed and maintained RESTful APIs</strong> and optimized performance with <strong>MongoDB Atlas</strong>.
          </p>
        ),
      },
      {
        icon: <Users className="w-4 h-4" />,
        text: (
          <p>
            Ensured reliable performance for <strong>100+ active users</strong>, managing their data securely.
          </p>
        ),
      },
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Engineered a responsive and intuitive UI</strong> for smooth usability across screen sizes.
          </p>
        ),
      },
    ],
  },
  {
    company: "Freelancing Web Developer",
    period: "December 2023 - Present",
    role: "Freelancing Web Developer",
    image: "./experience/logoN.png",
    highlights: [
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Developed custom websites</strong> using React and Next.js, aligned with client needs.
          </p>
        ),
      },
      {
        icon: <Palette className="w-4 h-4" />,
        text: (
          <p>
            <strong>Implemented Tailwind CSS</strong> for faster development and consistent styling.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            Integrated <strong>secure payments and subscriptions</strong> using Stripe and PayPal APIs.
          </p>
        ),
      },
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Created animated sites</strong> with Framer Motion for dynamic user engagement.
          </p>
        ),
      },
      {
        icon: <Users className="w-4 h-4" />,
        text: (
          <p>
            Managed <strong>MongoDB client databases</strong> for secure, scalable storage.
          </p>
        ),
      },
      {
        icon: <Palette className="w-4 h-4" />,
        text: (
          <p>
            <strong>Designed and built interfaces</strong> with Figma and React, improving client satisfaction.
          </p>
        ),
      },
    ],
  },
  {
    company: "Road 2 Righteousness",
    period: "October 2024 - Present",
    role: "Road 2 Righteousness Front-End Developer",
    image: "./experience/r2r.png",
    highlights: [
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Developed a custom site</strong> with React and Tailwind CSS, serving <strong>200+ visitors</strong>.
          </p>
        ),
      },
      {
        icon: <Palette className="w-4 h-4" />,
        text: (
          <p>
            <strong>Implemented Tailwind CSS</strong> for a responsive and modern design.
          </p>
        ),
      },
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Utilized GSAP animations</strong> to create smooth, interactive experiences.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Managed secure user registration</strong> with a scalable backend.
          </p>
        ),
      },
      {
        icon: <Users className="w-4 h-4" />,
        text: (
          <p>
            <strong>Built a retreat booking system</strong> to streamline user sign-ups.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Optimized performance</strong> for high traffic and fast load times.
          </p>
        ),
      },
    ],
  },
  {
    company: "McMaster MSA",
    period: "October 2024 - Present",
    role: "McMaster MSA Website and Software Engineer",
    image: "./experience/macmsa.png",
    highlights: [
      {
        icon: <Users className="w-4 h-4" />,
        text: (
          <p>
            <strong>Collaborated in a team of 6</strong> to build a full-stack website and portal.
          </p>
        ),
      },
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Built a responsive front-end</strong> with React, Next.js, and Tailwind CSS.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Secured admin access</strong> using Firebase Authentication.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Utilized Firebase Firestore</strong> for scalable real-time data storage.
          </p>
        ),
      },
      {
        icon: <Code className="w-4 h-4" />,
        text: (
          <p>
            <strong>Incorporated GSAP animations</strong> for engaging UI transitions.
          </p>
        ),
      },
      {
        icon: <Palette className="w-4 h-4" />,
        text: (
          <p>
            <strong>Designed admin dashboards</strong> to manage portal content efficiently.
          </p>
        ),
      },
      {
        icon: <Database className="w-4 h-4" />,
        text: (
          <p>
            <strong>Optimized for performance</strong> during high-traffic periods.
          </p>
        ),
      },
    ],
  },
];



const skills = [
  { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion", "GSAP", "WebGL"] },
  { category: "Backend", items: ["Node.js", "Express", "RESTful APIs", "Firebase", "Authentication"] },
  { category: "Database", items: ["MongoDB", "MongoDB Atlas", "Firebase Firestore", "Database Optimization"] },
  { category: "Tools & Technologies", items: ["Git", "Docker", "Figma", "Stripe API", "PayPal API", "Collect.js"] },
  { category: "Soft Skills", items: ["Team Collaboration", "UI/UX Design", "Problem Solving", "Project Management", "Graphic Design"] },
  { category: "Languages", items: ["Python", "Java", "Haskell", "C", "C++"] } // <-- New category
];

const projects = [
  {
    title: "R2R Company Website",
    description: "Production website for Road 2 Righteousness with advanced booking system, GSAP animations, and optimized performance for high traffic.",
    tech: ["React", "Tailwind CSS", "GSAP", "Backend Integration"],
    liveLink: "https://www.road2righteousness.ca/",
    githubLink: "https://github.com/AymenS02/R2R",
    image: "/projects/r2rpage.png",
    featured: true
  },
  {
    title: "Crypto Tracker App",
    description: "Real-time cryptocurrency tracking application with live price updates, charts, and market data visualization.",
    tech: ["React", "API Integration", "Chart.js", "CSS"],
    liveLink: "https://aymens02.github.io/Crypto-Tracker/",
    githubLink: "https://github.com/AymenS02/Crypto-Tracker",
    image: "/projects/cointracker.png",
    featured: true
  },
  {
    title: "Limeworth X-ray & Ultrasound",
    description: "Modern medical clinic website with responsive design, appointment booking, and service information.",
    tech: ["React", "Tailwind CSS", "Responsive Design"],
    liveLink: "https://aymens02.github.io/Limeworth/",
    githubLink: "https://github.com/AymenS02/Limeworth",
    image: "/projects/limeworth.png",
    featured: true
  },
  {
    title: "PvP Library Rankings",
    description: "Pokemon GO PvP ranking generator with multiple API integrations for competitive player statistics and battle analysis.",
    tech: ["JavaScript", "Multiple APIs", "Data Visualization"],
    liveLink: "https://aymens02.github.io/pvpoke-rankings-generator/",
    githubLink: "https://github.com/AymenS02/pvpoke-rankings-generator",
    image: "/projects/poke-rank.png"
  },
  {
    title: "Hamad's Portfolio Website",
    description: "Creative portfolio website featuring smooth GSAP animations, modern design, and interactive user experience.",
    tech: ["React", "GSAP", "CSS Animations", "Portfolio Design"],
    liveLink: "https://aymens02.github.io/Hamads-Website/",
    githubLink: "https://github.com/AymenS02/Hamads-Website",
    image: "/projects/hamad.png"
  },
  {
    title: "Pokemon Memory Game",
    description: "Interactive memory card game built with React, featuring Pokemon characters, score tracking, and responsive gameplay.",
    tech: ["React", "Game Logic", "State Management", "CSS"],
    liveLink: "https://poke-card-game-qwrrvokam-aymen-shoteris-projects.vercel.app/",
    githubLink: "https://github.com/AymenS02/Pokemon-Memory-Game",
    image: "/projects/poke-game.png"
  },
  {
    title: "Solar System Graphics",
    description: "3D solar system simulation with realistic planet movements, textures, and orbital mechanics using C++ and OpenGL.",
    tech: ["C++", "OpenGL", "3D Graphics", "Physics Simulation"],
    githubLink: "https://github.com/AymenS02/Solar-System",
    image: "/projects/solarsystem.gif"
  },
  {
    title: "Connect 4 with AI",
    description: "Classic Connect 4 game featuring an intelligent AI opponent with minimax algorithm and difficulty levels.",
    tech: ["Python", "AI Algorithm", "Minimax", "Game Development"],
    githubLink: "https://github.com/AymenS02/Connect-4-Game",
    image: "/projects/connect4.png"
  },
  {
    title: "Scammer Penalty System",
    description: "Python-based system for detecting and penalizing scammer activities with automated reporting features.",
    tech: ["Python", "Automation", "Data Processing", "Security"],
    githubLink: "https://github.com/AymenS02/Scammer-Penalty",
    image: "/projects/scammer.webp"
  },
  {
    title: "Ex-Personal Portfolio",
    description: "Previous iteration of personal portfolio showcasing earlier work and design evolution.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://aymens02.github.io/AymenShoteri.github.io/",
    githubLink: "https://github.com/AymenS02/AymenShoteri.github.io",
    image: "/projects/personalPort.png"
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
            <div className="lg:w-1/4 bg-gradient-to-b lg:bg-gradient-to-r from-primary to-accent p-8 flex items-center justify-center">
              <div className="relative">
                <img
                  src={exp.image}
                  className="w-36 h-auto lg:w-36 lg:h-auto rounded-sm object-fit "
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {skills.map((skillGroup, index) => (
        <div key={index} className="bg-accent rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary h-full flex flex-col">
          <h3 className="text-lg font-bold text-white text-shadow-sm/10 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-2 mt-auto">
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
    <div className="space-y-8">
      {/* Featured Projects */}
      <div className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="bg-accent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-500 group overflow-hidden">
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
                        <Github className="w-5 h-5 text-gray-500 " />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 mb-4 leading-relaxed text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
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
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-secondary p-0.5 rounded-2xl shadow-lg border border-primary">
          {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => changeTab(idx)}
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