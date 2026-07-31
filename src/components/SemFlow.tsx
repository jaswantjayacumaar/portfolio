"use client";

import { useEffect, useState } from "react";
import {
  siGoogleads,
  siGooglebigquery,
  siGooglecloud,
  siSupabase,
} from "simple-icons";

type Kind = "sched" | "source" | "ingest" | "module" | "decision" | "apply";

const COLOR: Record<Kind, string> = {
  sched: "var(--faint)",
  source: "var(--accent)",
  ingest: "var(--accent)",
  module: "var(--accent-4)",
  decision: "var(--accent-3)",
  apply: "var(--accent-5)",
};
const FILL: Record<Kind, string> = {
  sched: "rgba(150,161,177,0.05)",
  source: "rgba(83,216,251,0.08)",
  ingest: "rgba(83,216,251,0.09)",
  module: "rgba(180,140,255,0.09)",
  decision: "rgba(255,180,107,0.09)",
  apply: "rgba(255,143,163,0.10)",
};
const GLOW: Record<Kind, string | undefined> = {
  sched: undefined,
  source: "drop-shadow(0 0 4px rgba(83,216,251,0.30))",
  ingest: "drop-shadow(0 0 4px rgba(83,216,251,0.35))",
  module: "drop-shadow(0 0 4px rgba(180,140,255,0.30))",
  decision: "drop-shadow(0 0 4px rgba(255,180,107,0.35))",
  apply: "drop-shadow(0 0 4px rgba(255,143,163,0.35))",
};

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  sched: { path: siGooglecloud.path, color: "#7BA6F7" },
  srcAds: { path: siGoogleads.path, color: "#5B9DF9" },
  srcBq: { path: siGooglebigquery.path, color: "#8AB4F8" },
  apply: { path: siGoogleads.path, color: "#5B9DF9" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  sched: { x: 196, y: 22, w: 120, h: 28, label: "Cloud Run", kind: "sched" },
  srcAds: { x: 18, y: 150, w: 144, h: 38, label: "Google Ads API", kind: "source" },
  srcBq: { x: 18, y: 190, w: 144, h: 38, label: "BigQuery", kind: "source" },
  ingest: { x: 196, y: 162, w: 120, h: 52, label: "ingest", sub: "scheduled queries", kind: "ingest" },
  bid: { x: 376, y: 43, w: 172, h: 30, label: "Bidding", kind: "module" },
  neg: { x: 376, y: 89, w: 172, h: 30, label: "Negativisation", kind: "module" },
  farm: { x: 376, y: 135, w: 172, h: 30, label: "Keyword farming", kind: "module" },
  expand: { x: 376, y: 181, w: 172, h: 30, label: "Query expansion", kind: "module" },
  copy: { x: 376, y: 227, w: 172, h: 30, label: "Ad-copy gen", kind: "module" },
  price: { x: 376, y: 273, w: 172, h: 30, label: "Pricing", kind: "module" },
  decision: { x: 606, y: 152, w: 150, h: 64, label: "decision trees", sub: "profit · growth", kind: "decision" },
  apply: { x: 858, y: 162, w: 118, h: 44, label: "apply", sub: "Ads API write", kind: "apply" },
};
const GATE = { cx: 810, cy: 184, r: 27 };
const STORE = { x: 840, y: 250, w: 136, h: 30, label: "log · Supabase" };
const MODULES = ["bid", "neg", "farm", "expand", "copy", "price"] as const;

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function edge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "spCyan",
  "var(--accent-2)": "spEmerald",
  "var(--accent-3)": "spAmber",
  "var(--accent-4)": "spViolet",
};

type EdgeDef = { d: string; color: string };
const EDGES: EdgeDef[] = [
  { d: edge(rightA(N.srcAds), leftA(N.ingest)), color: "var(--accent)" },
  { d: edge(rightA(N.srcBq), leftA(N.ingest)), color: "var(--accent)" },
  ...MODULES.map((m) => ({ d: edge(rightA(N.ingest), leftA(N[m])), color: "var(--accent-4)" })),
  ...MODULES.map((m) => ({ d: edge(rightA(N[m]), leftA(N.decision)), color: "var(--accent-3)" })),
  { d: edge(rightA(N.decision), [GATE.cx - GATE.r, GATE.cy]), color: "var(--accent-3)" },
  { d: edge([GATE.cx + GATE.r, GATE.cy], leftA(N.apply)), color: "var(--accent-2)" },
];
const TRIGGER = `M${cx(N.sched)} ${N.sched.y + N.sched.h} L${cx(N.sched)} ${N.ingest.y}`;
const LOG_EDGE = `M${cx(N.apply)} ${N.apply.y + N.apply.h} L${cx(N.apply)} ${STORE.y}`;
// closed control loop: the write schedules the next run (arcs over the top)
const LOOP = `M${cx(N.apply)} ${N.apply.y} C ${cx(N.apply)} 10, ${cx(N.sched)} 10, ${cx(N.sched)} ${N.sched.y}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[run 36] applied · 356 changes · 0 errors", tone: "dim" },
  { text: "[run 37] pulled 27,412 search terms · 9,014 ad groups", tone: "default" },
  { text: "[classify] 412 RED · 1,038 AMBER · 7,564 GREEN", tone: "amber" },
  { text: "[preview] 356 bid changes queued — awaiting approval", tone: "pink" },
  { text: "[apply] writing via Google Ads API ✓", tone: "green" },
];
const toneClass: Record<string, string> = {
  dim: "text-faint",
  default: "text-muted",
  amber: "text-accent-3",
  pink: "text-accent-5",
  green: "text-accent-2",
};

export default function SemFlow({ embedded = false }: { embedded?: boolean }) {
  const [run, setRun] = useState(37);
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
        timer = setTimeout(tick, i === LOG.length ? 3200 : 850);
      } else {
        i = 0;
        setStep(0);
        setRun((n) => (n >= 99 ? 37 : n + 1));
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
      <g key={n.label} style={GLOW[n.kind] ? { filter: GLOW[n.kind] } : undefined}>
        <rect
          x={n.x}
          y={n.y}
          width={n.w}
          height={n.h}
          rx={9}
          fill={FILL[n.kind]}
          stroke={COLOR[n.kind]}
          strokeWidth={1.3}
          className={n.kind !== "sched" ? "node-aura" : undefined}
        />
        {hasIcon && (
          <path d={icon.path} fill={icon.color} transform={`translate(${n.x + 9} ${cy(n) - 7}) scale(0.6)`} />
        )}
        <text
          x={tx}
          y={cy(n) + (n.sub ? -3 : 4)}
          textAnchor={anchor}
          className="fill-fg"
          fontSize={n.kind === "sched" ? 11 : 12.5}
          fontFamily="var(--font-mono)"
        >
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
        <span className="text-muted">sem console · cloud run</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            run <span className="text-fg">{run}</span>
          </span>
          <span className="hidden sm:inline">
            campaigns <span className="text-fg">239</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "idle" : "running"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 996 320"
        className="w-full"
        role="img"
        aria-label="SEM automation console control loop: Google Ads API and BigQuery feed an ingest step triggered by a Cloud Run scheduler, fanning out to six tool modules (bidding, negativisation, keyword farming, query expansion, ad-copy generation, pricing), converging on a RED/AMBER/GREEN decision engine, through a human approval gate, to a guarded write via the Google Ads API; the result is logged to Supabase and loops back to trigger the next scheduled run."
      >
        <defs>
          <marker id="loopHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 2 L8 5 L2 8" fill="none" stroke="var(--accent-3)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <radialGradient id="spCyan">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="spViolet">
            <stop offset="0%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="spAmber">
            <stop offset="0%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="spEmerald">
            <stop offset="0%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <text x={810} y={140} textAnchor="middle" fill="var(--accent-2)" fontSize={11} fontFamily="var(--font-mono)">
          approval gate
        </text>

        {/* closed control loop back to the scheduler */}
        <path d={LOOP} fill="none" stroke="var(--accent-3)" strokeWidth={1.3} opacity={0.5} markerEnd="url(#loopHead)" />
        <text x={(cx(N.apply) + cx(N.sched)) / 2} y={8} textAnchor="middle" fill="var(--accent-3)" fontSize={11} fontFamily="var(--font-mono)" opacity={0.85}>
          loop · next scheduled run
        </text>

        <path d={TRIGGER} fill="none" stroke="var(--faint)" strokeWidth={1.2} opacity={0.6} />
        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`sa${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        {/* traveling signal: glowing head + comet trail */}
        {!reduced &&
          EDGES.flatMap((e, i) => {
            const g = GRAD[e.color] ?? "spCyan";
            const base = -(i * 0.19);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#sa${i}`} />
                </animateMotion>
              </circle>
            ));
          })}

        <path d={LOG_EDGE} fill="none" stroke="var(--accent-5)" strokeWidth={1.2} opacity={0.45} />
        <g style={{ filter: "drop-shadow(0 0 3px rgba(255,143,163,0.25))" }}>
          <rect x={STORE.x} y={STORE.y} width={STORE.w} height={STORE.h} rx={12} fill="rgba(255,143,163,0.06)" stroke="var(--accent-5)" strokeWidth={1.2} />
          <path d={siSupabase.path} fill="#3ECF8E" transform={`translate(${STORE.x + 12} ${STORE.y + STORE.h / 2 - 7}) scale(0.58)`} />
          <text x={STORE.x + 32} y={STORE.y + STORE.h / 2 + 4} textAnchor="start" fill="var(--accent-5)" fontSize={11} fontFamily="var(--font-mono)">
            {STORE.label}
          </text>
        </g>

        <path
          d={`M${GATE.cx} ${GATE.cy - GATE.r} L${GATE.cx + GATE.r} ${GATE.cy} L${GATE.cx} ${GATE.cy + GATE.r} L${GATE.cx - GATE.r} ${GATE.cy} Z`}
          fill="rgba(74,222,157,0.09)"
          stroke="var(--accent-2)"
          strokeWidth={1.3}
          className="node-aura"
          style={{ filter: "drop-shadow(0 0 4px rgba(74,222,157,0.3))" }}
        />

        {Object.entries(N).map(([k, n]) => renderNode(k, n))}

        <g>
          <circle cx={cx(N.decision) - 16} cy={N.decision.y + N.decision.h - 12} r={4} fill="var(--danger)" />
          <circle cx={cx(N.decision)} cy={N.decision.y + N.decision.h - 12} r={4} fill="var(--accent-3)" />
          <circle cx={cx(N.decision) + 16} cy={N.decision.y + N.decision.h - 12} r={4} fill="var(--accent-2)" />
        </g>
      </svg>

      <div className="mt-3 h-28 overflow-hidden font-mono text-[11px] leading-6 sm:text-[12px]">
        {visible.map((l, i) => (
          <div key={`${run}-${i}`} className={toneClass[l.tone]}>
            <span className="mr-2 select-none text-faint">›</span>
            {l.text}
          </div>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] leading-5 text-faint">
        # simulated · preview-first, human-approved writes on Cloud Run
        schedulers
      </p>
    </div>
  );
}
