import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlipAcademy DK — Lær at tjene penge på tøjflipping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            marginBottom: 40,
            fontSize: 72,
            fontWeight: 700,
            color: "white",
          }}
        >
          F
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          FlipAcademy DK
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a78bfa",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Lær at tjene penge på tøjflipping
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>100</div>
            <div style={{ fontSize: 16, color: "#888" }}>Moduler</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>399 DKK</div>
            <div style={{ fontSize: 16, color: "#888" }}>Lifetime</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>Discord</div>
            <div style={{ fontSize: 16, color: "#888" }}>Fællesskab</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
