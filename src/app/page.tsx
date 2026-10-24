import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import Reveal from "@/components/Reveal";
import SpotCard from "@/components/SpotCard";
import StatBand from "@/components/StatBand";
import ThemeToggle from "@/components/ThemeToggle";
import WorkGrid from "@/components/WorkGrid";
import { ChipLabel, brandColor, type Work } from "@/components/work-cards";
import gwStrain from "../../public/research/gw-strain.png";
import qtH1 from "../../public/research/qtransform-h1.png";
import qtL1 from "../../public/research/qtransform-l1.png";

const LINKS = {
  github: "https://github.com/jaswantjayacumaar",
  linkedin: "https://linkedin.com/in/jaswantjayacumaar",
  email: "mailto:jaswj6@gmail.com",
};

const NAV = [
  { href: "#work", label: "work" },
  { href: "#standards", label: "standards" },
  { href: "#tooling", label: "tooling" },
  { href: "#research", label: "research" },
  { href: "#about", label: "about" },
];

const WORK: Work[] = [
  {
    id: "bidding-agent",
    title: "Autonomous bidding agent and approval dashboard",
    domain: "agentic AI",
    accent: "accent-2",
    flow: "sem",
    summary: "An agent that reviews every campaign overnight across 17 Google Ads accounts, argues each case through a chain of LLM roles, and hands its proposals to a human for approval before anything is written.",
    body: "Bidding across 17 Google Ads accounts in 9 markets was a nightly manual job. I designed and built an agent that does the night shift: statistical change detection flags what moved in every Search, Shopping, Broad and PMax campaign, then a chain of LLM roles (decider, blind critic, arbiter, evidence check) argues each case to a verdict, proposing bid, budget, negative-keyword and search-term moves. Proposals land in the Agent Decisions dashboard inside the CM Report, where a human approves before anything is written to Google Ads, with rollback and a full audit trail on every change.",
    sub: {
      title: "The judging chain",
      body: "Calibrated z-score gates (back-tested against 232 historical target changes) decide what is worth judging. The decider proposes, a blind critic attacks it without seeing the proposal's reasoning, the arbiter rules, and an evidence check enforces that every verdict points the direction its own numbers support. A nightly outcomes loop scores every decision against settled results, so the rules improve from what actually happened.",
    },
    stack: ["Python", "LangGraph", "BigQuery", "Google Ads API", "Next.js"],
    approaches: ["change detection", "multi-model judging", "human-in-the-loop", "outcomes loop"],
    proves: "production agentic AI that moves real budgets, with a human on the brake",
  },
  {
    id: "cm-platform",
    title: "Contribution Margin reporting platform",
    domain: "e-commerce analytics",
    accent: "accent",
    flow: "cm",
    summary: "Replaced lagging, patchwork profitability dashboards with a full-stack CM platform I built and own: 11 live analytical pages across 9 markets, and the place where the bidding agent's proposals get approved.",
    body: "Profitability decisions ran on lagging, patchwork dashboards. I built and own the company's CM reporting platform: a full-stack web app (Next.js/TypeScript, Express, BigQuery, Supabase; deployed on Vercel/Railway) replacing legacy Looker Studio with 11 pages of live daily and hourly profitability, marketing-cost, SEM, auction-insight and conversion-maturation analytics across 9 international markets (USA, UK, FR, IT, ES, DE, NL, AE, IN), refreshed by scheduled queries timed around US trading waves. It is also where the bidding agent's proposals are reviewed and approved.",
    stack: ["Next.js", "TypeScript", "Express", "BigQuery", "Supabase", "Vercel / Railway"],
    approaches: [],
    proves: "end-to-end platform ownership: warehouse → API → UI → adoption",
  },
  {
    id: "cm-prediction",
    title: "Same-day CM prediction",
    domain: "predictive analytics",
    accent: "accent-4",
    flow: "predict",
    summary: "Forecasts today's contribution margin from still-maturing Day-1 data, typically within 5-7% of what eventually settles, and publishes its own error rate.",
    body: "Day-1 Google Ads data is a lie: conversions keep arriving for weeks and tracking loses a share of them. I measured both effects as curves (conversion maturation by campaign age, tracking loss by channel) and built a system that runs today's immature numbers through them to forecast where contribution margin will settle, per campaign and ad group, across Search, Shopping and PMax. Nightly BigQuery materialisers keep it current, a validation view tracks predicted against settled CM (typically within 5-7%), and one query rewrite cut the filter scans from 51.5 GB to 1.2 MB, 41,000x cheaper.",
    stack: ["Python", "BigQuery", "Next.js"],
    approaches: ["maturation curves", "tracking-loss factors", "nightly materialisation", "validation loop"],
    proves: "modelling that is checked against reality every night, not once at launch",
  },
  {
    id: "warehouse-migration",
    title: "Warehouse migration: MS SQL Server to PostgreSQL",
    domain: "data engineering",
    accent: "accent-3",
    flow: "migration",
    summary: "Moved the CM Report's entire ingestion layer from MS SQL Server to PostgreSQL and BigQuery: 29 pipelines, reconciliation-gated, one clean rollback, no silent breaks left behind.",
    body: "The company moved its data warehouse from MS SQL Server to PostgreSQL, and every feed under the CM Report had to move with it. I audited the legacy cron feeds first and found three defects that had gone unnoticed for months, one of them overstating contribution margin. Then the rebuild: a PostgreSQL-to-BigQuery sync pipeline, order history backfilled to 2018 (6.6M+ rows) under BigQuery load quotas with a metered backfill driver, and 29 scheduled queries repointed through a phased cutover gated on reconciliation. One gate failed on day one; the rollback ran clean, the fix shipped, the re-attempt matched the source to the decimal. Health-check queries and alerting now watch the whole chain.",
    stack: ["PostgreSQL", "BigQuery", "Python", "Cloud Scheduler"],
    approaches: ["forensic audit", "reconciliation gates", "metered backfill", "rollback discipline"],
    proves: "migration discipline: reconcile first, cut over second, roll back without drama",
  },
  {
    id: "pricing-pipeline",
    title: "Pricing intelligence pipeline",
    domain: "pricing",
    accent: "accent-6",
    flow: "price",
    summary: "Inherited and now run the agentic competitor-price scraper, daily BigQuery pricing pipelines and Monte Carlo price model across 9 markets.",
    body: "Took ownership of the company's pricing-intelligence platform and run it day-to-day: agentic competitor-price scraping across 9 markets (US, UK, Germany, France, Italy, Spain, Netherlands, UAE and India), automated BigQuery pricing pipelines with daily orchestration, Monte Carlo simulation for price-scenario modelling, and the decision dashboard that feeds pricing calls, extending it alongside the rest of the analytics stack.",
    stack: ["Python", "BigQuery pipelines"],
    approaches: ["agentic scraping", "daily orchestration", "Monte Carlo simulation", "pricing analytics"],
    proves: "production ops: inheriting, hardening and extending a live pipeline",
  },
  {
    id: "monitoring-agents",
    title: "Monitoring agents fleet",
    domain: "AI operations",
    accent: "accent-5",
    summary: "Scheduled AI agents that audit accounts, track auction position and mine search terms every night, whose reports drove a seven-market cleanup of 100,000+ conflicting negative keywords.",
    body: "A fleet of scheduled AI agents keeps watch over the paid-media estate: nightly account audits, auction-position tracking against competitors, search-term mining, feed and landing-page checks, each on the cheapest model that does the job. Their reports drove a seven-market account-hygiene overhaul that cleared 100,000+ conflicting negative keywords, every change registered and reversible.",
    stack: ["Claude", "Gemini", "Google Ads API", "BigQuery"],
    approaches: ["scheduled agents", "tiered models", "report-only by default"],
    proves: "AI that watches so people don't have to, and never acts without a record",
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
      "Three legacy data defects root-caused during the warehouse migration instead of migrated along; one had been overstating margin for months",
      "Warehouse cutover gated on reconciliation: the Day-1 exit test failed once, so it was fully rolled back and re-run until every destination matched the source to the decimal",
      "The prediction system publishes its own error rate: predicted CM is checked against settled CM every night",
    ],
  },
  {
    kicker: "SAFE",
    title: "Automation with brakes",
    accentClass: "text-accent-2",
    borderClass: "border-l-accent-2",
    question: "“What's the worst thing this could write?”",
    points: [
      "A human approval gate in front of every agent proposal: 10,000+ approved changes a month, nothing written without a yes",
      "A blind critic and an arbiter argue each proposal before a person ever sees it, and an evidence check enforces that the verdict matches its own numbers",
      "Rollback and a full audit trail on every change the agent writes to Google Ads",
    ],
  },
  {
    kicker: "UNATTENDED",
    title: "Runs at 5AM without me",
    accentClass: "text-accent-3",
    borderClass: "border-l-accent-3",
    question: "“Does it still work when I'm asleep?”",
    points: [
      "The agent works the night shift across 9 markets under a cost cap, waits out rate limits and resumes where it stopped",
      "A nightly outcomes loop scores every agent decision against settled results, so the rules improve without anyone retuning them by hand",
      "HealthGuard alerting on the migrated warehouse: a dead cost feed is emailed the same day, not discovered months later in an overstated margin",
    ],
  },
];

const TOOLING: { group: string; blurb: string; accentClass: string; items: string[] }[] = [
  {
    group: "PROGRAMMING",
    blurb: "The languages everything above is written in.",
    accentClass: "text-accent",
    items: ["Python", "SQL", "TypeScript", "scikit-learn", "TensorFlow", "LightGBM"],
  },
  {
    group: "DATA ENGINEERING & CLOUD",
    blurb: "The warehouse and the plumbing around it.",
    accentClass: "text-accent-3",
    items: ["BigQuery", "scheduled queries & DAG orchestration", "BigQuery cost optimisation", "GCP (Cloud Run · Scheduler · Storage)", "PostgreSQL", "Supabase (RLS · RBAC)", "ETL pipelines", "warehouse migration & reconciliation", "data-quality monitoring & alerting"],
  },
  {
    group: "AI & AGENTIC SYSTEMS",
    blurb: "LLMs put to work, with guardrails.",
    accentClass: "text-accent-4",
    items: ["LangGraph multi-agent pipelines", "LLM judging chains (critic · arbiter)", "human-in-the-loop approval design", "RAG", "LLM evaluation & back-testing", "Gemini · Claude · GPT APIs", "MCP-accelerated workflows", "Claude Code · Cursor"],
  },
  {
    group: "STATISTICS & ML",
    blurb: "The modelling underneath.",
    accentClass: "text-accent-5",
    items: ["Bayesian inference", "MCMC", "statistical change detection (z-score gating)", "conversion-maturation & time-series modelling", "regression", "Monte Carlo simulation", "predictive modelling", "back-testing & validation"],
  },
  {
    group: "MARKETING ANALYTICS",
    blurb: "The channels the automation actually drives.",
    accentClass: "text-accent-2",
    items: ["Google Ads API & auction insights", "Bing Ads API", "GA4", "Search Console", "Merchant Center", "GTM & server-side tagging", "SEM bid automation", "ROAS / CM optimisation", "competitor-price intelligence"],
  },
  {
    group: "WEB, BI & DELIVERY",
    blurb: "The services that carry it all.",
    accentClass: "text-accent-6",
    items: ["Next.js / React", "FastAPI · Flask · Express", "Docker", "Vercel · Railway", "Power BI (DAX)", "Looker Studio", "Git / GitHub", "pytest / TDD"],
  },
];

const FACTS: {
  label: string;
  accentClass: string;
  icon: React.ReactNode;
  value?: string;
  entries?: { main: string; field: string; institution: string }[];
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
        main: "Master of Science by Research (MSc)",
        field: "Astronomy & Astrophysics",
        institution: "University of Manchester",
      },
      {
        main: "Bachelor of Technology (BTech)",
        field: "Mechanical Engineering",
        institution: "Vellore Institute of Technology",
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
    value: "Analytics platforms · Agentic AI · Production data systems",
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
    value: "E-commerce · Marketing analytics · Pricing · Consulting",
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
    value: "Data Analyst · Applied AI · Analytics Engineer roles",
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
      {lede && <p className="mt-4 text-lg leading-8 text-muted">{lede}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between py-3.5">
            <a href="#top" className="font-mono text-sm font-bold text-fg">
              jaswant<span className="text-accent">.jayacumaar</span>
            </a>
            <div className="flex items-center gap-4 font-mono text-xs text-muted sm:gap-6 md:gap-7">
              <div className="hidden items-center gap-5 md:flex lg:gap-7">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="transition-colors hover:text-fg"
                  >
                    {n.label}
                  </a>
                ))}
              </div>
              <a
                href={LINKS.email}
                className="rounded-md border border-accent/50 px-3 py-1.5 text-accent transition-colors hover:bg-accent/10"
              >
                contact
              </a>
              <ThemeToggle />
              <MobileNav items={NAV} />
            </div>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="pb-16 pt-32 lg:pb-24 lg:pt-40">
          <Reveal className="max-w-4xl">
            <p className="flex items-start gap-2.5 font-mono text-sm sm:items-center">
              <span
                className="relative mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center sm:mt-0"
                aria-hidden="true"
              >
                <span className="absolute h-full w-full rounded-full bg-accent-2/25" />
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent-2/60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-accent-2" />
              </span>
              <span className="text-[13px] sm:text-sm">
                <span className="font-bold text-fg">Jaswant Jayacumaar</span>
                <span className="text-fg"> · Data Analyst · London</span>
                <span className="block whitespace-nowrap text-muted">
                  MSc Astronomy &amp; Astrophysics
                </span>
              </span>
            </p>
            <h1 className="mt-5 font-cursive text-[2.6rem] font-medium leading-[1.08] tracking-tight text-fg sm:text-6xl lg:text-[3.8rem]">
              I build the{" "}
              <span className="italic text-accent">analytics</span>,{" "}
              <span className="italic text-accent-2">automation</span> and{" "}
              <span className="italic text-accent-3">AI</span> a real business
              depends on.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Full-stack analytics platforms, an autonomous bidding agent
              with human approval, same-day profit prediction, and the
              BigQuery warehouse underneath (and its migration), for a global
              photo-gifting e-commerce company trading across 9 international
              markets. Once it ships, my job is keeping
              the numbers{" "}
              <strong className="font-bold text-fg">trustworthy</strong>, the{" "}
              <strong className="font-bold text-fg">automation safe</strong>,
              and the{" "}
              <strong className="font-bold text-fg">
                pipelines running unattended
              </strong>
              .
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
                href="/cv/CV_Jaswant_Jayacumaar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-accent-3/50 px-4 py-2.5 text-sm text-accent-3 transition-colors hover:bg-accent-3/10"
              >
                Résumé
              </a>
            </div>
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
            lede="Each entry says what problem it solved, what I built, and what it proves; open one to see the system run. Everything here is in production today; the counts are real, the revenue figures deliberately absent."
          />
          <div className="mt-12">
            <WorkGrid items={WORK} />
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
                <SpotCard
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
                </SpotCard>
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
                <SpotCard className="h-full rounded-xl border border-line bg-panel p-6">
                  <p className={`kicker font-mono text-[13px] font-bold ${g.accentClass}`}>
                    {g.group}
                  </p>
                  <p className="mt-2 text-sm text-faint">{g.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((t) => {
                      const c = brandColor(t);
                      return (
                        <span
                          key={t}
                          style={c ? { borderColor: `${c}80` } : undefined}
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-2 py-1 font-mono text-[11px] text-muted"
                        >
                          <ChipLabel label={t} />
                        </span>
                      );
                    })}
                  </div>
                </SpotCard>
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
          <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
            {/* Pulsar timing */}
            <Reveal>
              <SpotCard
                as="article"
                className="rounded-xl border border-line bg-panel p-6 sm:p-8"
              >
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
                      I&nbsp;produced updated timing solutions for 179 of them with
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
                    <div className="figure-dark overflow-hidden rounded-lg border border-line">
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
                    <div className="figure-dark overflow-hidden rounded-lg border border-line">
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
              </SpotCard>
            </Reveal>
            {/* Gravitational waves */}
            <Reveal delay={120}>
              <SpotCard
                as="article"
                className="rounded-xl border border-line bg-panel p-6 sm:p-8"
              >
                <p className="kicker font-mono text-[11px] font-bold">
                  <span className="text-accent-4">RESEARCH INTERNSHIP</span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent-5">
                    BOSE.X CENTER FOR ASTROPHYSICAL RESEARCH
                  </span>
                  <span className="text-faint"> · </span>
                  <span className="text-accent-6">2020–2021</span>
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
                  <div className="figure-dark overflow-hidden rounded-lg border border-line p-3">
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
                  className="mt-5 inline-block font-mono text-xs text-accent-3 transition-opacity hover:opacity-80"
                >
                  code on GitHub →
                </a>
              </SpotCard>
            </Reveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="pb-28">
          <SectionHeading kicker="ABOUT" title="From pulsars to profit margins" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="space-y-5 text-lg leading-8 text-muted">
                <p>
                  I&apos;m Jaswant, a data analyst in London, originally from
                  Chennai, with a research spine: an MSc by Research in
                  astrophysics at Manchester, where
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
                  company trading in 9 markets (USA, UK, FR, IT, ES, DE, NL, AE,
                  IN), where I own the
                  contribution-margin platform and the warehouse under it
                  (including its migration from MS SQL Server to PostgreSQL),
                  built the autonomous bidding agent that proposes its Google
                  Ads changes, and the same-day profit prediction behind
                  them, always with a human gate in front of anything that
                  writes.
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
                              <div className="text-[12.5px]">
                                <span className="font-semibold text-fg">
                                  {e.field}
                                </span>
                                <span className="text-muted">
                                  {" "}
                                  · {e.institution}
                                </span>
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
