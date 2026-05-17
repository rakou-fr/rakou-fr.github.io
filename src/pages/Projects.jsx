import { useState } from "react";
import projects from "../data/projects.json";

const STATUS_STYLES = {
  "actif":      { label: "Actuel",     bg: "#c5e8c5", text: "#1a2a1a" },
  "en-cours":   { label: "En cours",   bg: "#c5d4f9", text: "#1a1a2a" },
  "termine":    { label: "Fini",       bg: "#f9c5c5", text: "#2a1a1a" },
  "pause":      { label: "En pause",  bg: "#f9e8c5", text: "#2a2010" },
  "abandonne":  { label: "Abandonné", bg: "#e8c5f9", text: "#2a1a2a" },
};

function Tag({ label, color }) {
  return (
    <span
      className="text-xs px-2 py-0.5 border"
      style={{
        borderColor: color + "50",
        color: color,
        backgroundColor: color + "15",
      }}
    >
      {label}
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const status = STATUS_STYLES[project.status] || STATUS_STYLES["termine"];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#211a17] border border-[#3a2e2a] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header modal */}
        <div className="flex items-start justify-between p-6 border-b border-[#2e2420]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs px-2 py-0.5 font-medium"
                style={{ backgroundColor: status.bg, color: status.text }}
              >
                {status.label}
              </span>
              <span className="text-xs text-[#5a4e4a]">{project.duration}</span>
            </div>
            <h2 className="text-xl font-display font-bold text-[#f0e8e4]">{project.title}</h2>
            <p className="text-sm text-[#f9c5c5] mt-1">{project.company} — {project.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#5a4e4a] hover:text-[#a89a94] transition-colors p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Carrousel images */}
        {project.images?.length > 0 && (
          <div className="relative bg-[#1a1410]">
            <img
              src={project.images[imgIdx]}
              alt={`${project.title} screenshot ${imgIdx + 1}`}
              className="w-full object-cover"
              style={{ maxHeight: 280 }}
            />
            {project.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="w-2 h-2 border transition-colors"
                    style={{
                      backgroundColor: i === imgIdx ? "#f9c5c5" : "transparent",
                      borderColor: i === imgIdx ? "#f9c5c5" : "#5a4e4a",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-[#c5b8b2] leading-relaxed">{project.description}</p>

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.highlights.map(h => (
                <span key={h} className="text-xs px-2 py-1 bg-[#2e2420] text-[#a89a94] border border-[#3a2e2a]">
                  ✦ {h}
                </span>
              ))}
            </div>
          )}

          {/* Stack */}
          <div>
            <p className="text-xs text-[#5a4e4a] tracking-widest uppercase mb-3">Stack technique</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <Tag key={tech} label={tech} color={project.stackColors?.[i] || "#a89a94"} />
              ))}
            </div>
          </div>

          {/* Liens */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 bg-[#f9c5c5] text-[#1c1714] font-medium hover:bg-[#f5b5b5] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Voir le projet
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 border border-[#3a2e2a] text-[#a89a94] hover:border-[#5a4e4a] hover:text-[#e8ddd9] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const statuses = ["all", ...Object.keys(STATUS_STYLES)];
  const filtered = filter === "all" ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs text-[#6a5e5a] tracking-[0.3em] uppercase mb-3">Réalisations</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#f0e8e4] tracking-tight">
          Mes <span className="text-[#f9c5c5]">projets</span>
        </h1>
        <div className="w-12 h-px bg-[#f9c5c5] mt-4" />
      </div>

      {/* Filtres statut */}
      <div className="flex flex-wrap gap-2 mb-10">
        {statuses.map(s => {
          const st = STATUS_STYLES[s];
          const isActive = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="text-xs px-3 py-1.5 border transition-all duration-200"
              style={
                isActive
                  ? { backgroundColor: st?.bg || "#f9c5c5", color: st?.text || "#1c1714", borderColor: "transparent", fontWeight: 600 }
                  : { borderColor: "#2e2420", color: "#6a5e5a" }
              }
            >
              {s === "all" ? "Tous" : st?.label}
            </button>
          );
        })}
      </div>

      {/* Grille */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(project => {
          const status = STATUS_STYLES[project.status] || STATUS_STYLES["termine"];
          return (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="text-left border border-[#2e2420] hover:border-[#5a4e4a] transition-all duration-200 group overflow-hidden"
            >
              {/* Aperçu image */}
              <div className="relative h-40 bg-[#1a1410] overflow-hidden">
                <img
                  src={project.images?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                {/* Status badge */}
                <span
                  className="absolute top-3 right-3 text-xs px-2 py-0.5 font-medium"
                  style={{ backgroundColor: status.bg, color: status.text }}
                >
                  {status.label}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-semibold text-[#e8ddd9] group-hover:text-[#f9c5c5] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[#5a4e4a] ml-2 shrink-0">{project.duration}</span>
                </div>

                <p className="text-xs text-[#f9c5c5]/70 mb-3">{project.company} · {project.location}</p>

                <p className="text-xs text-[#6a5e5a] leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech, i) => (
                    <Tag key={tech} label={tech} color={project.stackColors?.[i] || "#a89a94"} />
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-xs text-[#5a4e4a] px-1">+{project.stack.length - 4}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}