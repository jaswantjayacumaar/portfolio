"use client";

import { useEffect, useRef, useState } from "react";

const STATS: {
  value: number;
  suffix: string;
  label: string;
  accentClass: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 9,
    suffix: "",
    label: "international markets automated",
    accentClass: "text-accent",
    icon: (
      // globe
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    value: 11,
    suffix: "",
    label: "SEM automation tools shipped",
    accentClass: "text-accent-2",
    icon: (
      // modules grid
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    value: 10000,
    suffix: "+",
    label: "campaign changes applied / month",
    accentClass: "text-accent-4",
    icon: (
      // refresh cycle
      <>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </>
    ),
  },
  {
    value: 27000,
    suffix: "+",
    label: "search terms classified / month",
    accentClass: "text-accent-3",
    icon: (
      // classification funnel
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    ),
  },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const animate = (t: number) => {
          const p = Math.min((t - t0) / 1300, 1);
          setProgress(easeOutCubic(p));
          if (p < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4"
    >
      {STATS.map((s) => (
        <div key={s.label} className="bg-panel px-6 py-7">
          <div className={`mb-3 ${s.accentClass}`}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {s.icon}
            </svg>
          </div>
          <div className="font-display text-4xl font-semibold tracking-tight text-fg">
            {Math.round(s.value * progress).toLocaleString("en-GB")}
            <span className={s.accentClass}>{s.suffix}</span>
          </div>
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
