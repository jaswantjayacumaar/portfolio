"use client";

import { useEffect, useState } from "react";
import {
  siGoogleads,
  siGoogleanalytics,
  siGooglebigquery,
  siGooglesearchconsole,
  siNextdotjs,
  siSupabase,
} from "simple-icons";

type Kind = "source" | "warehouse" | "app" | "page" | "store";

const COLOR: Record<Kind, string> = {
  source: "var(--accent-4)",
  warehouse: "var(--accent)",
  app: "var(--accent-2)",
  page: "var(--accent-3)",
  store: "var(--accent-5)",
};
const FILL: Record<Kind, string> = {
  source: "rgba(180,140,255,0.09)",
  warehouse: "rgba(83,216,251,0.09)",
  app: "rgba(74,222,157,0.09)",
  page: "rgba(255,180,107,0.08)",
  store: "rgba(255,143,163,0.09)",
};
const GLOW: Record<Kind, string> = {
  source: "drop-shadow(0 0 4px rgba(180,140,255,0.28))",
  warehouse: "drop-shadow(0 0 4px rgba(83,216,251,0.35))",
  app: "drop-shadow(0 0 4px rgba(74,222,157,0.35))",
  page: "drop-shadow(0 0 4px rgba(255,180,107,0.28))",
  store: "drop-shadow(0 0 4px rgba(255,143,163,0.32))",
};

// Microsoft Bing glyph (official path, retired from simple-icons)
const BING_PATH =
  "M20.176 15.406a6.48 6.48 0 01-1.736 4.414c1.338-1.47.803-3.869-1.003-4.635-.862-.305-2.488-.85-3.367-1.158a1.834 1.834 0 01-.932-.818c-.381-.975-1.163-2.968-1.548-3.948-.095-.285-.31-.625-.265-.938.046-.598.724-1.003 1.276-.754l3.682 1.888c.621.292 1.305.692 1.796 1.172a6.486 6.486 0 012.097 4.777zm-1.44 1.888c-.264-1.194-1.135-1.744-2.216-2.028-1.527.902-4.853 2.878-6.952 4.13-1.103.68-2.13 1.35-2.919 1.242a2.866 2.866 0 01-2.77-2.325c-.012-.048-.008-.03-.001.01a6.4 6.4 0 00.947 2.653 6.498 6.498 0 005.486 3.022c1.908.062 3.536-1.153 5.099-2.096.292-.188.804-.496 1.332-.831l1.423-1.51c.553-.577.764-1.426.571-2.267zm-12.04 2.97c.422 0 .822-.1 1.173-.29.355-.215.964-.579 1.7-1.018L9.57 4.502c0-.99-.497-1.864-1.257-2.382-.08-.059-2.91-1.901-2.99-1.956-.605-.432-1.523.045-1.5.797v14.887l.417 2.36a2.488 2.488 0 002.455 2.056z";

type Icon = { path: string; color: string };
const ICON: Record<string, Icon> = {
  gads: { path: siGoogleads.path, color: "#5B9DF9" },
  ga4: { path: siGoogleanalytics.path, color: "#F9AB00" },
  bing: { path: BING_PATH, color: "#4DA3FF" },
  gsc: { path: siGooglesearchconsole.path, color: "#8AB4F8" },
  wh: { path: siGooglebigquery.path, color: "#8AB4F8" },
  app: { path: siNextdotjs.path, color: "#C8D2DE" },
  supa: { path: siSupabase.path, color: "#3ECF8E" },
};

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind };

const N: Record<string, Node> = {
  gads: { x: 18, y: 35, w: 156, h: 30, label: "Google Ads", kind: "source" },
  ga4: { x: 18, y: 83, w: 156, h: 30, label: "GA4", kind: "source" },
  bing: { x: 18, y: 131, w: 156, h: 30, label: "Bing Ads", kind: "source" },
  mc: { x: 18, y: 179, w: 156, h: 30, label: "Merchant Center", kind: "source" },
  gsc: { x: 18, y: 227, w: 156, h: 30, label: "Search Console", kind: "source" },
  klav: { x: 18, y: 275, w: 156, h: 30, label: "Klaviyo", kind: "source" },
  wh: { x: 396, y: 138, w: 150, h: 64, label: "BigQuery", sub: "GA_Jaswant views", kind: "warehouse" },
  app: { x: 600, y: 142, w: 144, h: 56, label: "CM Report", sub: "Next.js · Express", kind: "app" },
  p1: { x: 772, y: 35, w: 180, h: 30, label: "CM Overview", kind: "page" },
  p2: { x: 772, y: 83, w: 180, h: 30, label: "CM Hourly", kind: "page" },
  p3: { x: 772, y: 131, w: 180, h: 30, label: "Marketing Cost", kind: "page" },
  p4: { x: 772, y: 179, w: 180, h: 30, label: "SEM Analysis", kind: "page" },
  p5: { x: 772, y: 227, w: 180, h: 30, label: "SEM Compare", kind: "page" },
  p6: { x: 772, y: 275, w: 180, h: 30, label: "Product Portfolio", kind: "page" },
  supa: { x: 600, y: 322, w: 144, h: 30, label: "Supabase", kind: "store" },
};
const SOURCES = ["gads", "ga4", "bing", "mc", "gsc", "klav"] as const;
const PAGES = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;
const rightA = (n: Node): [number, number] => [n.x + n.w, cy(n)];
const leftA = (n: Node): [number, number] => [n.x, cy(n)];

function edge(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * 0.5;
  return `M${a[0]} ${a[1]} C ${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`;
}

const GRAD: Record<string, string> = {
  "var(--accent)": "cmCyan",
  "var(--accent-3)": "cmAmber",
  "var(--accent-4)": "cmViolet",
  "var(--accent-5)": "cmPink",
};

type EdgeDef = { d: string; color: string };
const EDGES: EdgeDef[] = [
  ...SOURCES.map((s) => ({ d: edge(rightA(N[s]), leftA(N.wh)), color: "var(--accent-4)" })),
  { d: edge(rightA(N.wh), leftA(N.app)), color: "var(--accent)" },
  ...PAGES.map((p) => ({ d: edge(rightA(N.app), leftA(N[p])), color: "var(--accent-3)" })),
];
const STORE_EDGE = `M${cx(N.app)} ${N.app.y + N.app.h} L${cx(N.app)} ${N.supa.y}`;

const LOG: { text: string; tone: string }[] = [
  { text: "[06:10 UTC] scheduled queries ✓ · 5 views refreshed", tone: "dim" },
  { text: "[warehouse] GA_Jaswant · daily + hourly top-up", tone: "default" },
  { text: "[app] serving CM Overview · Hourly · Marketing Cost …", tone: "amber" },
  { text: "[agent] /agent chat grounded on the live warehouse", tone: "green" },
];
const toneClass: Record<string, string> = {
  dim: "text-faint",
  default: "text-muted",
  amber: "text-accent-3",
  green: "text-accent-2",
};

export default function CmFlow({ embedded = false }: { embedded?: boolean }) {
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
          className="node-aura"
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
        <span className="text-muted">cm report · bigquery + next.js</span>
        <span className="flex items-center gap-3 text-faint">
          <span className="text-muted">
            refresh <span className="text-fg">2×/day</span>
          </span>
          <span className="hidden sm:inline">
            pages <span className="text-fg">6</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent dot-pulse"}`} />
            {done ? "idle" : "running"}
          </span>
        </span>
      </div>

      <svg
        viewBox="0 0 970 366"
        className="w-full"
        role="img"
        aria-label="Contribution Margin reporting platform: six marketing data sources (Google Ads, GA4, Bing Ads, Merchant Center, Search Console, Klaviyo) fan in through scheduled queries to a BigQuery warehouse, served by a Next.js/Express CM Report app that fans out to six analytical pages (CM Overview, CM Hourly, Marketing Cost, SEM Analysis, SEM Compare, Product Portfolio), with Supabase for auth and chat history."
      >
        <defs>
          <radialGradient id="cmViolet">
            <stop offset="0%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-4)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="cmCyan">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="cmAmber">
            <stop offset="0%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.95 }} />
            <stop offset="45%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-3)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <text x={288} y={20} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          7 scheduled queries · 2×/day
        </text>
        <text x={758} y={20} textAnchor="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-mono)">
          6 report pages
        </text>

        {EDGES.map((e, i) => (
          <path key={`b${i}`} id={`cm${i}`} d={e.d} fill="none" stroke="var(--line)" strokeWidth={1.4} />
        ))}
        {!reduced &&
          EDGES.flatMap((e, i) => {
            const g = GRAD[e.color] ?? "cmCyan";
            const base = -(i * 0.18);
            return [0, 1, 2, 3].map((k) => (
              <circle key={`d${i}-${k}`} r={4 - k * 0.85} fill={`url(#${g})`} opacity={1 - k * 0.24}>
                <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${(base + k * 0.04).toFixed(3)}s`}>
                  <mpath href={`#cm${i}`} />
                </animateMotion>
              </circle>
            ));
          })}

        <path d={STORE_EDGE} fill="none" stroke="var(--accent-5)" strokeWidth={1.2} opacity={0.45} />

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
        # the contribution-margin platform · replaced legacy Looker Studio ·
        live across 9 markets (USA, UK, FR, IT, ES, DE, NL, AE, IN)
      </p>
    </div>
  );
}
