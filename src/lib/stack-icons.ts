import {
  siClaude,
  siCursor,
  siDocker,
  siExpress,
  siFastapi,
  siFlask,
  siGit,
  siGithub,
  siGoogleads,
  siGoogleanalytics,
  siGooglebigquery,
  siGooglecloud,
  siGooglegemini,
  siGooglesearchconsole,
  siGoogletagmanager,
  siKeras,
  siLanggraph,
  siLooker,
  siMatomo,
  siModelcontextprotocol,
  siNextdotjs,
  siNginx,
  siPostgresql,
  siPython,
  siReact,
  siRailway,
  siScikitlearn,
  siSupabase,
  siTensorflow,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

export type StackIcon = { path: string; color: string; title: string };

/** Brand marks that are near-black follow the chip's text colour
 *  (currentColor) so they stay visible on both themes. */
function iconOf(si: SimpleIcon): StackIcon {
  const r = parseInt(si.hex.slice(0, 2), 16) / 255;
  const g = parseInt(si.hex.slice(2, 4), 16) / 255;
  const b = parseInt(si.hex.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return {
    path: si.path,
    color: luminance < 0.18 ? "currentColor" : `#${si.hex}`,
    title: si.title,
  };
}

/** Keyed by the exact chip label used in the TOOLING data. */
export const STACK_ICONS: Record<string, StackIcon[]> = {
  BigQuery: [iconOf(siGooglebigquery)],
  "GCP (Cloud Run · Scheduler · Storage)": [iconOf(siGooglecloud)],
  PostgreSQL: [iconOf(siPostgresql)],
  "Google Ads API": [iconOf(siGoogleads)],
  GA4: [iconOf(siGoogleanalytics)],
  "Search Console": [iconOf(siGooglesearchconsole)],
  Matomo: [iconOf(siMatomo)],
  "GTM & server-side tagging": [iconOf(siGoogletagmanager)],
  LangGraph: [iconOf(siLanggraph)],
  "Gemini · Claude · GPT APIs": [iconOf(siGooglegemini), iconOf(siClaude)],
  "MCP server development": [iconOf(siModelcontextprotocol)],
  "Claude Code · Cursor": [iconOf(siClaude), iconOf(siCursor)],
  Python: [iconOf(siPython)],
  TypeScript: [iconOf(siTypescript)],
  "FastAPI · Flask · Express": [iconOf(siFastapi), iconOf(siFlask), iconOf(siExpress)],
  "Next.js / React": [iconOf(siNextdotjs), iconOf(siReact)],
  Docker: [iconOf(siDocker)],
  "Vercel · Railway": [iconOf(siVercel), iconOf(siRailway)],
  "Git / GitHub": [iconOf(siGit), iconOf(siGithub)],
  "scikit-learn": [iconOf(siScikitlearn)],
  "TensorFlow / Keras": [iconOf(siTensorflow), iconOf(siKeras)],
  "Looker Studio": [iconOf(siLooker)],
  // Work-card tag labels
  "Next.js": [iconOf(siNextdotjs)],
  Express: [iconOf(siExpress)],
  Supabase: [iconOf(siSupabase)],
  "Vercel / Railway": [iconOf(siVercel), iconOf(siRailway)],
  "Python / Flask": [iconOf(siPython), iconOf(siFlask)],
  "Cloud Run": [iconOf(siGooglecloud)],
  FastAPI: [iconOf(siFastapi)],
  Gemini: [iconOf(siGooglegemini)],
  GTM: [iconOf(siGoogletagmanager)],
  Nginx: [iconOf(siNginx)],
  "BigQuery pipelines": [iconOf(siGooglebigquery)],
  "Python - Automation": [iconOf(siPython)],
  // Non-brand concepts: generic marks that follow the chip text colour.
  "decision trees": [
    {
      // Material Symbols "account_tree" (Apache 2.0)
      path: "M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z",
      color: "currentColor",
      title: "Decision trees",
    },
  ],
  "two-pass LLM classifier": [iconOf(siGooglegemini)],
  TEMPO2: [],
};

export type ChipPart = { text: string; icon?: StackIcon };

/** Multi-brand chip labels broken into (icon, name) pairs so each logo sits
 *  next to its own name, joined by the label's own separator. Labels not
 *  listed here fall back to STACK_ICONS (single icon + full label). */
export const STACK_PARTS: Record<string, { sep: string; parts: ChipPart[] }> = {
  "Gemini · Claude · GPT APIs": {
    sep: "·",
    parts: [
      { text: "Gemini", icon: iconOf(siGooglegemini) },
      { text: "Claude", icon: iconOf(siClaude) },
      { text: "GPT APIs" },
    ],
  },
  "Claude Code · Cursor": {
    sep: "·",
    parts: [
      { text: "Claude Code", icon: iconOf(siClaude) },
      { text: "Cursor", icon: iconOf(siCursor) },
    ],
  },
  "FastAPI · Flask · Express": {
    sep: "·",
    parts: [
      { text: "FastAPI", icon: iconOf(siFastapi) },
      { text: "Flask", icon: iconOf(siFlask) },
      { text: "Express", icon: iconOf(siExpress) },
    ],
  },
  "Next.js / React": {
    sep: "/",
    parts: [
      { text: "Next.js", icon: iconOf(siNextdotjs) },
      { text: "React", icon: iconOf(siReact) },
    ],
  },
  "Vercel · Railway": {
    sep: "·",
    parts: [
      { text: "Vercel", icon: iconOf(siVercel) },
      { text: "Railway", icon: iconOf(siRailway) },
    ],
  },
  "Vercel / Railway": {
    sep: "/",
    parts: [
      { text: "Vercel", icon: iconOf(siVercel) },
      { text: "Railway", icon: iconOf(siRailway) },
    ],
  },
  "Git / GitHub": {
    sep: "/",
    parts: [
      { text: "Git", icon: iconOf(siGit) },
      { text: "GitHub", icon: iconOf(siGithub) },
    ],
  },
  "TensorFlow / Keras": {
    sep: "/",
    parts: [
      { text: "TensorFlow", icon: iconOf(siTensorflow) },
      { text: "Keras", icon: iconOf(siKeras) },
    ],
  },
  "Python / Flask": {
    sep: "/",
    parts: [
      { text: "Python", icon: iconOf(siPython) },
      { text: "Flask", icon: iconOf(siFlask) },
    ],
  },
};
