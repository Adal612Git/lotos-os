"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAudioStore } from "@/lib/stores/audioStore";
import { useHudStore } from "@/lib/stores/hudStore";
import AudioEngine from "@/components/audio/AudioEngine";

interface AppShellProps {
  children: ReactNode;
}

const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const secretUnlocked = useHudStore((state) => state.secretUnlocked);
  const [hudHighlight, setHudHighlight] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const segments = useMemo(() => pathname?.split("/").filter(Boolean) ?? [], [pathname]);
  const moduleSegment = segments[0] ?? "home";
  const subViewSegment = segments[1] ?? "main";
  const breadcrumb = `SYSTEM_ROOT > ${moduleSegment.toUpperCase()} > ${subViewSegment.toUpperCase()}`;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--grid-shift-x", `${xRatio * 40}px`);
      document.documentElement.style.setProperty("--grid-shift-y", `${yRatio * 30}px`);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHudHighlight(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowTooltip(false);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setShowTooltip(true), 10000);
    };
    resetTimer();
    const events = ["pointermove", "pointerdown", "keydown"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col antialiased parallax-grid text-text-primary">
      <div className="pointer-events-none absolute inset-0 z-40">
        <span className="scanline-overlay" />
        <span className="vignette-overlay" />
        <span className="noise-overlay" />
      </div>

      <header className="relative z-20 border-b border-accent-green/20 bg-primary-light/90 backdrop-blur-md px-6 py-3">
        <div className={`flex flex-wrap items-center justify-between gap-4 hud-panel ${hudHighlight ? "hud-panel--flash" : ""}`}>
          <div className="text-accent-green font-bold text-xl tracking-widest select-none">
            LOTOS<span className="text-accent-pink">.OS</span> v1.0
          </div>
          <nav className="flex gap-4 md:gap-6 text-xs md:text-sm font-mono text-accent-blue drop-shadow-[0_0_12px_rgba(76,201,240,0.5)] flex-wrap justify-end">
            <Link
              href="/"
              className="hud-link hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [HOME]
            </Link>
            <Link
              href="/hangar"
              className="hud-link hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [HANGAR]
            </Link>
            <Link
              href="/arcade"
              className="hud-link hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [ARCADE]
            </Link>
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-4 w-full max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-text-secondary border border-accent-green/20 px-4 py-1 rounded-full flex items-center gap-2">
              <span className="font-black">AUDIO:</span>
              <span className="text-accent-green animate-pulse">{isPlaying ? "ONLINE" : "PAUSED"}</span>
            </div>
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.4em] rounded-full px-4 py-1 border ${
                secretUnlocked ? "hud-secret-unlocked" : "hud-secret-locked"
              }`}
            >
              SECRET {secretUnlocked ? "GRANTED" : "LOCKED"}
            </div>
            <div className="flex items-center gap-4 relative z-[60]">
              <div className="flex items-center gap-3 pr-1">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75 animate-ping" aria-hidden="true" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-green" />
                </span>
                <div className="flex flex-col leading-none">
                  <a href="/catalogo.html" target="_blank" rel="noreferrer" className="btn-cta btn-cta--outline font-black">
                    CATÁLOGO
                  </a>
                  <span className="text-[8px] uppercase tracking-[0.4em] text-accent-green mt-1">nueva versión disponible</span>
                </div>
              </div>
              <div className="relative pl-1">
                <span className="cv-badge" aria-hidden="true">
                  HOT
                </span>
                <a
                  href="/cv.html"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cta font-black bg-pink-600/30 border border-[#f72585] neon-flicker text-accent-pink"
                >
                  CV
                </a>
                {showTooltip && (
                  <div className="hud-tooltip">
                    <span>system: se recomienda revisar el historial profesional (CV) para continuar.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.4em] text-accent-blue">
          <span>{breadcrumb}</span>
          <span className="text-accent-green/80">module monitor</span>
        </div>
      </header>

      <main className="flex-1 relative overflow-auto z-10">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="pointer-events-none absolute bottom-12 right-10 z-50">
        <AudioEngine />
      </div>
    </div>
  );
};

export default AppShell;
