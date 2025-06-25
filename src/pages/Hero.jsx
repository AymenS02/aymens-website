import Catalog from "../components/Catalog.jsx";
import { Mail, Linkedin, Github } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full">

      {/* Portfolio Section */}
      <div className="flex max-lg:flex-col justify-between max-lg:justify-center items-center min-h-[20vh]">

        <div className="flex flex-col justify-center max-lg:items-center mt-10 gap-2 ">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-title text-shadow-sm/10">Aymen Shoteri</h1>
          <h2 className="lg:text-3xl md:text-2xl text-xl font-title">Full Stack Developer</h2>
          <div className="max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center leading-tight font-basic">
            <p className="lg:text-lg md:text-md text-sm mb-0 max-sm:hidden">
              4th Year Bachelor of Science in <b>Mathematics and Computer Science</b>,
            </p>
            <p className="lg:text-lg md:text-md text-sm max-sm:hidden">
              <b>McMaster University</b>
            </p>
            <p className="text-sm mb-0 sm:hidden text-center mt-4">
              4th Year Bachelor of Science in <b>Mathematics and Computer Science</b>, <b>McMaster University</b>
            </p>
            
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              {/* Resume Button */}
              <a
                href="/ShoteriAresume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-title px-5 py-2.5 rounded-lg border-2 border-secondary hover:bg-[#83392f] transition-colors duration-300 shadow-sm"
              >
                Resume
              </a>

              {/* Email */}
              <a
                href="mailto:shoteriaymen@gmail.com"
                className="m-1 rounded-lg flex items-center justify-center"
                title="Email"
              >
                <Mail className="w-6 h-6 text-gray-700 hover:text-primary transition-all duration-300" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AymenS02"
                target="_blank"
                rel="noopener noreferrer"
                className="m-1 rounded-lg flex items-center justify-center"
                title="GitHub"
              >
                <Github className="w-6 h-6 text-gray-700 hover:text-primary transition-all duration-300" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/aymen-shoteri/"
                target="_blank"
                rel="noopener noreferrer"
                className="m-1 rounded-lg flex items-center justify-center"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-gray-700 hover:text-primary transition-all duration-300" />
              </a>
            </div>

          </div>
        </div>
        
        <div className="flex items-center justify-center m-2 p-[2px] bg-primary border-2 border-secondary rounded-xl shadow-2xl max-lg:mt-10">
          <img
            src="./aymen.png"
            className="max-h-[25vh] rounded-xl border-2 border-black object-contain"
            alt="Aymen Shoteri"
          />
        </div>
        
      </div>

      {/* About Section */}
      <div className="flex justify-center mt-[10vh] max-lg:mt-10 mx-20">
        <p className="text-center text-lg font-basic">
          Welcome to my portfolio! I am a <b>Full Stack Developer</b> with a passion for creating dynamic and responsive web applications. Explore my work and feel free to get in touch!
        </p>
      </div>

      {/* Experience Section */}
      <Catalog />

    </div>
  );
};

export default Hero;
