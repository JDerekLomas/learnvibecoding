import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Learn Vibe Coding — Build with AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0f0f0 0%, #e7e5e4 100%)",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 24,
            border: "4px solid #1c1917",
            boxShadow: "8px 8px 0 #1c1917",
            padding: "60px 80px",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #10b981, #14b8a6)",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
              padding: "8px 20px",
              borderRadius: 100,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Learn Vibe Coding
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#1c1917",
              textAlign: "center",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Build with AI
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#78716c",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            From first conversation to shipped product. No prerequisites.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
