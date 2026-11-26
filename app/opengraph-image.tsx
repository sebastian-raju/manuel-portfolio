import { ImageResponse } from "next/og";
import { site } from "@/content";

// The preview card shown when the site is shared on LinkedIn, WhatsApp, X, etc.
export const alt = `${site.firstName} ${site.lastName}: Data Science & Sport`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "radial-gradient(120% 80% at 50% 120%, #5a1414 0%, #000 60%)",
          color: "#f4f1ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 2, color: "#8a8a8a" }}>
          <span>{`${site.firstName.toUpperCase()}—`}</span>
          <span style={{ background: "#f44849", color: "#fff", padding: "4px 10px", borderRadius: 4 }}>{"DATA SCIENCE & SPORT"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -5 }}>
            {`${site.firstName} ${site.lastName}`}
          </div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#b5b5b5", maxWidth: 900, lineHeight: 1.3 }}>
            MSc Data Science and Sport, Newcastle University. Applied sports data and performance analysis.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#757575" }}>{site.url.replace("https://", "")}</div>
      </div>
    ),
    size,
  );
}
