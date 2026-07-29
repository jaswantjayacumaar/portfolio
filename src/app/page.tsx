import Image from "next/image";
import HeroSim from "@/components/HeroSim";
import Reveal from "@/components/Reveal";
import StatBand from "@/components/StatBand";
import gwStrain from "../../public/research/gw-strain.png";
import qtH1 from "../../public/research/qtransform-h1.png";
import qtL1 from "../../public/research/qtransform-l1.png";
import { STACK_ICONS, STACK_PARTS, type StackIcon } from "@/lib/stack-icons";

const LINKS = {
  github: "https://github.com/jaswantjayacumaar",
  linkedin: "https://linkedin.com/in/jaswantjayacumaar",
  email: "mailto:jaswj6@gmail.com",
};

type Work = {
  title: string;
  domain: string;
  accent: "accent" | "accent-2" | "accent-3" | "accent-4" | "accent-5" | "accent-6" | "danger";
  body: string;
  sub?: { title: string; body: string };
  tags: string[];
  proves: string;
};

const WORK: Work[] = [
  {
    title: "Contribution Margin reporting platform",
    domain: "e-commerce analytics",
    accent: "accent",
    body: "Profitability decisions ran on lagging, patchwork dashboards. I built and own the company's CM reporting platform: a full-stack web app (Next.js/TypeScript, Express, BigQuery, Supabase; deployed on Vercel/Railway) replacing legacy Looker Studio with live daily and hourly profitability, marketing-cost and SEM analytics across 9 international markets, refreshed by scheduled queries timed around US trading waves.",
    tags: ["Next.js", "TypeScript", "Express", "BigQuery", "Supabase", "Vercel / Railway"],
    proves: "end-to-end platform ownership: warehouse → API → UI → adoption",
  },
  {
    title: "SEM Automation Console",
    domain: "paid media automation",
    accent: "accent-2",
    body: "Managing Search & Shopping campaigns across 16 products × 9 countries and 17 Google Ads accounts doesn't scale manually. I co-built an 11-tool automation console (Next.js, Python/Flask, Google Ads API) and led development of most of its systems: automated bidding, negative-keyword management, keyword farming, search-query expansion, ad-copy generation and pricing optimisation. 58 Python automation scripts apply 10,000+ campaign changes a month through preview-first, human-approved writes.",
    sub: {
      title: "Bidding decision systems",
      body: "Designed the profit- and growth-mode bidding decision trees behind the console: ROAS-band classification with RED/AMBER/GREEN logic executed autonomously via Cloud Run schedulers across two businesses, plus AI pipelines including a two-pass Gemini negative-keyword classifier and multi-model ad-copy generation using Claude, Gemini and GPT.",
    },
    tags: ["Python / Flask", "Google Ads API", "Cloud Run", "BigQuery", "Next.js", "58 Python scripts", "decision trees", "ROAS classification", "two-pass LLM classifier", "multi-model generation"],
    proves: "automation at scale and algorithm design that moves real money, safe by construction",
  },
  {
    title: "Retrieval-grounded analytics agent",
    domain: "applied AI",
    accent: "accent-4",
    body: "Stakeholders needed answers faster than dashboards could serve them. I built a RAG analytics agent embedded in the CM platform (FastAPI, LangGraph, Gemini) that turns natural language into validated SQL over BigQuery, grounded by 18 intent playbooks with context caching, connected to 7 live data systems. Hardened with SELECT-only guards, dry-run validation and byte caps, with a streaming chat UI and exportable transcripts.",
    tags: ["FastAPI", "LangGraph", "Gemini", "NL→SQL", "context caching", "7 live integrations"],
    proves: "production LLM engineering: grounded, guarded, actually used",
  },
  {
    title: "Pricing intelligence pipeline",
    domain: "pricing",
    accent: "accent-6",
    body: "Took ownership of the company's pricing-intelligence platform and run it day-to-day: agentic competitor-price scraping across 9 regions, automated BigQuery pricing pipelines with daily orchestration, and the decision dashboard that feeds pricing calls, extending it alongside the rest of the analytics stack.",
    tags: ["agentic scraping", "BigQuery pipelines", "daily orchestration", "pricing analytics"],
    proves: "production ops: inheriting, hardening and extending a live pipeline",
  },
  {
    title: "MCP toolchain & AI infrastructure",
    domain: "AI infrastructure",
    accent: "accent-5",
    body: "Built the team's AI-analytics infrastructure: an 11-server MCP toolchain connecting LLMs to BigQuery, GA4, Google Ads (including a custom write-enabled campaign-management server), Search Console, Matomo, Klaviyo, Sentry, Supabase, Jira/Confluence and the internal admin API, with onboarding guides that made LLM-assisted analysis a team-wide workflow rather than a personal trick.",
    tags: ["MCP server development", "self-hosted infra", "Nginx", "team enablement"],
    proves: "building the tools that multiply everyone else's output",
  },
  {
    title: "GA4 tracking forensics",
    domain: "analytics engineering",
    accent: "danger",
    body: "Trustworthy automation needs trustworthy inputs. I root-caused critical GA4 tracking defects (item-level purchase revenue missing since a specific release, GTM double-firing inflating events, a dead checkout event), dated each break, and drove the fixes with Engineering; contributed to server-side tagging and consent-mode implementation across 7 regions.",
    tags: ["GA4", "GTM", "server-side tagging", "consent mode", "root-cause analysis"],
    proves: "diagnostic rigour: finding the breaks everyone else reported around",
  },
];

const STANDARDS: {
  kicker: string;
  title: string;
  question: string;
  accentClass: string;
  borderClass: string;
  points: string[];
}[] = [
  {
    kicker: "TRUSTWORTHY",
    title: "Numbers that reconcile",
    accentClass: "text-accent",
    borderClass: "border-l-accent",
    question: "“Would I bet a budget on this figure?”",
    points: [
      "Root-caused GA4 revenue defects (missing item revenue, double-fired events) instead of reporting around them",
      "Warehouse metrics cross-checked against source systems before stakeholders ever see them",
      "Pipeline DAGs, source mappings and calculation logic documented so numbers survive an audit",
    ],
  },
  {
    kicker: "SAFE",
    title: "Automation with brakes",
    accentClass: "text-accent-2",
    borderClass: "border-l-accent-2",
    question: "“What's the worst thing this could write?”",
    points: [
      "Preview-first, human-approved writes on 10,000+ monthly campaign changes",
      "SELECT-only guards, dry-run validation and byte caps on the AI agent's SQL",
      "RED/AMBER/GREEN decision trees: no bid moves without a classification trail",
    ],
  },
  {
    kicker: "UNATTENDED",
    title: "Runs at 5AM without me",
    accentClass: "text-accent-3",
    borderClass: "border-l-accent-3",
    question: "“Does it still work when I'm asleep?”",
    points: [
      "Cloud Run schedulers across two businesses, timed around regional trading waves",
      "Scheduled BigQuery queries with a documented rescheduling plan: twice-daily refresh, deliberately sequenced",
      "Execution logs and monitoring so failures announce themselves",
    ],
  },
];

const TOOLING: { group: string; blurb: string; accentClass: string; items: string[] }[] = [
  {
    group: "DATA & CLOUD",
    blurb: "The warehouse and the plumbing around it.",
    accentClass: "text-accent",
    items: ["SQL", "BigQuery", "GCP (Cloud Run · Scheduler · Storage)", "Supabase / PostgreSQL", "scheduled queries & DAG orchestration", "ETL pipelines"],
  },
  {
    group: "MARKETING ANALYTICS",
    blurb: "The channels the automation actually drives.",
    accentClass: "text-accent-2",
    items: ["Google Ads API", "GA4", "Search Console", "Merchant Center", "Matomo", "Klaviyo", "Bing Ads", "GTM & server-side tagging", "SEM / ROAS optimisation"],
  },
  {
    group: "AI / LLM ENGINEERING",
    blurb: "LLMs put to work, with guardrails.",
    accentClass: "text-accent-4",
    items: ["LangGraph", "RAG / retrieval-grounded agents", "NL→SQL", "Gemini · Claude · GPT APIs", "MCP server development", "context caching", "prompt engineering", "Claude Code · Cursor"],
  },
  {
    group: "ENGINEERING",
    blurb: "The services that carry it all.",
    accentClass: "text-accent-3",
    items: ["Python", "TypeScript", "FastAPI · Flask · Express", "Next.js / React", "Docker", "Vercel · Railway", "Git / GitHub"],
  },
  {
    group: "ML & STATISTICS",
    blurb: "The modelling underneath.",
    accentClass: "text-accent-5",
    items: ["scikit-learn", "TensorFlow / Keras", "Bayesian inference", "MCMC", "predictive modelling", "feature engineering", "Power BI (DAX)", "Looker Studio"],
  },
];

const FACTS: {
  label: string;
  accentClass: string;
  icon: React.ReactNode;
  value?: string;
  entries?: { main: string; sub: string }[];
}[] = [
  {
    label: "EDUCATION",
    accentClass: "text-accent-3",
    icon: (
      // graduation cap
      <>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
    entries: [
      {
        main: "MSc by Research, Astronomy & Astrophysics",
        sub: "University of Manchester",
      },
      {
        main: "BTech, Mechanical Engineering",
        sub: "Vellore Institute of Technology",
      },
    ],
  },
  {
    label: "FOCUS",
    accentClass: "text-accent",
    icon: (
      // target
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    value: "Analytics platforms · marketing automation · production LLM tooling",
  },
  {
    label: "DOMAINS",
    accentClass: "text-accent-2",
    icon: (
      // layers
      <>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </>
    ),
    value: "E-commerce · paid media · pricing · consulting",
  },
  {
    label: "OPEN TO",
    accentClass: "text-accent-4",
    icon: (
      // briefcase
      <>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect x="2" y="6" width="20" height="14" rx="2" />
      </>
    ),
    value: "Data Analyst · Analytics Engineer · Applied AI roles",
  },
  {
    label: "BASED IN",
    accentClass: "text-accent-5",
    icon: (
      // map pin
      <>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    value: "London, UK",
  },
];

const accentText: Record<Work["accent"], string> = {
  accent: "text-accent",
  "accent-2": "text-accent-2",
  "accent-3": "text-accent-3",
  "accent-4": "text-accent-4",
  "accent-5": "text-accent-5",
  "accent-6": "text-accent-6",
  danger: "text-danger",
};

const GITHUB_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 fill-current"
    >
      <path d={path} />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChipIcon({ icon }: { icon: StackIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3 w-3 shrink-0"
      fill={icon.color}
    >
      <path d={icon.path} />
    </svg>
  );
}

function ChipLabel({ label }: { label: string }) {
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

function SectionHeading({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="kicker font-mono text-xs font-bold text-accent">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base leading-7 text-muted">{lede}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="font-mono text-sm font-bold text-fg">
            jaswant<span className="text-accent">.jayacumaar</span>
          </a>
          <div className="flex items-center gap-5 font-mono text-xs text-muted sm:gap-7">
            <a href="#work" className="transition-colors hover:text-fg">
              work
            </a>
            <a href="#standards" className="transition-colors hover:text-fg">
              standards
            </a>
            <a href="#tooling" className="hidden transition-colors hover:text-fg sm:block">
              tooling
            </a>
            <a href="#research" className="transition-colors hover:text-fg">
              research
            </a>
            <a href="#about" className="transition-colors hover:text-fg">
              about
            </a>
            <a
              href={LINKS.email}
              className="rounded-md border border-accent/50 px-3 py-1.5 text-accent transition-colors hover:bg-accent/10"
            >
              contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-sm">
              <span
                className="dot-pulse h-2.5 w-2.5 shrink-0 rounded-full bg-accent-2"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap text-[13px] sm:text-sm">
                <span className="font-bold text-fg">Jaswant Jayacumaar</span>
                <span className="text-fg"> · Data Analyst</span>
                <span className="text-muted">
                  {" "}
                  · MSc Astronomy &amp; Astrophysics
                </span>
              </span>
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-[3.4rem]">
              I build the{" "}
              <span className="font-cursive italic text-accent">analytics</span>
              , <span className="font-cursive italic text-accent-2">
                automation
              </span>{" "}
              and <span className="font-cursive italic text-accent-4">AI</span>{" "}
              a real business runs on every day.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted">
              Full-stack analytics platforms, automated Google Ads bidding, and
              retrieval-grounded AI agents, plus the BigQuery warehouse
              underneath, for a global photo-gifting e-commerce company trading
              across 9 international markets. Once it ships, my job is keeping
              the numbers trustworthy, the automation safe, and the pipelines
              running unattended.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                See the work →
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-faint hover:text-fg"
              >
                <BrandIcon path={GITHUB_PATH} />
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-faint hover:text-fg"
              >
                <BrandIcon path={LINKEDIN_PATH} />
                LinkedIn
              </a>
              <a
                href={LINKS.email}
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-faint hover:text-fg"
              >
                <MailIcon />
                Email
              </a>
              {/* TODO: point at the CV PDF once Jaswant provides it */}
              <a
                href="#"
                className="rounded-md border border-accent-3/50 px-4 py-2.5 text-sm text-accent-3 transition-colors hover:bg-accent-3/10"
              >
                Résumé
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <HeroSim />
          </Reveal>
        </section>

        {/* Stat band */}
        <section className="pb-24">
          <Reveal>
            <StatBand />
          </Reveal>
        </section>

        {/* Work */}
        <section id="work" className="pb-28">
          <SectionHeading
            kicker="SELECTED WORK"
            title="Systems a business depends on, not demos."
            lede="Each entry says what problem it solved, what I built, and what it proves. Everything here runs in production today; the counts are real, the revenue figures deliberately absent."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {WORK.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 90}>
                <article className="group flex h-full flex-col rounded-xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-faint/60 hover:bg-panel-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-bold tracking-tight text-fg">
                      {w.title}
                    </h3>
                    <span
                      className={`shrink-0 font-mono text-[11px] font-bold ${accentText[w.accent]}`}
                    >
                      {w.domain}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{w.body}</p>
                  {w.sub && (
                    <>
                      <h4 className="mt-4 font-display text-base font-bold tracking-tight text-fg">
                        {w.sub.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {w.sub.body}
                      </p>
                    </>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        <ChipLabel label={t} />
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] leading-5 text-faint">
                    proves: <span className="text-muted">{w.proves}</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section id="standards" className="pb-28">
          <SectionHeading
            kicker="ENGINEERING STANDARDS"
            title="Three questions every system has to answer"
            lede="How I judge my own work before anyone else does. Every point below is drawn from a system in the section above."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {STANDARDS.map((s, i) => (
              <Reveal key={s.kicker} delay={i * 90}>
                <div
                  className={`flex h-full flex-col rounded-xl border border-line border-l-4 bg-panel p-6 ${s.borderClass}`}
                >
                  <p className={`kicker font-mono text-[11px] font-bold ${s.accentClass}`}>
                    {s.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm italic text-faint">{s.question}</p>
                  <ul className="mt-4 space-y-3">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="border-l-2 border-line pl-3 text-sm leading-6 text-muted"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tooling */}
        <section id="tooling" className="pb-28">
          <SectionHeading
            kicker="TOOLING"
            title="What I build with"
            lede="Grouped the way the work actually divides; every item here appears in a shipped system above."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOOLING.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 80}>
                <div className="h-full rounded-xl border border-line bg-panel p-6">
                  <p className={`kicker font-mono text-[11px] ${g.accentClass}`}>
                    {g.group}
                  </p>
                  <p className="mt-2 text-sm text-faint">{g.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        <ChipLabel label={t} />
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" className="pb-28">
          <SectionHeading
            kicker="RESEARCH"
            title="From gravitational waves to cosmic clocks"
            lede="Before dashboards and bidding systems: two research chapters, pulsar timing at Jodrell Bank and deep-learning gravitational-wave classification, where the statistical habits under everything above were formed."
          />
          <div className="mt-12 grid items-start gap-5 lg:grid-cols-2 xl:-mx-16">
            {/* Pulsar timing */}
            <Reveal>
              <article className="rounded-xl border border-line bg-panel p-6 sm:p-8">
                <p className="kicker font-mono text-[11px] font-bold">
                  <span className="text-accent-3">MSc BY RESEARCH</span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent">UNIVERSITY OF MANCHESTER</span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent-2">2021–2023</span>
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">
                  Timing pulsars with MeerKAT &amp; Jodrell Bank
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-6 text-muted">
                  <p>
                    Pulsars are rotating neutron stars whose radio beams sweep
                    past Earth with clock-like regularity, regular enough that
                    microsecond deviations carry physics. From 515 pulsars in
                    the MeerTime Thousand-Pulsar-Array programme,{" "}
                    <strong className="text-fg">
                      I produced updated timing solutions for 179 of them with
                      TEMPO2, merging data from the 76-m Lovell telescope at
                      Jodrell Bank with the 64-dish MeerKAT interferometer and
                      fitting the cross-instrument clock offsets explicitly.
                    </strong>
                  </p>
                  <p>
                    For eight pulsars I measured spin-down-rate (ν̇) variations
                    two independent ways: Bayesian Gaussian-process red-noise
                    modelling sampled with emcee MCMC (32 walkers),
                    cross-checked against fitwaves harmonic whitening, across
                    three datasets each. The methods agree for six of eight;
                    the Bayesian approach survives irregular sampling, and a
                    second telescope only helps when its data is
                    low-uncertainty.
                  </p>
                </div>
                <div className="mt-5 space-y-4">
                  <figure>
                    <div className="overflow-hidden rounded-lg border border-line">
                      <Image
                        src="/thesis/fig4-1_aitoff_sky_map_dark.png"
                        alt="Aitoff projection sky map showing the 515-pulsar Thousand-Pulsar-Array sample and the pulsars selected for timing analysis"
                        width={1560}
                        height={810}
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-2 font-mono text-[11px] leading-5 text-faint">
                      Sky coverage: the TPA sample (red ×) and the pulsars
                      selected for analysis (blue ●); thesis fig. 4.1.
                    </figcaption>
                  </figure>
                  <figure>
                    <div className="overflow-hidden rounded-lg border border-line">
                      <Image
                        src="/thesis/fig4-3_J1833-0338_nudot_dark.png"
                        alt="Timing residuals and spin-down-rate variations of PSR J1833-0338 measured with Bayesian and fitwaves analysis across JBO, MeerKAT and combined datasets"
                        width={1440}
                        height={990}
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-2 font-mono text-[11px] leading-5 text-faint">
                      PSR J1833-0338: ν̇ oscillating every ~200 days, resolved
                      consistently by both methods; combining JBO + MeerKAT
                      genuinely tightens the constraint (fig. 4.3).
                    </figcaption>
                  </figure>
                </div>
                <a
                  href="https://github.com/jaswantjayacumaar/Pulsar-Timing-MeerKAT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-mono text-xs text-accent-3 transition-opacity hover:opacity-80"
                >
                  code, data &amp; thesis on GitHub →
                </a>
              </article>
            </Reveal>
            {/* Gravitational waves */}
            <Reveal delay={120}>
              <article className="rounded-xl border border-line bg-panel p-6 sm:p-8">
                <p className="kicker font-mono text-[11px] font-bold">
                  <span className="text-accent-4">RESEARCH INTERNSHIP</span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent-5">
                    BOSE.X CENTER FOR ASTROPHYSICAL RESEARCH
                  </span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent-6">2021–2022</span>
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">
                  Classifying gravitational waves with deep learning
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-6 text-muted">
                  <p>
                    When massive objects merge, they ripple spacetime, and
                    when a galaxy sits between the merger and Earth,
                    gravitational lensing can distort the signal on its way
                    here. My work was telling the two apart:{" "}
                    <strong className="text-fg">
                      deep-learning classifiers separating lensed from
                      unlensed gravitational-wave signals in simulated
                      detector data.
                    </strong>
                  </p>
                  <p>
                    Python and TensorFlow end to end: preprocessing and
                    organising the waveform time-series data for training and
                    testing, then developing and tuning the classification
                    models; the analysis contributed to a research manuscript.
                  </p>
                </div>
                <figure className="mt-5">
                  <div className="overflow-hidden rounded-lg border border-line p-3">
                    <Image
                      src={gwStrain}
                      alt="Whitened strain time series of gravitational-wave event GW150914 in the LIGO H1 and L1 detectors"
                      className="h-auto w-full"
                    />
                    <Image
                      src={qtH1}
                      alt="Q-transform spectrogram of gravitational-wave event GW150914 in the LIGO Hanford (H1) detector"
                      className="mt-3 h-auto w-full"
                    />
                    <Image
                      src={qtL1}
                      alt="Q-transform spectrogram of gravitational-wave event GW150914 in the LIGO Livingston (L1) detector"
                      className="mt-3 h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-[11px] leading-5 text-faint">
                    the chirp of two black holes colliding: whitened strain
                    and Q-transform spectrograms of GW150914 in the LIGO
                    Hanford (H1) and Livingston (L1) detectors.
                  </figcaption>
                </figure>
                <a
                  href="https://github.com/jaswantjayacumaar/Classyfying-LensGW-DL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-mono text-xs text-accent-4 transition-opacity hover:opacity-80"
                >
                  code on GitHub →
                </a>
              </article>
            </Reveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="pb-28">
          <SectionHeading kicker="ABOUT" title="From pulsars to profit margins" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="space-y-5 text-base leading-7 text-muted">
                <p>
                  I&apos;m Jaswant, a data analyst in London with a research
                  spine: an MSc by Research in astrophysics at Manchester, where
                  I spent two years timing pulsars, producing timing solutions
                  for 179 of them and running Bayesian inference and MCMC over
                  noisy, irregularly sampled time series, where being wrong
                  quietly wasn&apos;t an option. That habit of distrusting my
                  own numbers until they reconcile is the most useful thing I
                  brought into industry.
                </p>
                <p>
                  Since then: consulting analytics at 3i Infotech (process
                  mining, SQL and Power BI for commercial teams), and now the
                  analytics stack at Printerpix, a photo-gifting e-commerce
                  company trading in 9 markets, where I own the
                  contribution-margin platform, co-built the SEM automation
                  console, and put LLMs to work where they earn their keep:
                  classification, NL→SQL, ad-copy generation, always with a
                  human gate in front of anything that writes.
                </p>
                <p>
                  The fastest way to see how I think is the work above, or
                  email me and I&apos;ll walk you through it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl className="space-y-5 rounded-xl border border-line bg-panel p-6">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <dt
                      className={`kicker flex items-center gap-2 font-mono text-[11px] ${f.accentClass}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {f.icon}
                      </svg>
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-fg">
                      {f.entries ? (
                        <div className="space-y-2.5">
                          {f.entries.map((e) => (
                            <div key={e.main}>
                              <div>{e.main}</div>
                              <div className="text-[12.5px] text-muted">
                                {e.sub}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        f.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pb-24">
          <Reveal>
            <div className="rounded-xl border border-line bg-panel px-8 py-12 text-center">
              <p className="kicker font-mono text-xs text-accent">CONTACT</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg">
                Let&apos;s talk numbers.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                Open to conversations about data analytics, analytics
                engineering and applied AI, or just to compare notes on
                making LLMs behave in production.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={LINKS.email}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  <MailIcon />
                  Email
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-faint hover:text-fg"
                >
                  <BrandIcon path={GITHUB_PATH} />
                  GitHub
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-faint hover:text-fg"
                >
                  <BrandIcon path={LINKEDIN_PATH} />
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line/70">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8 font-mono text-xs text-muted">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-fg">Jaswant Jayacumaar</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
