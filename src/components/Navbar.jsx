import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Accueil", exact: true },
  { to: "/stack", label: "Stack" },
  { to: "/projects", label: "Projets" },
  { to: "/about", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/50 border-b border-white/10 py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <NavLink
            to="/"
            className="text-white text-xl tracking-[0.3em] z-50"
          >
            RK
          </NavLink>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `px-4 py-2 uppercase text-xs tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* BURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          >
            <div className="relative w-6 h-6">
              
              <span
                className={`absolute left-0 top-1 w-6 h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45 top-3" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-3 w-6 h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-5 w-6 h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45 top-3" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `uppercase text-lg tracking-[0.3em] transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}