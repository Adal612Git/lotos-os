"use client";

import { useEffect, useMemo, useState } from "react";

type NodePulse = {
  id: number;
  energy: number;
};

const TOTAL_NODES = 49;

const generateNodes = (): NodePulse[] =>
  Array.from({ length: TOTAL_NODES }, (_, index) => ({
    id: index,
    energy: Math.random(),
  }));

const DataVisualizer = () => {
  const [nodes, setNodes] = useState<NodePulse[]>(generateNodes);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) =>
          Math.random() > 0.55 ? { ...node, energy: Math.random() } : node
        )
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const activeNodes = useMemo(() => nodes.filter((node) => node.energy > 0.6).length, [nodes]);

  return (
    <div className="space-y-4 rounded-3xl border border-accent-green/20 bg-black/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">proyecto 3</p>
          <h3 className="text-xl text-glow-green">Data Visualizer</h3>
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-accent-green">neuronal</span>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {nodes.map((node) => {
          const baseColor = `rgba(100,255,218,${0.35 + node.energy * 0.6})`;
          const pulseShadow = `0 0 ${6 + node.energy * 18}px rgba(100,255,218,${0.4 + node.energy * 0.5})`;
          return (
            <div
              key={node.id}
              className="aspect-square rounded-xl border border-white/10 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${baseColor}, rgba(3, 10, 24, 0.8))`,
                boxShadow: pulseShadow,
                opacity: 0.65 + node.energy * 0.35,
                transform: `scale(${0.95 + node.energy * 0.1})`,
              }}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="rounded-2xl border border-accent-blue/20 p-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">nodos activos</p>
          <p className="text-2xl text-glow-green">{activeNodes}</p>
        </div>
        <div className="rounded-2xl border border-accent-pink/20 p-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">energía promedio</p>
          <p className="text-2xl text-glow-green">
            {(nodes.reduce((acc, node) => acc + node.energy, 0) / nodes.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
