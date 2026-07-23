import { ImageResponse } from "next/og";

export const alt = "Gustavo Rodrigues - Desenvolvedor Full Stack";
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
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.25), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 10,
            color: "#06b6d4",
            fontFamily: "monospace",
          }}
        >
          FULL STACK DEVELOPER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            marginTop: 20,
          }}
        >
          Gustavo Rodrigues
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#a0a0a0",
            marginTop: 24,
            maxWidth: 920,
          }}
        >
          Arquiteturas escalaveis · React · Next.js · Node.js · Mobile
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 6,
            width: 180,
            background: "#06b6d4",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
