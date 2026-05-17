import { Link } from "react-router-dom";
import profile from "../data/profile.json";

const TAG_COLORS = ["#f9c5c5", "#c5e8c5", "#c5d4f9", "#f9e8c5", "#e8c5f9"];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col">

      {/* ── HERO ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">

        {/* Grid décoratif en fond */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#f9c5c5 1px, transparent 1px), linear-gradient(90deg, #f9c5c5 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Blob décoratif */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#f9c5c5]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Badge disponibilité */}
          <div className="inline-flex items-center gap-2 border border-[#c5e8c5]/30 bg-[#c5e8c5]/10 px-3 py-1 text-xs text-[#c5e8c5] tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5e8c5] animate-pulse" />
            DISPONIBLE — Alternance Sept. 2026
          </div>

          {/* Avatar */}
          <div className="relative inline-block mb-8">
            <div className="w-28 h-28 mx-auto border-2 border-[#f9c5c5]/30 overflow-hidden bg-[#2a2020]">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            {/* Coin déco */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#f9c5c5]/50" />
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#f9c5c5]/50" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-2 text-[#f0e8e4]">
            <span className="text-[#f9c5c5]">Rakou</span>
          </h1>

          <p className="text-[#a89a94] text-sm tracking-[0.3em] uppercase mb-8 font-light">
            {profile.title}
          </p>

          <p className="text-[#c5b8b2] max-w-xl mx-auto leading-relaxed mb-10 text-base">
            {profile.tagline}
          </p>

          {/* Intérêts / tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {profile.interests.map((interest, i) => (
              <span
                key={interest}
                className="text-xs px-3 py-1 border"
                style={{
                  borderColor: TAG_COLORS[i % TAG_COLORS.length] + "50",
                  color: TAG_COLORS[i % TAG_COLORS.length],
                  backgroundColor: TAG_COLORS[i % TAG_COLORS.length] + "12",
                }}
              >
                {interest}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/projects"
              className="px-6 py-3 bg-[#f9c5c5] text-[#1c1714] text-sm font-semibold tracking-wide hover:bg-[#f5b5b5] transition-colors duration-200"
            >
              Voir mes projets
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border border-[#3a2e2a] text-[#a89a94] text-sm tracking-wide hover:border-[#f9c5c5]/30 hover:text-[#f9c5c5] transition-all duration-200"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-[#2e2420] py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "6+", label: "Projets livrés" },
            { value: "2", label: "Franchises clientes" },
            { value: "15K+", label: "Utilisateurs touchés" },
            { value: "3", label: "Langues parlées" },
          ].map(({ value, label }) => (
            <div key={label} className="p-4 border border-[#2e2420] hover:border-[#3a2e2a] transition-colors">
              <div className="text-3xl font-display font-bold text-[#f9c5c5] mb-1">{value}</div>
              <div className="text-xs text-[#6a5e5a] tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT QUICK ── */}
      <section className="border-t border-[#2e2420] py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-[#6a5e5a]">
          <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-2 hover:text-[#f9c5c5] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {profile.contact.email}
          </a>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {profile.contact.location}
          </span>
        </div>
      </section>
    </div>
  );
}