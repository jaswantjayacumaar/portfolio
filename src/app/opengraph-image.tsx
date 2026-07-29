import { ImageResponse } from "next/og";

export const alt =
  "Jaswant Jayacumaar — Data Analyst · Analytics platforms & marketing automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#53d8fb";
const MUTED = "#96a1b1";
const FAINT = "#5f6c7e";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #0a0d12 0%, #0d1219 55%, #101a24 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: FAINT,
          }}
        >
          <span style={{ color: "#e8ecf2" }}>
            jaswant<span style={{ color: ACCENT }}>.jayacumaar</span>
          </span>
          <span>data analyst · london</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#e8ecf2",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              maxWidth: 980,
            }}
          >
            I build the analytics and automation a real business runs on every
            day.
          </div>
          <div style={{ fontSize: 30, color: MUTED, maxWidth: 900 }}>
            Analytics platforms · Google Ads automation · production LLM
            tooling — across 9 international markets
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["BigQuery", "Google Ads API", "LangGraph", "Next.js", "Python"].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 10,
                  border: "1px solid #1d2634",
                  backgroundColor: "#0f141b",
                  color: MUTED,
                  fontSize: 24,
                }}
              >
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
