import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Groovy Builds bathroom remodel with a freestanding tub and custom tile.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const heroImage = new URL("/portfolio/6.jpg", "https://groovybuilds.com").toString();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#090806",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img
          src={heroImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.58) 44%, rgba(0,0,0,0.08) 100%)",
          }}
        />
        <img
          src={heroImage}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            right: 70,
            width: 420,
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 700,
            paddingLeft: 72,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 30,
            }}
          >
            Groovy Builds
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35 }}>Design + Build</div>
          <div style={{ fontSize: 34, lineHeight: 1.35 }}>
            Construction + Remodeling
          </div>
          <div
            style={{
              marginTop: 38,
              fontSize: 24,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            East Nashville • Bathrooms • Kitchens • Additions
          </div>
        </div>
      </div>
    ),
    size,
  );
}
