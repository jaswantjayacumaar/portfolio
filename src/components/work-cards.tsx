import { STACK_ICONS, STACK_PARTS, type StackIcon } from "@/lib/stack-icons";

export type Accent = "accent" | "accent-2" | "accent-3" | "accent-4" | "accent-5" | "accent-6" | "danger";

export type FlowKey = "cm" | "migration" | "sem" | "predict" | "price";

export type Work = {
  id: string;
  title: string;
  domain: string;
  accent: Accent;
  /** One or two lines shown on the collapsed card. */
  summary: string;
  body: string;
  sub?: { title: string; body: string };
  stack: string[];
  approaches: string[];
  proves: string;
  flow?: FlowKey;
};

export const accentText: Record<Accent, string> = {
  accent: "text-accent",
  "accent-2": "text-accent-2",
  "accent-3": "text-accent-3",
  "accent-4": "text-accent-4",
  "accent-5": "text-accent-5",
  "accent-6": "text-accent-6",
  danger: "text-danger",
};

/** Filled call-to-action styling per accent (Tailwind needs the full class strings). */
export const accentButton: Record<Accent, string> = {
  accent: "border-accent/60 bg-accent/12 text-accent hover:bg-accent/22 hover:border-accent",
  "accent-2": "border-accent-2/60 bg-accent-2/12 text-accent-2 hover:bg-accent-2/22 hover:border-accent-2",
  "accent-3": "border-accent-3/60 bg-accent-3/12 text-accent-3 hover:bg-accent-3/22 hover:border-accent-3",
  "accent-4": "border-accent-4/60 bg-accent-4/12 text-accent-4 hover:bg-accent-4/22 hover:border-accent-4",
  "accent-5": "border-accent-5/60 bg-accent-5/12 text-accent-5 hover:bg-accent-5/22 hover:border-accent-5",
  "accent-6": "border-accent-6/60 bg-accent-6/12 text-accent-6 hover:bg-accent-6/22 hover:border-accent-6",
  danger: "border-danger/60 bg-danger/12 text-danger hover:bg-danger/22 hover:border-danger",
};

/** Representative brand colour for a chip label (first real brand hex),
 *  used to tint the stack-chip border. Concept/no-logo chips return
 *  undefined and keep the neutral border. */
export function brandColor(label: string): string | undefined {
  const partIcons = STACK_PARTS[label]?.parts.map((p) => p.icon);
  const icons = partIcons ?? STACK_ICONS[label];
  const hit = (icons ?? []).find(
    (ic): ic is StackIcon => !!ic && ic.color !== "currentColor",
  );
  return hit?.color;
}

function ChipIcon({ icon }: { icon: StackIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 shrink-0" fill={icon.color}>
      <path d={icon.path} />
    </svg>
  );
}

export function ChipLabel({ label }: { label: string }) {
  const multi = STACK_PARTS[label];
  if (multi) {
    return (
      <>
        {multi.parts.map((p, i) => (
          <span key={p.text} className="inline-flex items-center gap-1.5">
            {i > 0 && <span className="text-faint">{multi.sep}</span>}
            {p.icon && <ChipIcon icon={p.icon} />}
            {p.text}
          </span>
        ))}
      </>
    );
  }
  return (
    <>
      {(STACK_ICONS[label] ?? []).map((ic) => (
        <ChipIcon key={ic.title} icon={ic} />
      ))}
      {label}
    </>
  );
}

export function CardHead({ w }: { w: Work }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="font-display text-xl font-bold tracking-tight text-fg">{w.title}</h3>
      <span className={`shrink-0 font-mono text-[13px] font-bold ${accentText[w.accent]}`}>{w.domain}</span>
    </div>
  );
}

export function StackChips({ items, className = "mt-4" }: { items: string[]; className?: string }) {
  return (
    <div className={`${className} flex flex-wrap gap-1.5`}>
      {items.map((t) => {
        const c = brandColor(t);
        return (
          <span
            key={t}
            style={c ? { borderColor: `${c}80` } : undefined}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            <ChipLabel label={t} />
          </span>
        );
      })}
    </div>
  );
}

export function ApproachChips({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-faint/40 px-2 py-0.5 font-mono text-[11px] text-faint"
        >
          <ChipLabel label={t} />
        </span>
      ))}
    </div>
  );
}

export function ProvesLine({ w, className = "mt-4 border-t border-line pt-3" }: { w: Work; className?: string }) {
  return (
    <p className={`${className} font-mono text-[13px] font-bold leading-6 ${accentText[w.accent]}`}>
      proves: {w.proves}
    </p>
  );
}
