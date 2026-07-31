"use client";

import { useEffect, useState } from "react";
import { siGooglebigquery, siGooglegemini, siVercel } from "simple-icons";

type Kind = "scraper" | "pipeline" | "optimiser" | "decision" | "apply";

const COLOR: Record<Kind, string> = {
  scraper: "var(--accent-4)",
  pipeline: "var(--accent)",
  optimiser: "var(--accent-3)",
  decision: "var(--accent-2)",
  apply: "var(--accent-5)",
};
const FILL: Record<Kind, string> = {
  scraper: "rgba(180,140,255,0.09)",
  pipeline: "rgba(83,216,251,0.09)",
  optimiser: "rgba(255,180,107,0.10)",
  decision: "rgba(74,222,157,0.09)",
  apply: "rgba(255,143,163,0.10)",
};
const GLOW: Record<Kind, string> = {
  scraper: "drop-shadow(0 0 4px rgba(180,140,255,0.30))",
  pipeline: "drop-shadow(0 0 4px rgba(83,216,251,0.32))",
  optimiser: "drop-shadow(0 0 4px rgba(255,180,107,0.35))",
  decision: "drop-shadow(0 0 4px rgba(74,222,157,0.32))",
  apply: "drop-shadow(0 0 4px rgba(255,143,163,0.35))",
};

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  scraper: { path: siGooglegemini.path, color: "#C6B5F0" },
  pipeline: { path: siGooglebigquery.path, color: "#8AB4F8" },
  decision: { path: siVercel.path, color: "#C8D2DE" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  scraper: { x: 16, y: 44, w: 158, h: 46, label: "competitor scraper", sub: "LangGraph · Playwright", kind: "scraper" },
  pipeline: { x: 228, y: 44, w: 150, h: 46, label: "pricing pipeline", sub: "BigQuery · daily", kind: "pipeline" },
  optimiser: { x: 432, y: 38, w: 152, h: 58, label: "price optimiser", sub: "margin-aware", kind: "optimiser" },
  decision: { x: 638, y: 44, w: 150, h: 46, label: "pricing decision", sub: "Vercel board", kind: "decision" },
  apply: { x: 842, y: 44, w: 130, h: 46, label: "apply", sub: "Admin API · 9 sites", kind: "apply" },
};
const REGIONS = [
  ["US", "UK", "DE"],
  ["FR", "IT", "ES"],
  ["NL", "AE", "IN"],
];
const GRID = { x: 26, y: 132, cw: 44, ch: 22, gap: 6 };

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function hedge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "prCyan",
  "var(--accent-2)": "prEmerald",
  "var(--accent-3)": "prAmber",
  "var(--accent-4)": "prViolet",
};

type EdgeDef = { d: string; color: string };
const EDGES: EdgeDef[] = [
  { d: hedge(rightA(N.scraper), leftA(N.pipeline)), color: "var(--accent-4)" },
  { d: hedge(rightA(N.pipeline), leftA(N.optimiser)), color: "var(--accent)" },
  { d: hedge(rightA(N.optimiser), leftA(N.decision)), color: "var(--accent-3)" },
  { d: hedge(rightA(N.decision), leftA(N.apply)), color: "var(--accent-2)" },
];
const GRID_W = 3 * GRID.cw + 2 * GRID.gap;
const GRID_CX = GRID.x + GRID_W / 2;
const SCRAPE_EDGE = `M${cx(N.scraper)} ${N.scraper.y + N.scraper.h} L${GRID_CX} ${GRID.y - 8}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[scrape] 9 markets · competitor SKUs pulled", tone: "violet" },
  { text: "[pipeline] BigQuery · features refreshed", tone: "default" },
  { text: "[optimiser] margin-aware repricing computed", tone: "amber" },
  { text: "[apply] Admin API → 9 sites ✓", tone: "green" },
];
const toneClass: Record<string, string> = {
  violet: "text-accent-4",
  default: "text-muted",
  amber: "text-accent-3",
  green: "text-accent-2",
};

export default function PriceFlow({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStep(LOG.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      if (i <= LOG.length) {
        setStep(i);
        timer = setTimeout(tick, i === LOG.length ? 3200 : 900);
      } else {
        i = 0;
        setStep(0);
        timer = setTimeout(tick, 650);
      }
    };
    timer = setTimeout(tick, 650);
    return () => clearTimeout(timer);
  }, []);

  const done = step >= LOG.length;
  const visible = LOG.slice(0, step);

  const renderNode = (key: string, n: Node) => {
    const icon = ICON[key];
    const hasIcon = !!icon;
    const tx = hasIcon ? n.x + 30 : cx(n);
    const anchor = hasIcon ? "start" : "middle";
    return (
      <g key={n.label} style={{ filter: GLOW[n.kind] }}>
        <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={9} fill={FILL[n.kind]} stroke={COLOR[n.kind]} strokeWidth={1.3} className="node-aura" />
        {hasIcon && (
          <path d={icon.path} fill={icon.color} transform={`translate(${n.x + 9} ${cy(n) - 7}) scale(0.6)`} />
        )}
        <text x={tx} y={cy(n) - 3} textAnchor={anchor} className="fill-fg" fontSize={12.5} fontFamily="var(--font-mono)">
          {n.label}
        </text>
        {n.sub && (
          <text x={tx} y={cy(n) + 12} textAnchor={anchor} fill="var(--faint)" fontSize={10} fontFamily="var(--font-mono)">
            {n.sub}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className={embedded ? "" : "rounded-xl border border-line bg-panel/70 p-4 backdrop-blur sm:p-6"}>
      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[11px] sm:text-xs">
        <span className="text-muted">pricing intelligence · agentic · daily</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            markets <span className="text-fg">9</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "idle" : "running"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 986 236"
        className="w-full"
        role="img"
        aria-label="Pricing-intelligence pipeline: an agentic competitor scraper (LangGraph, Playwright) crawls prices across 9 markets, feeding a BigQuery pricing pipeline, a margin-aware price optimiser, a Vercel decision board, and a guarded write via the internal Admin API to 9 storefronts."
      >
        <defs>
          <radialGradient id="prViolet">
            <stop offset="0%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="prCyan">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="prAmber">
            <stop offset="0%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="prEmerald">
            <stop offset="0%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <text x={GRID_CX} y={122} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          scrape ⇄ 9 markets
        </text>

        {/* base edges */}
        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`pr${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        <path id="prG" d={SCRAPE_EDGE} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        {/* traveling signals */}
        {!reduced &&
          [...EDGES, { d: SCRAPE_EDGE, color: "var(--accent-4)" }].flatMap((e, i) => {
            const g = GRAD[e.color] ?? "prCyan";
            const id = i < EDGES.length ? `pr${i}` : "prG";
            const base = -(i * 0.2);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            ));
          })}
        {/* scraped prices flowing back up into the scraper (emerald) */}
        {!reduced &&
          [0, 1, 2].map((k) => (
            <circle key={`ug-${k}`} r={3.4 - k * 0.8} fill="url(#prEmerald)" opacity={0.85 - k * 0.24}>
              <animateMotion
                dur="1.9s"
                repeatCount="indefinite"
                begin={`${(-0.6 + k * 0.04).toFixed(3)}s`}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href="#prG" />
              </animateMotion>
            </circle>
          ))}

        {/* region grid */}
        {REGIONS.map((row, r) =>
          row.map((code, c) => {
            const rx = GRID.x + c * (GRID.cw + GRID.gap);
            const ry = GRID.y + r * (GRID.ch + GRID.gap);
            return (
              <g key={code}>
                <rect x={rx} y={ry} width={GRID.cw} height={GRID.ch} rx={5} fill="rgba(180,140,255,0.07)" stroke="var(--accent-4)" strokeWidth={1} opacity={0.7} />
                <text x={rx + GRID.cw / 2} y={ry + GRID.ch / 2 + 4} textAnchor="middle" fill="var(--muted)" fontSize={10.5} fontFamily="var(--font-mono)">
                  {code}
                </text>
              </g>
            );
          }),
        )}

        {Object.entries(N).map(([k, n]) => renderNode(k, n))}
      </svg>

      <div className="mt-3 h-24 overflow-hidden font-mono text-[11px] leading-6 sm:text-[12px]">
        {visible.map((l, i) => (
          <div key={i} className={toneClass[l.tone]}>
            <span className="mr-2 select-none text-faint">›</span>
            {l.text}
          </div>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] leading-5 text-faint">
        # pricing-intelligence platform · agentic scrape → model → apply,
        daily across 9 markets (USA, UK, FR, IT, ES, DE, NL, AE, IN)
      </p>
    </div>
  );
}
