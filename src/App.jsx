import { useState, useEffect, useRef } from "react";

const FIGHTER = {
  firstName: "CARMELO",
  lastName: "ZAMBELLI",
  age: 18, birthDate: "08/11/2007", city: "Orléans",
  category: "-70 KG · KARATÉ MIX FFK",
  title: "Champion de France Karaté Mix",
  club: "Académie Philippe Rollin Arts Martiaux",
  record: { total: 21, wins: 18, losses: 3, ko: 1, sub: 14, dec: 3 },
  bio: "Originaire d'Orléans, Carmelo découvre le Karaté Mix en 2023 à l'Académie Philippe Rollin. En moins de trois ans, il enchaîne 21 combats, décroche deux titres de Champion de France et une Coupe de France — le tout à seulement 18 ans. Spécialiste du combat au sol avec 14 victoires par soumission, il impose un style technique et suffocant qui ne laisse aucun répit à ses adversaires. Son objectif : passer professionnel et porter les couleurs de la France sur la scène européenne.",
  palmares: [
    { year: "2026", event: "Championnat de France Karaté Mix FFK", result: "🥇 Champion de France", highlight: true },
    { year: "2025", event: "Championnat de France Karaté Mix FFK", result: "🥇 Champion de France", highlight: true },
    { year: "2025", event: "Coupe de France Karaté Mix FFK", result: "🥇 Vainqueur (750+ combattants)", highlight: true },
    { year: "2025", event: "Open de France Karaté Mix", result: "🥈 Finaliste", highlight: false },
    { year: "2024", event: "Championnat de France Karaté Mix FFK", result: "🥉 3ème", highlight: false },
  ],
  social: { instagram: "https://instagram.com/carmelooooo" },
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

/* ─── Navbar ─── */
function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { id: "hero", label: "Accueil" }, { id: "about", label: "Parcours" },
    { id: "gallery", label: "Galerie" }, { id: "palmares", label: "Palmarès" },
    { id: "sponsors", label: "Sponsors" }, { id: "contact", label: "Contact" },
  ];
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(6,6,10,0.94)" : "rgba(6,6,10,0.3)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      borderBottom: scrolled ? "1px solid rgba(207,155,59,0.1)" : "1px solid transparent",
      padding: "0 clamp(16px,4vw,40px)", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s"
    }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: 4, color: "#fff" }}>
        C<span style={{ color: "#cf9b3b" }}>Z</span>
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
      <button onClick={() => setOpen(!open)} className="mBtn" style={{
        display: "none", background: "none", border: "none", color: "#cf9b3b", fontSize: 24, cursor: "pointer"
      }}>{open ? "✕" : "☰"}</button>
      {open && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0,
          background: "rgba(6,6,10,0.98)", display: "flex", flexDirection: "column",
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
    </nav>
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
      <img src="/images/combat-cage.jpg" alt="" style={{
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
          <span style={{ fontSize: 10 }}>🥋</span>
          <span style={{ fontSize: 9, letterSpacing: 4, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Fédération Française de Karaté</span>
        </div>

        <div style={{ fontSize: 11, letterSpacing: 8, color: "rgba(255,255,255,0.3)", marginBottom: 14, fontFamily: "'Inter',sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
          {FIGHTER.category}
        </div>

        <h1 style={{
          fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(48px,11vw,124px)",
          lineHeight: 0.88, margin: "0 0 20px", color: "#fff", letterSpacing: 4, textTransform: "uppercase",
          textShadow: "0 0 100px rgba(207,155,59,0.12)"
        }}>
          <span style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.55em", letterSpacing: 12 }}>{FIGHTER.firstName}</span>
          <span style={{
            background: "linear-gradient(90deg, #fff 0%, #cf9b3b 25%, #e8b84a 50%, #cf9b3b 75%, #fff 100%)",
            backgroundSize: "400% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", animation: "shimmer 6s ease-in-out infinite"
          }}>{FIGHTER.lastName}</span>
        </h1>

        <div style={{
          display: "inline-block", padding: "11px 32px",
          background: "linear-gradient(135deg, #cf9b3b 0%, #a67c2e 50%, #cf9b3b 100%)",
          color: "#06060a", fontFamily: "'Oswald',sans-serif", fontWeight: 700,
          fontSize: 13, letterSpacing: 4, textTransform: "uppercase",
          boxShadow: "0 0 50px rgba(207,155,59,0.2), inset 0 1px 0 rgba(255,255,255,0.2)"
        }}>🏆 2x {FIGHTER.title}</div>

        <div style={{ marginTop: 16, fontFamily: "'Oswald',sans-serif", fontSize: 20, letterSpacing: 6, color: "rgba(255,255,255,0.7)" }}>
          <span style={{ color: "#4ade80", fontWeight: 700 }}>{FIGHTER.record.wins}W</span>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>—</span>
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
              <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginTop: 7, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#sponsors" className="cP" style={{ padding: "14px 32px", background: "linear-gradient(135deg,#cf9b3b,#a67c2e)", color: "#06060a", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", boxShadow: "0 4px 30px rgba(207,155,59,0.25)" }}>Devenir Partenaire</a>
          <a href="https://instagram.com/carmelooooo" target="_blank" rel="noopener noreferrer" className="cS" style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s", background: "transparent", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
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
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Parcours</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 36px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          3 ans de pratique<span style={{ color: "#cf9b3b" }}>.</span><br />2 titres nationaux<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 2, color: "rgba(255,255,255,0.48)", maxWidth: 620 }}>{FIGHTER.bio}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, marginTop: 48, background: "rgba(207,155,59,0.05)" }}>
          {[
            { l: "Âge", v: "18 ans" }, { l: "Ville", v: "Orléans" }, { l: "Catégorie", v: "-70 kg" },
            { l: "Club", v: "APRAM" }, { l: "Début", v: "2023" }, { l: "Fédération", v: "FFK" },
          ].map((f, i) => (
            <div key={i} style={{ padding: "20px 18px", background: "#06060a" }}>
              <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(255,255,255,0.22)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 5, fontWeight: 700 }}>{f.l}</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, color: "#fff", fontWeight: 500, letterSpacing: 1 }}>{f.v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>Méthodes de victoire — 18 wins</div>
          <div style={{ display: "flex", gap: 2, height: 7, overflow: "hidden", maxWidth: 480 }}>
            <div style={{ flex: 14, background: "linear-gradient(90deg,#cf9b3b,#e8b84a)" }} />
            <div style={{ flex: 3, background: "#6b7280" }} />
            <div style={{ flex: 1, background: "#ef4444" }} />
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 12, flexWrap: "wrap" }}>
            {[
              { l: "Soumissions", n: 14, c: "#cf9b3b", p: "78%" },
              { l: "Décisions", n: 3, c: "#6b7280", p: "17%" },
              { l: "KO/TKO", n: 1, c: "#ef4444", p: "5%" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 9, height: 9, background: m.c }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  {m.l} · {m.n} <span style={{ color: m.c }}>({m.p})</span>
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

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setActive(p => (p + 1) % PHOTOS.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

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
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Galerie</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          En action<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>

        {/* Main display with crossfade */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative", width: "100%", aspectRatio: "16/9",
            background: "#0a0a0a", overflow: "hidden",
            border: "1px solid rgba(207,155,59,0.08)"
          }}
        >
          {PHOTOS.map((p, i) => (
            <img
              key={p.id}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: p.pos,
                opacity: i === active ? 1 : 0, transition: "opacity 0.7s ease-in-out",
                zIndex: i === active ? 1 : 0
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
              color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500
            }}>{PHOTOS[active].desc}</div>
          </div>

          {/* Prev/Next */}
          <button onClick={() => { setActive(p => (p - 1 + PHOTOS.length) % PHOTOS.length); setPaused(true); }} className="galBtn" style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 3,
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", width: 44, height: 44, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", backdropFilter: "blur(8px)"
          }}>&#8249;</button>
          <button onClick={() => { setActive(p => (p + 1) % PHOTOS.length); setPaused(true); }} className="galBtn" style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 3,
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", width: 44, height: 44, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", backdropFilter: "blur(8px)"
          }}>&#8250;</button>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.05)", zIndex: 2 }}>
            <div style={{
              height: "100%", background: "#cf9b3b", width: `${((active + 1) / PHOTOS.length) * 100}%`,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>

        {/* Thumbnails with real images */}
        <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
          {PHOTOS.map((p, i) => (
            <button key={i} onClick={() => { setActive(i); setPaused(true); }} style={{
              flex: 1, padding: 0, cursor: "pointer", border: "none",
              borderBottom: i === active ? "2px solid #cf9b3b" : "2px solid transparent",
              transition: "all 0.3s", position: "relative", overflow: "hidden",
              height: 70, background: "#0a0a0a"
            }}>
              <img src={p.src} alt={p.alt} loading="lazy" style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos,
                opacity: i === active ? 0.9 : 0.3, transition: "opacity 0.3s",
                filter: i === active ? "none" : "grayscale(0.5)"
              }} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Palmarès ─── */
function PalmaresSection() {
  const [ref, v] = useReveal();
  return (
    <section id="palmares" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #08080e 0%, #0a0a10 100%)", borderTop: "1px solid rgba(207,155,59,0.08)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Résultats</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Palmarès<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FIGHTER.palmares.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "24px 24px", background: p.highlight ? "rgba(207,155,59,0.04)" : "rgba(255,255,255,0.012)",
              borderLeft: p.highlight ? "3px solid #cf9b3b" : "3px solid rgba(255,255,255,0.05)",
              transition: "all 0.3s", flexWrap: "wrap", gap: 10,
              opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: `${0.15 + i * 0.08}s`
            }}>
              <div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,0.22)", marginBottom: 5, fontWeight: 500 }}>{p.year}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>{p.event}</div>
              </div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, color: p.highlight ? "#cf9b3b" : "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: 1 }}>{p.result}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Coach ─── */
function CoachSection() {
  const [ref, v] = useReveal();
  return (
    <section id="coach" ref={ref} style={{
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
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Le Coach</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 48px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Maître Philippe<br />Rollin<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>

        {/* Image APRAM */}
        <div style={{ marginBottom: 40, overflow: "hidden", border: "1px solid rgba(207,155,59,0.08)" }}>
          <img src="/images/stage-apram.jpg" alt="Stage MMA APRAM — Philippe Rollin" loading="lazy" style={{
            width: "100%", maxHeight: 320, objectFit: "cover", objectPosition: "center 20%",
            filter: "saturate(0.8)", transition: "transform 0.6s"
          }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          {/* Bio */}
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.45)", margin: "0 0 32px" }}>
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
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginTop: 6, fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div style={{
            padding: "32px 28px", background: "rgba(207,155,59,0.03)",
            border: "1px solid rgba(207,155,59,0.08)"
          }}>
            <div style={{
              fontFamily: "'Oswald',sans-serif", fontSize: 14, letterSpacing: 5,
              color: "#cf9b3b", marginBottom: 24, textTransform: "uppercase", fontWeight: 600
            }}>Qualifications</div>
            {COACH.credentials.map((c, i) => (
              <div key={i} style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)",
                padding: "12px 0", borderBottom: i < COACH.credentials.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ color: "#cf9b3b", fontSize: 10 }}>◆</span> {c}
              </div>
            ))}
            <div style={{
              marginTop: 24, padding: "12px 16px", background: "rgba(207,155,59,0.06)",
              fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)",
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

/* ─── Ambition ─── */
function AmbitionSection() {
  const [ref, v] = useReveal();
  return (
    <section id="ambition" ref={ref} style={{
      padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #08080e 0%, #0a0a10 100%)",
      borderTop: "1px solid rgba(207,155,59,0.08)", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 50% at 80% 50%, rgba(207,155,59,0.04) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Vision</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          L'objectif est clair<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 2, color: "rgba(255,255,255,0.42)", maxWidth: 560, marginBottom: 44 }}>
          À 18 ans, Carmelo a déjà prouvé qu'il fait partie de l'élite française. La prochaine étape : la scène européenne, puis le circuit professionnel.
        </p>

        {[
          { phase: "Court terme", goal: "Passage professionnel", icon: "⚡" },
          { phase: "Moyen terme", goal: "Championnat d'Europe FFK", icon: "🇪🇺" },
          { phase: "Long terme", goal: "Représenter la France à l'international", icon: "🇫🇷" },
        ].map((o, i) => (
          <div key={i} style={{
            display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0",
            borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
            opacity: v ? 1 : 0, transition: `opacity 0.6s ${0.4 + i * 0.15}s`
          }}>
            <div style={{
              width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(207,155,59,0.08)", border: "1px solid rgba(207,155,59,0.12)", fontSize: 18, flexShrink: 0
            }}>{o.icon}</div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 4, color: "#cf9b3b", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", marginBottom: 5, fontWeight: 700 }}>{o.phase}</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, color: "#fff", fontWeight: 500, letterSpacing: 1 }}>{o.goal}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 56, padding: "32px 28px", borderLeft: "2px solid #cf9b3b", background: "rgba(207,155,59,0.03)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", fontStyle: "italic", margin: 0 }}>
            « 14 soumissions sur 18 victoires. Sur le sol, personne ne m'échappe. »
          </p>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: 4, color: "#cf9b3b", marginTop: 14, textTransform: "uppercase" }}>— Carmelo Zambelli</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Karaté Mix FFK ─── */
function KarateMixSection() {
  const [ref, v] = useReveal();
  return (
    <section id="karatemix" ref={ref} style={{
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
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>La discipline</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Le Karaté Mix<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 2, color: "rgba(255,255,255,0.45)", maxWidth: 620, marginBottom: 44 }}>
          Discipline officielle de la Fédération Française de Karaté (FFK), le Karaté Mix combine les techniques de frappe du karaté traditionnel avec le combat au sol issu du jujitsu et du grappling. Pieds, poings, projections et soumissions : un sport complet encadré par une fédération olympique.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
          {[
            { icon: "🥋", title: "Frappe debout", desc: "Poings, pieds, genoux issus du karaté et du kickboxing" },
            { icon: "🤼", title: "Projections", desc: "Amenées au sol héritées du judo et du jujitsu" },
            { icon: "🔒", title: "Soumissions", desc: "Clés articulaires et étranglements au sol" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "28px 22px", background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(207,155,59,0.06)", transition: "all 0.3s",
              opacity: v ? 1 : 0, transitionDelay: `${0.3 + i * 0.12}s`
            }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, color: "#fff", fontWeight: 600, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>{item.title}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <a href="https://www.ffkarate.fr" target="_blank" rel="noopener noreferrer" className="cS" style={{
            padding: "12px 28px", border: "1px solid rgba(207,155,59,0.2)", color: "#cf9b3b",
            textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.3s",
            background: "rgba(207,155,59,0.04)", display: "inline-flex", alignItems: "center", gap: 8
          }}>
            Site officiel FFK
            <span style={{ fontSize: 14 }}>&#8599;</span>
          </a>
          <a href="https://www.ffkarate.fr/karate-mix/" target="_blank" rel="noopener noreferrer" style={{
            color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Inter',sans-serif",
            fontSize: 11, letterSpacing: 2, fontWeight: 500, transition: "color 0.3s"
          }}>Règlement Karaté Mix &#8599;</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Sponsors ─── */
function SponsorsSection() {
  const [ref, v] = useReveal();
  return (
    <section id="sponsors" ref={ref} style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg,#0a0806,#06060a)", borderTop: "1px solid rgba(207,155,59,0.06)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Partenariats</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Investissez dans<br />un champion<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.38)", maxWidth: 520, margin: "0 auto 48px" }}>
          18 ans, double champion de France, 86% de win rate, licencié FFK. Associez votre marque à un athlète en pleine ascension.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
          {[
            { tier: "OR", color: "#cf9b3b", features: ["Logo rashguard (poitrine)", "Posts dédiés mensuels", "Présence compétitions", "Contenu vidéo exclusif", "Mention interview & médias"], accent: true },
            { tier: "ARGENT", color: "#94a3b8", features: ["Logo rashguard (épaule)", "Mentions réseaux sociaux", "Stories sponsorisées", "Tag événements"], accent: false },
            { tier: "BRONZE", color: "#b87333", features: ["Logo bannière web", "Remerciements en post", "Tag en story compétition"], accent: false },
          ].map((t, i) => (
            <div key={i} className="sponsorCard" style={{ padding: "36px 24px", background: "rgba(255,255,255,0.012)", border: t.accent ? "1px solid rgba(207,155,59,0.18)" : "1px solid rgba(255,255,255,0.03)", position: "relative", overflow: "hidden", textAlign: "left", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
              {t.accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#cf9b3b,#e8b84a,#cf9b3b)" }} />}
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 8, color: t.color, marginBottom: 20, fontWeight: 700 }}>{t.tier}</div>
              {t.features.map((f, j) => (
                <div key={j} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.42)", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.025)" }}>
                  <span style={{ color: t.color, marginRight: 7 }}>&#10003;</span> {f}
                </div>
              ))}
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
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#cf9b3b", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontWeight: 700, textTransform: "uppercase" }}>Contact</div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(30px,5vw,56px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
          Passons à<br />l'action<span style={{ color: "#cf9b3b" }}>.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.32)", marginBottom: 40 }}>Sponsor, média, organisateur ou partenaire — envoyez votre proposition.</p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="text" name="name" placeholder="Nom" required style={{ ...iS, flex: 1, minWidth: 140 }} />
              <input type="email" name="email" placeholder="Email" required style={{ ...iS, flex: 1, minWidth: 140 }} />
            </div>
            <select name="type" style={{ ...iS, cursor: "pointer", color: "rgba(255,255,255,0.35)" }}>
              <option value="">Type de demande</option>
              <option>Sponsoring / Partenariat</option>
              <option>Presse / Média</option>
              <option>Événement</option>
              <option>Autre</option>
            </select>
            <textarea name="message" placeholder="Votre message..." rows={4} required style={{ ...iS, resize: "vertical" }} />
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
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Réponse sous 48h.</div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: "40px clamp(20px,5vw,48px)", background: "#04040a", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #cf9b3b, #e8b84a, #cf9b3b, transparent)", backgroundSize: "200% 100%", animation: "footerGlow 4s ease-in-out infinite" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 20, flexWrap: "wrap" }}>
        <a href={FIGHTER.social.instagram} target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(255,255,255,0.3)", textDecoration: "none", fontFamily: "'Inter',sans-serif",
          fontSize: 11, letterSpacing: 2, fontWeight: 500, textTransform: "uppercase", transition: "color 0.3s",
          display: "flex", alignItems: "center", gap: 8
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
      </div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: 1 }}>
        © 2026 Carmelo Zambelli · APRAM · <a href="https://www.ffkarate.fr" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.3s" }}>FFK</a>
      </div>
    </footer>
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
      const secs = ["hero", "about", "gallery", "palmares", "coach", "ambition", "karatemix", "sponsors", "contact"];
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
        html{scroll-behavior:smooth}
        body{overflow-x:hidden;-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(207,155,59,0.3);color:#fff}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.08);opacity:.7}}
        @keyframes scrollH{0%,100%{transform:translateY(0);opacity:.25}50%{transform:translateY(8px);opacity:.5}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes footerGlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .cP:hover{transform:translateY(-2px)!important;box-shadow:0 8px 40px rgba(207,155,59,0.35)!important}
        .cS:hover{border-color:rgba(207,155,59,0.4)!important;color:#cf9b3b!important}
        .sponsorCard:hover{transform:translateY(-6px)!important;box-shadow:0 12px 40px rgba(207,155,59,0.12)!important;border-color:rgba(207,155,59,0.25)!important}
        .galBtn:hover{background:rgba(207,155,59,0.3)!important;border-color:rgba(207,155,59,0.4)!important}
        input:focus,textarea:focus,select:focus{border-color:rgba(207,155,59,0.3)!important}
        @media(max-width:768px){.navD{display:none!important}.mBtn{display:block!important}}
      `}</style>
      <ScrollProgress />
      <Navbar activeSection={active} />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <PalmaresSection />
      <CoachSection />
      <AmbitionSection />
      <KarateMixSection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
