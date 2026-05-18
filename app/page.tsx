"use client";

import { useState, useEffect, useRef } from "react";

const COLLECTIONS = [
  {
    id: 1, name: "Noir Reverie", price: "₹4,200",
    desc: "Fluid midnight crepe with asymmetric hem and hand-stitched detail",
    tag: "BESTSELLER",
    bg: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
  },
  {
    id: 2, name: "Ivory Solstice", price: "₹3,800",
    desc: "Off-shoulder organza with hand-pleated bodice and floating cape",
    tag: "NEW ARRIVAL",
    bg: "linear-gradient(160deg, #2a2420 0%, #3d342c 40%, #52443a 100%)",
  },
  {
    id: 3, name: "Crimson Dusk", price: "₹5,500",
    desc: "Structured velvet column silhouette with dramatic thigh slit",
    tag: "LIMITED EDITION",
    bg: "linear-gradient(160deg, #2e0000 0%, #5a0a0a 40%, #7a1515 100%)",
  },
  {
    id: 4, name: "Sage Odyssey", price: "₹3,200",
    desc: "Draped satin midi with gathered waist and cascade ruffle",
    tag: "NEW ARRIVAL",
    bg: "linear-gradient(160deg, #141e14 0%, #253525 40%, #3a5238 100%)",
  },
]

const TESTIMONIALS = [
  { name: "Priya S.", city: "Mumbai", text: "The Noir Reverie dress received so many compliments at the gala. Absolute perfection." },
  { name: "Riya M.", city: "Delhi", text: "Ordered via WhatsApp, delivered in 2 days. The packaging itself feels luxurious." },
  { name: "Ananya K.", city: "Bangalore", text: "Finally a brand that understands a woman's silhouette. The fit is utterly divine." },
  { name: "Kavya P.", city: "Chennai", text: "The Crimson Dusk is my most prized possession. Worth every single rupee." },
  { name: "Shreya V.", city: "Pune", text: "Three seasons of ordering. The quality never disappoints. Ever." },
  { name: "Nisha R.", city: "Hyderabad", text: "Wore Ivory Solstice to my engagement. My mother cried. That's the only review I need." },
]

const REELS = [
  { id: 1, label: "Spring Edit", views: "124K", bg: "linear-gradient(160deg, #1e0a3c 0%, #2d1460 100%)" },
  { id: 2, label: "Bridal Picks", views: "89K",  bg: "linear-gradient(160deg, #3c0a0a 0%, #601414 100%)" },
  { id: 3, label: "Office Luxe", views: "203K", bg: "linear-gradient(160deg, #0a1e3c 0%, #143060 100%)" },
  { id: 4, label: "Festive Drop", views: "156K", bg: "linear-gradient(160deg, #1e3c0a 0%, #305014 100%)" },
]

const WA_NUMBER = "919999999999"
const WA_MSG = encodeURIComponent("Hi! I'd like to place an order from Luxe Atelier. 💛")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

// ── Dress silhouette SVG (generic elegant shape) ─────────────────────────────
function DressSilhouette({ opacity = 0.12 }) {
  return (
    <svg viewBox="0 0 140 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ height: "82%", opacity, position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
      <ellipse cx="70" cy="38" rx="24" ry="26" fill="white" />
      <path d="M46 64 Q32 96 22 150 L54 150 L58 112 Q66 107 70 107 Q74 107 82 112 L86 150 L118 150 Q108 96 94 64 Q84 60 70 60 Q56 60 46 64Z" fill="white" />
      <path d="M54 150 L30 278 L62 278 L70 188 L78 278 L110 278 L86 150Z" fill="white" />
      <path d="M22 150 L10 120 L30 130Z" fill="white" />
      <path d="M118 150 L130 120 L110 130Z" fill="white" />
    </svg>
  )
}

export default function LuxeAtelier() {
  const [cursorPos, setCursorPos]   = useState({ x: -200, y: -200 })
  const [ringPos,   setRingPos]     = useState({ x: -200, y: -200 })
  const [hovered,   setHovered]     = useState(false)
  const [scrolled,  setScrolled]    = useState(false)
  const ringRef = useRef({ x: -200, y: -200 })
  const rafRef  = useRef(null)

  // ── cursor tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e:MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  useEffect(() => {
    const tick = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.1
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.1
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cursorPos])

  // ── hover detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const on  = () => setHovered(true)
    const off = () => setHovered(false)
    const els = document.querySelectorAll("a, button, [data-cursor]")
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off) })
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off) })
  })

  // ── scroll reveal ────────────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view") }),
      { threshold: 0.12 }
    )
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ── nav scroll state ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ background: "#09090B", color: "#FAFAF8", minHeight: "100vh", overflowX: "hidden", cursor: "none", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Global Styles ──────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #09090B; }
        ::-webkit-scrollbar-thumb { background: #C4A87A; }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.95s cubic-bezier(0.22,1,0.36,1), transform 0.95s cubic-bezier(0.22,1,0.36,1); }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.14s !important; }
        .d2 { transition-delay: 0.28s !important; }
        .d3 { transition-delay: 0.42s !important; }
        .d4 { transition-delay: 0.56s !important; }

        @keyframes heroSlide { from { opacity:0; transform: translateY(56px) skewY(2.5deg); } to { opacity:1; transform: translateY(0) skewY(0); } }
        .h1 { animation: heroSlide 1.2s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .h2 { animation: heroSlide 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
        .h3 { animation: heroSlide 1s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .h4 { animation: heroSlide 1s cubic-bezier(0.22,1,0.36,1) 0.92s both; }
        .h5 { animation: heroSlide 1s ease 1.1s both; }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        .hero-bg { animation: fadeIn 2.5s ease both; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mq-track { display:flex; animation: marquee 44s linear infinite; width: max-content; }
        .mq-track:hover { animation-play-state: paused; }

        .nav-lnk { position:relative; color: rgba(250,250,248,0.65); text-decoration:none; font-size:10.5px; letter-spacing:0.16em; text-transform:uppercase; transition:color 0.3s; }
        .nav-lnk::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:#C4A87A; transition:width 0.4s cubic-bezier(0.22,1,0.36,1); }
        .nav-lnk:hover { color:#FAFAF8; }
        .nav-lnk:hover::after { width:100%; }

        .c-card { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
        .c-card:hover { transform: translateY(-10px); }
        .c-card .c-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .c-card:hover .c-img { transform: scale(1.06); }
        .c-hover { opacity:0; transform:translateY(10px); transition: opacity 0.38s ease, transform 0.38s ease; }
        .c-card:hover .c-hover { opacity:1; transform:translateY(0); }

        @keyframes floatIn  { from { opacity:0; transform:scale(0.7) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .wa-btn { animation: floatIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 3.5s both; transition: transform 0.3s ease, background 0.3s ease; }
        .wa-btn:hover { transform: scale(1.12) !important; background: #1DB954 !important; }
        @keyframes waPulse { 0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,0.45); } 70% { box-shadow:0 0 0 18px rgba(37,211,102,0); } }
        .wa-pulse { animation: waPulse 2.8s ease 4.2s infinite; }

        .vt { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .vt:hover { transform: scale(1.025); }
        .vt .vp-btn { transition: all 0.3s ease; }
        .vt:hover .vp-btn { background: rgba(196,168,122,0.22); border-color:#C4A87A !important; transform:scale(1.12); }

        @keyframes scrollBob { 0%,100% { transform:translateY(0); opacity:1; } 55% { transform:translateY(9px); opacity:0.35; } }
        .s-dot { animation: scrollBob 2.2s ease infinite; }

        @keyframes grainDrift { 0%,100%{transform:translate(0,0)} 30%{transform:translate(-0.8%,-0.8%)} 70%{transform:translate(0.8%,0.8%)} }
        .grain { animation: grainDrift 0.35s steps(1) infinite; }

        .btn-gold { display:inline-block; background:#C4A87A; color:#09090B; padding:15px 40px; font-size:10.5px; letter-spacing:0.22em; text-transform:uppercase; font-weight:500; font-family:'DM Sans',sans-serif; text-decoration:none; border:none; cursor:none; transition: background 0.3s ease, transform 0.3s ease; }
        .btn-gold:hover { background:#D4BC94; transform:translateY(-2px); }
        .btn-ol { display:inline-block; background:transparent; color:#FAFAF8; padding:13px 36px; font-size:10.5px; letter-spacing:0.22em; text-transform:uppercase; font-weight:400; font-family:'DM Sans',sans-serif; text-decoration:none; border:1px solid rgba(196,168,122,0.45); cursor:none; transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease; }
        .btn-ol:hover { border-color:#C4A87A; color:#C4A87A; transform:translateY(-2px); }
      `}</style>

      {/* ── Grain Overlay ──────────────────────────────────────────────────── */}
      <div className="grain" style={{ position:"fixed", top:"-50%", left:"-50%", width:"200%", height:"200%", pointerEvents:"none", zIndex:9990, opacity:0.022,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── Custom Cursor ──────────────────────────────────────────────────── */}
      <div style={{ position:"fixed", left:cursorPos.x, top:cursorPos.y, width:6, height:6, background:"#C4A87A", borderRadius:"50%", pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)", mixBlendMode:"difference" }} />
      <div style={{ position:"fixed", left:ringPos.x, top:ringPos.y, width:hovered?56:34, height:hovered?56:34, border:`1px solid rgba(196,168,122,${hovered?0.9:0.45})`, borderRadius:"50%", pointerEvents:"none", zIndex:9998, transform:"translate(-50%,-50%)", transition:"width 0.35s ease, height 0.35s ease, border-color 0.3s ease" }} />

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"22px 48px", display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(9,9,11,0.94)" : "linear-gradient(to bottom, rgba(9,9,11,0.9) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,168,122,0.08)" : "none",
        transition:"background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease" }}>
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:400, letterSpacing:"0.2em", color:"#FAFAF8", userSelect:"none" }}>
          LUXE<span style={{ color:"#C4A87A" }}> ✦ </span>ATELIER
        </div>
        <div style={{ display:"flex", gap:36, alignItems:"center" }}>
          {["Collections","Story","Reels","Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} className="nav-lnk">{s}</a>
          ))}
        </div>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", gap:8, fontSize:10.5, letterSpacing:"0.16em", textTransform:"uppercase", color:"#C4A87A", textDecoration:"none", fontWeight:500 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order Now
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <div className="hero-bg" style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 70% 60% at 25% 55%, rgba(196,168,122,0.055) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(196,168,122,0.035) 0%, transparent 55%), #09090B" }} />
        {/* Grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(196,168,122,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(196,168,122,0.025) 1px,transparent 1px)",
          backgroundSize:"90px 90px" }} />
        {/* Vertical accent lines */}
        <div style={{ position:"absolute", top:0, left:"50%", width:1, height:160, background:"linear-gradient(to bottom,transparent,rgba(196,168,122,0.28))", transform:"translateX(-50%)" }} />
        <div style={{ position:"absolute", bottom:0, left:"50%", width:1, height:160, background:"linear-gradient(to top,transparent,rgba(196,168,122,0.28))", transform:"translateX(-50%)" }} />
        {/* Corners */}
        {[["top:110px","left:44px","borderTop","borderLeft"],["top:110px","right:44px","borderTop","borderRight"],
          ["bottom:76px","left:44px","borderBottom","borderLeft"],["bottom:76px","right:44px","borderBottom","borderRight"]].map((c,i) => (
          <div key={i} style={{ position:"absolute", [c[0].split(":")[0]]:c[0].split(":")[1], [c[1].split(":")[0]]:c[1].split(":")[1], width:36, height:36, [c[2]]:"1px solid rgba(196,168,122,0.28)", [c[3]]:"1px solid rgba(196,168,122,0.28)" }} />
        ))}

        <div style={{ textAlign:"center", position:"relative", zIndex:2, padding:"0 24px", maxWidth:920 }}>
          {/* Eyebrow */}
          <div className="h1" style={{ fontSize:10.5, letterSpacing:"0.45em", textTransform:"uppercase", color:"#C4A87A", marginBottom:44, display:"flex", alignItems:"center", justifyContent:"center", gap:18 }}>
            <span style={{ display:"inline-block", width:44, height:1, background:"#C4A87A", opacity:0.55 }} />
            New Season 2026
            <span style={{ display:"inline-block", width:44, height:1, background:"#C4A87A", opacity:0.55 }} />
          </div>

          <div style={{ overflow:"hidden", marginBottom:2 }}>
            <h1 className="h2" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(68px,10.5vw,136px)", fontWeight:300, lineHeight:0.88, letterSpacing:"-0.02em", color:"#FAFAF8" }}>Dressed</h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom:40 }}>
            <h1 className="h3" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(68px,10.5vw,136px)", fontWeight:300, lineHeight:0.88, letterSpacing:"-0.02em", color:"#FAFAF8", fontStyle:"italic" }}>in Intention.</h1>
          </div>

          <p className="h4" style={{ fontSize:13, letterSpacing:"0.07em", color:"rgba(250,250,248,0.45)", maxWidth:420, margin:"0 auto 48px", fontWeight:300, lineHeight:1.85 }}>
            Premium womenswear crafted for the woman who moves through the world with grace and deliberate intention.
          </p>

          <div className="h5" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#collections" className="btn-gold">Explore Collection</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ol">Order on WhatsApp</a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="h5" style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:9 }}>
          <span style={{ fontSize:9, letterSpacing:"0.36em", textTransform:"uppercase", color:"rgba(250,250,248,0.28)" }}>Scroll</span>
          <div className="s-dot" style={{ width:4, height:4, borderRadius:"50%", background:"#C4A87A" }} />
        </div>
      </section>

      {/* ── COLLECTIONS ────────────────────────────────────────────────────── */}
      <section id="collections" style={{ padding:"120px 48px", background:"#09090B" }}>
        <div className="reveal" style={{ marginBottom:72, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.44em", textTransform:"uppercase", color:"#C4A87A", marginBottom:18 }}>SS 2026</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(42px,5.5vw,68px)", fontWeight:300, lineHeight:1, color:"#FAFAF8" }}>
              The<br /><em>Collection</em>
            </h2>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ol" style={{ marginBottom:6 }}>View All →</a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(268px,1fr))", gap:14 }}>
          {COLLECTIONS.map((item, i) => (
            <div key={item.id} className={`c-card reveal d${i+1}`} data-cursor style={{ position:"relative", cursor:"none" }}>
              <div style={{ height:460, position:"relative", background:item.bg, borderRadius:2, overflow:"hidden" }}>
                <div className="c-img" style={{ position:"absolute", inset:0 }}>
                  <DressSilhouette />
                </div>
                {/* Gradient */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,9,11,0.97) 0%, rgba(9,9,11,0.25) 48%, transparent 100%)", zIndex:1 }} />
                {/* Grid texture */}
                <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"48px 48px", zIndex:0 }} />

                {/* Tag */}
                <div style={{ position:"absolute", top:18, left:18, zIndex:2 }}>
                  <span style={{ fontSize:8.5, letterSpacing:"0.22em", textTransform:"uppercase", background:"rgba(196,168,122,0.92)", color:"#09090B", padding:"4px 11px", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{item.tag}</span>
                </div>

                {/* Card content */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"26px 22px", zIndex:2 }}>
                  <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:27, fontWeight:400, color:"#FAFAF8", marginBottom:7, lineHeight:1.08 }}>{item.name}</h3>
                  <p style={{ fontSize:12, color:"rgba(250,250,248,0.45)", marginBottom:14, fontWeight:300, lineHeight:1.65 }}>{item.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:"#C4A87A", fontWeight:400 }}>{item.price}</span>
                    <div className="c-hover">
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize:9.5, letterSpacing:"0.22em", textTransform:"uppercase", color:"#C4A87A", textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>
                        Order Now
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRAND STORY ────────────────────────────────────────────────────── */}
      <section id="story" style={{ padding:"120px 48px", borderTop:"1px solid rgba(196,168,122,0.1)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:72, alignItems:"center", maxWidth:1200, margin:"0 auto" }}>
          {/* Visual panel */}
          <div className="reveal" style={{ position:"relative", height:520 }}>
            <div style={{ position:"absolute", inset:0, background:"#111", border:"1px solid rgba(196,168,122,0.13)", borderRadius:2 }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Cormorant Garamond', serif", fontSize:200, fontWeight:300, color:"rgba(196,168,122,0.05)", lineHeight:1, textAlign:"center", userSelect:"none", letterSpacing:"-0.05em" }}>
                L<br />A
              </div>
              <div style={{ position:"absolute", bottom:36, left:36, right:36 }}>
                <div style={{ fontSize:9.5, letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(196,168,122,0.6)", marginBottom:14 }}>Est. 2021 — Mumbai</div>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:23, fontWeight:300, color:"rgba(250,250,248,0.55)", fontStyle:"italic", lineHeight:1.5 }}>
                  "Born on Instagram.<br/>Built for real women."
                </div>
              </div>
              {/* Corners */}
              <div style={{ position:"absolute", top:18, left:18, width:28, height:28, borderTop:"1px solid rgba(196,168,122,0.38)", borderLeft:"1px solid rgba(196,168,122,0.38)" }} />
              <div style={{ position:"absolute", bottom:18, right:18, width:28, height:28, borderBottom:"1px solid rgba(196,168,122,0.38)", borderRight:"1px solid rgba(196,168,122,0.38)" }} />
              {/* Horizontal line */}
              <div style={{ position:"absolute", top:"50%", left:36, right:36, height:1, background:"rgba(196,168,122,0.08)" }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="reveal" style={{ fontSize:10, letterSpacing:"0.44em", textTransform:"uppercase", color:"#C4A87A", marginBottom:22 }}>Our Story</div>
            <h2 className="reveal d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,54px)", fontWeight:300, lineHeight:1.15, marginBottom:28, color:"#FAFAF8" }}>
              Fashion born from<br /><em>a single obsession —</em><br />the perfect fit.
            </h2>
            <p className="reveal d2" style={{ fontSize:13.5, lineHeight:1.95, color:"rgba(250,250,248,0.5)", marginBottom:18, fontWeight:300 }}>
              Luxe Atelier was born out of a shared frustration — women's clothing that looked stunning on mannequins but fell flat on real bodies. We set out to change that, one stitch at a time.
            </p>
            <p className="reveal d3" style={{ fontSize:13.5, lineHeight:1.95, color:"rgba(250,250,248,0.5)", marginBottom:44, fontWeight:300 }}>
              Every piece is tested on real women, refined across hundreds of iterations, and released only when the drape, comfort, and silhouette align in perfect harmony.
            </p>
            <div className="reveal d4" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, borderTop:"1px solid rgba(196,168,122,0.13)", paddingTop:28 }}>
              {[["12K+","Happy clients"],["200+","Styles created"],["4.9★","Avg. rating"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:34, fontWeight:400, color:"#C4A87A", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:11, color:"rgba(250,250,248,0.38)", marginTop:5, letterSpacing:"0.04em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REELS ──────────────────────────────────────────────────────────── */}
      <section id="reels" style={{ padding:"120px 48px", borderTop:"1px solid rgba(196,168,122,0.1)" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ fontSize:10, letterSpacing:"0.44em", textTransform:"uppercase", color:"#C4A87A", marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram Reels
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(38px,5vw,58px)", fontWeight:300, color:"#FAFAF8" }}>
            See how it <em>moves</em>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:12 }}>
          {REELS.map((r, i) => (
            <a key={r.id} href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className={`vt reveal d${i+1}`} data-cursor
              style={{ display:"block", position:"relative", height:500, borderRadius:2, overflow:"hidden", background:r.bg, textDecoration:"none" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,9,11,0.92) 0%, transparent 50%)", zIndex:1 }} />
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
              {/* Play */}
              <div className="vp-btn" style={{ position:"absolute", top:"42%", left:"50%", transform:"translate(-50%,-50%)", zIndex:2, width:52, height:52, border:"1px solid rgba(255,255,255,0.65)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ marginLeft:3 }}><path d="M8 5v14l11-7z"/></svg>
              </div>
              {/* Labels */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 18px", zIndex:2 }}>
                <div style={{ fontSize:9.5, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(250,250,248,0.45)", marginBottom:5 }}>{r.views} views</div>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, color:"#FAFAF8", fontWeight:400 }}>{r.label}</div>
              </div>
              <div style={{ position:"absolute", top:14, right:16, fontSize:9.5, letterSpacing:"0.28em", color:"rgba(250,250,248,0.28)", zIndex:2 }}>0{r.id}</div>
            </a>
          ))}
        </div>

        <div className="reveal" style={{ textAlign:"center", marginTop:44 }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-ol">
            Follow @luxeatelier
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ───────────────────────────────────────────── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid rgba(196,168,122,0.1)", overflow:"hidden" }}>
        <div style={{ overflow:"hidden" }}>
          <div className="mq-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} style={{ minWidth:340, marginRight:16, padding:"26px 28px", background:"#111", border:"1px solid rgba(196,168,122,0.09)", borderRadius:2, flexShrink:0 }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17.5, fontWeight:300, fontStyle:"italic", color:"rgba(250,250,248,0.75)", lineHeight:1.65, marginBottom:18 }}>
                  "{t.text}"
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg, rgba(196,168,122,0.28), rgba(196,168,122,0.08))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:500, color:"#C4A87A", flexShrink:0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize:11.5, fontWeight:500, color:"#FAFAF8" }}>{t.name}</div>
                    <div style={{ fontSize:9.5, color:"rgba(250,250,248,0.38)", letterSpacing:"0.08em" }}>{t.city}</div>
                  </div>
                  <div style={{ marginLeft:"auto", color:"#C4A87A", fontSize:11, letterSpacing:"0.04em" }}>★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ───────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding:"120px 48px", borderTop:"1px solid rgba(196,168,122,0.1)", textAlign:"center",
        background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,168,122,0.045) 0%, transparent 70%)" }}>
        <div className="reveal" style={{ fontSize:10, letterSpacing:"0.44em", textTransform:"uppercase", color:"#C4A87A", marginBottom:22 }}>Ready to order?</div>
        <h2 className="reveal d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(42px,6.5vw,82px)", fontWeight:300, color:"#FAFAF8", marginBottom:22, lineHeight:1.02 }}>
          Order directly<br /><em>on WhatsApp.</em>
        </h2>
        <p className="reveal d2" style={{ fontSize:13.5, color:"rgba(250,250,248,0.42)", maxWidth:460, margin:"0 auto 52px", fontWeight:300, lineHeight:1.9 }}>
          No complicated forms. No waiting. Message us your size and pick, and we handle everything — including delivery across India.
        </p>

        <div className="reveal d3" style={{ display:"flex", gap:14, justifyContent:"center", alignItems:"center", flexWrap:"wrap", marginBottom:48 }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#25D366", color:"white", padding:"17px 52px", fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", textDecoration:"none", borderRadius:2, fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:"none", transition:"background 0.3s ease, transform 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="#1DB954"; e.currentTarget.style.transform="translateY(-2px)" }}
            onMouseLeave={e => { e.currentTarget.style.background="#25D366"; e.currentTarget.style.transform="translateY(0)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat & Order Now
          </a>
        </div>

        <div className="reveal d4" style={{ display:"flex", gap:36, justifyContent:"center", flexWrap:"wrap" }}>
          {[["⚡","Same-day response"],["📦","Pan-India delivery"],["↩️","7-day returns"],["💳","COD available"]].map(([icon,label]) => (
            <div key={label} style={{ fontSize:11.5, color:"rgba(250,250,248,0.35)", display:"flex", alignItems:"center", gap:7, letterSpacing:"0.04em" }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ padding:"56px 48px 36px", borderTop:"1px solid rgba(196,168,122,0.1)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:36, marginBottom:52 }}>
          <div style={{ maxWidth:260 }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:400, letterSpacing:"0.2em", color:"#FAFAF8", marginBottom:16 }}>
              LUXE<span style={{ color:"#C4A87A" }}> ✦ </span>ATELIER
            </div>
            <p style={{ fontSize:12.5, color:"rgba(250,250,248,0.36)", lineHeight:1.85, fontWeight:300 }}>
              Premium womenswear for the intentional woman. Every stitch with purpose, every design with love.
            </p>
          </div>
          <div style={{ display:"flex", gap:64, flexWrap:"wrap" }}>
            {[["Explore",["Collections","New Arrivals","Best Sellers","Size Guide"]],
              ["Connect",["Instagram","WhatsApp","Email Us","Returns"]]].map(([title,links]) => (
              <div key={title}>
                <div style={{ fontSize:9, letterSpacing:"0.36em", textTransform:"uppercase", color:"rgba(196,168,122,0.65)", marginBottom:20 }}>{title}</div>
                {links.map(l => (
                  <div key={l} style={{ marginBottom:12 }}>
                    <a href="#" className="nav-lnk" style={{ fontSize:12.5, fontWeight:300 }}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(196,168,122,0.07)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:10.5, color:"rgba(250,250,248,0.22)", letterSpacing:"0.04em" }}>© 2026 Luxe Atelier. All rights reserved.</div>
          <div style={{ fontSize:10.5, color:"rgba(250,250,248,0.22)", letterSpacing:"0.04em" }}>Crafted with ✦ in India</div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ──────────────────────────────────────────────── */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="wa-btn wa-pulse"
        style={{ position:"fixed", bottom:30, right:30, zIndex:200, width:58, height:58, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 28px rgba(37,211,102,0.32)", textDecoration:"none", cursor:"none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  )
}
