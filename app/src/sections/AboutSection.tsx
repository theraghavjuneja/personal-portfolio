import { useEffect, useRef, useState } from "react";

const TICKER = [
  "backend engineer", "·",
  "python", "·",
  "fastapi", "·",
  "node.js", "·",
  "golang", "·",
  "postgresql", "·",
  "redis", "·",
  "docker", "·",
  "terraform", "·",
  "aws", "·",
  "gcp", "·",
  "distributed systems", "·",
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





/* ---- Deploy console: the right-panel signature element ---- */

const SCRIPT = [
  { cmd: "git push origin main" },
  { out: "✓ pre-commit passed · 3 files changed", tone: "ok" },
  { cmd: "docker build -t api-gateway:2.4.1 ." },
  { out: "✓ built in 8.2s · 12 layers cached", tone: "ok" },
  { cmd: "kubectl apply -f deploy/prod.yaml" },
  { out: "deployment.apps/api-gateway configured", tone: "muted" },
  { cmd: "kubectl rollout status deploy/api-gateway" },
  { out: "✓ 3/3 replicas ready · rollout complete", tone: "ok" },
  { cmd: "curl -s api.internal/healthz" },
  { out: '{ "status": "ok", "p99": "11ms", "region": "ap-south-1" }', tone: "info" },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function useDeployScript() {
  const [revealed, setRevealed] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setRevealed(
        SCRIPT.map((item) =>
          item.cmd ? { text: item.cmd, tone: "cmd" } : { text: item.out, tone: item.tone || "muted" }
        )
      );
      return;
    }


    let active = true;

    async function run() {
      while (active) {
        setRevealed([]);
        setTyping("");
        for (const item of SCRIPT) {
          if (!active) return;
          if (item.cmd) {
            for (let i = 1; i <= item.cmd.length; i++) {
              await wait(24);
              if (!active) return;
              setTyping(item.cmd.slice(0, i));
            }
            await wait(260);
            if (!active) return;
            setRevealed((prev) => [...prev, { text: item.cmd, tone: "cmd" }]);
            setTyping("");
            await wait(200);
          } else {
            setRevealed((prev) => [...prev, { text: item.out, tone: item.tone || "muted" }]);
            await wait(420);
          }
          if (!active) return;
        }
        await wait(2600);
      }
    }
    run();

    return () => {
      active = false;
    };
  }, []);

  return { revealed, typing };
}

function DeployConsole() {
  const { revealed, typing } = useDeployScript();

  return (
    <div className="console-scene">
      <div className="term-stack">
        <div className="term-card">
          <div className="term-bar">
            <span className="term-dots">
              <i /><i /><i />
            </span>
            <span className="term-path">~/system/deploy.sh</span>
          </div>
          <div className="term-body">
            {revealed.map((l, i) => (
              <div key={i} className={`term-line term-line--${l.tone}`}>
                {l.tone === "cmd" ? (
                  <><span className="term-prompt">~</span> {l.text}</>
                ) : (
                  l.text
                )}
              </div>
            ))}
            <div className="term-line term-line--cmd term-line--active">
              <span className="term-prompt">~</span> {typing}
              <span className="term-cursor" />
            </div>
          </div>
        </div>

        <div className="term-meta">
          <span className="term-meta__item">
            <span className="term-meta__dot" /> prod · ap-south-1
          </span>
          <span className="term-meta__item">
            <span className="term-meta__dot" /> auto-scaled · 3 replicas
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-root {
          --bg: #EEF0EA;
          --ink: #10141A;
          --ink-60: rgba(16,20,26,.6);
          --ink-40: rgba(16,20,26,.4);
          --line: rgba(16,20,26,.14);
          --accent: #0E7C79;
          --accent-ink: #063C3B;
          --accent-soft: #CFE7E3;
          --accent-soft-ink: #63B6AE;
          --slate: #6B7280;
          --term-ok: #7FE3D6;

          font-family:'IBM Plex Sans', system-ui, sans-serif;
          background: var(--bg);
          color: var(--ink);
          overflow-x: hidden;
          position: relative;
        }

        .crop { position:absolute; width:18px; height:18px; z-index:20; pointer-events:none; opacity:0; transition:opacity .6s ease .3s; }
        .go .crop { opacity:.35; }
        .crop::before, .crop::after { content:''; position:absolute; background:var(--ink); }
        .crop::before { width:100%; height:1px; top:0; left:0; }
        .crop::after { width:1px; height:100%; top:0; left:0; }
        .crop--tl { top:14px; left:14px; }
        .crop--br { bottom:14px; right:14px; transform:rotate(180deg); }

        .hn { display:flex; align-items:center; justify-content:space-between; padding:22px 44px; position:relative; z-index:5; }
        .hn__logo {
          font-family:'IBM Plex Mono', monospace; font-weight:600; font-size:13px;
          letter-spacing:.02em; color:var(--ink); text-decoration:none;
          border:2px solid var(--ink); border-radius:5px; padding:5px 10px;
          box-shadow: 2px 2px 0px var(--ink);
        }
        .hn__status { display:flex; align-items:center; gap:8px; }
        .hn__dot { width:6px; height:6px; border-radius:50%; background:var(--accent); }
        .hn__status span { font-family:'IBM Plex Mono', monospace; font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-60); }

        .hero { display:grid; grid-template-columns:1fr 1fr; height:calc(100vh - 76px); position:relative; }

        .left {
          display:flex; flex-direction:column; justify-content:center;
          padding:0 48px 60px 44px; position:relative;
          background-image: radial-gradient(rgba(16,20,26,.16) 1px, transparent 1px);
          background-size: 22px 22px;
          background-position: -1px -1px;
        }
        .left__inner { position:relative; z-index:2; }

        h1.hd {
          font-family:'Space Grotesk', system-ui, sans-serif;
          font-weight:600;
          font-size:clamp(46px,6.2vw,74px);
          line-height:1.2;
          letter-spacing:-0.02em;
          color:var(--ink);
          margin:0 0 40px;
        }
        .hl {
          background:var(--accent-soft);
          color:var(--ink);
          border: 3px solid var(--ink);
          box-shadow: 4px 4px 0px var(--ink);
          border-radius:5px;
          padding:0 8px;
          margin: 0 4px;
          display: inline-block;
          box-decoration-break:clone;
          -webkit-box-decoration-break:clone;
        }

        .l {
          display:inline-block;
          opacity:0; transform:translateY(18px);
          transition:opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1);
          transition-delay:calc(var(--i,0) * 18ms + 80ms);
        }
        .go .l { opacity:1; transform:none; }

        .cta {
          display:inline-flex; align-items:center; gap:12px;
          font-family:'IBM Plex Mono', monospace; font-size:13px; font-weight:600;
          letter-spacing:.08em; text-transform:uppercase;
          color:var(--ink); text-decoration:none;
          border:3px solid var(--ink); border-radius:7px; padding:13px 20px 13px 16px; width:fit-content;
          box-shadow: 4px 4px 0px var(--ink);
          opacity:0; transform:translateY(10px);
          transition:opacity .45s ease 1.2s, transform .2s, background .18s, color .18s;
        }
        .go .cta { opacity:1; transform:none; }
        .cta__dot { width:6px; height:6px; border-radius:50%; background:var(--accent); flex:none; transition:background .18s; }
        .cta:hover { background:var(--ink); color:var(--bg); transform: translate(-2px, -2px); box-shadow: 6px 6px 0px var(--ink); }
        .cta:hover .cta__dot { background:var(--accent-soft); }
        .cta svg { width:30px; height:13px; transition:transform .18s; }
        .cta:hover svg { transform:translateX(4px); }

        /* ---- Trace waterfall signature element (left panel) ---- */
        .trace-wrap {
          position:absolute; top:9%; right:2%; z-index:1;
          opacity:0; transform:scale(.94) rotate(1deg);
          transition:opacity .7s ease .5s, transform .7s cubic-bezier(.22,1,.36,1) .5s;
        }
        .go .trace-wrap { opacity:1; transform:scale(1) rotate(1deg); }

        .trace-card {
          width:302px;
          background:#0C1116;
          border:3px solid #10141A;
          border-radius:12px;
          padding:16px 17px 14px;
          box-shadow:8px 8px 0px #10141A;
        }
        .trace-head { display:flex; align-items:center; gap:8px; }
        .trace-dot { width:6px; height:6px; border-radius:50%; background:var(--term-ok); flex:none; animation:blip 2.2s ease-in-out infinite; }
        .trace-route { font-family:'IBM Plex Mono', monospace; font-size:12.5px; font-weight:600; color:rgba(238,240,234,.92); }
        .trace-total { margin-left:auto; font-family:'IBM Plex Mono', monospace; font-size:11px; font-weight:600; color:#0C1116; background:var(--term-ok); border-radius:5px; padding:2px 7px; }
        .trace-sub { margin-top:3px; font-family:'IBM Plex Mono', monospace; font-size:10px; color:rgba(238,240,234,.38); letter-spacing:.02em; }

        .trace-rows { margin-top:13px; display:flex; flex-direction:column; gap:8px; }
        .trace-row { display:grid; grid-template-columns:64px 1fr 28px; align-items:center; gap:9px; }
        .trace-label { font-family:'IBM Plex Mono', monospace; font-size:10px; color:rgba(238,240,234,.55); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .trace-track { position:relative; height:6px; border-radius:3px; background:rgba(238,240,234,.1); overflow:hidden; }
        .trace-bar {
          position:absolute; top:0; left:var(--start); height:100%; border-radius:3px;
          width:0; opacity:.4;
          animation:barsweep 4.2s cubic-bezier(.4,0,.2,1) infinite;
          animation-delay:var(--bd);
        }
        .trace-dur { font-family:'IBM Plex Mono', monospace; font-size:10px; color:rgba(238,240,234,.38); text-align:right; }

        @keyframes barsweep {
          0%   { width:0; opacity:.3; }
          16%  { width:var(--w); opacity:1; }
          72%  { width:var(--w); opacity:1; }
          90%  { width:0; opacity:.25; }
          100% { width:0; opacity:.25; }
        }

        /* RIGHT SECTION */
        .right {
  position:relative;
  overflow:hidden;
  opacity:0;
  transition:opacity 1s ease .1s;
  background-image: radial-gradient(rgba(16,20,26,.16) 1px, transparent 1px);
  background-size: 22px 22px;
  background-position: -1px -1px;
}
        .go .right { opacity:1; }

        /* ---- Deploy console signature element ---- */
        .console-scene { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; padding:40px; }

        .term-stack {
          position:relative; z-index:2; width:min(460px, 92%);
          display:flex; flex-direction:column; align-items:center; gap:24px;
          opacity:0; translate: 0 10px;
          transition: opacity .7s ease .55s, transform .7s cubic-bezier(.22,1,.36,1) .55s;
        }
        .go .term-stack { opacity:1; translate: 0 0; }

        .term-card {
          position:relative; z-index:1; width:100%;
          transform: rotate(-2deg);
          background:#FAFAF7;
          border:4px solid #10141A;
          border-radius:12px;
          overflow:hidden;
          box-shadow: 12px 12px 0px #10141A;
        }

        .term-bar {
          display:flex; align-items:center; gap:10px;
          padding:14px 18px;
          background:#CFE7E3;
          border-bottom:4px solid #10141A;
        }
        .term-dots { display:flex; gap:8px; }
        .term-dots i { width:14px; height:14px; border-radius:50%; border:2px solid #10141A; display:block; }
        .term-dots i:nth-child(1) { background: #FF9B9B; }
        .term-dots i:nth-child(2) { background: #FFD93D; }
        .term-dots i:nth-child(3) { background: #6BCB77; }
        
        .term-path {
          font-family:'IBM Plex Mono', monospace; font-size:13px; font-weight:700;
          color:#10141A; letter-spacing:.02em; margin-left:auto;
        }

        .term-body {
          padding:24px 28px;
          min-height:260px;
          font-family:'IBM Plex Mono', monospace; font-size:13.5px; font-weight:600; line-height:1.9;
          color:#10141A;
        }
        .term-line { white-space:pre-wrap; word-break:break-word; margin-bottom: 4px; }
        .term-line--cmd { color:#10141A; font-weight: 700; }
        .term-line--ok { color:#0E7C79; padding-left:22px; font-weight: 700; }
        .term-line--muted { color:rgba(16,20,26,.6); padding-left:22px; }
        .term-line--info { color:#10141A; padding-left:22px; font-style: italic; }
        .term-prompt { color:#FF6B6B; margin-right:8px; font-weight: 800; }
        .term-line--active { color:#10141A; }

        .term-cursor {
          display:inline-block; width:10px; height:18px; margin-left:6px;
          background:#10141A; vertical-align:-3px;
          animation:blink 1s steps(1) infinite;
        }
        @keyframes blink { 50% { opacity:0; } }

        .term-meta { display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:center; }
        .term-meta__item {
          display:flex; align-items:center; gap:8px;
          font-family:'IBM Plex Mono', monospace; font-size:10.5px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase; color:#10141A;
          background:#FFE2D1; border:3px solid #10141A;
          box-shadow: 4px 4px 0px #10141A;
          border-radius:100px; padding:6px 14px;
          transform: rotate(1deg);
        }
        .term-meta__dot { width:6px; height:6px; border-radius:50%; background:#10141A; flex:none; }

        @keyframes badge-in {
          0% { opacity:0; transform:translateY(-10px) rotate(4deg); }
          100% { opacity:1; transform:translateY(0) rotate(4deg); }
        }
        @keyframes glass-in {
          0% { opacity:0; transform:translateY(10px) rotate(-5deg); }
          100% { opacity:1; transform:translateY(0) rotate(-5deg); }
        }

        /* Light-theme frosted glass to keep elements readable */
        .badge { 
          position:absolute; top:28px; right:12px; z-index:5; display:flex; align-items:center; gap:8px; 
          background:#FFD93D; border:3px solid #10141A; box-shadow: 6px 6px 0px #10141A; 
          border-radius:100px; padding:8px 16px; opacity:0; transform:rotate(4deg);
          transition: transform .2s ease, box-shadow .2s ease;
          cursor: default;
        }
        .go .badge { animation: badge-in .5s cubic-bezier(.34,1.56,.64,1) 1s forwards; }
        .badge:hover { transform: rotate(2deg) scale(1.05); box-shadow: 8px 8px 0px #10141A; }
        
        .badge__dot { width:8px; height:8px; border-radius:50%; background:#10141A; animation:blip 2.2s ease-in-out infinite; flex:none; }
        @keyframes blip { 0%,100%{box-shadow:0 0 0 0 rgba(16,20,26,.3)} 50%{box-shadow:0 0 0 5px rgba(16,20,26,0)} }
        .badge__text { font-family:'IBM Plex Mono', monospace; font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#10141A; }

        .glass { 
          position:absolute; bottom:20px; left:-10px; z-index:5; display:flex; flex-direction:column; gap:2px; 
          background:#CFE7E3; border:4px solid #10141A; box-shadow: 8px 8px 0px #10141A; 
          border-radius:12px; padding:16px 24px; opacity:0; transform:rotate(-5deg);
          transition: transform .2s ease, box-shadow .2s ease;
          cursor: default;
        }
        .go .glass { animation: glass-in .5s cubic-bezier(.34,1.56,.64,1) 1.1s forwards; }
        .glass:hover { transform: rotate(-3deg) scale(1.05); box-shadow: 10px 10px 0px #10141A; }
        
        .glass__name { font-family:'Space Grotesk', sans-serif; font-size:18px; font-weight:800; color:#10141A; letter-spacing:-.02em; }
        .glass__role { font-family:'IBM Plex Mono', monospace; font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#0E7C79; }

        @keyframes tkr { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker { overflow:hidden; height:38px; display:flex; align-items:center; background:var(--ink); }
        .track { display:flex; white-space:nowrap; animation:tkr 32s linear infinite; }
        .ti { font-family:'IBM Plex Mono', monospace; font-size:10.5px; font-weight:500; letter-spacing:.08em; color:rgba(238,240,234,.82); padding:0 22px; }
        .ti--sep { color:var(--accent); }

        @media (max-width:900px) {
          .hero { grid-template-columns:1fr; grid-template-rows:auto minmax(400px, 50vh); height:auto; }
          .left { padding:44px 26px 34px; background-size:18px 18px; }
          .trace-wrap { display:none; }
          .term-meta { display:none; }
          .term-body { font-size:11px; min-height:180px; padding:16px 20px; }
          h1.hd { font-size:clamp(38px,10vw,54px); margin-bottom:28px; }
          .console-scene { padding: 20px; }
        }


        @media (prefers-reduced-motion: reduce) {
          .l, .cta, .right, .badge, .glass, .trace-wrap, .crop, .term-stack { transition:none !important; opacity:1 !important; transform:none !important; translate:none !important; }
          .badge__dot, .trace-dot, .trace-bar, .term-cursor { animation:none !important; }
          .trace-bar { width:var(--w) !important; opacity:1 !important; }
          .term-cursor { opacity:0; }
          .track { animation-duration:60s; }
        }
      `}</style>

      <div className={`hero-root${go ? " go" : ""}`}>
        <span className="crop crop--tl" />
        <span className="crop crop--br" />

        <nav className="hn">
          <a className="hn__logo" href="#">[RJ]</a>
          <div className="hn__status">
            <span className="hn__dot" />

          </div>
        </nav>

        <section className="hero" id="about">
          {/* LEFT */}
          <div className="left">


            <div className="left__inner">
              <h1 className="hd">
                <Letters text="Hi, I'm Raghav." offset={0} /><br />
                <Letters text="I build " offset={15} />
                <Letters text="low-latency," cls="hl" offset={23} /><br />
                <Letters text="high-impact " offset={35} />
                <Letters text="backend" cls="hl" offset={47} /><br />
                <Letters text="systems." offset={54} />
              </h1>

              <a className="cta" href="#experience">
                <span className="cta__dot" />
                See my work
                <svg viewBox="0 0 44 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9h38" /><path d="M32 1l9 8-9 8" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            <DeployConsole />
            <div className="badge">
              <span className="badge__dot" />
              <span className="badge__text">Ready to deploy</span>
            </div>
            <div className="glass">
              <span className="glass__name">Raghav</span>
              <span className="glass__role">Backend Engineer</span>
            </div>
          </div>
        </section>

        <div className="ticker">
          <div className="track">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className={`ti${t === "·" ? " ti--sep" : ""}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}