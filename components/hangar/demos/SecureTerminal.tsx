"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";

type TerminalLog = {
  id: number;
  prefix: string;
  message: string;
  tone?: "muted" | "alert" | "success";
};

const RESPONSES: Record<string, string[]> = {
  help: [
    "help      :: lista comandos disponibles",
    "scan      :: analiza puertos críticos",
    "status    :: muestra estado del cluster",
    "clear     :: limpia la consola",
  ],
  scan: [
    ">>> INICIANDO ESCANEO ACTIVO...",
    "puerto 22        : protegido",
    "puerto 443       : TLS reforzado",
    "puerto 8022      : ANOMALÍA detectada",
    "firmware drones  : actualizado hace 4min",
  ],
  status: [
    "NODO CENTRAL    : estable (37ºC)",
    "GPU FARM        : 87% utilización",
    "LATENCIA        : 12ms",
    "SERVICIOS       : todos los contenedores responden",
  ],
};

const SecureTerminal = () => {
  const [entries, setEntries] = useState<TerminalLog[]>([
    { id: 0, prefix: "system", message: "TERMINAL SEGURA INICIALIZADA", tone: "success" },
    { id: 1, prefix: "system", message: "escribe 'help' para desplegar la guía", tone: "muted" },
  ]);
  const [command, setCommand] = useState("");

  const pushEntries = useCallback((lines: TerminalLog[]) => {
    setEntries((prev) => [...prev, ...lines]);
  }, []);

  const handleCommand = useCallback(
    (value: string) => {
      const normalized = value.trim().toLowerCase();
      if (!normalized) return;
      const nextId = entries.length + 1;

      pushEntries([{ id: nextId, prefix: "usuario", message: `> ${value}` }]);

      if (normalized === "clear") {
        setEntries([
          { id: 0, prefix: "system", message: "consola limpiada", tone: "muted" },
        ]);
        return;
      }

      const response = RESPONSES[normalized];
      if (response) {
        const formatted = response.map((line, index) => ({
          id: nextId + index + 1,
          prefix: normalized,
          message: line,
          tone: normalized === "scan" && line.includes("ANOMALÍA") ? "alert" : normalized === "status" ? "success" : "muted",
        }));
        pushEntries(formatted);
      } else {
        pushEntries([
          {
            id: nextId + 1,
            prefix: "system",
            message: `comando '${normalized}' no reconocido`,
            tone: "alert",
          },
        ]);
      }
    },
    [entries.length, pushEntries]
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleCommand(command);
      setCommand("");
    },
    [command, handleCommand]
  );

  const logTone = useMemo(
    () => ({
      muted: "text-text-secondary",
      alert: "text-accent-pink",
      success: "text-accent-green",
    }),
    []
  );

  return (
    <div className="h-full flex flex-col rounded-3xl border border-accent-blue/30 bg-black/50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-accent-blue/20">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">proyecto 2</p>
          <p className="text-glow-green">Terminal Segura</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-accent-blue">safe-mode</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 text-[12px] font-mono">
        {entries.map((entry) => (
          <p key={entry.id} className={`${entry.tone ? logTone[entry.tone] : "text-text-primary"}`}>
            <span className="text-accent-blue">{entry.prefix}</span>
            <span className="text-text-secondary"> :: </span>
            {entry.message}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-3 border-t border-accent-blue/20 px-4 py-3">
        <span className="text-accent-green text-xs font-mono">lotos@hud:~$</span>
        <input
          type="text"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          className="flex-1 bg-transparent text-text-primary font-mono text-sm outline-none border-b border-accent-green/30 focus:border-accent-green px-2 py-1"
          placeholder="escribe help | scan | status"
          aria-label="Terminal segura"
        />
      </form>
    </div>
  );
};

export default SecureTerminal;
