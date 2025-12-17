"use client";

import { useEffect, useState } from "react";

const USERS = [
  { name: "Nora Vega", email: "nvega@polaris.io", breach: "Keylogger", severity: "ALTA" },
  { name: "Ilya Frost", email: "ifrost@singularity.ai", breach: "Botnet Access", severity: "MEDIA" },
  { name: "Sora Tan", email: "sora@nebulacorp.dev", breach: "Credential Stuffing", severity: "ALTA" },
  { name: "Diego Fall", email: "dfall@cryostudio.mx", breach: "Social Eng.", severity: "BAJA" },
];

const BREACH_SERIES = [
  { label: "PHISH", value: 32, color: "bg-accent-pink" },
  { label: "FORCE", value: 24, color: "bg-accent-blue" },
  { label: "ZERO", value: 16, color: "bg-accent-green" },
  { label: "RANS", value: 12, color: "bg-white/40" },
];

const useAnimatedNumber = (target: number, duration = 900, decimals = 0) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const nextValue = Number((target * progress).toFixed(decimals));
      setValue(nextValue);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, decimals]);

  return value;
};

const CRMSim = () => {
  const uptime = useAnimatedNumber(99.982, 1100, 3);
  const usuarios = useAnimatedNumber(128, 950);

  return (
    <div className="space-y-4 text-xs sm:text-sm font-mono text-white/40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl border border-accent-green/30 bg-black/30">
          <p className="text-[10px] uppercase tracking-[0.4em]">uptime</p>
          <p className="text-2xl font-semibold text-glow-green">{uptime.toFixed(3)}%</p>
          <p className="text-[10px] text-accent-green/70">ultimas 24h</p>
        </div>
        <div className="p-3 rounded-2xl border border-accent-blue/30 bg-black/30">
          <p className="text-[10px] uppercase tracking-[0.4em]">usuarios</p>
          <p className="text-2xl font-semibold text-glow-green">{Math.round(usuarios)}</p>
          <p className="text-[10px] text-accent-blue/70">monitoreados</p>
        </div>
        <div className="p-3 rounded-2xl border border-accent-pink/30 bg-black/30">
          <p className="text-[10px] uppercase tracking-[0.4em]">alertas</p>
          <p className="text-2xl font-semibold text-glow-green">08</p>
          <p className="text-[10px] text-accent-pink/70">activas</p>
        </div>
        <div className="p-3 rounded-2xl border border-white/20 bg-black/30">
          <p className="text-[10px] uppercase tracking-[0.4em]">parches</p>
          <p className="text-2xl font-semibold text-glow-green">21</p>
          <p className="text-[10px] text-white/60">pendientes</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-accent-green/20 bg-black/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg text-glow-green">Usuarios Hackeados</h3>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-green/70">crm-sim</span>
          </div>
          <div className="overflow-y-auto max-h-48">
            <table className="w-full border-collapse text-left">
              <thead className="text-[10px] uppercase tracking-[0.3em]">
                <tr>
                  <th className="pb-2 pr-2 font-normal text-white/40">usuario</th>
                  <th className="pb-2 pr-2 font-normal text-white/40">vector</th>
                  <th className="pb-2 text-right font-normal text-white/40">riesgo</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {USERS.map((user) => (
                  <tr key={user.email} className="border-t border-white/5">
                    <td className="py-2 pr-2">
                      <p className="text-text-primary">{user.name}</p>
                      <p className="text-[11px] text-white/40">{user.email}</p>
                    </td>
                    <td className="py-2 pr-2 text-accent-blue">{user.breach}</td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-1 rounded-full border border-accent-pink/40 text-accent-pink text-[11px]">
                        {user.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-3xl border border-accent-blue/20 bg-black/40 p-4 flex flex-col gap-4">
          <div>
            <h3 className="text-lg text-glow-green">Ataques detectados</h3>
            <p className="text-[11px] uppercase tracking-[0.3em]">ultimas 12h</p>
          </div>
          <div className="flex items-end gap-3 h-40">
            {BREACH_SERIES.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-8 rounded-full ${bar.color} shadow-[0_0_15px_rgba(100,255,218,0.3)]`}
                  style={{ height: `${bar.value * 1.8}px` }}
                />
                <span className="text-[10px] tracking-[0.4em]">{bar.label}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-accent-green/30 p-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">uptime monitor</p>
            <p className="text-xl text-glow-green">211 dias sin caida</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMSim;
