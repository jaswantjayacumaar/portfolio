"use client";

import { useEffect, useState } from "react";
import { siGoogleads, siGooglebigquery } from "simple-icons";

type Kind = "signal" | "factor" | "predict" | "validate" | "store";

const COLOR: Record<Kind, string> = {
  signal: "var(--accent-2)",
  factor: "var(--accent-3)",
  predict: "var(--accent)",
  validate: "var(--accent-4)",
  store: "var(--accent)",
};
const FILL: Record<Kind, string> = {
  signal: "rgba(74,222,157,0.09)",
  factor: "rgba(255,180,107,0.10)",
  predict: "rgba(83,216,251,0.09)",
  validate: "rgba(180,140,255,0.09)",
  store: "rgba(83,216,251,0.07)",
};
const GLOW: Record<Kind, string> = {
  signal: "drop-shadow(0 0 4px rgba(74,222,157,0.32))",
  factor: "drop-shadow(0 0 4px rgba(255,180,107,0.35))",
  predict: "drop-shadow(0 0 4px rgba(83,216,251,0.32))",
  validate: "drop-shadow(0 0 4px rgba(180,140,255,0.30))",
  store: "drop-shadow(0 0 4px rgba(83,216,251,0.22))",
};

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  signal: { path: siGoogleads.path, color: "#8AB4F8" },
  store: { path: siGooglebigquery.path, color: "#8AB4F8" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  signal: { x: 16, y: 44, w: 172, h: 46, label: "day-1 signals", sub: "immature · settling", kind: "signal" },
  mature: { x: 232, y: 38, w: 160, h: 58, label: "× maturation curve", sub: "measured · 30-day lag", kind: "factor" },
  loss: { x: 436, y: 38, w: 160, h: 58, label: "× tracking loss", sub: "GA vs purchase truth", kind: "factor" },
  predict: { x: 640, y: 44, w: 150, h: 46, label: "predicted CM", sub: "campaign · ad group", kind: "predict" },
  validate: { x: 834, y: 44, w: 136, h: 46, label: "vs settled", sub: "5–7% typical error", kind: "validate" },
  store: { x: 426, y: 136, w: 180, h: 40, label: "prediction table", sub: "nightly materialiser", kind: "store" },
};

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function hedge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "pdCyan",
  "var(--accent-2)": "pdEmerald",
  "var(--accent-3)": "pdAmber",
  "var(--accent-4)": "pdViolet",
};

type EdgeDef = { d: string; color: string };
const EDGES: EdgeDef[] = [
  { d: hedge(rightA(N.signal), leftA(N.mature)), color: "var(--accent-2)" },
  { d: hedge(rightA(N.mature), leftA(N.loss)), color: "var(--accent-3)" },
  { d: hedge(rightA(N.loss), leftA(N.predict)), color: "var(--accent-3)" },
  { d: hedge(rightA(N.predict), leftA(N.validate)), color: "var(--accent)" },
];
// predicted CM is written to the nightly table; settled truth flows back to validate
const STORE_IN = `M${cx(N.predict)} ${N.predict.y + N.predict.h} C ${cx(N.predict)} ${N.store.y + 10}, ${N.store.x + N.store.w + 30} ${cy(N.store)}, ${N.store.x + N.store.w} ${cy(N.store)}`;
const STORE_OUT = `M${cx(N.validate)} ${N.validate.y + N.validate.h} C ${cx(N.validate)} ${N.store.y + 30}, ${N.store.x + N.store.w + 60} ${cy(N.store) + 8}, ${N.store.x + N.store.w} ${cy(N.store) + 8}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[signals] day-1 ad-group data read from archive · 3 campaign types", tone: "green" },
  { text: "[factors] maturation × tracking-loss curves fitted from 30 days of settling", tone: "amber" },
  { text: "[predict] CM waterfall per ad group · Search · Shopping · PMax", tone: "default" },
  { text: "[materialise] nightly → CM_Prediction_Daily · filters 41,000× cheaper", tone: "default" },
  { text: "[validate] predicted vs settled · 5–7% error · parity 213/213 ✓", tone: "violet" },
];
const toneClass: Record<string, string> = {
  violet: "text-accent-4",
  default: "text-muted",
  amber: "text-accent-3",
  green: "text-accent-2",
};

export default function PredictFlow({ embedded = false }: { embedded?: boolean }) {
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
        <span className="text-muted">same-day CM prediction · day-1 → settled</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            error <span className="text-fg">5–7%</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "validated" : "predicting"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 986 196"
        className="w-full"
        role="img"
        aria-label="Same-day contribution-margin prediction: immature day-1 Google Ads signals are multiplied by a measured conversion-maturation curve and a tracking-loss factor to predict settled CM per campaign, ad group and term, materialised nightly into CM_Prediction_Daily and validated against settled CM at a typical 5 to 7 percent error."
      >
        <defs>
          {grad("pdViolet", "var(--accent-4)")}
          {grad("pdCyan", "var(--accent)")}
          {grad("pdAmber", "var(--accent-3)")}
          {grad("pdEmerald", "var(--accent-2)")}
        </defs>

        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`pd${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        <path id="pdIn" d={STORE_IN} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        <path id="pdOut" d={STORE_OUT} fill="none" stroke="var(--line)" strokeWidth={1.4} strokeDasharray="3 4" />

        {!reduced &&
          [...EDGES, { d: STORE_IN, color: "var(--accent)" }].flatMap((e, i) => {
            const g = GRAD[e.color] ?? "pdCyan";
            const id = i < EDGES.length ? `pd${i}` : "pdIn";
            const base = -(i * 0.2);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            ));
          })}
        {/* settled truth flowing back up to validate (violet, reversed) */}
        {!reduced &&
          [0, 1, 2].map((k) => (
            <circle key={`ut-${k}`} r={3.4 - k * 0.8} fill="url(#pdViolet)" opacity={0.85 - k * 0.24}>
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                begin={`${(-0.9 + k * 0.05).toFixed(3)}s`}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href="#pdOut" />
              </animateMotion>
            </circle>
          ))}

        <text x={N.store.x + N.store.w + 80} y={N.store.y + 6} textAnchor="middle" fill="var(--faint)" fontSize={10.5} fontFamily="var(--font-mono)">
          settled truth ⇠
        </text>

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
        # today&apos;s profit, known today: forecasts settled CM from data that is
        still maturing, and publishes its own error so nobody has to trust it blind
      </p>
    </div>
  );
}
