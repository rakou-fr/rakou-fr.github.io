import about from "../data/about.json";

const TYPE_COLORS = {
  freelance: "#c5e8c5",
  projet: "#c5d4f9",
};

function formatDate(dateStr) {
  if (!dateStr) return "Aujourd'hui";
  const [y, m] = dateStr.split("-");
  const months = ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

function EduIcon({ type }) {
  if (type === "graduation") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
    </svg>
  );
  if (type === "book") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
    </svg>
  );
}

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-[#6a5e5a] tracking-[0.3em] uppercase mb-3">Parcours</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#f0e8e4] tracking-tight">
          À <span className="text-[#f9e8c5]">propos</span>
        </h1>
        <div className="w-12 h-px bg-[#f9e8c5] mt-4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* ── EXPÉRIENCES ── */}
        <div>
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#a89a94] mb-8 flex items-center gap-3">
            <span>Expériences</span>
            <div className="flex-1 h-px bg-[#2e2420]" />
          </h2>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[#2e2420]" />

            <div className="space-y-6">
              {about.experiences.map((exp, i) => {
                const color = TYPE_COLORS[exp.type] || "#a89a94";
                return (
                  <div key={exp.id} className="relative pl-10">
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1 w-6 h-6 border-2 flex items-center justify-center text-[#1c1714]"
                      style={{ backgroundColor: color, borderColor: color }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#1c1714]" />
                    </div>

                    <div className="border border-[#2e2420] p-4 hover:border-[#3a2e2a] transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-sm font-semibold text-[#e8ddd9]">{exp.role}</h3>
                          <p className="text-xs mt-0.5" style={{ color }}>{exp.company} · {exp.location}</p>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <div className="text-xs text-[#5a4e4a]">{formatDate(exp.startDate)}</div>
                          <div className="text-xs text-[#4a3e3a]">{formatDate(exp.endDate)}</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#6a5e5a] mt-2 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.stack.slice(0, 4).map(t => (
                          <span key={t} className="text-xs px-1.5 py-0.5 bg-[#2e2420] text-[#5a4e4a]">{t}</span>
                        ))}
                        {exp.stack.length > 4 && <span className="text-xs text-[#4a3e3a]">+{exp.stack.length - 4}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── DROITE ── */}
        <div className="space-y-12">

          {/* Formation */}
          <div>
            <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#a89a94] mb-8 flex items-center gap-3">
              <span>Formation</span>
              <div className="flex-1 h-px bg-[#2e2420]" />
            </h2>

            <div className="space-y-4">
              {about.education.map(edu => (
                <div key={edu.id} className="border border-[#2e2420] p-4 flex gap-4 hover:border-[#3a2e2a] transition-colors">
                  <div className="w-10 h-10 border border-[#3a2e2a] flex items-center justify-center text-[#f9e8c5] shrink-0">
                    <EduIcon type={edu.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#e8ddd9]">{edu.degree}</h3>
                    <p className="text-xs text-[#f9e8c5]/70 mt-0.5">{edu.school} · {edu.location}</p>
                    <p className="text-xs text-[#5a4e4a] mt-1">{formatDate(edu.startDate)} → {formatDate(edu.endDate)}</p>
                    {edu.description && (
                      <p className="text-xs text-[#4a3e3a] mt-1 italic">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences soft */}
          <div>
            <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#a89a94] mb-6 flex items-center gap-3">
              <span>Compétences</span>
              <div className="flex-1 h-px bg-[#2e2420]" />
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(about.skills).map(([key, { title, items }]) => (
                <div key={key} className="border border-[#2e2420] p-4">
                  <h3 className="text-xs font-semibold text-[#e8ddd9] mb-3">{title}</h3>
                  <ul className="space-y-1.5">
                    {items.map(item => (
                      <li key={item} className="text-xs text-[#6a5e5a] flex items-start gap-1.5">
                        <span className="text-[#f9e8c5]/50 mt-0.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}