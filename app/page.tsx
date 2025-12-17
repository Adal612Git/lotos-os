"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useAudioStore } from "@/lib/stores/audioStore";

export default function Home() {
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const isPlaying = useAudioStore((state) => state.isPlaying);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[url('/grid.svg')]">
      <div className="glass-panel p-10 rounded-3xl max-w-3xl text-center shadow-[0_0_80px_rgba(100,255,218,0.18)] border border-accent-blue/40 space-y-8">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.6em] text-accent-blue">lotos command shell</p>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-green via-accent-blue to-accent-pink">
            SYSTEM ONLINE
          </h1>
          <p className="text-text-secondary font-mono">
            Bienvenido al nodo central. Controla la música ambiente, entra al hangar o descarga tus credenciales oficiales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <button
            type="button"
            onClick={togglePlay}
            className="relative px-6 py-5 rounded-2xl border border-accent-green/70 bg-black/40 text-accent-green font-mono text-[11px] tracking-[0.6em] uppercase shadow-[0_0_25px_rgba(100,255,218,0.25)] hover:bg-accent-green/10 transition"
          >
            {isPlaying ? "PAUSAR PROTOCOLO" : "INICIAR PROTOCOLO"}
          </button>
          <Link
            href="/hangar"
            className="relative px-6 py-5 rounded-2xl border border-accent-blue/70 bg-[#051026]/80 text-accent-blue font-mono text-[11px] tracking-[0.6em] uppercase shadow-[0_0_25px_rgba(76,201,240,0.3)] hover:bg-accent-blue/10 transition text-center flex items-center justify-center"
          >
            ENTRAR AL HANGAR
          </Link>
          <a href="/cv.html" target="_blank" rel="noreferrer" className="md:col-span-2 btn-emergency">
            DESCARGAR MANIFIESTO_PROFESIONAL.PDF (CV)
          </a>
        </div>
        <div className="flex justify-center">
          <a
            href="https://github.com/Adal612Git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 rounded-3xl border-2 border-accent-blue/70 bg-[#041022]/90 px-8 py-4 font-mono text-sm tracking-[0.4em] text-white shadow-[0_20px_50px_rgba(76,201,240,0.25)] hover:bg-accent-blue/20 hover:text-accent-green transition relative overflow-hidden"
          >
            <span className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent animate-pulse" aria-hidden="true" />
            <Github size={20} />
            <span className="relative z-10">GITHUB.COM/ADAL612GIT</span>
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <a
            href="/catalogo.html"
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-2xl border-2 border-accent-green/60 bg-gradient-to-r from-accent-green/20 via-accent-green/10 to-transparent px-6 py-5 flex flex-col gap-2 text-left shadow-[0_15px_45px_rgba(100,255,218,0.15)] hover:shadow-[0_25px_55px_rgba(100,255,218,0.35)] transition"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent-green">Catálogo interactivo</span>
            <span className="text-white font-semibold text-lg">Ver catálogo completo</span>
          </a>
          <a
            href="/cv.html"
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-2xl border-2 border-accent-pink/70 bg-gradient-to-r from-accent-pink/20 via-accent-pink/10 to-transparent px-6 py-5 flex flex-col gap-2 text-left shadow-[0_15px_45px_rgba(247,37,133,0.25)] hover:shadow-[0_25px_55px_rgba(247,37,133,0.45)] transition"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent-pink">Currículum ejecutivo</span>
            <span className="text-white font-semibold text-lg">Descargar CV</span>
          </a>
        </div>
        <div className="text-xs text-white/50 font-mono tracking-[0.3em]">
          WhatsApp: 3340950403 • romeromedinar612@gmail.com
        </div>
      </div>
    </div>
  );
}
