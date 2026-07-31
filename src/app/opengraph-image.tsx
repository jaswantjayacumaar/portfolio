import { ImageResponse } from "next/og";
import {
  inter as interB64,
  jb400 as jb400B64,
  jb700 as jb700B64,
  frauncesRoman as frauncesRomanB64,
  frauncesItalic as frauncesItalicB64,
} from "./og-fonts-data";

const b64 = (s: string) => Buffer.from(s, "base64");

export const alt =
  "Jaswant Jayacumaar · Data Analyst · Analytics platforms & automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#53d8fb";
const ACCENT2 = "#4ade9d";
const ACCENT3 = "#ffb46b";
const FG = "#e8ecf2";
const MUTED = "#96a1b1";
const FAINT = "#5f6c7e";
const LINE = "#1d2634";

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

export default function OpenGraphImage() {
  const inter = b64(interB64);
  const jb400 = b64(jb400B64);
  const jb700 = b64(jb700B64);
  const frauncesRoman = b64(frauncesRomanB64);
  const frauncesItalic = b64(frauncesItalicB64);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 68px",
          justifyContent: "space-between",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(1100px 560px at 18% -10%, rgba(83,216,251,0.10), transparent 60%), radial-gradient(1000px 620px at 105% 115%, rgba(180,140,255,0.14), transparent 60%)",
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
            flexDirection: "column",
          }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              fontFamily: "JetBrains Mono",
              fontSize: 23,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 99,
                backgroundColor: ACCENT2,
                marginTop: 7,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", color: FG }}>
                <span style={{ fontWeight: 700 }}>Jaswant Jayacumaar</span>
                <span style={{ marginLeft: 9 }}>· Data Analyst</span>
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
              columnGap: 18,
              rowGap: 2,
              marginTop: 26,
              maxWidth: 1040,
              letterSpacing: -1,
            }}
          >
            {HEAD.map((w, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  fontFamily: "Fraunces",
                  fontStyle: w.i ? "italic" : "normal",
                  fontWeight: 500,
                  fontSize: 64,
                  lineHeight: 1.08,
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
              fontSize: 25,
              marginTop: 28,
              maxWidth: 720,
              lineHeight: 1.45,
            }}
          >
            Full-stack analytics platforms, automated Google Ads bidding &amp;
            retrieval-grounded AI — across 9 international markets.
          </div>
        </div>

        {/* buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: ACCENT,
              color: "#0a0d12",
              fontSize: 22,
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: 10,
            }}
          >
            See the work →
          </div>
          {["GitHub", "LinkedIn", "Résumé"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: `1px solid ${i === 2 ? "rgba(255,180,107,0.5)" : LINE}`,
                color: i === 2 ? ACCENT3 : MUTED,
                fontSize: 22,
                padding: "12px 22px",
                borderRadius: 10,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jb400, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jb700, weight: 700, style: "normal" },
        { name: "Fraunces", data: frauncesRoman, weight: 500, style: "normal" },
        { name: "Fraunces", data: frauncesItalic, weight: 500, style: "italic" },
      ],
    },
  );
}
