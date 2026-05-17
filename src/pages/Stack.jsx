import { useState } from "react";
import stackData from "../data/stack.json";

export default function Stack() {
  const [active, setActive] = useState("all");

  const allCategories = [{ id: "all", label: "Tout", color: "#a89a94" }, ...stackData.categories];

  const displayed = active === "all"
    ? stackData.categories
    : stackData.categories.filter(c => c.id === active);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs text-[#6a5e5a] tracking-[0.3em] uppercase mb-3">Technologies</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#f0e8e4] tracking-tight">
          Stack <span className="text-[#c5d4f9]">technique</span>
        </h1>
        <div className="w-12 h-px bg-[#c5d4f9] mt-4" />
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-3 py-1.5 text-xs tracking-wide border transition-all duration-200 ${
              active === cat.id
                ? "text-[#1c1714] border-transparent font-semibold"
                : "border-[#2e2420] text-[#6a5e5a] hover:border-[#3a2e2a] hover:text-[#a89a94]"
            }`}
            style={active === cat.id ? { backgroundColor: cat.color } : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille des catégories */}
      <div className="space-y-10">
        {displayed.map(category => (
          <div key={category.id} className="border border-[#2e2420] p-6">

            {/* Titre catégorie */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2" style={{ backgroundColor: category.color }} />
              <h2 className="text-sm font-semibold tracking-widest uppercase text-[#a89a94]">
                {category.label}
              </h2>
              <div className="flex-1 h-px bg-[#2e2420]" />
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-4">
              {category.skills.map(skill => (
                <div key={skill.name} className="group">
                  {/* Nom + depuis */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#e8ddd9]">{skill.name}</span>
                      <span
                        className="text-xs px-1.5 py-0.5"
                        style={{
                          color: category.color,
                          backgroundColor: category.color + "18",
                        }}
                      >
                        depuis {skill.since}
                      </span>
                    </div>
                    <span className="text-xs text-[#5a4e4a] font-mono">{skill.level}%</span>
                  </div>

                  {/* Barre */}
                  <div className="h-1 bg-[#2e2420] mb-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: category.color,
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  {/* Détail */}
                  <p className="text-xs text-[#6a5e5a] leading-relaxed">{skill.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note bas de page */}
      <p className="mt-10 text-xs text-[#4a3e3a] text-center">
        Les niveaux sont auto-évalués et reflètent mon usage en conditions réelles.
      </p>
    </div>
  );
}