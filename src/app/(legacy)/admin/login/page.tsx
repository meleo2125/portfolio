"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-6 py-12">
      {/* Background ambient light */}
      <div 
        className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-amber/5 blur-[80px]"
        style={{ top: "35%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
      
      <div className="panel panel-corners relative z-10 w-full max-w-md p-8 md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-amber/20 bg-amber/5 text-amber">
            <Lock size={20} strokeWidth={1.5} />
          </div>
          <span className="label-mono text-amber">SECURE ACCESS</span>
          <h1 className="mt-2 font-display text-2xl font-medium text-text">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Enter password to decrypt control panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="password" 
              className="label-mono mb-2 block text-xs"
            >
              System Password
            </label>
            <input
              type="password"
              id="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full rounded-sm border border-white/10 bg-panel-raised px-4 py-3 font-mono text-sm text-text placeholder-white/20 outline-none transition-colors focus:border-amber"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-sm border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-sm border border-amber bg-amber/10 py-3 font-mono text-sm uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-bg disabled:opacity-50"
          >
            {loading ? "Decrypting..." : "Access System"}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
