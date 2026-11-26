import { ImageResponse } from "next/og";

export const alt = "DJ Domza – DJ za vjenčanja i evente, Zagreb";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0F15",
          backgroundImage:
            "radial-gradient(circle at 50% 120%, rgba(37, 99, 235, 0.45) 0%, rgba(37, 99, 235, 0) 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 8,
            borderRadius: 4,
            background: "#2563EB",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          DJ Domza
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 44,
            color: "#93B4F5",
          }}
        >
          DJ za vjenčanja i evente – Zagreb
        </div>
      </div>
    ),
    { ...size }
  );
}
