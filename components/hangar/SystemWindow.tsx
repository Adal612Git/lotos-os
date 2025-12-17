"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo, useState } from "react";

interface SystemWindowProps {
  title: string;
  description?: string;
  isInternal?: boolean;
  demoComponent?: ReactNode;
}

const SystemWindow = ({ title, description, isInternal, demoComponent }: SystemWindowProps) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const statusText = useMemo(() => (description ? description : "SINCRONIZANDO DATOS"), [description]);
  const canRenderDemo = Boolean(isInternal && demoComponent);

  if (isClosed) {
    return (
      <motion.div
        className="glass-panel border border-accent-pink/40 bg-[#030712]/80 px-4 py-3 rounded-3xl shadow-[0_0_30px_rgba(247,37,133,0.25)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.6em] text-white/40">ventana cerrada</p>
          <button
            type="button"
            onClick={() => {
              setIsClosed(false);
              setIsMinimized(false);
            }}
            className="px-3 py-1 text-[10px] tracking-[0.4em] uppercase border border-accent-green/60 rounded-full text-accent-green"
          >
            REACTIVAR
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="glass-panel relative rounded-3xl border border-accent-blue/40 bg-[#050b16]/90 p-4 shadow-[0_0_50px_rgba(100,255,218,0.25)] backdrop-blur-3xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between border-b border-accent-pink/20 pb-3 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.6em] text-white/40">sistema</p>
          <h2 className="text-xl font-mono font-semibold text-glow-green">{title}</h2>
          <p className="text-[11px] text-white/40">{statusText}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            className="h-3 w-3 rounded-full bg-accent-green/80 border border-accent-green/40"
          />
          <button
            type="button"
            onClick={() => setIsClosed(true)}
            className="h-3 w-3 rounded-full bg-accent-pink/80 border border-accent-pink/40"
          />
        </div>
      </div>
      {!isMinimized && (
        <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-accent-green/30 bg-[#040a16]/70">
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-accent-pink/40 animate-pulse" />
          <span className="laser-scan-line" aria-hidden="true" />
          {canRenderDemo ? (
            <div className="relative h-full w-full overflow-auto p-4">{demoComponent}</div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent-pink">error :: demo externa bloqueada</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Este proyecto no tiene simulacion interna aun. Sube el build o define un componente para activarlo.
              </p>
              <span className="text-accent-green text-xs font-mono tracking-[0.4em]">status: standby</span>
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
};

export default SystemWindow;
