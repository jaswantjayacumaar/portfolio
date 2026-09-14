"use client";

import { useEffect, useState } from "react";
import { siGooglebigquery, siPostgresql } from "simple-icons";

type Kind = "legacy" | "source" | "sync" | "warehouse" | "gate" | "downstream" | "guard";

const COLOR: Record<Kind, string> = {
  legacy: "var(--faint)",
  source: "var(--accent-4)",
  sync: "var(--accent)",
  warehouse: "var(--accent)",
  gate: "var(--accent-3)",
  downstream: "var(--accent-2)",
  guard: "var(--accent-5)",
};
const FILL: Record<Kind, string> = {
  legacy: "rgba(140,150,165,0.06)",
  source: "rgba(180,140,255,0.09)",
  sync: "rgba(83,216,251,0.09)",
  warehouse: "rgba(83,216,251,0.09)",
  gate: "rgba(255,180,107,0.10)",
  downstream: "rgba(74,222,157,0.09)",
  guard: "rgba(255,143,163,0.10)",
};
const GLOW: Record<Kind, string> = {
  legacy: "none",
  source: "drop-shadow(0 0 4px rgba(180,140,255,0.30))",
  sync: "drop-shadow(0 0 4px rgba(83,216,251,0.32))",
  warehouse: "drop-shadow(0 0 4px rgba(83,216,251,0.32))",
  gate: "drop-shadow(0 0 4px rgba(255,180,107,0.35))",
  downstream: "drop-shadow(0 0 4px rgba(74,222,157,0.32))",
  guard: "drop-shadow(0 0 4px rgba(255,143,163,0.35))",
};

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  source: { path: siPostgresql.path, color: "#C6B5F0" },
  warehouse: { path: siGooglebigquery.path, color: "#8AB4F8" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  legacy: { x: 16, y: 44, w: 150, h: 46, label: "MS SQL Server", sub: "legacy cron feeds", kind: "legacy" },
  source: { x: 200, y: 44, w: 150, h: 46, label: "PostgreSQL dw", sub: "history to 2018", kind: "source" },
  sync: { x: 384, y: 44, w: 146, h: 46, label: "pg → bq sync", sub: "hosted · monitored", kind: "sync" },
  warehouse: { x: 564, y: 44, w: 156, h: 46, label: "BackOfficetoCM", sub: "BigQuery dataset", kind: "warehouse" },
  gate: { x: 754, y: 38, w: 118, h: 58, label: "recon gate", sub: "to the decimal", kind: "gate" },
  downstream: { x: 906, y: 44, w: 64, h: 46, label: "29 SQs", sub: "repointed", kind: "downstream" },
  backfill: { x: 384, y: 132, w: 146, h: 40, label: "history backfill", sub: "metered · quota-safe", kind: "sync" },
  rollback: { x: 754, y: 132, w: 118, h: 40, label: "rollback", sub: "exit test failed", kind: "gate" },
  guard: { x: 906, y: 132, w: 64, h: 40, label: "guard", sub: "alerting", kind: "guard" },
};

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function hedge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}
const vline = (n: Node, m: Node) => `M${cx(n)} ${n.y + n.h} L${cx(m)} ${m.y}`;

const GRAD: Record<string, string> = {
  "var(--accent)": "mgCyan",
  "var(--accent-2)": "mgEmerald",
  "var(--accent-3)": "mgAmber",
  "var(--accent-4)": "mgViolet",
  "var(--faint)": "mgFaint",
};

type EdgeDef = { d: string; color: string; dashed?: boolean };
const EDGES: EdgeDef[] = [
  { d: hedge(rightA(N.legacy), leftA(N.source)), color: "var(--faint)", dashed: true },
  { d: hedge(rightA(N.source), leftA(N.sync)), color: "var(--accent-4)" },
  { d: hedge(rightA(N.sync), leftA(N.warehouse)), color: "var(--accent)" },
  { d: hedge(rightA(N.warehouse), leftA(N.gate)), color: "var(--accent)" },
  { d: hedge(rightA(N.gate), leftA(N.downstream)), color: "var(--accent-3)" },
];
const SIDE: EdgeDef[] = [
  { d: vline(N.sync, N.backfill), color: "var(--accent)" },
  { d: vline(N.gate, N.rollback), color: "var(--accent-3)" },
  { d: vline(N.downstream, N.guard), color: "var(--accent-2)" },
];

const LOG: { text: string; tone: string }[] = [
  { text: "[audit] legacy feeds traced · 3 silent data defects root-caused", tone: "violet" },
  { text: "[backfill] 2018 → today · metered within BigQuery load quotas", tone: "default" },
  { text: "[gate] rebuilt tables reconciled against source · to the decimal", tone: "amber" },
  { text: "[cutover] day-1 exit test FAILED → full rollback → re-run 18/18 ✓", tone: "amber" },
  { text: "[guard] HealthGuard alerting live · dead feeds surface same day", tone: "green" },
];
const toneClass: Record<string, string> = {
  violet: "text-accent-4",
  default: "text-muted",
  amber: "text-accent-3",
  green: "text-accent-2",
};

export default function MigrationFlow({ embedded = false }: { embedded?: boolean }) {
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
        <rect
          x={n.x}
          y={n.y}
          width={n.w}
          height={n.h}
          rx={9}
          fill={FILL[n.kind]}
          stroke={COLOR[n.kind]}
          strokeWidth={1.3}
          strokeDasharray={n.kind === "legacy" ? "4 3" : undefined}
          className="node-aura"
        />
        {hasIcon && (
          <path d={icon.path} fill={icon.color} transform={`translate(${n.x + 9} ${cy(n) - 7}) scale(0.6)`} />
        )}
        <text
          x={tx}
          y={cy(n) - 3}
          textAnchor={anchor}
          className="fill-fg"
          fontSize={n.w < 80 ? 11.5 : 12.5}
          fontFamily="var(--font-mono)"
          style={n.kind === "legacy" ? { textDecoration: "line-through", opacity: 0.7 } : undefined}
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

  const grad = (id: string, v: string) => (
    <radialGradient id={id}>
      <stop offset="0%" style={{ stopColor: v, stopOpacity: 0.95 }} />
      <stop offset="45%" style={{ stopColor: v, stopOpacity: 0.5 }} />
      <stop offset="100%" style={{ stopColor: v, stopOpacity: 0 }} />
    </radialGradient>
  );

  return (
    <div className={embedded ? "" : "rounded-xl border border-line bg-panel/70 p-4 backdrop-blur sm:p-6"}>
      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[11px] sm:text-xs">
        <span className="text-muted">warehouse migration · MS SQL → PostgreSQL → BigQuery</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            pipelines <span className="text-fg">29</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "cut over" : "migrating"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 986 196"
        className="w-full"
        role="img"
        aria-label="Warehouse migration: legacy MS SQL Server cron feeds replaced by a PostgreSQL-to-BigQuery sync into the BackOfficetoCM dataset, with a metered historical backfill, a reconciliation gate that once triggered a full rollback, 29 scheduled queries repointed downstream, and HealthGuard alerting on the result."
      >
        <defs>
          {grad("mgViolet", "var(--accent-4)")}
          {grad("mgCyan", "var(--accent)")}
          {grad("mgAmber", "var(--accent-3)")}
          {grad("mgEmerald", "var(--accent-2)")}
          {grad("mgFaint", "var(--faint)")}
        </defs>

        {[...EDGES, ...SIDE].map((e, i) => (
          <path
            key={`b${i}`}
            id={`mg${i}`}
            d={e.d}
            fill="none"
            stroke="var(--line)"
            strokeWidth={1.4}
            strokeDasharray={e.dashed ? "4 4" : undefined}
          />
        ))}
        {!reduced &&
          [...EDGES, ...SIDE].flatMap((e, i) => {
            if (e.dashed) return [];
            const g = GRAD[e.color] ?? "mgCyan";
            const base = -(i * 0.2);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#mg${i}`} />
                </animateMotion>
              </circle>
            ));
          })}

        {Object.entries(N).map(([k, n]) => renderNode(k, n))}
      </svg>

      <div className="mt-3 h-[7.5rem] overflow-hidden font-mono text-[11px] leading-6 sm:text-[12px]">
        {visible.map((l, i) => (
          <div key={i} className={toneClass[l.tone]}>
            <span className="mr-2 select-none text-faint">›</span>
            {l.text}
          </div>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] leading-5 text-faint">
        # ingestion layer migrated end to end: audit → sync → backfill → reconcile → cut over → guard;
        the CM Report downstream healed without a single query rewritten by hand
      </p>
    </div>
  );
}
