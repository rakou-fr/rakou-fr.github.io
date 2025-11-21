import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-scroll";

export default function Footer() {
  return (
    <footer className=" text-white pt-8 pb-4 w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo + Nom centré */}
        <div className="flex flex-col items-center font-mono">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
            {'{ 005 }'}
          </span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
            Rakou
          </span>
        </div>

        {/* Logos sociaux collés à droite */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full p-[2px]"
            style={{ background: 'linear-gradient(90deg,#13B0F5,#E70FAA)' }}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
              <FaGithub className="text-white"/>
            </div>
          </a>
          {/* <a
            href="https://linkedin.com/in/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full p-[2px]"
            style={{ background: 'linear-gradient(90deg,#13B0F5,#E70FAA)' }}
          >
            <div className="w-full h-full flex items-center justify-center bg-blue-700 rounded-full">
              <FaLinkedin className="text-white"/>
            </div>
          </a> */}
        </div>
      </div>

      {/* Ligne horizontale */}
      <div className="border-t border-gray-700 my-4 mx-4 md:mx-8"></div>

      {/* Menu + Texte droit */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm md:text-base">
        {/* Menu */}
        <div className="flex flex-wrap gap-6 mb-2 md:mb-0 font-semibold text-gris">
          <Link to="home" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Menu</Link>
          <Link to="techstack" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Stack Technique</Link>
          <Link to="projects" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Projets</Link>
          <Link to="about" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">À Propos</Link>
          <Link to="services" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Services</Link>
          <Link to="contact" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Contact</Link>
        </div>

        {/* Texte droit */}
        <div className="text-center md:text-right">
          Designé et crée par{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">Rakou</span>{" "}
          avec{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">Amour</span>{" "}
          et du{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">Coca Cola</span>
        </div>
      </div>
    </footer>
  );
}
