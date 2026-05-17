import services from "../data/services.json";
import { Link } from "react-router-dom";

function Tag({ label }) {
  return (
    <span className="text-xs px-2 py-0.5 bg-[#2e2420] text-[#5a4e4a] border border-[#3a2e2a]">
      {label}
    </span>
  );
}

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-[#6a5e5a] tracking-[0.3em] uppercase mb-3">Prestations</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#f0e8e4] tracking-tight">
          Mes <span className="text-[#c5e8c5]">services</span>
        </h1>
        <div className="w-12 h-px bg-[#c5e8c5] mt-4" />
        <p className="text-[#6a5e5a] text-sm mt-4 max-w-xl leading-relaxed">
          Développeur freelance basé à Toulouse, je propose des solutions sur mesure adaptées à vos besoins.
          Chaque projet est discuté en amont pour une estimation précise.
        </p>
      </div>

      {/* Grille services */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {services.map(service => (
          <div
            key={service.id}
            className={`border p-6 flex flex-col relative transition-all duration-200 hover:translate-y-[-2px] ${
              service.popular
                ? "border-[#c5d4f9]/40 bg-[#c5d4f9]/5"
                : "border-[#2e2420] hover:border-[#3a2e2a]"
            }`}
          >
            {/* Badge populaire */}
            {service.popular && (
              <div className="absolute -top-2.5 left-4">
                <span className="text-xs px-2 py-0.5 bg-[#c5d4f9] text-[#1a1a2a] font-semibold tracking-wide">
                  ★ Populaire
                </span>
              </div>
            )}

            {/* Icône + titre */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center text-xl shrink-0 border"
                style={{ borderColor: service.color + "40", backgroundColor: service.color + "15" }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e8ddd9]">{service.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: service.color }}>
                  {service.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#6a5e5a] leading-relaxed mb-5 flex-1">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-5">
              {service.features.map(f => (
                <li key={f} className="text-xs text-[#8a7e7a] flex items-start gap-2">
                  <span style={{ color: service.color }} className="mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {service.stack.map(t => <Tag key={t} label={t} />)}
            </div>

            {/* Séparateur */}
            <div className="h-px bg-[#2e2420] mb-4" />

            {/* Prix */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-[#5a4e4a] mb-0.5">À partir de</div>
                <div className="text-2xl font-display font-bold" style={{ color: service.color }}>
                  {service.price.from}€
                  <span className="text-xs text-[#5a4e4a] font-normal ml-1">/ {service.price.unit}</span>
                </div>
                <div className="text-xs text-[#4a3e3a] mt-0.5">{service.price.detail}</div>
              </div>
              <Link
                to="/contact"
                className="text-xs px-3 py-2 border transition-all"
                style={{
                  borderColor: service.color + "50",
                  color: service.color,
                }}
              >
                Demander →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bandeau CTA */}
      <div className="border border-[#2e2420] p-8 text-center">
        <p className="text-[#a89a94] text-sm mb-2">Vous avez un projet spécifique ?</p>
        <p className="text-[#6a5e5a] text-xs mb-6">
          Chaque projet est unique. Contactez-moi pour en discuter et obtenir un devis personnalisé.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5e8c5] text-[#1a2a1a] text-sm font-semibold hover:bg-[#b5d8b5] transition-colors"
        >
          Discutons de votre projet
        </Link>
      </div>
    </div>
  );
}