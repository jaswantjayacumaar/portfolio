"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SpotCard from "@/components/SpotCard";
import {
  ApproachChips,
  CardHead,
  ProvesLine,
  StackChips,
  accentText,
  type FlowKey,
  type Work,
} from "@/components/work-cards";

// Diagrams only ship and mount when their card is opened, so a fresh open
// starts the animation and log loop from the top.
const FLOWS: Record<FlowKey, React.ComponentType<{ embedded?: boolean }>> = {
  cm: dynamic(() => import("@/components/CmFlow")),
  migration: dynamic(() => import("@/components/MigrationFlow")),
  sem: dynamic(() => import("@/components/SemFlow")),
  predict: dynamic(() => import("@/components/PredictFlow")),
  agent: dynamic(() => import("@/components/AgentFlow")),
  price: dynamic(() => import("@/components/PriceFlow")),
};

const HASH_PREFIX = "#work-";

function idFromHash(hash: string): string | null {
  return hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null;
}

export default function WorkGrid({ items }: { items: Work[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  // Set by toggle() so the effect below can tell a click from a hash/default open.
  const fromClick = useRef(false);

  // A deep link (#work-<id>) wins over the default open card, on first load
  // and whenever the hash changes underneath us.
  useEffect(() => {
    const apply = () => {
      const id = idFromHash(window.location.hash);
      if (id && items.some((w) => w.id === id)) setOpen(id);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [items]);

  // After a click: mirror the open card into the URL (post-commit, so the
  // router's history patch never fires mid-render) and, because the grid
  // reflows when a card jumps to its own row, bring its top back into view.
  useEffect(() => {
    if (!fromClick.current) return;
    fromClick.current = false;
    const url = open ? `${HASH_PREFIX}${open}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
    if (!open) return;
    const el = document.getElementById(`work-${open}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 72 || top > window.innerHeight * 0.6) {
      el.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }, [open]);

  const toggle = useCallback((id: string) => {
    fromClick.current = true;
    setOpen((cur) => (cur === id ? null : id));
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((w, i) => {
        const isOpen = open === w.id;
        const Flow = w.flow ? FLOWS[w.flow] : null;
        const panelId = `work-panel-${w.id}`;
        return (
          <Reveal key={w.id} delay={isOpen ? 0 : (i % 2) * 80} className={isOpen ? "md:col-span-2" : ""}>
            <SpotCard
              as="article"
              id={`work-${w.id}`}
              className={`flex h-full scroll-mt-24 flex-col rounded-xl border bg-panel transition-colors duration-300 ${
                isOpen ? "border-faint/60 p-6 sm:p-8" : "border-line p-6 hover:border-faint/60"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(w.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group w-full text-left"
              >
                <CardHead w={w} />
                {!isOpen && (
                  <p className="mt-3 text-sm leading-6 text-muted">{w.summary}</p>
                )}
              </button>

              {isOpen ? (
                <div id={panelId}>
                  {w.sub ? (
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                      <div className="md:pr-6">
                        <p className="text-sm leading-6 text-muted">{w.body}</p>
                        <StackChips items={w.stack} />
                      </div>
                      <div className="md:border-l md:border-line md:pl-6">
                        <h4 className="font-display text-base font-bold tracking-tight text-fg">{w.sub.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-muted">{w.sub.body}</p>
                        <ApproachChips items={w.approaches} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{w.body}</p>
                      <StackChips items={w.stack} />
                      <ApproachChips items={w.approaches} />
                    </>
                  )}
                  <ProvesLine w={w} />
                  {Flow && (
                    <div className="mt-6 border-t border-line pt-6">
                      <Flow embedded />
                    </div>
                  )}
                </div>
              ) : (
                <div id={panelId} className="mt-auto">
                  <StackChips items={w.stack} className="mt-4" />
                  <ProvesLine w={w} />
                </div>
              )}

              <button
                type="button"
                onClick={() => toggle(w.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`mt-4 inline-flex items-center gap-1.5 self-start font-mono text-[12px] transition-colors hover:text-fg ${
                  isOpen ? "text-muted" : accentText[w.accent]
                }`}
              >
                {isOpen ? "collapse ↑" : Flow ? "see how it works ↓" : "read more ↓"}
              </button>
            </SpotCard>
          </Reveal>
        );
      })}
    </div>
  );
}
