// src/components/ProjectsSection.jsx
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import projects from "../Data/JSON/projets.json";

export default function ProjectsSection() {
  return (
    <section id="projects" className="pt-28 pb-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        Mes Projets
      </h2>

      {/* ✅ Version mobile → ml-2 mr-2 / Version desktop → mx-auto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl ml-2 mr-2 md:mx-auto">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded-xl shadow-xl border border-gray-800 overflow-hidden hover:scale-[1.02] transition duration-300"
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.04}
              tiltMaxAngleX={17}
              tiltMaxAngleY={17}
              transitionSpeed={400}
              className="h-44 w-full"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-44 w-full object-cover"
              />
            </Tilt>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 text-gris">{p.title}</h3>
              <p className="text-gris text-sm mb-3">{p.description}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] text-sm mb-3">
                {p.tech}
              </p>
              <p className="text-gray-500 text-xs mb-4">{p.date}</p>

              <div className="flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] px-3 py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
