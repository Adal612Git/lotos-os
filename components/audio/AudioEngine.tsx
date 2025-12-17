"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/lib/stores/audioStore";

interface AudioEngineProps {
  className?: string;
}

type ExtendedWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

const BAR_COUNT = 18;
const ZERO_LEVELS = Array(BAR_COUNT).fill(0);

const getAudioContextClass = (): typeof AudioContext | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const extendedWindow = window as ExtendedWindow;
  return window.AudioContext || extendedWindow.webkitAudioContext || null;
};

const AudioEngine = ({ className = "" }: AudioEngineProps) => {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const volume = useAudioStore((state) => state.volume);
  const [levels, setLevels] = useState<number[]>(Array(BAR_COUNT).fill(0));
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const volumeRef = useRef(volume);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleInteraction = () => {
      setHasInteracted(true);
    };
    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) {
      return;
    }
    const context = new AudioContextClass();
    contextRef.current = context;
    const audio = new Audio("/audio/ambient.mp3");
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audioRef.current = audio;

    const source = context.createMediaElementSource(audio);
    const gainNode = context.createGain();
    gainNode.gain.value = volumeRef.current;
    gainRef.current = gainNode;
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 64;
    analyzerRef.current = analyzer;

    source.connect(gainNode).connect(analyzer).connect(context.destination);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.pause();
      source.disconnect();
      gainNode.disconnect();
      analyzer.disconnect();
      context.close();
    };
  }, [hasInteracted]);

  useEffect(() => {
    volumeRef.current = volume;
    if (!gainRef.current) return;
    gainRef.current.gain.value = volume;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!hasInteracted) return;
    const analyzer = analyzerRef.current;
    if (!analyzer) return;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyzer.getByteFrequencyData(dataArray);
      const normalized = Array.from({ length: BAR_COUNT }, (_, index) => {
        const value = dataArray[index] ?? 0;
        return value / 255;
      });
      setLevels(normalized);
      animationRef.current = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    if (!hasInteracted) return;
    const audio = audioRef.current;
    const context = contextRef.current;
    if (!audio || !context) return;

    const startPlayback = async () => {
      if (context.state === "suspended") {
        await context.resume();
      }
      try {
        await audio.play();
      } catch {
        // autoplay restrictions
      }
    };

    if (isPlaying) {
      startPlayback();
    } else {
      audio.pause();
    }
  }, [isPlaying, hasInteracted]);

  return (
    <section
      className={`glass-panel pointer-events-none rounded-3xl border border-accent-blue/40 bg-[#020509]/80 shadow-[0_0_30px_rgba(100,255,218,0.35)] px-4 py-3 backdrop-blur-2xl ${className}`}
      aria-live="polite"
    >
      <p className="text-[10px] uppercase tracking-[0.6em] text-text-secondary">audio engine</p>
      <div className="mt-2 flex gap-1">
        {(isPlaying ? levels : ZERO_LEVELS).map((level, index) => (
          <span
            key={index}
            style={{ height: `${Math.max(level, 0.08) * 40}px` }}
            className="w-1.5 rounded-full bg-gradient-to-t from-accent-green to-accent-pink"
          />
        ))}
      </div>
    </section>
  );
};

export default AudioEngine;
