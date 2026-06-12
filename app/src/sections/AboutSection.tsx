import { useEffect, useRef, useState } from "react";

const TICKER = [
  "backend engineer","·","cloud infrastructure","·","distributed systems","·",
  "lexipitch","·","open to work","·","node.js / golang","·","postgresql / redis","·",
];

/* Letter-split helper */
function Letters({ text, cls = "", offset = 0 }) {
  return (
    <span className={cls}>
      {text.split("").map((ch, i) => (
        <span key={i} className="l" style={{ "--i": offset + i }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function StarBurst({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {[0, 45, 90, 135].map((r) => (
        <line key={r} x1="30" y1="3" x2="30" y2="57"
          stroke={color} strokeWidth="4.5" strokeLinecap="round"
          transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="5" fill={color} />
    </svg>
  );
}

function Flower({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill={color}>
      {[0, 90, 180, 270].map((r) => (
        <ellipse key={r} cx="30" cy="15" rx="12" ry="16"
          transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill={color} />
    </svg>
  );
}

export default function HeroSection() {
  const videoRef = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; v.loop = true; v.playsInline = true;
    v.play().catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,800&family=Caveat:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F1E6; overflow-x: hidden; }

        .hero-root { font-family: 'Inter', system-ui, sans-serif; background: #F5F1E6; }

        /* NAV */
        .hn { display:flex; align-items:center; justify-content:space-between; padding:20px 44px; }
        .hn__logo { width:36px; height:36px; border-radius:50%; border:2px solid #1a1a1a; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; color:#1a1a1a; text-decoration:none; }
        .hn__links { display:flex; gap:36px; list-style:none; }
        .hn__links a { font-size:13px; font-weight:800; color:#1a1a1a; text-decoration:none; opacity:.5; transition:opacity .18s; }
        .hn__links a:hover { opacity:1; }

        /* HERO */
        .hero { display:grid; grid-template-columns:1fr 1fr; height:calc(100vh - 76px); }

        /* LEFT */
        .left { display:flex; flex-direction:column; justify-content:center; padding:0 48px 60px 44px; }

        /* HEADLINE */
        h1.hd {
          font-family:'DM Sans',system-ui,sans-serif;
          font-weight:600;
          font-size:clamp(50px,6.8vw,80px);
          line-height:1.12;
          letter-spacing: -0.070em;
          color:#1a1a1a;
          margin:0 0 48px;
        }
        .sc { font-family:'Caveat',cursive; font-weight:700; font-size:1.06em; color:#C8563B; }

        /* letter animation */
        .l {
          display:inline-block;
          opacity:0; transform:translateY(22px);
          transition:opacity .42s cubic-bezier(.22,1,.36,1), transform .42s cubic-bezier(.22,1,.36,1);
          transition-delay:calc(var(--i,0) * 22ms + 100ms);
        }
        .go .l { opacity:1; transform:none; }

        /* CTA */
        .cta {
          display:inline-flex; align-items:center; gap:14px;
          font-family:'Caveat',cursive; font-size:22px; font-weight:700;
          color:#1a1a1a; text-decoration:none;
          border:2px solid #1a1a1a; border-radius:100px; padding:12px 32px; width:fit-content;
          opacity:0; transform:translateY(10px);
          transition:opacity .45s ease 1.4s, transform .45s ease 1.4s, background .2s, color .2s;
        }
        .go .cta { opacity:1; transform:none; }
        .cta:hover { background:#1a1a1a; color:#F5F1E6; }
        .cta svg { width:36px; height:15px; transition:transform .2s; }
        .cta:hover svg { transform:translateX(5px); }

        /* RIGHT */
        .right { position:relative; overflow:hidden; ; opacity:0; transition:opacity 1s ease .1s; }
        .go .right { opacity:1; }
        .right video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; pointer-events:none; }
        .vignette { position:absolute; inset:0; z-index:1; pointer-events:none; background: linear-gradient(to left, transparent 48%, #F5F1E6 100%), linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 42%); }

        .badge { position:absolute; top:24px; right:24px; z-index:5; display:flex; align-items:center; gap:8px; background:rgba(18,18,18,.72); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.12); border-radius:100px; padding:6px 16px 6px 12px; }
        .badge__dot { width:6px; height:6px; border-radius:50%; background:#C8563B; animation:pulse 2.2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,86,59,.5)} 50%{box-shadow:0 0 0 5px rgba(200,86,59,0)} }
        .badge__text { font-size:9px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.8); }

        .glass { position:absolute; bottom:28px; left:24px; z-index:5; display:flex; flex-direction:column; gap:3px; background:rgba(245,241,230,.13); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,.16); border-radius:12px; padding:10px 20px; }
        .glass__name { font-size:16px; font-weight:800; color:#fff; letter-spacing:-0.01em; }
        .glass__role { font-size:10px; font-weight:500; letter-spacing:.10em; text-transform:uppercase; color:rgba(255,255,255,.5); }

        /* SHAPES */
        .shapes { position:absolute; inset:0; pointer-events:none; z-index:10; overflow:visible; }
        .shape { position:absolute; opacity:0; transform:scale(.4) rotate(var(--r,0deg)); transition:opacity .65s ease, transform .65s cubic-bezier(.34,1.56,.64,1); transition-delay:var(--d,1s); }
        .go .shape { opacity:1; transform:scale(1) rotate(var(--r,0deg)); }

        /* TICKER */
        @keyframes tkr { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker { overflow:hidden; height:38px; display:flex; align-items:center; background:#C8563B; }
        .track { display:flex; white-space:nowrap; animation:tkr 30s linear infinite; }
        .ti { font-size:10px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.88); padding:0 26px; }

        @media (max-width:900px) {
          .hero { grid-template-columns:1fr; grid-template-rows:auto 50vh; }
          .left { padding:48px 28px 36px; }
          .hn__links { display:none; }
        }
      `}</style>

      <div className={`hero-root${go ? " go" : ""}`}>
        <nav className="hn">
          <a className="hn__logo" href="#">RJ</a>
        </nav>

        <section className="hero" id="about">
          {/* LEFT */}
          <div className="left" style={{ position: "relative" }}>
            {/* Floating shapes leak from left panel */}
            <div className="shapes">
              <div className="shape" style={{ top: "8%", right: "-8%", "--r": "14deg", "--d": "1.0s" }}>
                <StarBurst color="#C8563B" size={72} />
              </div>
              <div className="shape" style={{ top: "5%", right: "12%", "--r": "-8deg", "--d": "1.15s" }}>
                <Flower color="#F4A8B0" size={62} />
              </div>
            </div>

            <h1 className="hd">
              <Letters text="Hi, I'm Raghav." offset={0} /><br />
              <Letters text="I build " offset={15} />
              <Letters text="low-latency," cls="sc" offset={23} /><br />
              <Letters text="high-impact " offset={35} />
              <Letters text="backend" cls="sc" offset={47} /><br />
              <Letters text="systems." offset={54} />
            </h1>

            <a className="cta" href="#experience">
              See my work
              <svg viewBox="0 0 44 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9h38" /><path d="M32 1l9 8-9 8" />
              </svg>
            </a>
          </div>

          {/* RIGHT */}
          <div className="right">
            <video ref={videoRef} src="/images/video2.mp4" muted loop playsInline preload="auto" />
            <div className="vignette" />
            
          </div>
        </section>

        <div className="ticker">
          <div className="track">
            {[...TICKER, ...TICKER].map((t, i) => <span key={i} className="ti">{t}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}