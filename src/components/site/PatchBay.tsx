"use client";

/* The signature: cables plug each source into its target (docs/DESIGN.md, "PatchBay").
   The words are server-rendered and read as "source: target" without JavaScript or CSS;
   the cables are drawn into an aria-hidden SVG after layout and redrawn on resize. */

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type PatchPair = { source: string; target: string; gloss?: string };

type Props = {
  label: string;
  headings: [string, string];
  pairs: PatchPair[];
  /* Visual row of each pair's target on wide screens (0-based). Pairs are real, so cables may cross. */
  targetRows: number[];
};

const SVG_NS = "http://www.w3.org/2000/svg";

function centre(el: Element, box: DOMRect): [number, number] {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
}

export function PatchBay({ label, headings, pairs, targetRows }: Props) {
  const bayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    const bay = bayRef.current;
    const svg = svgRef.current;
    if (!bay || !svg) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let first = true;

    const draw = () => {
      svg.replaceChildren();
      const box = bay.getBoundingClientRect();
      const narrow = box.width < 600;
      const w = narrow ? 9 : Math.max(10, Math.min(18, box.width / 80));
      pairs.forEach((_, i) => {
        const from = bay.querySelector(`[data-jack="src-${i}"]`);
        const to = bay.querySelector(`[data-jack="tgt-${i}"]`);
        if (!from || !to) return;
        const [x1, y1] = centre(from, box);
        const [x2, y2] = centre(to, box);
        const dx = x2 - x1;
        const dy = y2 - y1;
        const sag = 70 + Math.abs(dy) * 0.25; /* cables hang under their own weight */
        const d = narrow
          ? `M ${x1} ${y1} C ${x1 + 40} ${y1 + dy * 0.9}, ${x2 - 40} ${y2 - dy * 0.1 + 30}, ${x2} ${y2}`
          : `M ${x1} ${y1} C ${x1 + dx * 0.35} ${y1 + sag}, ${x2 - dx * 0.35} ${y2 + sag}, ${x2} ${y2}`;
        const colour = `rgb(var(--cable-${(i % 3) + 1}))`;
        const g = document.createElementNS(SVG_NS, "g");
        g.dataset.pair = String(i);
        const path = (stroke: string, width: number, dyShift = 0) => {
          const p = document.createElementNS(SVG_NS, "path");
          p.setAttribute("d", d);
          p.setAttribute("fill", "none");
          p.setAttribute("stroke", stroke);
          p.setAttribute("stroke-width", String(width));
          p.setAttribute("stroke-linecap", "round");
          if (dyShift) p.setAttribute("transform", `translate(0 ${dyShift})`);
          g.append(p);
          return p;
        };
        const plug = (x: number, y: number) => {
          const c = document.createElementNS(SVG_NS, "circle");
          c.setAttribute("cx", String(x));
          c.setAttribute("cy", String(y));
          c.setAttribute("r", String(w * 0.62));
          c.setAttribute("fill", colour);
          g.append(c);
          return c;
        };
        const body = path(colour, w);
        const shine = path("rgba(255,255,255,0.32)", Math.max(2, w * 0.18), -w * 0.22);
        plug(x1, y1);
        const end = plug(x2, y2);
        svg.append(g);

        if (first && !still.matches) {
          /* The one motion moment: each cable plugs in once, on first draw. */
          const len = body.getTotalLength();
          for (const p of [body, shine]) {
            p.style.strokeDasharray = String(len);
            p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
              duration: 1000,
              delay: 250 + i * 180,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              fill: "both",
            });
          }
          end.style.transformBox = "fill-box";
          end.style.transformOrigin = "center";
          end.animate([{ opacity: 0, transform: "scale(0.2)" }, { opacity: 1, transform: "scale(1)" }], {
            duration: 260,
            delay: 1200 + i * 180,
            easing: "ease-out",
            fill: "both",
          });
        }
      });
      first = false;
    };

    const ro = new ResizeObserver(draw);
    ro.observe(bay);
    document.fonts.ready.then(draw);
    return () => ro.disconnect();
  }, [pairs]);

  useEffect(() => {
    svgRef.current?.querySelectorAll("g").forEach((g) => {
      g.classList.toggle("on", g.dataset.pair === String(focus));
    });
  }, [focus]);

  const portState = (i: number) => (focus === null ? "" : focus === i ? " is-on" : " is-off");
  const enter = (i: number) => () => setFocus(i);
  const leave = () => setFocus(null);

  return (
    <div ref={bayRef} className="bay" data-focus={focus === null ? undefined : ""}>
      <p className="bay-head bay-head-l" aria-hidden="true">{headings[0]}</p>
      <p className="bay-head bay-head-r" aria-hidden="true">{headings[1]}</p>
      <ol className="bay-pairs" aria-label={label}>
        {pairs.map((pair, i) => {
          const rows = {
            "--src-row": i + 2,
            "--tgt-row": targetRows[i] + 2,
            "--m-src": i * 2 + 1,
            "--m-tgt": i * 2 + 2,
          } as CSSProperties;
          return (
            <li key={pair.target} style={rows}>
              <p className={`bay-port bay-src t-port${portState(i)}`} onPointerEnter={enter(i)} onPointerLeave={leave}>
                <span>{pair.source}</span>
                <span className="bay-jack" data-jack={`src-${i}`} aria-hidden="true" />
              </p>
              <span className="sr-joiner">: </span>
              <p className={`bay-port bay-tgt t-port${portState(i)}`} onPointerEnter={enter(i)} onPointerLeave={leave}>
                <span className="bay-jack" data-jack={`tgt-${i}`} aria-hidden="true" />
                <span>
                  {pair.target}
                  {pair.gloss ? <small className="bay-gloss">{pair.gloss}</small> : null}
                </span>
              </p>
            </li>
          );
        })}
      </ol>
      <svg ref={svgRef} className="bay-cables" aria-hidden="true" />
    </div>
  );
}
