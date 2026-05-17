import { useState } from "react";
 
function computePrice(service, opts) {
  if (!service.quoteOptions) return service.price.from;
 
  const forfaitOpt = service.quoteOptions.find(o => o.id === "forfait");
  if (forfaitOpt && opts["forfait"]) return forfaitOpt.overridePrice;
 
  let base = service.price.from;
 
  const selectOpts = service.quoteOptions.filter(o => o.type === "select");
  const combinedMultiplier = selectOpts.reduce((acc, selectOpt) => {
    const choiceIdx = opts[selectOpt.id] ?? 0;
    const choice = selectOpt.choices[choiceIdx];
    return acc * (choice?.multiplier ?? 1);
  }, 1);
 
  if (selectOpts.length > 0) {
    base = service.price.unit === "heure"
      ? service.price.from * combinedMultiplier
      : Math.round(service.price.from * combinedMultiplier);
  }
 
  service.quoteOptions
    .filter(o => o.type === "toggle" && o.id !== "forfait")
    .forEach(o => { if (opts[o.id]) base += o.extraPrice; });
 
  return Math.round(base);
}
 
export default function QuoteModal({ service, onClose }) {
  const [opts, setOpts] = useState({});
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [note, setNote] = useState("");
  const [downloaded, setDownloaded] = useState(false);
 
  const price = computePrice(service, opts);
  const setOpt = (id, val) => setOpts(prev => ({ ...prev, [id]: val }));
 
  const generateDevis = () => {
    const quoteNum = "DEV-" + Date.now().toString().slice(-6);
    const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
 
    const selectedOptions = (service.quoteOptions ?? []).map(opt => {
      if (opt.type === "select") {
        const idx = opts[opt.id] ?? 0;
        return opt.label + " : " + (opt.choices[idx]?.label ?? "—");
      }
      if (opt.type === "toggle" && opts[opt.id]) {
        return "✓ " + opt.label + (opt.extraPrice ? " (+" + opt.extraPrice + "€)" : "") + (opt.overridePrice !== undefined ? " → " + opt.overridePrice + "€/mois" : "");
      }
      return null;
    }).filter(Boolean);
 
    const optRows = selectedOptions.map(o =>
      '<div class="opt-row"><span class="opt-check">✓</span><span class="opt-text">' + o + '</span></div>'
    ).join("");
 
    const stackTags = service.stack.map(s =>
      '<span class="stack-tag">' + s + '</span>'
    ).join("");
 
    const noteSection = note
      ? '<div class="section"><div class="s-label">Notes</div><div class="note-card">' + note + '</div></div>'
      : "";
 
    const clientEmailHtml = clientEmail
      ? '<div class="client-email">' + clientEmail + '</div>'
      : "";
 
    const optsBlock = selectedOptions.length > 0
      ? '<div class="divider"></div><div class="opts-block">' + optRows + '</div>'
      : "";
 
    const c = service.color;
 
    const html = [
      '<!DOCTYPE html>',
      '<html lang="fr">',
      '<head>',
      '<meta charset="UTF-8"/>',
      '<meta name="viewport" content="width=device-width,initial-scale=1"/>',
      '<title>Devis ' + quoteNum + '</title>',
      '<style>',
      '*{margin:0;padding:0;box-sizing:border-box}',
      'body{background:#130f0d;color:#f0e8e4;min-height:100vh;padding:40px 16px;display:flex;justify-content:center;align-items:flex-start}',
      '.page{width:100%;max-width:540px}',
      '.accent-bar{height:3px;background:linear-gradient(90deg,' + c + ',' + c + '00);margin-bottom:40px}',
      '.header{margin-bottom:36px}',
      '.brand{font-size:26px;font-weight:700;color:#f9c5c5;letter-spacing:-0.02em;line-height:1}',
      '.brand-sub{font-size:10px;color:#4a3e3a;letter-spacing:0.25em;text-transform:uppercase;margin-top:5px}',
      '.quote-ref{display:flex;align-items:center;gap:10px;margin-top:16px;padding-top:16px;border-top:1px solid #2a1f1c}',
      '.quote-num{font-size:11px;font-family:monospace;color:#f9c5c5;letter-spacing:0.1em}',
      '.dot{width:3px;height:3px;border-radius:50%;background:#3a2e2a;flex-shrink:0}',
      '.quote-date{font-size:11px;color:#5a4e4a}',
      '.s-label{font-size:9px;color:#4a3e3a;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px}',
      '.s-label::after{content:"";flex:1;height:1px;background:#2a1f1c}',
      '.section{margin-bottom:24px}',
      '.client-card{border:1px solid #2a1f1c;padding:18px 20px;background:#1a1310}',
      '.client-name{font-size:16px;font-weight:600;color:#e8ddd9}',
      '.client-email{font-size:12px;color:#6a5e5a;margin-top:3px}',
      '.svc-card{border:1px solid #2a1f1c;background:#1a1310;overflow:hidden}',
      '.svc-top{padding:18px 20px;border-left:2px solid ' + c + '}',
      '.svc-icon-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}',
      '.svc-icon{font-size:18px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:1px solid ' + c + '30;background:' + c + '12;flex-shrink:0}',
      '.svc-title{font-size:15px;font-weight:700;color:#f0e8e4}',
      '.svc-tag{font-size:11px;color:' + c + ';margin-top:2px}',
      '.svc-desc{font-size:12px;color:#6a5e5a;line-height:1.7;margin-top:10px}',
      '.divider{height:1px;background:#2a1f1c}',
      '.opts-block{padding:14px 20px}',
      '.opt-row{display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #201812}',
      '.opt-row:last-child{border-bottom:none}',
      '.opt-check{font-size:10px;color:' + c + ';margin-top:1px;flex-shrink:0}',
      '.opt-text{font-size:12px;color:#8a7e7a;line-height:1.5}',
      '.stack-block{padding:12px 20px;background:#181210;display:flex;flex-wrap:wrap;gap:6px}',
      '.stack-tag{font-size:10px;padding:2px 8px;background:#2a1f1c;color:#5a4e4a;border:1px solid #3a2e2a;font-family:monospace}',
      '.total-card{border:1px solid #3a2e2a;background:#1d1310;padding:24px 20px;border-top:2px solid ' + c + '}',
      '.total-label{font-size:9px;color:#5a4e4a;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:8px}',
      '.total-price{font-size:44px;font-weight:700;color:' + c + ';line-height:1;letter-spacing:-0.02em}',
      '.total-unit{font-size:12px;color:#5a4e4a;margin-top:6px}',
      '.total-detail{font-size:11px;color:#3a2e2a;margin-top:16px;padding-top:14px;border-top:1px solid #2a1f1c;line-height:1.6}',
      '.note-card{border:1px solid #2a1f1c;background:#1a1310;padding:16px 20px;font-size:12px;color:#6a5e5a;line-height:1.7;font-style:italic;border-left:2px solid #3a2e2a}',
      '.footer{margin-top:36px;padding-top:20px;border-top:1px solid #2a1f1c}',
      '.footer-contact{font-size:11px;color:#4a3e3a;margin-bottom:4px}',
      '.footer-validity{font-size:10px;color:#3a2e2a;letter-spacing:0.1em}',
      '@media print{body{background:#130f0d!important;padding:20px}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}',
      '</style>',
      '</head>',
      '<body>',
      '<div class="page">',
      '<div class="accent-bar"></div>',
      '<div class="header">',
      '  <div class="brand">Rakou</div>',
      '  <div class="brand-sub">Développeur Freelance · Toulouse</div>',
      '  <div class="quote-ref">',
      '    <span class="quote-num">' + quoteNum + '</span>',
      '    <span class="dot"></span>',
      '    <span class="quote-date">' + date + '</span>',
      '  </div>',
      '</div>',
      '<div class="section">',
      '  <div class="s-label">Client</div>',
      '  <div class="client-card">',
      '    <div class="client-name">' + (clientName || "—") + '</div>',
      '    ' + clientEmailHtml,
      '  </div>',
      '</div>',
      '<div class="section">',
      '  <div class="s-label">Prestation</div>',
      '  <div class="svc-card">',
      '    <div class="svc-top">',
      '      <div class="svc-icon-row">',
      '        <div class="svc-icon">' + service.icon + '</div>',
      '        <div>',
      '          <div class="svc-title">' + service.title + '</div>',
      '          <div class="svc-tag">' + service.tagline + '</div>',
      '        </div>',
      '      </div>',
      '      <div class="svc-desc">' + service.description + '</div>',
      '    </div>',
      '    ' + optsBlock,
      '    <div class="divider"></div>',
      '    <div class="stack-block">' + stackTags + '</div>',
      '  </div>',
      '</div>',
      '<div class="section">',
      '  <div class="s-label">Estimation</div>',
      '  <div class="total-card">',
      '    <div class="total-label">Total estimé</div>',
      '    <div class="total-price">' + price + '€</div>',
      '    <div class="total-unit">/ ' + service.price.unit + ' · ' + service.price.detail + '</div>',
      '    <div class="total-detail">Estimation indicative non contractuelle.<br/>Un devis définitif sera établi après échange sur le périmètre exact du projet.<br/>Validité : 30 jours à compter du ' + date + '.</div>',
      '  </div>',
      '</div>',
      noteSection,
      '<div class="footer">',
      '  <div class="footer-contact">contact@rakou.dev · Toulouse, France</div>',
      '  <div class="footer-validity">Généré le ' + date + ' · rakou.dev</div>',
      '</div>',
      '</div>',
      '</body>',
      '</html>'
    ].join("\n");
 
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "devis-" + service.id + "-" + quoteNum + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,7,6,0.88)", backdropFilter: "blur(8px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg bg-[#1c1714] border border-[#3a2e2a] overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#2e2420]">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="w-8 h-8 flex items-center justify-center text-base border shrink-0"
                style={{ borderColor: service.color + "40", backgroundColor: service.color + "15" }}
              >
                {service.icon}
              </div>
              <h2 className="text-[#f0e8e4] text-sm font-semibold">
                {service.title}
              </h2>
            </div>
            <p className="text-[10px] text-[#4a3e3a] tracking-[0.25em] uppercase ml-10">Configurez votre devis</p>
          </div>
          <button onClick={onClose} className="text-[#4a3e3a] hover:text-[#f9c5c5] transition-colors text-lg leading-none mt-1">✕</button>
        </div>
 
        <div className="p-6 space-y-6">
          {/* Client */}
          <div>
            <p className="text-[10px] text-[#5a4e4a] tracking-[0.25em] uppercase mb-3">Vos coordonnées</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nom / Entreprise"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full bg-[#251e1b] border border-[#2e2420] focus:border-[#f9c5c5]/25 text-[#c5b8b2] text-sm px-3 py-2.5 outline-none transition-colors"
                style={{ fontFamily: "inherit" }}
              />
              <input
                type="email"
                placeholder="Email (optionnel)"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                className="w-full bg-[#251e1b] border border-[#2e2420] focus:border-[#f9c5c5]/25 text-[#c5b8b2] text-sm px-3 py-2.5 outline-none transition-colors"
                style={{ fontFamily: "inherit" }}
              />
            </div>
          </div>
 
          {/* Options */}
          {service.quoteOptions?.length > 0 && (
            <div>
              <p className="text-[10px] text-[#5a4e4a] tracking-[0.25em] uppercase mb-3">Configurer la prestation</p>
              <div className="space-y-5">
                {service.quoteOptions.map(opt => (
                  <div key={opt.id}>
                    <p className="text-xs text-[#7a6e6a] mb-2">{opt.label}</p>
 
                    {opt.type === "select" && (
                      <div className="space-y-1.5">
                        {opt.choices.map((choice, i) => {
                          const active = (opts[opt.id] ?? 0) === i;
                          return (
                            <button
                              key={i}
                              onClick={() => setOpt(opt.id, i)}
                              className="w-full text-left text-xs px-3 py-2.5 border transition-all"
                              style={active
                                ? { borderColor: service.color + "55", color: service.color, background: service.color + "0e" }
                                : { borderColor: "#2e2420", color: "#6a5e5a", background: "transparent" }
                              }
                            >
                              <span className="mr-2" style={{ color: active ? service.color : "#3a2e2a" }}>
                                {active ? "◉" : "○"}
                              </span>
                              {choice.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
 
                    {opt.type === "toggle" && (
                      <button
                        onClick={() => setOpt(opt.id, !opts[opt.id])}
                        className="w-full flex items-center justify-between text-xs px-3 py-2.5 border transition-all"
                        style={opts[opt.id]
                          ? { borderColor: service.color + "55", color: service.color, background: service.color + "0e" }
                          : { borderColor: "#2e2420", color: "#6a5e5a" }
                        }
                      >
                        <span className="flex items-center gap-2">
                          <span>{opts[opt.id] ? "◉" : "○"}</span>
                          {opt.label}
                        </span>
                        <span className="font-mono">
                          {opt.overridePrice !== undefined
                            ? "→ " + opt.overridePrice + "€/mois"
                            : opt.extraPrice > 0 ? "+" + opt.extraPrice + "€" : "inclus"}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* Note */}
          <div>
            <p className="text-[10px] text-[#5a4e4a] tracking-[0.25em] uppercase mb-2">Notes / précisions (optionnel)</p>
            <textarea
              rows={3}
              placeholder="Décrivez votre projet, contraintes, deadline…"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full bg-[#251e1b] border border-[#2e2420] focus:border-[#f9c5c5]/25 text-[#c5b8b2] text-sm px-3 py-2.5 outline-none transition-colors resize-none"
              style={{ fontFamily: "inherit" }}
            />
          </div>
 
          {/* Price + download */}
          <div
            className="p-4 flex items-center justify-between border"
            style={{ borderColor: "#3a2e2a", borderLeftColor: service.color, borderLeftWidth: 2 }}
          >
            <div>
              <p className="text-[10px] text-[#5a4e4a] tracking-[0.2em] uppercase mb-1">Estimation</p>
              <p className="text-2xl font-bold" style={{ color: service.color }}>
                {price}€
                <span className="text-xs text-[#5a4e4a] font-normal ml-1">/ {service.price.unit}</span>
              </p>
              <p className="text-[10px] text-[#4a3e3a] mt-0.5">Non contractuel</p>
            </div>
            <button
              onClick={generateDevis}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide transition-all hover:opacity-90 active:scale-95"
              style={{ background: service.color, color: "#1c1714" }}
            >
              {downloaded ? (
                <>✓ Téléchargé</>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Télécharger devis
                </>
              )}
            </button>
          </div>
 
          <p className="text-[10px] text-[#3a2e2a] text-center">
            Fichier HTML imprimable généré localement · aucune donnée transmise
          </p>
        </div>
      </div>
    </div>
  );
}