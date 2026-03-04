import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #10b981, #14b8a6)",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            fontFamily: "system-ui",
          }}
        >
          vibe
        </span>
      </div>
    ),
    { ...size }
  );
}
