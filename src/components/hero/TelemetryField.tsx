"use client";

/**
 * The ambient "telemetry" backdrop for the hero. Pure CSS + SVG, GPU-cheap.
 * A faint moving grid, a barely-visible scanline overlay, and a slow sweep beam.
 */
export function TelemetryField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Moving grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          opacity: 0.08,
          maskImage:
            "radial-gradient(ellipse at 70% 45%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 45%, black 30%, transparent 75%)",
          animation: "grid-drift 30s linear infinite",
        }}
      />
      {/* Scanlines */}
      <div className="scanlines" />
      {/* Radial glow */}
      <div
        className="absolute right-[-15%] top-[10%] h-[70%] w-[70%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(63,143,166,0.12) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute left-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,163,61,0.06) 0%, transparent 70%)",
        }}
      />

      <style jsx>{`
        @keyframes grid-drift {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 56px 56px, 56px 56px;
          }
        }
      `}</style>
    </div>
  );
}
