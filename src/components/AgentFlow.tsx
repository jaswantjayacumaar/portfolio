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

type Kind = "neutral" | "router" | "worker" | "synth" | "answer";

const COLOR: Record<Kind, string> = {
  neutral: "var(--faint)",
  router: "var(--accent-2)",
  worker: "var(--accent-4)",
  synth: "var(--accent)",
  answer: "var(--accent-2)",
};
const FILL: Record<Kind, string> = {
  neutral: "rgba(150,161,177,0.06)",
  router: "rgba(74,222,157,0.09)",
  worker: "rgba(180,140,255,0.09)",
  synth: "rgba(83,216,251,0.09)",
  answer: "rgba(74,222,157,0.09)",
};
const GLOW: Record<Kind, string | undefined> = {
  neutral: undefined,
  router: "drop-shadow(0 0 4px rgba(74,222,157,0.35))",
  worker: "drop-shadow(0 0 4px rgba(180,140,255,0.30))",
  synth: "drop-shadow(0 0 4px rgba(83,216,251,0.35))",
  answer: "drop-shadow(0 0 4px rgba(74,222,157,0.30))",
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

type Node = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  kind: Kind;
};

const N: Record<string, Node> = {
  intent: { x: 22, y: 170, w: 92, h: 44, label: "intent", kind: "neutral" },
  classify: { x: 150, y: 168, w: 116, h: 48, label: "classify", sub: "router", kind: "router" },
  bq: { x: 372, y: 45, w: 148, h: 30, label: "BigQuery", kind: "worker" },
  ga4: { x: 372, y: 89, w: 148, h: 30, label: "GA4", kind: "worker" },
  ads: { x: 372, y: 133, w: 148, h: 30, label: "Google Ads", kind: "worker" },
  mat: { x: 372, y: 177, w: 148, h: 30, label: "Matomo", kind: "worker" },
  sen: { x: 372, y: 221, w: 148, h: 30, label: "Sentry", kind: "worker" },
  sup: { x: 372, y: 265, w: 148, h: 30, label: "Supabase", kind: "worker" },
  nex: { x: 372, y: 309, w: 148, h: 30, label: "Nexus API", kind: "worker" },
  synth: { x: 582, y: 168, w: 126, h: 48, label: "synthesize", kind: "synth" },
  answer: { x: 854, y: 170, w: 92, h: 44, label: "answer", kind: "answer" },
};
const GATE = { cx: 768, cy: 192, r: 26 };
const STORE = { x: 372, y: 360, w: 178, h: 30, label: "context cache" };
const WORKERS = ["bq", "ga4", "ads", "mat", "sen", "sup", "nex"] as const;

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function edge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "pkCyan",
  "var(--accent-2)": "pkEmerald",
  "var(--accent-4)": "pkViolet",
};

type EdgeDef = { d: string; color: string };
const EDGES: EdgeDef[] = [
  { d: edge(rightA(N.intent), leftA(N.classify)), color: "var(--accent-2)" },
  ...WORKERS.map((w) => ({ d: edge(rightA(N.classify), leftA(N[w])), color: "var(--accent-4)" })),
  ...WORKERS.map((w) => ({ d: edge(rightA(N[w]), leftA(N.synth)), color: "var(--accent)" })),
  { d: edge(rightA(N.synth), [GATE.cx - GATE.r, GATE.cy]), color: "var(--accent)" },
  { d: edge([GATE.cx + GATE.r, GATE.cy], leftA(N.answer)), color: "var(--accent-2)" },
];
const STORE_EDGE = `M${cx(N.synth)} ${N.synth.y + N.synth.h} C ${cx(N.synth)} 340, ${STORE.x + STORE.w} 340, ${STORE.x + STORE.w} ${STORE.y}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[query 41] answered · 2.3M rows scanned · 1.8s", tone: "dim" },
  { text: "[query 42] intent: CM by product × region, routing", tone: "default" },
  { text: "[classify] fan-out → 7 live data lanes", tone: "violet" },
  { text: "[guard] SELECT-only ✓  dry-run ✓  byte-cap ✓", tone: "green" },
];
const toneClass: Record<string, string> = {
  dim: "text-faint",
  default: "text-muted",
  green: "text-accent-2",
  violet: "text-accent-4",
};

export default function AgentFlow() {
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
        timer = setTimeout(tick, i === LOG.length ? 3200 : 900);
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
          <path
            d={icon.path}
            fill={icon.color}
            transform={`translate(${n.x + 12} ${cy(n) - 8}) scale(0.667)`}
          />
        )}
        <text
          x={hasIcon ? n.x + 34 : cx(n)}
          y={cy(n) + (n.sub ? -2 : 4)}
          textAnchor={hasIcon ? "start" : "middle"}
          className="fill-fg"
          fontSize={12.5}
          fontFamily="var(--font-mono)"
        >
          {n.label}
        </text>
        {n.sub && (
          <text x={cx(n)} y={cy(n) + 12} textAnchor="middle" fill="var(--faint)" fontSize={10} fontFamily="var(--font-mono)">
            {n.sub}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="rounded-xl border border-line bg-panel/70 p-4 backdrop-blur sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[11px] sm:text-xs">
        <span className="text-muted">analytics agent · langgraph</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            query <span className="text-fg">{q}</span>
          </span>
          <span className="hidden sm:inline">
            lanes <span className="text-fg">7</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "idle" : "running"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 968 404"
        className="w-full"
        role="img"
        aria-label="LangGraph analytics agent: intent routes through a classifier, fans out across seven live systems (BigQuery, GA4, Google Ads, Matomo, Sentry, Supabase and the Nexus API), synthesizes, passes a SELECT-only guard gate, and returns an answer, backed by a context cache."
      >
        <defs>
          <radialGradient id="pkCyan">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="pkEmerald">
            <stop offset="0%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-2)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="pkViolet">
            <stop offset="0%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <text x={318} y={26} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          fan-out
        </text>
        <text x={545} y={26} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          fan-in
        </text>
        <text x={768} y={156} textAnchor="middle" fill="var(--accent-2)" fontSize={11} fontFamily="var(--font-mono)">
          guard gate
        </text>

        {/* base edges */}
        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`ea${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        {/* traveling signal: glowing head + comet trail */}
        {!reduced &&
          EDGES.flatMap((e, i) => {
            const g = GRAD[e.color] ?? "pkCyan";
            const base = -(i * 0.21);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#ea${i}`} />
                </animateMotion>
              </circle>
            ));
          })}

        {/* store */}
        <path d={STORE_EDGE} fill="none" stroke="var(--accent-3)" strokeWidth={1.2} opacity={0.45} />
        <g>
          <rect x={STORE.x} y={STORE.y} width={STORE.w} height={STORE.h} rx={12} fill="rgba(255,180,107,0.07)" stroke="var(--accent-3)" strokeWidth={1.2} />
          <text x={STORE.x + STORE.w / 2} y={STORE.y + STORE.h / 2 + 4} textAnchor="middle" fill="var(--accent-3)" fontSize={11} fontFamily="var(--font-mono)">
            {STORE.label}
          </text>
        </g>

        {/* guard gate */}
        <path
          d={`M${GATE.cx} ${GATE.cy - GATE.r} L${GATE.cx + GATE.r} ${GATE.cy} L${GATE.cx} ${GATE.cy + GATE.r} L${GATE.cx - GATE.r} ${GATE.cy} Z`}
          fill="rgba(74,222,157,0.09)"
          stroke="var(--accent-2)"
          strokeWidth={1.3}
          className="node-aura"
          style={{ filter: "drop-shadow(0 0 4px rgba(74,222,157,0.3))" }}
        />

        {Object.entries(N).map(([k, n]) => renderNode(k, n))}
      </svg>

      <div className="mt-3 h-24 overflow-hidden font-mono text-[11px] leading-6 sm:text-[12px]">
        {visible.map((l, i) => (
          <div key={`${q}-${i}`} className={toneClass[l.tone]}>
            <span className="mr-2 select-none text-faint">›</span>
            {l.text}
          </div>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] leading-5 text-faint">
        # simulated · the real agent runs SELECT-only over live BigQuery,
        guarded, dry-run-validated and context-cached
      </p>
    </div>
  );
}
