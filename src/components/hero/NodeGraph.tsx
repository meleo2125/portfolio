"use client";

import { useEffect, useRef } from "react";

/**
 * A lightweight, dependency-free 2D node graph visualizing the systems
 * Mukesh works across: SAP core ↔ Datasphere / Analytics Cloud, and his own
 * apps (TheLyst, Virtual Herbal Garden, AI Healthcare, IPR).
 *
 * The blueprint suggests React Three Fiber for a real 3D node graph. To keep
 * the deliverable dependency-light and Lighthouse-friendly, this is a canvas
 * implementation with a "faux-perspective" rotation — same signature, no 3D
 * bundle. Swap for R3F later if desired.
 *
 * Respects prefers-reduced-motion (renders a still frame).
 */
type Node = {
  id: string;
  label: string;
  x: number; // -1..1
  y: number; // -1..1
  z: number; // -1..1
  color: "amber" | "cyan" | "muted";
  size: number;
};

type Edge = [string, string];

const nodes: Node[] = [
  { id: "hana", label: "SAP HANA", x: -0.7, y: -0.4, z: 0.3, color: "cyan", size: 5 },
  { id: "bw", label: "BW", x: -0.35, y: -0.7, z: -0.2, color: "cyan", size: 4 },
  { id: "ds", label: "Datasphere", x: 0, y: -0.15, z: 0.5, color: "amber", size: 7 },
  { id: "sac", label: "SAC", x: 0.55, y: -0.55, z: 0.1, color: "cyan", size: 5 },
  { id: "bo", label: "BusinessObjects", x: 0.75, y: 0.1, z: -0.3, color: "cyan", size: 4 },
  { id: "auto", label: "Automation", x: -0.55, y: 0.35, z: -0.4, color: "amber", size: 6 },
  { id: "lyst", label: "TheLyst", x: -0.15, y: 0.7, z: 0.2, color: "muted", size: 4 },
  { id: "vhg", label: "Virtual Garden", x: 0.35, y: 0.7, z: -0.1, color: "muted", size: 4 },
  { id: "ipr", label: "IPR App", x: 0.7, y: 0.45, z: 0.4, color: "muted", size: 4 },
  { id: "ai", label: "AI Healthcare", x: -0.75, y: 0.05, z: 0.4, color: "muted", size: 4 },
];

const edges: Edge[] = [
  ["hana", "bw"],
  ["hana", "ds"],
  ["bw", "ds"],
  ["ds", "sac"],
  ["ds", "bo"],
  ["ds", "auto"],
  ["sac", "auto"],
  ["auto", "lyst"],
  ["auto", "ai"],
  ["lyst", "vhg"],
  ["vhg", "ipr"],
  ["ai", "ipr"],
];

const colorMap: Record<Node["color"], string> = {
  amber: "#E8A33D",
  cyan: "#3F8FA6",
  muted: "#9BA3AF",
};

export function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t0 = performance.now();

    const project = (n: Node, angle: number) => {
      // Rotate around Y axis (faux-3D)
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const rx = n.x * cosA - n.z * sinA;
      const rz = n.x * sinA + n.z * cosA;
      const depth = 1 / (2 - rz); // simple perspective
      const px = width / 2 + rx * width * 0.32 * depth;
      const py = height / 2 + n.y * height * 0.32 * depth;
      return { px, py, depth };
    };

    const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const angle = prefersReducedMotion ? 0.35 : t * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Edges
      edges.forEach(([a, b]) => {
        const na = nodeById[a];
        const nb = nodeById[b];
        const pa = project(na, angle);
        const pb = project(nb, angle);
        const avgDepth = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = `rgba(90, 100, 114, ${0.35 * avgDepth})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.stroke();

        // Pulse marker travelling along the edge (skip under reduced motion)
        if (!prefersReducedMotion) {
          const phase = (t * 0.6 + (a.charCodeAt(0) + b.charCodeAt(0)) / 40) % 1;
          const mx = pa.px + (pb.px - pa.px) * phase;
          const my = pa.py + (pb.py - pa.py) * phase;
          ctx.fillStyle = `rgba(232, 163, 61, ${0.6 * avgDepth})`;
          ctx.beginPath();
          ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Nodes (sorted by depth so closer draws on top)
      const projected = nodes.map((n) => ({ n, p: project(n, angle) }));
      projected.sort((a, b) => a.p.depth - b.p.depth);

      projected.forEach(({ n, p }) => {
        const color = colorMap[n.color];
        const radius = n.size * p.depth;

        // Glow
        const gradient = ctx.createRadialGradient(
          p.px,
          p.py,
          0,
          p.px,
          p.py,
          radius * 4
        );
        gradient.addColorStop(0, `${color}55`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Ring
        ctx.strokeStyle = `${color}88`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius + 3, 0, Math.PI * 2);
        ctx.stroke();

        // Label (only for larger/frontal nodes)
        if (p.depth > 0.52) {
          ctx.fillStyle = `rgba(237, 234, 227, ${Math.min(1, p.depth * 1.3)})`;
          ctx.font = `10px "JetBrains Mono", monospace`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label, p.px + radius + 8, p.py);
        }
      });

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw(performance.now());
    } else {
      // Defer start until idle for perf
      const start = () => {
        raf = requestAnimationFrame(draw);
      };
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void })
          .requestIdleCallback(start);
      } else {
        setTimeout(start, 100);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="relative h-full w-full"
      aria-label="Systems node graph — SAP core connected to Datasphere, Analytics Cloud, and independent product builds"
      role="img"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
      {/* Frame */}
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-white/5" />
      {/* Corner labels */}
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span className="text-amber">◉</span> SYS-GRAPH · rev.01
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {nodes.length} nodes · {edges.length} links
      </div>
    </div>
  );
}
