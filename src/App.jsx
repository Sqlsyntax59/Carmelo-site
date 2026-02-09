import { useState, useEffect, useRef } from "react";

const FIGHTER = {
  firstName: "CARMELO",
  lastName: "ZAMBELLI",
  age: 18, birthDate: "08/11/2007", city: "Orléans",
  category: "-70 KG · KARATÉ MIX FFK",
  title: "Champion de France Karaté Mix",
  club: "Académie Philippe Rollin Arts Martiaux",
  record: { total: 21, wins: 18, losses: 3, ko: 1, sub: 14, dec: 3 },
  bio: [
    "Originaire d'Orléans, Carmelo Zambelli découvre le Karaté Mix en 2023 à l'Académie Philippe Rollin. En moins de trois ans, il dispute déjà 21 combats et s'impose parmi les meilleurs de sa génération, avec deux titres de Champion de France et une Coupe de France, à seulement 18 ans.",
    "Spécialiste du combat au sol, il affiche un style technique et exigeant, concrétisé par 14 victoires par soumission. Un profil complet, discipliné, et résolument tourné vers la performance.",
    "Aujourd'hui, Carmelo entre dans une nouvelle étape : passer professionnel et représenter la France sur la scène européenne. Il recherche des partenaires prêts à accompagner un jeune athlète ambitieux, porté par des valeurs fortes : travail, engagement et dépassement de soi."
  ],
  palmares: [
    { year: "2026", event: "Championnat de France Karaté Mix FFK", result: "🥇 1ᵉʳ — Champion de France", highlight: true },
    { year: "2025", event: "Championnat de France Karaté Mix FFK", result: "🥇 1ᵉʳ — Champion de France", highlight: true },
    { year: "2025", event: "Coupe de France Karaté Mix FFK", result: "🥇 1ᵉʳ — Vainqueur (750+ combattants)", highlight: true },
    { year: "2025", event: "Open de France Karaté Mix", result: "🥈 2ᵉ — Finaliste", highlight: false },
    { year: "2024", event: "Championnat de France Karaté Mix FFK", result: "🥉 3ᵉ", highlight: false },
  ],
  social: { instagram: "https://www.instagram.com/carmelo_zambelli/" },
};

const COACH = {
  name: "Philippe Rollin",
  grade: "5ème Dan Judo-Jujitsu",
  experience: "47+ ans d'enseignement",
  blackBelts: 30,
  title: "Fondateur de l'APRAM",
  bio: "Maître Philippe Rollin débute les arts martiaux par le Karaté Wado Ryu à 16 ans, avant de se consacrer au Judo et au Jujitsu. 5ème Dan depuis 1998, il cumule plus de 47 ans d'enseignement et a formé 30 ceintures noires. Compétiteur du niveau départemental à l'international, il se spécialise depuis plus de 20 ans en Jujitsu sportif de combat (combat libre et Fighting System). Juge national d'expression technique et arbitre national de Fighting, il fonde l'Académie Philippe Rollin Arts Martiaux (APRAM) à Trinay dans le Loiret, où il transmet sa méthode multi-disciplines : judo, jujitsu, BJJ, karaté, krav-maga, boxe, kickboxing et muay thaï.",
  credentials: [
    "5ème Dan Judo-Jujitsu (1998)",
    "Brevet d'État Éducateur Sportif",
    "Juge National d'Expression Technique",
    "Arbitre National de Fighting",
    "30 ceintures noires formées",
    "Fondateur du Dojo « Florence Rollin »",
  ],
};

const PHOTOS = [
  { id: 1, src: "/images/combat-cage.jpg", pos: "center", desc: "Combat au sol dans la cage — position dominante ground & pound", alt: "Carmelo en position dominante dans la cage FFK" },
  { id: 2, src: "/images/podium-championnat.jpg", pos: "center 33%", desc: "Podium Championnat de France FFK — 1ère place", alt: "Carmelo sur la plus haute marche du podium FFK" },
  { id: 3, src: "/images/soumission.jpg", pos: "center", desc: "Soumission en cage — triangle/armbar", alt: "Carmelo appliquant une soumission en compétition" },
  { id: 4, src: "/images/podium-coupe.jpg", pos: "center", desc: "Podium Coupe de France FFK — médaille d'or", alt: "Carmelo avec sa médaille d'or FFK" },
];

const STATS = [
  { label: "Combats", value: 21 },
  { label: "Victoires", value: 18 },
  { label: "Soumissions", value: 14 },
  { label: "Win Rate", value: 86, suffix: "%" },
];

/* ─── Hooks ─── */
function AnimatedNumber({ target, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let s = 0; const inc = target / Math.max(duration / 30, 1);
        const iv = setInterval(() => { s += inc; if (s >= target) { setVal(target); clearInterval(iv); } else setVal(Math.floor(s)); }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function useSwipe(ref, { onSwipeLeft, onSwipeRight, onTap }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0, startY = 0, tracking = false;
    const onStart = (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; tracking = true; };
    const onMove = (e) => {
      if (!tracking) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) e.preventDefault();
    };
    const onEnd = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50) { dx < 0 ? onSwipeLeft() : onSwipeRight(); }
      else if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && onTap) { onTap(); }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onStart); el.removeEventListener("touchmove", onMove); el.removeEventListener("touchend", onEnd); };
  }, [ref, onSwipeLeft, onSwipeRight, onTap]);
}

/* ─── Navbar ─── */
function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eggClicks, setEggClicks] = useState(0);
  const [showMma, setShowMma] = useState(false);
  const eggTimer = useRef(null);
  const links = [
    { id: "hero", label: "Accueil" }, { id: "discipline", label: "Discipline" },
    { id: "about", label: "Parcours" }, { id: "gallery", label: "Galerie" },
    { id: "palmares", label: "Palmarès" }, { id: "events", label: "Événements" },
    { id: "team", label: "L'Équipe" }, { id: "sponsors", label: "Sponsors" },
    { id: "contact", label: "Contact" },
  ];
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || open ? "rgba(6,6,10,0.94)" : "rgba(6,6,10,0.3)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid rgba(207,155,59,0.1)" : "1px solid transparent",
        padding: "0 clamp(16px,4vw,40px)", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s"
      }}>
        <div style={{ zIndex: 1002, cursor: "pointer", userSelect: "none" }} onClick={() => {
          clearTimeout(eggTimer.current);
          const n = eggClicks + 1;
          if (n >= 3) { setShowMma(true); setEggClicks(0); }
          else { setEggClicks(n); eggTimer.current = setTimeout(() => setEggClicks(0), 800); }
        }}>
          {showMma ? (
            <video src="/images/logo-mma.mp4" autoPlay muted playsInline onEnded={() => setShowMma(false)} style={{ height: 40, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(207,155,59,0.3))", lineHeight: 0 }} />
          ) : (
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: 4, color: "#fff" }}>
              C<span style={{ color: "#cf9b3b" }}>Z</span>
            </div>
          )}
        </div>
        <div className="navD" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              color: activeSection === l.id ? "#cf9b3b" : "rgba(255,255,255,0.45)",
              textDecoration: "none", fontSize: 11, fontFamily: "'Inter',sans-serif",
              letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600, transition: "color 0.3s",
              borderBottom: activeSection === l.id ? "1.5px solid #cf9b3b" : "1.5px solid transparent", paddingBottom: 3
            }}>{l.label}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="mBtn" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} style={{
          display: "none", background: "none", border: "none", color: "#cf9b3b", fontSize: 24, cursor: "pointer", zIndex: 1002, position: "relative"
        }}>{open ? "✕" : "☰"}</button>
      </nav>
      {open && (
        <div role="navigation" aria-label="Menu principal" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "#06060a", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 28, zIndex: 999
        }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} style={{
              color: "#fff", textDecoration: "none", fontSize: 24, fontFamily: "'Oswald',sans-serif",
              letterSpacing: 6, fontWeight: 500, textTransform: "uppercase"
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const [ld, setLd] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => { setTimeout(() => setLd(true), 150); }, []);
  useEffect(() => {
    const h = () => setOffsetY(window.scrollY * 0.4);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "#06060a"
    }}>
      <img src="/images/combat-cage.jpg" alt="Combat de Carmelo Zambelli en cage" fetchpriority="high" width="1200" height="800" onError={(e) => { e.target.style.opacity = 0.1; }} style={{
        position: "absolute", inset: 0, width: "100%", height: "120%",
        objectFit: "cover", objectPosition: "center 30%", opacity: 0.25,
        filter: "saturate(0.6)", transition: "opacity 1.5s",
        transform: `translateY(${offsetY}px)`, willChange: "transform"
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,6,10,0.5) 0%, rgba(6,6,10,0.3) 40%, rgba(6,6,10,0.8) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 65% 45%, rgba(207,155,59,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid rgba(207,155,59,0.04)", animation: "breathe 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "5%", width: "30vw", height: "30vw", borderRadius: "50%", border: "1px solid rgba(207,155,59,0.03)", animation: "breathe 10s ease-in-out infinite 3s" }} />

      <div style={{
        textAlign: "center", padding: "100px 24px 70px", maxWidth: 900, margin: "0 auto",
        opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(50px)",
        transition: "all 1.4s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
          padding: "5px 18px", border: "1px solid rgba(207,155,59,0.25)", background: "rgba(207,155,59,0.06)",
          opacity: ld ? 1 : 0, transition: "opacity 0.8s 0.4s"
        }}>
          <img src="/images/logo-ffk.svg" alt="FFK" width="18" height="18" style={{ height: 18, flexShrink: 0, filter: "brightness(1.2)" }} />
          <span style={{ fontSize: 9, letterSpacing: 4, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Fédération Française de Karaté</span>
        </div>

        <div style={{ fontSize: 11, letterSpacing: 8, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
          {FIGHTER.category}
        </div>

        <h1 style={{
          fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(48px,11vw,124px)",
          lineHeight: 0.88, margin: "0 0 20px", color: "#fff", letterSpacing: 4, textTransform: "uppercase",
          textShadow: "0 0 100px rgba(207,155,59,0.12)"
        }}>
          <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.55em", letterSpacing: 12 }}>{FIGHTER.firstName}</span>
          <span style={{
            background: "linear-gradient(90deg, #fff 0%, #cf9b3b 25%, #e8b84a 50%, #cf9b3b 75%, #fff 100%)",
            backgroundSize: "400% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", animation: "shimmer 6s ease-in-out infinite"
          }}>{FIGHTER.lastName}</span>
        </h1>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 0, padding: "4px 16px 4px 0",
          background: "linear-gradient(135deg, #cf9b3b 0%, #a67c2e 50%, #cf9b3b 100%)",
          color: "#06060a", fontFamily: "'Oswald',sans-serif", fontWeight: 700,
          fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
          boxShadow: "0 0 50px rgba(207,155,59,0.2), inset 0 1px 0 rgba(255,255,255,0.2)"
        }}><img src="/images/medaille-cocarde.png" alt="Médaille cocarde" width="90" height="90" style={{ height: 90, width: "auto", marginTop: -30, marginBottom: -30, marginLeft: -44 }} />2x {FIGHTER.title}</div>

        <div style={{ marginTop: 16, fontFamily: "'Oswald',sans-serif", fontSize: 20, letterSpacing: 6, color: "rgba(255,255,255,0.82)" }}>
          <span style={{ color: "#4ade80", fontWeight: 700 }}>{FIGHTER.record.wins}W</span>
          <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 8px" }}>—</span>
          <span style={{ color: "#ef4444", fontWeight: 700 }}>{FIGHTER.record.losses}L</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,56px)", marginTop: 48, flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", minWidth: 60,
              opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${0.7 + i * 0.12}s`
            }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(32px,5vw,50px)", color: "#fff", lineHeight: 1, fontWeight: 700 }}>
                <AnimatedNumber target={s.value} suffix={s.suffix || ""} />
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.62)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginTop: 7, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#sponsors" className="cP" style={{ padding: "14px 32px", background: "linear-gradient(135deg,#cf9b3b,#a67c2e)", color: "#06060a", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", boxShadow: "0 4px 30px rgba(207,155,59,0.25)" }}>Devenir Partenaire</a>
          <a href="https://www.instagram.com/carmelo_zambelli/" target="_blank" rel="noopener noreferrer" className="cS" style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", background: "transparent", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig)"/>
            </svg>
            Instagram
          </a>
          <a href="https://www.tiktok.com/@carmeloooooo" target="_blank" rel="noopener noreferrer" className="cS" style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", background: "transparent", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.18 8.18 0 004.76 1.52V7.56a4.84 4.84 0 01-1-.87z" fill="#25F4EE"/>
              <path d="M16.37 2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-1.69-.55 2.89 2.89 0 004.57-2.34V2h3.45z" fill="#FE2C55"/>
              <path d="M19.59 7.56v3.44a8.18 8.18 0 01-4.76-1.52v6.82a6.34 6.34 0 01-6.34 6.34 6.3 6.3 0 01-3.65-1.16 6.34 6.34 0 005.34-6.25V1.56h3.45v.44a4.83 4.83 0 003.77 4.25c.32.13.64.22.97.28v1.03h.22z" fill="#FE2C55" opacity="0.5"/>
            </svg>
            TikTok
          </a>
          <a href="https://facebook.com/carmelo.zambelli" target="_blank" rel="noopener noreferrer" className="cS" style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", background: "transparent", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/>
              <path d="M16.671 15.47L17.203 12h-3.328V9.75c0-.949.465-1.874 1.956-1.874h1.513V4.923s-1.374-.235-2.686-.235c-2.741 0-4.533 1.661-4.533 4.668V12H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0V15.47h2.796z" fill="#fff"/>
            </svg>
            Facebook
          </a>
        </div>

        <div style={{ marginTop: 56, opacity: 0.25, animation: "scrollH 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 36, background: "linear-gradient(180deg,#cf9b3b,transparent)", margin: "0 auto" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function AboutSection() {
  const [ref, v] = useReveal();
  return (
    <section id="about" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #0a0a10 0%, #08080e 100%)", borderTop: "1px solid rgba(207,155,59,0.08)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Parcours</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 36px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          3 ans de pratique<span style={{ color: "#cf9b3b" }}>.</span>{" "}<img src="/images/picto-3ans.png" alt="3 ans" width="52" height="52" loading="lazy" style={{ height: "clamp(32px,4.5vw,52px)", verticalAlign: "middle", marginLeft: 12, marginBottom: 14, filter: "drop-shadow(0 2px 8px rgba(207,155,59,0.4))" }} /><br />2 titres nationaux<span style={{ color: "#cf9b3b" }}>.</span>{" "}<img src="/images/picto-titres.png" alt="Titres" width="49" height="58" loading="lazy" style={{ height: "clamp(36px,5vw,58px)", width: "auto", verticalAlign: "middle", marginLeft: 12, marginBottom: 14, filter: "drop-shadow(0 2px 8px rgba(207,155,59,0.4))" }} /><br /><span className="fireLine" style={{
            fontSize: "clamp(20px,3.5vw,40px)",
            background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, #cf9b3b 15%, #e8b84a 25%, #ff6b2b 40%, #cf9b3b 55%, rgba(255,255,255,0.15) 70%)",
            backgroundSize: "300% 100%",
            backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
            animation: "fireSweep 3s ease-in-out infinite",
            display: "inline-block",
            filter: "drop-shadow(0 0 12px rgba(207,155,59,0.4))"
          }}>Une trajectoire fulgurante<span style={{ color: "#cf9b3b" }}>.</span></span>{" "}<img src="/images/picto-trajectoire.png" alt="Trajectoire" width="41" height="48" loading="lazy" style={{ height: "clamp(32px,4vw,48px)", width: "auto", verticalAlign: "middle", marginLeft: 12, marginBottom: 14, filter: "drop-shadow(0 2px 8px rgba(207,155,59,0.4))" }} />
        </h2>
        <div style={{ maxWidth: 620 }}>
          {FIGHTER.bio.map((p, i) => (
            <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 2, color: i === 2 ? "rgba(207,155,59,0.55)" : "rgba(255,255,255,0.45)", margin: "0 0 20px" }}>{p}</p>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, marginTop: 48, background: "rgba(207,155,59,0.1)" }}>
          {[
            { l: "Âge", v: "18 ans" }, { l: "Ville", v: "Orléans" }, { l: "Catégorie", v: "-70 kg" },
            { l: "Club", v: "APRAM" }, { l: "Début", v: "2023" }, { l: "Fédération", v: "FFK" },
          ].map((f, i) => (
            <div key={i} style={{ padding: "22px 20px", background: "rgba(6,6,10,0.95)", borderTop: "2px solid rgba(207,155,59,0.15)" }}>
              <div style={{ fontSize: 8, letterSpacing: 4, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 6, fontWeight: 700, opacity: 0.7 }}>{f.l}</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, letterSpacing: 1 }}>{f.v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "28px 24px", background: "rgba(207,155,59,0.03)", border: "1px solid rgba(207,155,59,0.08)" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>Méthodes de victoire — 18 wins</div>
          <div style={{ display: "flex", gap: 2, height: 10, overflow: "hidden", maxWidth: 480, borderRadius: 2 }}>
            <div style={{ flex: 14, background: "linear-gradient(90deg,#cf9b3b,#e8b84a)" }} />
            <div style={{ flex: 3, background: "rgba(255,255,255,0.25)" }} />
            <div style={{ flex: 1, background: "#ef4444" }} />
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 16, flexWrap: "wrap" }}>
            {[
              { l: "Soumissions", n: 14, c: "#cf9b3b", p: "78%" },
              { l: "Décisions", n: 3, c: "rgba(255,255,255,0.65)", p: "17%" },
              { l: "KO/TKO", n: 1, c: "#ef4444", p: "5%" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, background: m.c, borderRadius: 2 }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                  {m.l} · {m.n} <span style={{ color: m.c, fontWeight: 700 }}>({m.p})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Carousel ─── */
function GallerySection() {
  const [ref, v] = useReveal();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const carouselRef = useRef(null);
  const [lightbox, setLightbox] = useState(false);
  const [cloudPhotos, setCloudPhotos] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/cloudinary-list")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setCloudPhotos(data.images.map((img, i) => ({
            id: img.public_id,
            src: img.url,
            pos: "center",
            desc: img.caption || "",
            alt: img.caption || `Photo carrousel ${i + 1}`,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const photos = cloudPhotos || PHOTOS;

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setActive(p => (p + 1) % photos.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, photos.length]);

  useSwipe(carouselRef, {
    onSwipeLeft: () => { setActive(p => (p + 1) % photos.length); setPaused(true); },
    onSwipeRight: () => { setActive(p => (p - 1 + photos.length) % photos.length); setPaused(true); },
    onTap: () => { setPaused(true); setLightbox(true); },
  });

  const photoColors = ["#1a1210", "#0d1020", "#120f0a", "#0a1018"];
  const photoGradients = [
    "radial-gradient(ellipse at 30% 70%, rgba(207,100,50,0.15) 0%, rgba(6,6,10,0.95) 70%)",
    "radial-gradient(ellipse at 50% 40%, rgba(60,60,180,0.12) 0%, rgba(6,6,10,0.95) 70%)",
    "radial-gradient(ellipse at 60% 60%, rgba(207,155,59,0.12) 0%, rgba(6,6,10,0.95) 70%)",
    "radial-gradient(ellipse at 40% 30%, rgba(60,100,180,0.12) 0%, rgba(6,6,10,0.95) 70%)",
  ];
  const photoIcons = ["⚔️", "🏆", "🥋", "🥇"];

  return (
    <section id="gallery" ref={ref} style={{
      padding: "clamp(80px,12vw,130px) 0",
      background: "linear-gradient(180deg, #0a0806 0%, #06060a 100%)",
      borderTop: "1px solid rgba(207,155,59,0.06)", overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Galerie</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          En action<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>

        {/* Main display with crossfade */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative", width: "100%", aspectRatio: "16/9",
            background: "#0a0a0a", overflow: "hidden",
            border: "1px solid rgba(207,155,59,0.08)"
          }}
        >
          {photos.map((p, i) => (
            <img
              key={p.id}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              onClick={() => { setPaused(true); setLightbox(true); }}
              onError={(e) => { e.target.style.opacity = 0.1; e.target.alt = "Photo non disponible"; }}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: p.pos,
                opacity: i === active ? 1 : 0, transition: "opacity 0.7s ease-in-out",
                zIndex: i === active ? 1 : 0, cursor: "zoom-in"
              }}
            />
          ))}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
            background: "linear-gradient(transparent, rgba(6,6,10,0.85))",
            padding: "40px 20px 16px", textAlign: "center"
          }}>
            <div style={{
              fontFamily: "'Oswald',sans-serif", fontSize: "clamp(12px,2vw,16px)",
              color: "rgba(255,255,255,0.82)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500
            }}>{photos[active]?.desc}</div>
          </div>

          {/* Prev/Next */}
          <button onClick={() => { setActive(p => (p - 1 + photos.length) % photos.length); setPaused(true); }} className="galBtn" aria-label="Photo précédente" style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 3,
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", width: 44, height: 44, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", backdropFilter: "blur(8px)"
          }}>&#8249;</button>
          <button onClick={() => { setActive(p => (p + 1) % photos.length); setPaused(true); }} className="galBtn" aria-label="Photo suivante" style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 3,
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", width: 44, height: 44, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", backdropFilter: "blur(8px)"
          }}>&#8250;</button>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.05)", zIndex: 2 }}>
            <div style={{
              height: "100%", background: "#cf9b3b", width: `${((active + 1) / photos.length) * 100}%`,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>

        {/* Thumbnails with real images */}
        <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
          {photos.map((p, i) => (
            <button key={i} onClick={() => { setActive(i); setPaused(true); }} style={{
              flex: 1, padding: 0, cursor: "pointer", border: "none",
              borderBottom: i === active ? "2px solid #cf9b3b" : "2px solid transparent",
              transition: "all 0.3s", position: "relative", overflow: "hidden",
              height: "clamp(50px, 12vw, 70px)", background: "#0a0a0a"
            }}>
              <img src={p.src} alt={p.alt} loading="lazy" onError={(e) => { e.target.style.opacity = 0.1; e.target.alt = "Photo non disponible"; }} style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos,
                opacity: i === active ? 0.9 : 0.3, transition: "opacity 0.3s",
                filter: i === active ? "none" : "grayscale(0.5)"
              }} />
            </button>
          ))}
        </div>

      </div>
      {lightbox && <Lightbox photos={photos} active={active} onClose={() => setLightbox(false)} onPrev={() => setActive(p => (p - 1 + photos.length) % photos.length)} onNext={() => setActive(p => (p + 1) % photos.length)} />}
    </section>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ photos, active, onClose, onPrev, onNext }) {
  const [show, setShow] = useState(false);
  const lbRef = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  useSwipe(lbRef, { onSwipeLeft: onNext, onSwipeRight: onPrev });
  return (
    <div ref={lbRef} role="dialog" aria-label="Galerie photo en plein écran" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.96)",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: show ? 1 : 0, transition: "opacity 0.3s"
    }}>
      <div style={{ position: "absolute", top: 16, left: 20, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{active + 1} / {photos.length}</div>
      <button onClick={onClose} aria-label="Fermer la galerie" style={{ position: "absolute", top: 12, right: 16, background: "none", border: "1px solid rgba(207,155,59,0.3)", color: "#cf9b3b", width: 40, height: 40, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&#10005;</button>
      <button onClick={onPrev} aria-label="Photo précédente" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 56, height: 56, cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>&#8249;</button>
      <button onClick={onNext} aria-label="Photo suivante" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 56, height: 56, cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>&#8250;</button>
      <img src={photos[active].src} alt={photos[active].alt} onError={(e) => { e.target.style.opacity = 0.1; e.target.alt = "Photo non disponible"; }} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }} />
      <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", fontFamily: "'Oswald',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase" }}>{photos[active].desc}</div>
    </div>
  );
}

/* ─── Palmarès ─── */
function PalmaresSection() {
  const [ref, v] = useReveal();
  return (
    <section id="palmares" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #08080e 0%, #0a0a10 100%)", borderTop: "1px solid rgba(207,155,59,0.08)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Résultats</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Palmarès<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        {/* Timeline verticale */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Ligne verticale dorée */}
          <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg, #cf9b3b 0%, rgba(207,155,59,0.15) 100%)" }} />
          {FIGHTER.palmares.map((p, i) => {
            const medal = p.result.includes("🥇") ? "#cf9b3b" : p.result.includes("🥈") ? "#c0c0c0" : "#cd7f32";
            const resultText = p.result.replace(/🥇|🥈|🥉/g, "").trim();
            return (
              <div key={i} style={{
                position: "relative", marginBottom: i < FIGHTER.palmares.length - 1 ? 6 : 0,
                opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1)`, transitionDelay: `${0.15 + i * 0.1}s`
              }}>
                {/* Nœud médaille */}
                <div style={{
                  position: "absolute", left: -40, top: 24, width: 32, height: 32,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle at 35% 35%, ${medal}, ${medal}88)`,
                  boxShadow: p.highlight ? `0 0 20px ${medal}44, 0 0 40px ${medal}22` : "none",
                  border: `2px solid ${medal}`, zIndex: 2
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#06060a"><path d="M5 3h14v2a7 7 0 01-14 0V3z"/><path d="M12 12v3" stroke="#06060a" strokeWidth="1.5"/><path d="M8 18h8v1H8z"/><path d="M9 15h6a1 1 0 011 1v2H8v-2a1 1 0 011-1z"/></svg>
                </div>
                {/* Carte résultat */}
                <div style={{
                  padding: "22px 28px", background: p.highlight ? "rgba(207,155,59,0.05)" : "rgba(255,255,255,0.015)",
                  border: `1px solid ${p.highlight ? "rgba(207,155,59,0.15)" : "rgba(255,255,255,0.04)"}`,
                  borderRadius: 4, transition: "all 0.3s"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 28, color: medal, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>{p.year}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>{p.event}</div>
                    </div>
                    <div style={{
                      padding: "8px 18px", background: `${medal}12`, border: `1px solid ${medal}33`,
                      fontFamily: "'Oswald',sans-serif", fontSize: 12, color: medal, fontWeight: 600,
                      letterSpacing: 2, textTransform: "uppercase", borderRadius: 2,
                      display: "inline-flex", alignItems: "center", gap: 8
                    }}>
                      {p.highlight && <span style={{ display: "inline-flex", width: 18, height: 12, borderRadius: 2, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }}><span style={{ flex: 1, background: "#002395" }} /><span style={{ flex: 1, background: "#fff" }} /><span style={{ flex: 1, background: "#ED2939" }} /></span>}
                      {resultText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Et ensuite — Ambition & Sponsoring */}
        <div style={{ marginTop: 64, borderTop: "1px solid rgba(207,155,59,0.08)", paddingTop: 48 }}>
          <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Et ensuite</div>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(22px,4vw,36px)", color: "#fff", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
            L'objectif est clair : passer au niveau supérieur<span style={{ color: "#cf9b3b" }}>.</span>
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.58)", maxWidth: 600, marginBottom: 12 }}>
            À seulement 18 ans, Carmelo Zambelli s'est déjà imposé parmi les jeunes athlètes les plus prometteurs du Karaté Mix français. La prochaine étape est décisive : accéder au circuit européen, puis franchir le cap du professionnalisme.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.58)", maxWidth: 600, marginBottom: 36 }}>
            Aujourd'hui, Carmelo construit un projet sportif ambitieux et recherche des partenaires prêts à soutenir une trajectoire en pleine accélération, portée par des valeurs fortes : discipline, performance et engagement.
          </p>
          {[
            { phase: "Court terme", subtitle: "Professionnalisation", goal: "Structurer sa carrière, multiplier les combats et intégrer les premiers événements majeurs.", icon: "/images/picto-eclair.png" },
            { phase: "Moyen terme", subtitle: "Scène européenne FFK", goal: "Participer aux compétitions internationales et s'installer durablement parmi l'élite.", icon: "/images/picto-eu.png" },
            { phase: "Long terme", subtitle: "Porter les couleurs de la France", goal: "Représenter la France au plus haut niveau et devenir une référence du Karaté Mix.", icon: "/images/picto-fr.png" },
          ].map((o, i) => (
            <div key={i} style={{
              display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              opacity: v ? 1 : 0, transition: `opacity 0.6s ${0.4 + i * 0.15}s`
            }}>
              <div style={{
                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}><img src={o.icon} alt={o.phase} width="48" height="48" loading="lazy" style={{ width: 48, height: 48, objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(207,155,59,0.3))" }} /></div>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 4, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 4, fontWeight: 700 }}>{o.phase}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, color: "#fff", fontWeight: 500, letterSpacing: 1, marginBottom: 6 }}>{o.subtitle}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{o.goal}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 32, padding: "28px 24px", borderLeft: "2px solid #cf9b3b", background: "rgba(207,155,59,0.03)" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", fontStyle: "italic", margin: 0 }}>
              « 14 soumissions sur 18 victoires.<br />Mon style, c'est le contrôle. Mon objectif, c'est le sommet. »
            </p>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: 4, color: "#cf9b3b", marginTop: 14, textTransform: "uppercase" }}>— Carmelo Zambelli</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Événements FFK ─── */
const FFK_EVENTS = [
  { date: "11 Avr 2026", name: "Open de France Karaté Mix Light", location: "À confirmer", url: "https://www.ffkarate.fr/calendrier/open-de-france-karate-mix-individuels/", status: "inscriptions" },
  { date: "12 Avr 2026", name: "Open de France Karaté Mix & Mix Élite", location: "À confirmer", url: "https://www.ffkarate.fr/calendrier/open-de-france-karate-mix-et-mix-elite/", status: "inscriptions" },
];

function EventsSection() {
  const [ref, v] = useReveal();
  return (
    <section id="events" ref={ref} style={{
      padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)",
      background: "linear-gradient(180deg, #08080e 0%, #0a0806 100%)",
      borderTop: "1px solid rgba(207,155,59,0.08)", position: "relative"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(207,155,59,0.025) 0%, transparent 70%)" }} />
      <div style={{
        maxWidth: 960, margin: "0 auto", position: "relative",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Calendrier</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Prochains événements<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.55)", maxWidth: 560, marginBottom: 44 }}>
          Compétitions officielles Karaté Mix sous l'égide de la Fédération Française de Karaté.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FFK_EVENTS.map((e, i) => (
            <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="sponsorCard eventCard" style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "clamp(16px,3vw,32px)", alignItems: "center",
              padding: "24px clamp(16px,3vw,28px)", background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(207,155,59,0.08)", textDecoration: "none",
              transition: "all 0.3s", cursor: "pointer",
              opacity: v ? 1 : 0, transitionDelay: `${0.2 + i * 0.12}s`
            }}>
              <div style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, color: "#cf9b3b", fontWeight: 700, lineHeight: 1 }}>{e.date.split(" ")[0]}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginTop: 4 }}>{e.date.split(" ").slice(1).join(" ")}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, color: "#fff", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{e.name}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.52)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 4, marginTop: -2 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="rgba(255,255,255,0.52)" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="rgba(255,255,255,0.52)" strokeWidth="1.5"/></svg>
                  {e.location}
                </div>
              </div>
              <div style={{
                padding: "6px 14px", fontSize: 9, letterSpacing: 3,
                fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase",
                color: "#cf9b3b", border: "1px solid rgba(207,155,59,0.2)", background: "rgba(207,155,59,0.06)"
              }}>{e.status}</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <a href="https://www.ffkarate.fr/calendrier?cat_id%5B%5D=243" target="_blank" rel="noopener noreferrer" className="cS" style={{
            padding: "12px 28px", border: "1px solid rgba(207,155,59,0.2)", color: "#cf9b3b",
            textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s",
            background: "rgba(207,155,59,0.04)", display: "inline-flex", alignItems: "center", gap: 8
          }}>
            <img src="/images/logo-ffk.svg" alt="FFK" width="16" height="16" loading="lazy" style={{ height: 16, filter: "brightness(1.2)" }} />
            Calendrier complet FFK
            <span style={{ fontSize: 14 }}>&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Coach ─── */
function CoachSection() {
  const [ref, v] = useReveal();
  return (
    <section id="team" ref={ref} style={{
      padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)",
      background: "linear-gradient(180deg, #0a0806 0%, #06060a 100%)",
      borderTop: "1px solid rgba(207,155,59,0.06)", position: "relative"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 50% at 20% 50%, rgba(207,155,59,0.03) 0%, transparent 70%)" }} />
      <div style={{
        maxWidth: 960, margin: "0 auto", position: "relative",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div className="coachGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          {/* Colonne gauche : titre + bio */}
          <div>
            <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>L'Équipe</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
              Maître Philippe<br />Rollin<span style={{ color: "#cf9b3b" }}>.</span>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.62)", margin: "0 0 32px" }}>
              {COACH.bio}
            </p>
            {/* Key stats */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { n: "5ème", l: "Dan" },
                { n: "47+", l: "Ans d'enseignement" },
                { n: "30", l: "Ceintures noires" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", minWidth: 80 }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 32, color: "#cf9b3b", fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.48)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginTop: 6, fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : photo + qualifications — aligné en haut avec le titre */}
          <div style={{
            padding: "32px 28px", background: "rgba(207,155,59,0.03)",
            border: "1px solid rgba(207,155,59,0.08)"
          }}>
            {/* Photo Philippe Rollin & Greg MMA — cercle doré centré */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
              <div style={{
                width: 200, height: 200,
                borderRadius: "50%", overflow: "hidden",
                border: "3px solid #cf9b3b",
                boxShadow: "0 0 30px rgba(207,155,59,0.2), 0 6px 24px rgba(0,0,0,0.4)"
              }}>
                <img src="/images/rollin-greg-mma.jpg" alt="Maître Philippe Rollin et Greg MMA" width="200" height="200" loading="lazy" onError={(e) => { e.target.style.opacity = 0.1; e.target.alt = "Photo non disponible"; }} style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%",
                  filter: "saturate(0.85)"
                }} />
              </div>
            </div>
            <div style={{
              fontFamily: "'Oswald',sans-serif", fontSize: 14, letterSpacing: 5,
              color: "#cf9b3b", marginBottom: 24, textTransform: "uppercase", fontWeight: 600
            }}>Qualifications</div>
            {COACH.credentials.map((c, i) => (
              <div key={i} style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)",
                padding: "12px 0", borderBottom: i < COACH.credentials.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ color: "#cf9b3b", fontSize: 10 }}>◆</span> {c}
              </div>
            ))}
            <div style={{
              marginTop: 24, padding: "12px 16px", background: "rgba(207,155,59,0.06)",
              fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)",
              fontStyle: "italic", lineHeight: 1.6
            }}>
              « Carmelo est le produit d'une école de combat complète — du judo au jujitsu, en passant par le karaté.
              C'est cette polyvalence qui fait la différence dans la cage. »
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── YouTube Facade (lazy load) ─── */
function YouTubeFacade({ videoId, start = 0 }) {
  const [play, setPlay] = useState(false);
  return (
    <div style={{ marginTop: 48, marginBottom: 40, maxWidth: "min(100%, 560px)", margin: "48px auto 40px" }}>
      <div style={{ fontSize: 10, letterSpacing: 5, color: "#cf9b3b", marginBottom: 16, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>En action</div>
      <div style={{
        position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden",
        border: "1px solid rgba(207,155,59,0.12)", background: "#000", cursor: play ? "default" : "pointer"
      }} onClick={() => !play && setPlay(true)} role={play ? undefined : "button"} aria-label={play ? undefined : "Lire la vidéo Karaté Mix"} tabIndex={play ? undefined : 0} onKeyDown={(e) => { if (!play && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setPlay(true); } }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?start=${start}&rel=0&modestbranding=1&color=white&autoplay=1`}
            title="Karaté Mix — Saison 2024/2025 (FFK)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        ) : (
          <>
            <img src="/images/yt-karate-mix.jpg" alt="Karaté Mix — Saison 2024/2025" width="480" height="360" loading="lazy" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", minHeight: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 68, height: 48, background: "rgba(207,155,59,0.9)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)", transition: "transform 0.3s" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#06060a"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: 8, fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.48)", letterSpacing: 1 }}>
        Source : Fédération Française de Karaté — Karaté Mix Saison 2024/2025
      </div>
    </div>
  );
}

/* ─── Karaté Mix FFK ─── */
function KarateMixSection() {
  const [ref, v] = useReveal();
  return (
    <section id="discipline" ref={ref} style={{
      padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)",
      background: "linear-gradient(180deg, #0a0a10 0%, #0a0806 100%)",
      borderTop: "1px solid rgba(207,155,59,0.08)", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(207,155,59,0.03) 0%, transparent 70%)" }} />
      <div style={{
        maxWidth: 960, margin: "0 auto", position: "relative",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>La discipline</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Le Karaté Mix<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 2, color: "rgba(255,255,255,0.62)", maxWidth: 620, marginBottom: 44 }}>
          Discipline officielle de la Fédération Française de Karaté (FFK), le Karaté Mix combine les techniques de frappe du karaté traditionnel avec le combat au sol issu du jujitsu et du grappling. Pieds, poings, projections et soumissions : un sport complet encadré par une fédération olympique.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 2, justifyContent: "center" }}>
          {[
            { img: "/images/icon-frappe.png", title: "Frappe debout", desc: "Poings, pieds, genoux issus du karaté et du kickboxing" },
            { img: "/images/icon-projection.png", title: "Projections", desc: "Amenées au sol héritées du judo et du jujitsu" },
            { img: "/images/icon-soumission.png", title: "Soumissions", desc: "Clés articulaires et étranglements au sol" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "18px 14px", background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(207,155,59,0.06)", transition: "all 0.3s",
              opacity: v ? 1 : 0, transitionDelay: `${0.3 + i * 0.12}s`
            }}>
              <div style={{ marginBottom: 10 }}><img src={item.img} alt={item.title} width="150" height="150" loading="lazy" style={{ width: 150, height: 150, objectFit: "contain" }} /></div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, color: "#fff", fontWeight: 600, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>{item.title}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Vidéo YouTube FFK — facade pour lazy load */}
        <YouTubeFacade videoId="3d39S4qZYWc" start={13} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <a href="https://www.ffkarate.fr" target="_blank" rel="noopener noreferrer" className="cS" style={{
            padding: "12px 28px", border: "1px solid rgba(207,155,59,0.2)", color: "#cf9b3b",
            textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s",
            background: "rgba(207,155,59,0.04)", display: "inline-flex", alignItems: "center", gap: 8
          }}>
            <img src="/images/logo-ffk.svg" alt="FFK" width="16" height="16" loading="lazy" style={{ height: 16, filter: "brightness(1.2)" }} />
            Site officiel FFK
            <span style={{ fontSize: 14 }}>&#8599;</span>
          </a>
          <a href="https://www.ffkarate.fr/karate-mix/" target="_blank" rel="noopener noreferrer" style={{
            color: "rgba(255,255,255,0.52)", textDecoration: "none", fontFamily: "'Inter',sans-serif",
            fontSize: 11, letterSpacing: 2, fontWeight: 500, transition: "color 0.3s"
          }}>Règlement Karaté Mix &#8599;</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Sponsors ─── */
function FighterDiagram({ zones = [], color, id }) {
  const on = (z) => zones.includes(z);
  const fill = (z) => on(z) ? `${color}20` : "rgba(255,255,255,0.012)";
  const stk = (z) => on(z) ? `${color}88` : "rgba(255,255,255,0.05)";
  const sw = (z) => on(z) ? 1.4 : 0.6;
  const fId = `glow-${id}`;
  const annotations = [
    { id: "epaules", label: "Épaules", lx: 192, ly: 78, fx: 158, fy: 78 },
    { id: "kimono", label: "Poitrine", lx: 192, ly: 125, fx: 138, fy: 125 },
    { id: "gants", label: "Gants", lx: 192, ly: 160, fx: 176, fy: 157 },
    { id: "genoux", label: "Genoux", lx: 192, ly: 248, fx: 134, fy: 248 },
    { id: "tibias", label: "Tibias", lx: 192, ly: 293, fx: 136, fy: 293 },
  ];
  return (
    <svg viewBox="0 0 270 370" style={{ width: "100%", maxWidth: 230, height: "auto", display: "block", margin: "0 auto" }}>
      <defs>
        <filter id={fId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id={`head-${id}`}><circle cx="100" cy="28" r="16" /></clipPath>
      </defs>
      {/* Head — portrait Carmelo */}
      <image href="/images/portrait-carmelo.png" x="84" y="12" width="32" height="32" clipPath={`url(#head-${id})`} preserveAspectRatio="xMidYMid slice" />
      <circle cx="100" cy="28" r="16" fill="none" stroke={`${color}66`} strokeWidth="1.2" />
      {/* Neck */}
      <rect x="94" y="44" width="12" height="10" rx="2" fill="rgba(255,255,255,0.02)" />
      {/* Torso / Rashguard */}
      <path d="M65,56 L135,56 L130,185 L70,185 Z" fill={fill("kimono")} stroke={stk("kimono")} strokeWidth={sw("kimono")} filter={on("kimono") ? `url(#${fId})` : undefined} />
      {on("kimono") && <>
        <rect x="82" y="108" width="36" height="22" rx="2" fill="none" stroke={`${color}44`} strokeWidth="0.7" strokeDasharray="2,2" />
        <text x="100" y="123" textAnchor="middle" fill={`${color}77`} fontSize="6.5" fontFamily="Inter,sans-serif" fontWeight="600">VOTRE LOGO</text>
      </>}
      {/* Belt */}
      <line x1="72" y1="158" x2="128" y2="158" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      {/* Shoulders */}
      <path d="M65,56 L42,72 L47,98 L70,80 Z" fill={fill("epaules")} stroke={stk("epaules")} strokeWidth={sw("epaules")} filter={on("epaules") ? `url(#${fId})` : undefined} />
      <path d="M135,56 L158,72 L153,98 L130,80 Z" fill={fill("epaules")} stroke={stk("epaules")} strokeWidth={sw("epaules")} filter={on("epaules") ? `url(#${fId})` : undefined} />
      {/* Arms */}
      <path d="M42,72 L24,150 L38,155 L52,92" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
      <path d="M158,72 L176,150 L162,155 L148,92" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
      {/* Gloves */}
      <ellipse cx="24" cy="157" rx="12" ry="10" fill={fill("gants")} stroke={stk("gants")} strokeWidth={sw("gants")} filter={on("gants") ? `url(#${fId})` : undefined} />
      <ellipse cx="176" cy="157" rx="12" ry="10" fill={fill("gants")} stroke={stk("gants")} strokeWidth={sw("gants")} filter={on("gants") ? `url(#${fId})` : undefined} />
      {/* Shorts */}
      <path d="M72,185 L67,232 L95,232 L100,192 L105,232 L133,232 L128,185 Z" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
      {/* Legs */}
      <path d="M72,232 L66,340 L86,340 L92,232 Z" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
      <path d="M108,232 L114,340 L134,340 L128,232 Z" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
      {/* Knee pads */}
      <ellipse cx="80" cy="248" rx="12" ry="9" fill={fill("genoux")} stroke={stk("genoux")} strokeWidth={sw("genoux")} filter={on("genoux") ? `url(#${fId})` : undefined} />
      <ellipse cx="122" cy="248" rx="12" ry="9" fill={fill("genoux")} stroke={stk("genoux")} strokeWidth={sw("genoux")} filter={on("genoux") ? `url(#${fId})` : undefined} />
      {/* Shin guards */}
      <rect x="67" y="270" width="18" height="48" rx="5" fill={fill("tibias")} stroke={stk("tibias")} strokeWidth={sw("tibias")} filter={on("tibias") ? `url(#${fId})` : undefined} />
      <rect x="115" y="270" width="18" height="48" rx="5" fill={fill("tibias")} stroke={stk("tibias")} strokeWidth={sw("tibias")} filter={on("tibias") ? `url(#${fId})` : undefined} />
      {/* Feet */}
      <ellipse cx="76" cy="347" rx="11" ry="6" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <ellipse cx="124" cy="347" rx="11" ry="6" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      {/* Annotation lines + labels */}
      {annotations.map((a) => (
        <g key={a.id} opacity={on(a.id) ? 1 : 0.15}>
          <line x1={a.fx} y1={a.fy} x2={a.lx - 4} y2={a.ly} stroke={on(a.id) ? `${color}55` : "rgba(255,255,255,0.08)"} strokeWidth="0.6" strokeDasharray="3,2" />
          <circle cx={a.lx - 4} cy={a.ly} r="1.5" fill={on(a.id) ? color : "rgba(255,255,255,0.1)"} />
          <text x={a.lx} y={a.ly + 3.5} fill={on(a.id) ? `${color}cc` : "rgba(255,255,255,0.12)"} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500">{a.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SponsorsSection() {
  const [ref, v] = useReveal();
  const tiers = [
    { tier: "OR", color: "#cf9b3b", accent: true, zones: ["kimono", "epaules", "gants", "genoux", "tibias"], digital: ["Posts dédiés mensuels", "Présence compétitions", "Contenu vidéo exclusif", "Mention interview & médias"] },
    { tier: "ARGENT", color: "#94a3b8", accent: false, zones: ["epaules", "genoux", "tibias"], digital: ["Mentions réseaux sociaux", "Stories sponsorisées", "Tag événements"] },
    { tier: "BRONZE", color: "#b87333", accent: false, zones: ["tibias"], digital: ["Logo bannière web", "Remerciements en post", "Tag en story compétition"] },
  ];
  return (
    <section id="sponsors" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg,#0a0806,#06060a)", borderTop: "1px solid rgba(207,155,59,0.06)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Partenariats</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Investissez dans<br />un champion<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto 20px" }}>
          18 ans, double champion de France, 86% de win rate, licencié FFK. Associez votre marque à un athlète en pleine ascension.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 48px" }}>
          Choisissez vos emplacements de visibilité — du kimono aux gants, affichez votre logo là où il compte.
        </p>

        <div className="sponsorGrid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {tiers.map((t, i) => (
            <div key={i} className="sponsorCard" style={{ padding: "28px 16px 24px", background: "rgba(255,255,255,0.012)", border: t.accent ? "1px solid rgba(207,155,59,0.18)" : "1px solid rgba(255,255,255,0.03)", position: "relative", overflow: "hidden", textAlign: "center", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
              {t.accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#cf9b3b,#e8b84a,#cf9b3b)" }} />}
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 8, color: t.color, marginBottom: 4, fontWeight: 700 }}>{t.tier}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif", marginBottom: 16, letterSpacing: 1 }}>{t.zones.length} zone{t.zones.length > 1 ? "s" : ""} de placement</div>

              {/* Fighter diagram */}
              <FighterDiagram zones={t.zones} color={t.color} id={t.tier.toLowerCase()} />

              {/* Separator */}
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${t.color}22, transparent)`, margin: "20px 0 16px" }} />

              {/* Digital benefits */}
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Visibilité digitale</div>
                {t.digital.map((d, j) => (
                  <div key={j} style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", padding: "6px 0" }}>
                    <span style={{ color: t.color, marginRight: 7 }}>&#10003;</span> {d}
                  </div>
                ))}
              </div>

              <a href="#contact" className="cP" style={{
                display: "block", textAlign: "center", marginTop: 20, padding: "11px 0",
                background: t.accent ? "rgba(207,155,59,0.1)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${t.accent ? "rgba(207,155,59,0.18)" : "rgba(255,255,255,0.05)"}`,
                color: t.accent ? "#cf9b3b" : "rgba(255,255,255,0.45)",
                textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, transition: "all 0.3s"
              }}>Contacter</a>
            </div>
          ))}
        </div>

        {/* Appel sponsors supplémentaires */}
        <div style={{ marginTop: 48, padding: "32px 24px", background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#fff", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
            Ouvert à tous les partenaires
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.52)", maxWidth: 600, margin: "0 auto 16px" }}>
            Ostéopathe, préparateur physique, marque de nutrition, équipementier, salle de sport, ou toute entreprise souhaitant s'associer à un champion — <span style={{ color: "#cf9b3b" }}>nous sommes ouverts à toutes les propositions</span>.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", maxWidth: 500, margin: "0 auto" }}>
            Chaque partenaire bénéficie également d'un emplacement sur la <span style={{ color: "rgba(255,255,255,0.62)" }}>bannière sponsors du site</span>, visible sur toutes les pages.
          </p>
        </div>
        <div style={{ marginTop: 48 }}><SponsorMarquee /></div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function ContactSection() {
  const [ref, v] = useReveal();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const iS = { padding: "14px 18px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 13, outline: "none", transition: "border 0.3s", width: "100%", boxSizing: "border-box" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.target);
    try {
      await fetch("https://formspree.io/f/VOTRE_ID", {
        method: "POST", body: data, headers: { Accept: "application/json" }
      });
      setSent(true);
    } catch { setSent(true); }
    setSending(false);
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #0a0a10 0%, #08080e 100%)", borderTop: "1px solid rgba(207,155,59,0.08)" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 13, letterSpacing: 7, color: "#cf9b3b", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Contact</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Passons à<br />l'action<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.50)", marginBottom: 40 }}>Sponsor, média, organisateur ou partenaire — envoyez votre proposition.</p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="text" name="name" placeholder="Nom" required aria-label="Nom" style={{ ...iS, flex: 1, minWidth: 140 }} />
              <input type="email" name="email" placeholder="Email" required aria-label="Email" style={{ ...iS, flex: 1, minWidth: 140 }} />
            </div>
            <select name="type" aria-label="Type de demande" style={{ ...iS, cursor: "pointer", color: "rgba(255,255,255,0.82)" }}>
              <option value="" style={{ background: "#0a0a10", color: "rgba(255,255,255,0.65)" }}>Type de demande</option>
              <option style={{ background: "#0a0a10", color: "#fff" }}>Sponsoring / Partenariat</option>
              <option style={{ background: "#0a0a10", color: "#fff" }}>Presse / Média</option>
              <option style={{ background: "#0a0a10", color: "#fff" }}>Événement</option>
              <option style={{ background: "#0a0a10", color: "#fff" }}>Autre</option>
            </select>
            <textarea name="message" placeholder="Votre message..." rows={4} required aria-label="Message" style={{ ...iS, resize: "vertical" }} />
            <button type="submit" disabled={sending} className="cP" style={{
              padding: "15px", background: sending ? "rgba(207,155,59,0.5)" : "linear-gradient(135deg,#cf9b3b,#a67c2e)", color: "#06060a", border: "none",
              fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
              cursor: sending ? "wait" : "pointer", boxShadow: "0 4px 30px rgba(207,155,59,0.2)", transition: "all 0.3s", marginTop: 4
            }}>{sending ? "Envoi..." : "Envoyer"}</button>
          </form>
        ) : (
          <div style={{ padding: "44px 28px", background: "rgba(207,155,59,0.04)", border: "1px solid rgba(207,155,59,0.12)" }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🥋</div>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 24, color: "#fff", letterSpacing: 4, marginBottom: 6, fontWeight: 700 }}>MESSAGE ENVOYÉ</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.52)" }}>Réponse sous 48h.</div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function SponsorMarquee() {
  const logos = [
    { name: "OSTÉO SPORT", icon: "+" },
    { name: "NUTRI FORCE", icon: "◆" },
    { name: "FIGHT GEAR PRO", icon: "●" },
    { name: "PHYSIO MAX", icon: "+" },
    { name: "ALPHA GYM", icon: "■" },
    { name: "RECOVERY LAB", icon: "◆" },
    { name: "COMBAT NUTRITION", icon: "●" },
    { name: "FLEX TRAINING", icon: "■" },
  ];
  const row = [...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", padding: "20px 0", borderTop: "1px solid rgba(207,155,59,0.06)", borderBottom: "1px solid rgba(207,155,59,0.06)", marginBottom: 28, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(90deg, #04040a, transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(270deg, #04040a, transparent)", zIndex: 2 }} />
      <div style={{ display: "flex", gap: 48, animation: "sponsorScroll 30s linear infinite", width: "max-content" }}>
        {row.map((l, i) => (
          <div key={i} aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, color: "rgba(207,155,59,0.22)", lineHeight: 1 }}>{l.icon}</span>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.22)", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>{l.name}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <span aria-hidden="true" style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase" }}>Emplacement réservé aux partenaires</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "40px clamp(20px,5vw,48px) 24px", background: "#04040a", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #cf9b3b, #e8b84a, #cf9b3b, transparent)", backgroundSize: "200% 100%", animation: "footerGlow 4s ease-in-out infinite" }} />

      {/* Bannière sponsors défilante */}
      <SponsorMarquee />

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 20, flexWrap: "wrap" }}>
        <a href={FIGHTER.social.instagram} target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(255,255,255,0.48)", textDecoration: "none", fontFamily: "'Inter',sans-serif",
          fontSize: 11, letterSpacing: 2, fontWeight: 500, textTransform: "uppercase", transition: "color 0.3s",
          display: "flex", alignItems: "center", gap: 8
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
      </div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 1 }}>
        © 2026 Carmelo Zambelli · APRAM · <a href="https://www.ffkarate.fr" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(207,155,59,0.65)", textDecoration: "underline", textUnderlineOffset: 2, transition: "color 0.3s" }}>FFK</a>
      </div>
    </footer>
  );
}

/* ─── Floating Spotify ─── */
function FloatingSpotify() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const playlists = [
    { name: "Workout Motivation", id: "37i9dQZF1DWSJaGvRwFnf6" },
    { name: "Training Mix", id: "2SrsE5W2WSPRmUWHjvXxum" },
  ];
  useEffect(() => {
    const h = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const atContact = contact.getBoundingClientRect().top < window.innerHeight * 0.25;
      const show = pastHero && !atContact;
      setVisible(show);
      if (!show) { setMobileOpen(false); setDismissed(false); }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* Onglet droite — desktop: après dismiss / mobile: toujours */}
      <button className={`mSpotifyTab${dismissed ? " spDismissed" : ""}`} onClick={() => { setDismissed(false); setMobileOpen(true); }} aria-label="Ouvrir les playlists Spotify" style={{
        position: "fixed", right: 0, bottom: 100,
        zIndex: 951, display: "none",
        background: "rgba(6,6,10,0.92)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(30,215,96,0.25)", borderRight: "none",
        borderRadius: "10px 0 0 10px",
        padding: "10px 7px", cursor: "pointer",
        opacity: visible && !mobileOpen ? 1 : 0,
        pointerEvents: visible && !mobileOpen ? "auto" : "none",
        transition: "opacity 0.3s",
        flexDirection: "column", alignItems: "center", gap: 6,
        boxShadow: "-4px 0 20px rgba(0,0,0,0.5)"
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/></svg>
        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 8, color: "#1DB954", letterSpacing: 1, writingMode: "vertical-lr" }}>MIX</span>
      </button>

      {/* Carte flottante droite — sous la bio */}
      <div className={`floatingSpotify${mobileOpen ? " mSpOpen" : ""}`} style={{
        position: "fixed", right: 20, bottom: 80, transform: `translateX(${visible && !dismissed ? 0 : 280}px)`,
        zIndex: 950, width: 220, padding: "22px 18px",
        background: "rgba(6,6,10,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(30,215,96,0.12)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",
        opacity: visible && !dismissed ? 1 : 0, pointerEvents: visible && !dismissed ? "auto" : "none"
      }}>
        {/* Bouton fermer — visible partout */}
        <button onClick={() => { setDismissed(true); setMobileOpen(false); }} aria-label="Fermer les playlists" style={{
          position: "absolute", top: 8, right: 8,
          background: "none", border: "none", color: "rgba(255,255,255,0.4)",
          fontSize: 16, cursor: "pointer", lineHeight: 1, padding: 4, zIndex: 2
        }}>&#10005;</button>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #1DB954, #1ed760, #1DB954)" }} />

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginBottom: 8 }}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/></svg>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, color: "#fff", letterSpacing: 3, fontWeight: 700, textTransform: "uppercase" }}>
            Mes <span style={{ color: "#1DB954" }}>Playlists</span>
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 2, fontFamily: "'Inter',sans-serif", marginTop: 4 }}>TRAINING · COMBAT · FOCUS</div>
        </div>

        {playlists.map((pl, i) => (
          <a key={i} href={`https://open.spotify.com/playlist/${pl.id}`} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 0", textDecoration: "none",
            borderTop: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.3s"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 4,
              background: `linear-gradient(135deg, rgba(30,215,96,${0.15 + i * 0.08}), rgba(6,6,10,0.8))`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <span style={{ fontSize: 14 }}>{["🔥", "⚡"][i]}</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600, lineHeight: 1.3 }}>{pl.name}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, color: "#1DB954", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Écouter</div>
            </div>
          </a>
        ))}

        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" style={{
          display: "block", textAlign: "center", padding: "10px 0", marginTop: 14,
          background: "linear-gradient(135deg, #1DB954, #169c46)",
          color: "#fff", textDecoration: "none", fontFamily: "'Oswald',sans-serif",
          fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700,
          transition: "all 0.3s"
        }}>Ouvrir Spotify</a>
      </div>
    </>
  );
}

/* ─── Scroll Progress Bar ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1100, background: "rgba(6,6,10,0.5)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #cf9b3b, #e8b84a)", transition: "width 0.1s linear", boxShadow: "0 0 8px rgba(207,155,59,0.4)" }} />
    </div>
  );
}

/* ─── Floating Bio Card ─── */
function FloatingBio() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const atContact = contact.getBoundingClientRect().top < window.innerHeight * 0.25;
      setVisible(pastHero && !atContact);
      if (!pastHero || atContact) setMobileOpen(false);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* Onglet mobile — petit avatar CZ sur le bord droit */}
      <button className="mFloatTab" onClick={() => setMobileOpen(true)} aria-label="Ouvrir la bio" style={{
        position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
        zIndex: 951, display: "none",
        background: "rgba(6,6,10,0.92)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(207,155,59,0.2)", borderRight: "none",
        borderRadius: "10px 0 0 10px",
        padding: "10px 7px", cursor: "pointer",
        opacity: visible && !mobileOpen ? 1 : 0,
        pointerEvents: visible && !mobileOpen ? "auto" : "none",
        transition: "opacity 0.3s",
        flexDirection: "column", alignItems: "center", gap: 6,
        boxShadow: "-4px 0 20px rgba(0,0,0,0.5)"
      }}>
        <img src="/images/portrait-carmelo.png" alt="" style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px solid #cf9b3b", objectFit: "cover", objectPosition: "center 20%" }} />
        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, color: "#cf9b3b", letterSpacing: 2, writingMode: "vertical-lr" }}>BIO</span>
      </button>

      {/* Carte flottante */}
      <div className={`floatingBio${mobileOpen ? " mOpen" : ""}`} style={{
        position: "fixed", right: 20, top: 80, transform: `translateX(${visible ? 0 : 280}px)`,
        zIndex: 950, width: 220, padding: "22px 18px",
        background: "rgba(6,6,10,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(207,155,59,0.12)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",
        opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none"
      }}>
        {/* Bouton fermer mobile */}
        <button className="mFloatClose" onClick={() => setMobileOpen(false)} aria-label="Fermer la bio" style={{
          display: "none", position: "absolute", top: 8, right: 8,
          background: "none", border: "none", color: "rgba(255,255,255,0.5)",
          fontSize: 18, cursor: "pointer", lineHeight: 1, padding: 4, zIndex: 2
        }}>&#10005;</button>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #cf9b3b, #e8b84a, #cf9b3b)" }} />

        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 10px" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "2px solid #cf9b3b", overflow: "hidden",
              boxShadow: "0 0 16px rgba(207,155,59,0.2)"
            }}>
              <img src="/images/portrait-carmelo.png" alt="Carmelo Zambelli" onError={(e) => { e.target.style.opacity = 0.1; }} style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%"
              }} />
            </div>
            <div style={{
              position: "absolute", bottom: -2, right: -2,
              width: 20, height: 14, borderRadius: 3,
              overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.15)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
              display: "flex"
            }}>
              <div style={{ flex: 1, background: "#002395" }} />
              <div style={{ flex: 1, background: "#fff" }} />
              <div style={{ flex: 1, background: "#ED2939" }} />
            </div>
          </div>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, color: "#fff", letterSpacing: 3, fontWeight: 700 }}>
            CARMELO <span style={{ color: "#cf9b3b" }}>ZAMBELLI</span>
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.65)", letterSpacing: 2, fontFamily: "'Inter',sans-serif", marginTop: 4 }}>-70KG · KARATÉ MIX FFK</div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, marginBottom: 12 }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 11, lineHeight: 1.7,
            color: "rgba(255,255,255,0.85)", margin: 0
          }}>
            Passionné d'arts martiaux depuis l'enfance, Carmelo Zambelli est un jeune talent du Karaté Mix. Champion de France à 18 ans, il poursuit son ascension sur le circuit européen.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, marginBottom: 14 }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 10, lineHeight: 1.7,
            color: "rgba(255,255,255,0.75)", margin: 0
          }}>
            Pour franchir une nouvelle étape, il recherche des partenaires prêts à soutenir un athlète ambitieux et à forte visibilité.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 10 }}>
          {[
            { n: "18", l: "Wins" }, { n: "14", l: "Sub" }, { n: "86%", l: "Rate" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#cf9b3b", fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 7, letterSpacing: 2, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <a href="#sponsors" onClick={() => setMobileOpen(false)} className="cP" style={{
          display: "block", textAlign: "center", padding: "10px 0",
          background: "linear-gradient(135deg, #cf9b3b, #a67c2e)",
          color: "#06060a", textDecoration: "none", fontFamily: "'Oswald',sans-serif",
          fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700,
          boxShadow: "0 4px 20px rgba(207,155,59,0.2)", transition: "all 0.3s"
        }}>Devenir Partenaire</a>
      </div>
    </>
  );
}

/* ─── Add to Favorites Banner ─── */
function FavoriteBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const dismissed = sessionStorage.getItem("favDismissed");
    if (!dismissed) {
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = () => { setShow(false); sessionStorage.setItem("favDismissed", "1"); };
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
  const msg = isIos
    ? "Appuyez sur \u{E2}\u{9C}\u{89} puis « Sur l\u2019\u00E9cran d\u2019accueil »"
    : isAndroid
    ? "Appuyez sur \u22EE puis « Ajouter \u00E0 l\u2019\u00E9cran d\u2019accueil »"
    : "Ctrl+D pour ajouter en favori";
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", bottom: 84, left: "50%", transform: "translateX(-50%)",
      zIndex: 1100, background: "rgba(10,8,6,0.95)", backdropFilter: "blur(16px)",
      border: "1px solid rgba(207,155,59,0.25)", padding: "14px 20px",
      display: "flex", alignItems: "center", gap: 14, maxWidth: "calc(100vw - 32px)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(207,155,59,0.08)"
    }}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>&#9733;</span>
      <div>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, color: "#cf9b3b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 3 }}>Ajouter en favori</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{msg}</div>
      </div>
      <button onClick={dismiss} aria-label="Fermer" style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.4)",
        fontSize: 18, cursor: "pointer", padding: "0 0 0 8px", lineHeight: 1
      }}>&#10005;</button>
    </div>
  );
}

/* ─── Scroll to top ─── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return show ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut" style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 900,
      width: 44, height: 44, border: "1px solid rgba(207,155,59,0.25)",
      background: "rgba(6,6,10,0.85)", backdropFilter: "blur(12px)",
      color: "#cf9b3b", fontSize: 20, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.3s", boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
    }}>&#8593;</button>
  ) : null;
}

/* ─── App ─── */
export default function App() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const h = () => {
      const secs = ["hero", "discipline", "about", "gallery", "palmares", "events", "team", "sponsors", "contact"];
      for (const id of secs) {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 140 && r.bottom > 140) { setActive(id); break; } }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#06060a", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;overflow-x:hidden}
        body{overflow-x:hidden;-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(207,155,59,0.3);color:#fff}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.08);opacity:.7}}
        @keyframes scrollH{0%,100%{transform:translateY(0);opacity:.25}50%{transform:translateY(8px);opacity:.5}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes fireSweep{0%{background-position:100% center;filter:drop-shadow(0 0 8px rgba(207,155,59,0.2))}50%{background-position:0% center;filter:drop-shadow(0 0 20px rgba(255,107,43,0.5))}100%{background-position:100% center;filter:drop-shadow(0 0 8px rgba(207,155,59,0.2))}}
        @keyframes footerGlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes sponsorScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .cP:hover{transform:translateY(-2px)!important;box-shadow:0 8px 40px rgba(207,155,59,0.35)!important}
        .cS:hover{border-color:rgba(207,155,59,0.4)!important;color:#cf9b3b!important}
        .sponsorCard:hover{transform:translateY(-6px)!important;box-shadow:0 12px 40px rgba(207,155,59,0.12)!important;border-color:rgba(207,155,59,0.25)!important}
        .galBtn:hover{background:rgba(207,155,59,0.3)!important;border-color:rgba(207,155,59,0.4)!important}
        input:focus,textarea:focus,select:focus{border-color:rgba(207,155,59,0.3)!important}
        .mSpotifyTab.spDismissed{display:flex}
        @media(max-width:768px){.navD{display:none!important}.mBtn{display:block!important}.floatingBio{transform:translateX(280px)!important;opacity:0!important;pointer-events:none!important}.floatingBio.mOpen{transform:translateX(0)!important;opacity:1!important;pointer-events:auto!important;right:12px!important;top:auto!important;bottom:60px!important;width:200px!important;padding:18px 14px!important;max-height:80vh!important;overflow-y:auto!important}.mFloatTab{display:flex!important}.mFloatClose{display:block!important}.floatingSpotify{transform:translateX(280px)!important;opacity:0!important;pointer-events:none!important}.floatingSpotify.mSpOpen{transform:translateX(0)!important;opacity:1!important;pointer-events:auto!important;right:12px!important;bottom:60px!important;width:200px!important;padding:18px 14px!important}.mSpotifyTab{display:flex!important}.mSpotifyClose{display:block!important}.eventCard{grid-template-columns:1fr!important;gap:12px!important;text-align:left!important}.sponsorGrid{grid-template-columns:1fr!important}.coachGrid{grid-template-columns:1fr!important}}
        @media(max-width:1280px){.floatingBio{right:8px!important;width:190px!important;padding:18px 14px!important}.floatingSpotify{right:8px!important;width:190px!important;padding:18px 14px!important}}
      `}</style>
      <ScrollProgress />
      <Navbar activeSection={active} />
      <HeroSection />
      <KarateMixSection />
      <AboutSection />
      <GallerySection />
      <PalmaresSection />
      <EventsSection />
      <CoachSection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
      <FloatingBio />
      <FloatingSpotify />
      <ScrollToTop />
      <FavoriteBanner />
    </div>
  );
}
