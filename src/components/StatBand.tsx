"use client";

import { useEffect, useRef, useState } from "react";

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 9, suffix: "", label: "international markets automated" },
  { value: 11, suffix: "", label: "SEM automation tools shipped" },
  { value: 10000, suffix: "+", label: "campaign changes applied / month" },
  { value: 27000, suffix: "+", label: "search terms classified / month" },
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
          <div className="font-display text-4xl font-semibold tracking-tight text-fg">
            {Math.round(s.value * progress).toLocaleString("en-GB")}
            <span className="text-accent">{s.suffix}</span>
          </div>
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
