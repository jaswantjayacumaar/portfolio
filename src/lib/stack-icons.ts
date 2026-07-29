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

/** Brand marks that are near-black get a light fill so they stay visible
 *  on the dark theme. */
function iconOf(si: SimpleIcon): StackIcon {
  const r = parseInt(si.hex.slice(0, 2), 16) / 255;
  const g = parseInt(si.hex.slice(2, 4), 16) / 255;
  const b = parseInt(si.hex.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return {
    path: si.path,
    color: luminance < 0.18 ? "#c8d2de" : `#${si.hex}`,
    title: si.title,
  };
}

/** Keyed by the exact chip label used in the TOOLING data. */
export const STACK_ICONS: Record<string, StackIcon[]> = {
  BigQuery: [iconOf(siGooglebigquery)],
  "GCP (Cloud Run · Scheduler · Storage)": [iconOf(siGooglecloud)],
  "Supabase / PostgreSQL": [iconOf(siSupabase), iconOf(siPostgresql)],
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
};
