import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/* Social preview: the name, the claim and the three cables. Uses next/og's built-in font
   (Satori cannot read the site's woff2 files, and fetching TTFs would add a download). */

export const alt = `${site.name}: ${site.claim}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
                    background: "#F0F0EC", color: "#17171A", padding: "64px 72px", position: "relative" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M 640 380 C 780 520, 900 300, 1130 300" fill="none" stroke="#0E7C7B" strokeWidth="22" strokeLinecap="round" />
          <path d="M 640 460 C 800 600, 930 390, 1130 390" fill="none" stroke="#5B3FD6" strokeWidth="22" strokeLinecap="round" />
          <path d="M 640 300 C 760 560, 960 540, 1130 480" fill="none" stroke="#D9411E" strokeWidth="22" strokeLinecap="round" />
          {[300, 380, 460].map((y) => (
            <circle key={`s${y}`} cx="640" cy={y} r="17" fill="#F0F0EC" stroke="#17171A" strokeWidth="6" />
          ))}
          {[300, 390, 480].map((y) => (
            <circle key={`t${y}`} cx="1130" cy={y} r="17" fill="#F0F0EC" stroke="#17171A" strokeWidth="6" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>Mukesh</span>
          <span>Prajapat</span>
        </div>
        <div style={{ display: "flex", fontSize: 34, lineHeight: 1.3, maxWidth: 520 }}>{site.claim}</div>
      </div>
    ),
    { ...size },
  );
}
