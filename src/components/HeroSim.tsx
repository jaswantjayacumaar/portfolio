"use client";

import { useEffect, useState } from "react";

const STAGES = ["pull", "classify", "decide", "preview", "approve", "apply"];

type Tone = "cyan" | "green" | "amber" | "dim" | "default";

const SCRIPT: { stage: number; text: string; tone: Tone }[] = [
  { stage: 0, text: "pulling hourly CM + spend from BigQuery", tone: "cyan" },
  { stage: 0, text: "9 markets · 239 campaigns · ~9,000 ad groups", tone: "dim" },
  { stage: 1, text: "scoring 27,412 search terms against ROAS targets", tone: "default" },
  { stage: 2, text: "decision tree → 412 RED · 1,038 AMBER · 7,551 GREEN", tone: "default" },
  { stage: 3, text: "preview built — 356 bid changes queued, zero writes", tone: "amber" },
  { stage: 4, text: "human approval ✓", tone: "green" },
  { stage: 5, text: "applying via Google Ads API — 356/356 ok", tone: "cyan" },
  { stage: 5, text: "run complete · logged · next run 17:00 UTC", tone: "dim" },
];

const toneClass: Record<Tone, string> = {
  cyan: "text-accent",
  green: "text-accent-2",
  amber: "text-accent-3",
  dim: "text-faint",
  default: "text-muted",
};

export default function HeroSim() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(7);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStep(SCRIPT.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      if (i <= SCRIPT.length) {
        setStep(i);
        timer = setTimeout(tick, i === SCRIPT.length ? 3400 : 950);
      } else {
        i = 0;
        setStep(0);
        setRun((r) => (r >= 99 ? 1 : r + 1));
        timer = setTimeout(tick, 700);
      }
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []);

  const visible = SCRIPT.slice(0, step);
  const activeStage =
    step === 0 ? -1 : SCRIPT[Math.min(step, SCRIPT.length) - 1].stage;
  const done = step >= SCRIPT.length;

  return (
    <div className="w-full">
      <div className="rounded-xl border border-line bg-panel/80 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="font-mono text-xs text-muted">
            sem-console · bidding run {String(run).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-faint">
            <span
              className={`h-2 w-2 rounded-full ${done ? "bg-accent-2" : "bg-accent blink"}`}
            />
            {done ? "idle" : "running"}
          </span>
        </div>

        {/* Stage chips */}
        <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3">
          {STAGES.map((s, idx) => (
            <span
              key={s}
              className={`rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors duration-300 ${
                idx === activeStage && !done
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : idx < activeStage || done
                    ? "border-line bg-panel-2 text-muted"
                    : "border-line text-faint"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Log */}
        <div className="h-52 overflow-hidden px-4 py-3 font-mono text-[12.5px] leading-6 sm:text-[13px]">
          {visible.map((l, i) => (
            <div key={`${run}-${i}`} className={toneClass[l.tone]}>
              <span className="mr-2 select-none text-faint">›</span>
              {l.text}
            </div>
          ))}
          {!done && !reduced && (
            <span className="blink inline-block h-4 w-2 translate-y-0.5 bg-accent/70" />
          )}
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] leading-5 text-faint">
        # simulated run — the real console runs on Cloud Run schedulers, with
        preview-first, human-approved writes
      </p>
    </div>
  );
}
