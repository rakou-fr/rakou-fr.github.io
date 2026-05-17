import contact from "../data/contact.json";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-[#6a5e5a] tracking-[0.3em] uppercase mb-3">Disponible</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#f0e8e4] tracking-tight">
          Me <span className="text-[#e8c5f9]">contacter</span>
        </h1>
        <div className="w-12 h-px bg-[#e8c5f9] mt-4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* ── INFOS ── */}
        <div className="space-y-6">
          <p className="text-[#a89a94] leading-relaxed">{contact.intro}</p>

          {/* Badge dispo */}
          <div className="inline-flex items-center gap-2 border border-[#c5e8c5]/30 bg-[#c5e8c5]/8 px-4 py-2 text-sm text-[#c5e8c5]">
            <span className="w-2 h-2 rounded-full bg-[#c5e8c5] animate-pulse" />
            {contact.availability}
          </div>

          {/* Contact items */}
          <div className="space-y-3 pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 p-4 border border-[#2e2420] hover:border-[#e8c5f9]/30 hover:bg-[#e8c5f9]/5 transition-all group"
            >
              <div className="w-9 h-9 border border-[#3a2e2a] flex items-center justify-center text-[#e8c5f9] group-hover:border-[#e8c5f9]/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#5a4e4a] mb-0.5">Email</div>
                <div className="text-sm text-[#e8ddd9]">{contact.email}</div>
              </div>
              <svg className="ml-auto text-[#3a2e2a] group-hover:text-[#e8c5f9]/50 transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>

            <div className="flex items-center gap-4 p-4 border border-[#2e2420]">
              <div className="w-9 h-9 border border-[#3a2e2a] flex items-center justify-center text-[#f9e8c5]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#5a4e4a] mb-0.5">Localisation</div>
                <div className="text-sm text-[#e8ddd9]">{contact.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FORMULAIRE ── */}
        <div className="border border-[#2e2420] p-6">
          <h2 className="text-sm font-semibold text-[#e8ddd9] mb-6 tracking-wide">Envoyer un message</h2>

          <form
            action={`mailto:${contact.email}`}
            method="get"
            encType="text/plain"
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#5a4e4a] block mb-1.5 tracking-wide">Prénom</label>
                <input
                  name="from_name"
                  type="text"
                  placeholder="Jean"
                  className="w-full bg-[#1a1410] border border-[#2e2420] text-[#e8ddd9] text-sm px-3 py-2.5 focus:outline-none focus:border-[#e8c5f9]/50 transition-colors placeholder-[#3a2e2a]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a4e4a] block mb-1.5 tracking-wide">Nom</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Dupont"
                  className="w-full bg-[#1a1410] border border-[#2e2420] text-[#e8ddd9] text-sm px-3 py-2.5 focus:outline-none focus:border-[#e8c5f9]/50 transition-colors placeholder-[#3a2e2a]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#5a4e4a] block mb-1.5 tracking-wide">Sujet</label>
              <input
                name="subject"
                type="text"
                placeholder="Projet de scraping..."
                className="w-full bg-[#1a1410] border border-[#2e2420] text-[#e8ddd9] text-sm px-3 py-2.5 focus:outline-none focus:border-[#e8c5f9]/50 transition-colors placeholder-[#3a2e2a]"
              />
            </div>

            <div>
              <label className="text-xs text-[#5a4e4a] block mb-1.5 tracking-wide">Message</label>
              <textarea
                name="body"
                rows={5}
                placeholder="Décrivez votre projet ou votre demande..."
                className="w-full bg-[#1a1410] border border-[#2e2420] text-[#e8ddd9] text-sm px-3 py-2.5 focus:outline-none focus:border-[#e8c5f9]/50 transition-colors resize-none placeholder-[#3a2e2a]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#e8c5f9] text-[#1c1420] text-sm font-semibold tracking-wide hover:bg-[#d8b5e9] transition-colors"
            >
              Envoyer via email →
            </button>

            <p className="text-xs text-[#4a3e3a] text-center">
              Ouvrira votre client mail. Réponse &lt; {contact.response_time}.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}