import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    const savedMute = localStorage.getItem("musicMuted") === "true";
    const savedVolume = parseFloat(localStorage.getItem("musicVolume")) || 0.25;
    setMuted(savedMute);
    setVolume(savedVolume);
  }, []);

  const toggleMute = () => {
    const newState = !muted;
    setMuted(newState);
    localStorage.setItem("musicMuted", newState);
    window.dispatchEvent(new CustomEvent("toggle-audio", { detail: newState }));
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("musicVolume", newVolume);
    window.dispatchEvent(new CustomEvent("change-volume", { detail: newVolume }));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-xl border border-gray-800 backdrop-blur-md ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 shadow-md">

        {/* LOGO + SON */}
        <div className="flex items-center gap-4 font-mono text-lg relative">

          <div className="flex flex-col items-center">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-c1 to-c2">{'{ 005 }'}</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-c1 to-c2">Rakou</span>
          </div>

          {/* ICON + SLIDEUR */}
          <div className="relative flex items-center group">

            <button
              onClick={toggleMute}
              className="text-white text-2xl hover:scale-110 transition"
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            {/* SLIDEUR DE VOLUME */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="
                absolute left-8 top-1/2 -translate-y-1/2 
                w-28 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-c1 
                hidden md:block
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            />
          </div>
        </div>

        {/* NAV PC */}
        <nav className="hidden md:flex items-center space-x-6 text-l text-gray-300 font-semibold">
          <Link to="home" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Menu</Link>
          <Link to="techstack" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Stack Technique</Link>
          <Link to="projects" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Projets</Link>
          <Link to="about" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">À Propos</Link>
          <Link to="services" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Services</Link>
          <Link to="contact" smooth duration={700} offset={-80} className="hover:text-white cursor-pointer">Contact</Link>

          <a href="https://github.com/rakou-fr" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center rounded-full p-[2px]"
             style={{ background: 'linear-gradient(90deg, #13B0F5 3%, #E70FAA 100%)' }}>
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
              <FaGithub className="text-white" />
            </div>
          </a>

          {/* <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center rounded-full p-[2px]"
             style={{ background: 'linear-gradient(90deg, #13B0F5 3%, #E70FAA 100%)' }}>
            <div className="w-full h-full flex items-center justify-center bg-blue-700 rounded-full">
              <FaLinkedin className="text-white" />
            </div>
          </a> */}

          <a href="https://buymeacoffee.com/rakoulux" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full p-[2px]"
            style={{ background: 'linear-gradient(90deg, #13B0F5 3%, #E70FAA 100%)' }}>
            <div className="w-full h-full flex items-center justify-center bg-blue-700 rounded-full">
              <img
                src="https://img.utdstc.com/icon/7c4/e10/7c4e10cc26b81e02d10e8ca2698e03cc6dd5738a689d2a7ec4d4a475f9bfc9a2:200"
                alt="Buy Me a Coffee"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </a>
        </nav>

        {/* MOBILE BTN */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white text-2xl">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div className={`md:hidden fixed top-16 left-0 w-64 h-full transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
        <nav className="flex flex-col mt-4 space-y-4 px-4 text-lg font-bold">
          {["Menu","Stack Tech","Projects","À Propos", "Services","Contact"].map((section) => (
            <Link
              key={section}
              to={section}
              smooth duration={700} offset={-70}
              onClick={() => setOpen(false)}
              className="hover:underline cursor-pointer text-left"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
