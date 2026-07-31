import { ImageResponse } from "next/og";
import {
  bricolage as bricolageB64,
  inter as interB64,
  jb400 as jb400B64,
  jb700 as jb700B64,
  fraunces as frauncesB64,
} from "./og-fonts-data";

const b64 = (s: string) => Buffer.from(s, "base64");

export const alt =
  "Jaswant Jayacumaar · Data Analyst · Analytics platforms & marketing automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#53d8fb";
const ACCENT2 = "#4ade9d";
const ACCENT3 = "#ffb46b";
const FG = "#e8ecf2";
const MUTED = "#96a1b1";
const FAINT = "#5f6c7e";
const LINE = "#1d2634";
const PANEL = "rgba(15,20,27,0.72)";

type Word = { t: string; c?: string; i?: boolean };

const HEAD: Word[] = [
  { t: "I" },
  { t: "build" },
  { t: "the" },
  { t: "analytics,", c: ACCENT, i: true },
  { t: "automation", c: ACCENT2, i: true },
  { t: "and" },
  { t: "AI", c: ACCENT3, i: true },
  { t: "a" },
  { t: "real" },
  { t: "business" },
  { t: "depends" },
  { t: "on." },
];

const CHIPS = ["pull", "classify", "decide", "preview", "approve", "apply"];

const LOG: Word[] = [
  { t: "› pulling hourly CM + spend from BigQuery", c: ACCENT },
  { t: "› 9 markets · 239 campaigns · ~9,000 ad groups", c: MUTED },
  { t: "› scoring 27,412 search terms against ROAS targets", c: MUTED },
];

export default function OpenGraphImage() {
  const bricolage = b64(bricolageB64);
  const inter = b64(interB64);
  const jb400 = b64(jb400B64);
  const jb700 = b64(jb700B64);
  const fraunces = b64(frauncesB64);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "54px 64px",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(1000px 520px at 12% -5%, rgba(83,216,251,0.10), transparent 60%), radial-gradient(900px 560px at 102% 105%, rgba(180,140,255,0.13), transparent 60%)",
          fontFamily: "Inter",
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "JetBrains Mono",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: FG, fontWeight: 700 }}>
            jaswant<span style={{ color: ACCENT }}>.jayacumaar</span>
          </div>
          <div style={{ display: "flex", color: FAINT }}>
            data analyst · london
          </div>
        </div>

        {/* body */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 40,
            marginTop: 6,
          }}
        >
          {/* left column */}
          <div style={{ display: "flex", flexDirection: "column", width: 648 }}>
            {/* eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 13,
                fontFamily: "JetBrains Mono",
                fontSize: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 13,
                  height: 13,
                  borderRadius: 99,
                  backgroundColor: ACCENT2,
                  marginTop: 6,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", color: FG }}>
                  <span style={{ fontWeight: 700 }}>Jaswant Jayacumaar</span>
                  <span>{" · Data Analyst"}</span>
                </div>
                <div style={{ display: "flex", color: MUTED, marginTop: 5 }}>
                  MSc Astronomy &amp; Astrophysics
                </div>
              </div>
            </div>

            {/* headline */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                columnGap: 15,
                rowGap: 4,
                marginTop: 24,
                maxWidth: 648,
                letterSpacing: -1,
              }}
            >
              {HEAD.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    fontFamily: w.i ? "Fraunces" : "Bricolage",
                    fontStyle: w.i ? "italic" : "normal",
                    fontWeight: w.i ? 400 : 700,
                    fontSize: 62,
                    lineHeight: 1.04,
                    color: w.c || FG,
                  }}
                >
                  {w.t}
                </div>
              ))}
            </div>

            {/* subtitle */}
            <div
              style={{
                display: "flex",
                color: MUTED,
                fontSize: 23,
                marginTop: 24,
                maxWidth: 600,
                lineHeight: 1.4,
              }}
            >
              Full-stack analytics platforms, automated Google Ads bidding &amp;
              retrieval-grounded AI — across 9 international markets.
            </div>
          </div>

          {/* right column: terminal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              borderRadius: 16,
              border: `1px solid ${LINE}`,
              backgroundColor: PANEL,
              padding: 24,
              fontFamily: "JetBrains Mono",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 15,
              }}
            >
              <span style={{ color: MUTED }}>sem-console · bidding run 71</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: ACCENT2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 9,
                    height: 9,
                    borderRadius: 99,
                    backgroundColor: ACCENT2,
                  }}
                />
                idle
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 18,
              }}
            >
              {CHIPS.map((c, i) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: `1px solid ${i === 1 ? ACCENT : LINE}`,
                    color: i === 1 ? ACCENT : MUTED,
                    fontSize: 16,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 13,
                marginTop: 22,
                fontSize: 17,
              }}
            >
              {LOG.map((l, i) => (
                <div key={i} style={{ display: "flex", color: l.c }}>
                  {l.t}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                color: FAINT,
                fontSize: 14,
                marginTop: 26,
              }}
            >
              # simulated · preview-first, human-approved writes
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jb400, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jb700, weight: 700, style: "normal" },
        { name: "Fraunces", data: fraunces, weight: 400, style: "italic" },
      ],
    },
  );
}
