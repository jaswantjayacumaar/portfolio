"use client";

import { useEffect, useState } from "react";
import {
  siGoogleads,
  siGoogleanalytics,
  siGooglebigquery,
  siMatomo,
  siSentry,
  siSupabase,
} from "simple-icons";

type Kind = "neutral" | "router" | "reason" | "act" | "synth" | "answer" | "tool";

const COLOR: Record<Kind, string> = {
  neutral: "var(--faint)",
  router: "var(--accent-2)",
  reason: "var(--accent-4)",
  act: "var(--accent-5)",
  synth: "var(--accent)",
  answer: "var(--accent-2)",
  tool: "var(--accent)",
};
const FILL: Record<Kind, string> = {
  neutral: "rgba(150,161,177,0.06)",
  router: "rgba(74,222,157,0.09)",
  reason: "rgba(180,140,255,0.10)",
  act: "rgba(255,143,163,0.10)",
  synth: "rgba(83,216,251,0.09)",
  answer: "rgba(74,222,157,0.09)",
  tool: "rgba(83,216,251,0.08)",
};
const GLOW: Record<Kind, string | undefined> = {
  neutral: undefined,
  router: "drop-shadow(0 0 4px rgba(74,222,157,0.35))",
  reason: "drop-shadow(0 0 4px rgba(180,140,255,0.33))",
  act: "drop-shadow(0 0 4px rgba(255,143,163,0.35))",
  synth: "drop-shadow(0 0 4px rgba(83,216,251,0.35))",
  answer: "drop-shadow(0 0 4px rgba(74,222,157,0.30))",
  tool: "drop-shadow(0 0 4px rgba(83,216,251,0.26))",
};

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  bq: { path: siGooglebigquery.path, color: "#8AB4F8" },
  ga4: { path: siGoogleanalytics.path, color: "#F9AB00" },
  ads: { path: siGoogleads.path, color: "#5B9DF9" },
  mat: { path: siMatomo.path, color: "#8AA0E6" },
  sen: { path: siSentry.path, color: "#B9A5F0" },
  sup: { path: siSupabase.path, color: "#3ECF8E" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  intent: { x: 16, y: 44, w: 82, h: 36, label: "intent", kind: "neutral" },
  classify: { x: 118, y: 40, w: 104, h: 44, label: "classify", sub: "router", kind: "router" },
  reason: { x: 256, y: 42, w: 98, h: 40, label: "reason", kind: "reason" },
  act: { x: 396, y: 42, w: 98, h: 40, label: "act", kind: "act" },
  synth: { x: 560, y: 40, w: 118, h: 44, label: "synthesize", kind: "synth" },
  answer: { x: 800, y: 44, w: 88, h: 36, label: "answer", kind: "answer" },
  bq: { x: 47, y: 212, w: 118, h: 30, label: "BigQuery", kind: "tool" },
  ga4: { x: 173, y: 212, w: 118, h: 30, label: "GA4", kind: "tool" },
  ads: { x: 299, y: 212, w: 118, h: 30, label: "Google Ads", kind: "tool" },
  mat: { x: 425, y: 212, w: 118, h: 30, label: "Matomo", kind: "tool" },
  sen: { x: 551, y: 212, w: 118, h: 30, label: "Sentry", kind: "tool" },
  sup: { x: 677, y: 212, w: 118, h: 30, label: "Supabase", kind: "tool" },
  nex: { x: 803, y: 212, w: 118, h: 30, label: "Nexus API", kind: "tool" },
};
const GATE = { cx: 732, cy: 62, r: 24 };
const TOOLS = ["bq", "ga4", "ads", "mat", "sen", "sup", "nex"] as const;

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];
const botA = (n: Node): [number, number] => [cx(n), n.y + n.h];
const topA = (n: Node): [number, number] => [cx(n), n.y];

function hedge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}
function vedge(a: [number, number], b: [number, number]) {
  const dy = (b[1] - a[1]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0]} ${a[1] + dy}, ${b[0]} ${b[1] - dy}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "raCyan",
  "var(--accent-2)": "raEmerald",
  "var(--accent-4)": "raViolet",
  "var(--accent-5)": "raPink",
};

type EdgeDef = { d: string; color: string };
const SPINE: EdgeDef[] = [
  { d: hedge(rightA(N.intent), leftA(N.classify)), color: "var(--accent-2)" },
  { d: hedge(rightA(N.classify), leftA(N.reason)), color: "var(--accent-4)" },
  { d: hedge(rightA(N.reason), leftA(N.act)), color: "var(--accent-5)" },
  { d: hedge(rightA(N.act), leftA(N.synth)), color: "var(--accent)" },
  { d: hedge(rightA(N.synth), [GATE.cx - GATE.r, GATE.cy]), color: "var(--accent-2)" },
  { d: hedge([GATE.cx + GATE.r, GATE.cy], leftA(N.answer)), color: "var(--accent-2)" },
];
const TOOL_EDGES: EdgeDef[] = TOOLS.map((t) => ({
  d: vedge(botA(N.act), topA(N[t])),
  color: "var(--accent)",
}));
const EDGES = [...SPINE, ...TOOL_EDGES];
// the reason ⇄ act iteration loop (arc above the spine)
const LOOP = `M${cx(N.act)} ${N.act.y} C ${cx(N.act)} 8, ${cx(N.reason)} 8, ${cx(N.reason)} ${N.reason.y}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[query 42] intent: CM by product × region", tone: "default" },
  { text: "[reason] plan → pull CM, join spend, rank by product", tone: "violet" },
  { text: "[act → BigQuery] SELECT-only ✓ 2.3M rows → observe", tone: "cyan" },
  { text: "[reason] enough context · synthesize", tone: "violet" },
  { text: "[answer] delivered · guarded · 1.8s", tone: "green" },
];
const toneClass: Record<string, string> = {
  default: "text-muted",
  violet: "text-accent-4",
  cyan: "text-accent",
  green: "text-accent-2",
};

export default function AgentFlow({ embedded = false }: { embedded?: boolean }) {
  const [q, setQ] = useState(42);
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
        setQ((n) => (n >= 99 ? 42 : n + 1));
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
          className={n.kind !== "neutral" ? "node-aura" : undefined}
        />
        {hasIcon && (
          <path d={icon.path} fill={icon.color} transform={`translate(${n.x + 9} ${cy(n) - 7}) scale(0.6)`} />
        )}
        <text
          x={tx}
          y={cy(n) + (n.sub ? -3 : 4)}
          textAnchor={anchor}
          className="fill-fg"
          fontSize={12.5}
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
        <span className="text-muted">analytics agent · langgraph · reason ⇄ act</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            query <span className="text-fg">{q}</span>
          </span>
          <span className="hidden sm:inline">
            tools <span className="text-fg">7</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "idle" : "running"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 968 268"
        className="w-full"
        role="img"
        aria-label="LangGraph analytics agent as a ReAct loop: intent is routed by a classifier into a reason-act cycle that iterates, calling seven live systems as tools (BigQuery, GA4, Google Ads, Matomo, Sentry, Supabase, Nexus API); once it has enough context it synthesizes, passes a SELECT-only guard gate, and returns an answer."
      >
        <defs>
          <marker id="raLoop" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 2 L8 5 L2 8" fill="none" stroke="var(--accent-5)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <radialGradient id="raCyan">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="raEmerald">
            <stop offset="0%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="raViolet">
            <stop offset="0%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="raPink">
            <stop offset="0%" style={{ stopColor: "var(--accent-5)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-5)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-5)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* iterate loop label + arc */}
        <text x={(cx(N.act) + cx(N.reason)) / 2} y={9} textAnchor="middle" fill="var(--accent-5)" fontSize={11} fontFamily="var(--font-mono)" opacity={0.9}>
          iterate
        </text>
        <path d={LOOP} fill="none" stroke="var(--accent-5)" strokeWidth={1.3} opacity={0.55} markerEnd="url(#raLoop)" />

        <text x={484} y={196} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          act ⇄ 7 live systems
        </text>

        {/* base edges */}
        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`ra${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        {/* traveling signal: glowing head + comet trail (call, downstream) */}
        {!reduced &&
          EDGES.flatMap((e, i) => {
            const g = GRAD[e.color] ?? "raCyan";
            const base = -(i * 0.17);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#ra${i}`} />
                </animateMotion>
              </circle>
            ));
          })}
        {/* observations flowing back up from tools into act (emerald) */}
        {!reduced &&
          TOOL_EDGES.map((_e, ti) => {
            const i = SPINE.length + ti;
            const base = -(ti * 0.17) - 0.6;
            return [0, 1, 2].map((k) => (
              <circle key={`u${i}-${k}`} r={3.4 - k * 0.8} fill="url(#raEmerald)" opacity={0.85 - k * 0.24}>
                <animateMotion
                  dur="1.9s"
                  repeatCount="indefinite"
                  begin={`${(base + k * 0.04).toFixed(3)}s`}
                  keyPoints="1;0"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#ra${i}`} />
                </animateMotion>
              </circle>
            ));
          })}

        {/* guard gate */}
        <path
          d={`M${GATE.cx} ${GATE.cy - GATE.r} L${GATE.cx + GATE.r} ${GATE.cy} L${GATE.cx} ${GATE.cy + GATE.r} L${GATE.cx - GATE.r} ${GATE.cy} Z`}
          fill="rgba(74,222,157,0.09)"
          stroke="var(--accent-2)"
          strokeWidth={1.3}
          className="node-aura"
          style={{ filter: "drop-shadow(0 0 4px rgba(74,222,157,0.3))" }}
        />
        <text x={GATE.cx} y={GATE.cy + GATE.r + 16} textAnchor="middle" fill="var(--accent-2)" fontSize={10} fontFamily="var(--font-mono)">
          guard
        </text>

        {Object.entries(N).map(([k, n]) => renderNode(k, n))}
      </svg>

      <div className="mt-3 h-28 overflow-hidden font-mono text-[11px] leading-6 sm:text-[12px]">
        {visible.map((l, i) => (
          <div key={`${q}-${i}`} className={toneClass[l.tone]}>
            <span className="mr-2 select-none text-faint">›</span>
            {l.text}
          </div>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] leading-5 text-faint">
        # simulated · a ReAct agent — reason ⇄ act over 7 live systems,
        SELECT-only guarded and context-cached
      </p>
    </div>
  );
}
