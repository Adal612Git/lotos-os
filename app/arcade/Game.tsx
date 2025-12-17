"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useHudStore } from "@/lib/stores/hudStore";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 14;
const CELL_SIZE = 28;
const GAME_SPEED = 120;
const MAX_CELLS = GRID_SIZE * GRID_SIZE;
const DEFAULT_FOOD: Position = { x: 1, y: 1 };

const equalPosition = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

const randomPosition = (occupied: Position[]): Position => {
  if (occupied.length >= MAX_CELLS) {
    return occupied[0];
  }
  let next: Position;
  do {
    const index = Math.floor(Math.random() * MAX_CELLS);
    next = { x: index % GRID_SIZE, y: Math.floor(index / GRID_SIZE) };
  } while (occupied.some((position) => equalPosition(position, next)));
  return next;
};

const createInitialSnake = (): Position[] => {
  const center = Math.floor(GRID_SIZE / 2);
  return [
    { x: center + 1, y: center },
    { x: center, y: center },
    { x: center - 1, y: center },
  ];
};

const Game = () => {
  const unlockSecret = useHudStore((state) => state.unlockSecret);
  const [snake, setSnake] = useState<Position[]>(createInitialSnake);
  const [food, setFood] = useState<Position>(DEFAULT_FOOD);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [status, setStatus] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [systemScore, setSystemScore] = useState(0);
  const directionRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Position>(DEFAULT_FOOD);
  const latestLengthRef = useRef<number>(createInitialSnake().length);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    latestLengthRef.current = snake.length;
  }, [snake.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };
      const nextDirection = keyMap[event.key];
      if (!nextDirection) return;

      const opposite: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposite[directionRef.current] === nextDirection) return;
      setDirection(nextDirection);
      if (status === "idle") {
        setStatus("playing");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    const interval = window.setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const nextHead = (() => {
          switch (directionRef.current) {
            case "UP":
              return { x: head.x, y: head.y - 1 };
            case "DOWN":
              return { x: head.x, y: head.y + 1 };
            case "LEFT":
              return { x: head.x - 1, y: head.y };
            case "RIGHT":
              return { x: head.x + 1, y: head.y };
          }
        })();

        const hitWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y >= GRID_SIZE;
        const hitSelf = prev.some((segment) => equalPosition(segment, nextHead));

        if (hitWall || hitSelf) {
          setStatus("lost");
          return prev;
        }

        const ateFood = equalPosition(nextHead, foodRef.current);
        const nextSnake = ateFood ? [nextHead, ...prev] : [nextHead, ...prev.slice(0, -1)];

        if (ateFood) {
          setFood(randomPosition(nextSnake));
        }

        if (nextSnake.length >= MAX_CELLS) {
          setStatus("won");
        }

        return nextSnake;
      });
    }, GAME_SPEED);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "won") {
      unlockSecret();
    }
  }, [status, unlockSecret]);

  useEffect(() => {
    if (status === "lost") {
      setSystemScore((prev) => prev + Math.max(12, latestLengthRef.current * 3));
    } else if (status === "won") {
      setSystemScore((prev) => prev + 220);
    }
  }, [status]);

  const restart = () => {
    const freshSnake = createInitialSnake();
    setSnake(freshSnake);
    setFood(randomPosition(freshSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setStatus("playing");
  };

  const cells = useMemo(() => {
    return Array.from({ length: MAX_CELLS }, (_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
      const isFood = food.x === x && food.y === y;
      return { x, y, isSnake, isFood };
    });
  }, [snake, food]);

  const progress = Math.round((snake.length / MAX_CELLS) * 100);
  const statusMessage =
    status === "won" ? "ACCESO CONCEDIDO" : status === "lost" ? "BLOQUEO RESTABLECIDO" : "SISTEMA EN STANDBY";

  return (
    <div className="glass-panel rounded-3xl border border-accent-green/30 bg-[#030712]/80 shadow-[0_0_40px_rgba(100,255,218,0.15)] p-6 space-y-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.6em] text-accent-blue">mИdulo arcade</p>
          <h1 className="text-3xl font-mono font-semibold text-accent-green">CODE BREAKER</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-secondary">PUNTAJE DE SISTEMA</p>
          <p className="text-3xl font-mono font-bold text-accent-pink">{systemScore}</p>
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="flex justify-center">
          <span className="rounded-full border border-accent-green/30 px-4 py-1 text-[10px] uppercase tracking-[0.6em] text-accent-green bg-black/40">
            {statusMessage}
          </span>
        </div>
        <div
          className="mx-auto max-w-full overflow-auto rounded-3xl border border-accent-blue/30 bg-[#01030a]/80 p-4 shadow-[0_0_40px_rgba(76,201,240,0.25)]"
          aria-label="Tablero del juego"
        >
          <div
            className="grid gap-[4px]"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            }}
          >
            {cells.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
                className={`rounded-md transition-all duration-200 ${
                  cell.isSnake
                    ? "bg-gradient-to-br from-accent-green/80 via-accent-green/60 to-accent-pink/80 border border-accent-green/70 shadow-[0_0_12px_rgba(100,255,218,0.7)]"
                    : cell.isFood
                    ? "bg-accent-pink/90 border border-accent-pink/70 shadow-[0_0_12px_rgba(247,37,133,0.6)]"
                    : "bg-[#051026]/70 border border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="rounded-2xl border border-accent-blue/30 px-4 py-2 bg-[#01030a]/60">
              <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">longitud</p>
              <p className="text-xl text-accent-blue">{snake.length}</p>
            </div>
            <div className="rounded-2xl border border-accent-green/40 px-4 py-2 bg-[#01030a]/60">
              <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">velocidad</p>
              <p className="text-xl text-accent-green">{(1000 / GAME_SPEED).toFixed(1)} pas/s</p>
            </div>
          </div>
          <div className="flex-1 min-w-[180px]">
            <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary mb-1">progreso neural</p>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green via-accent-blue to-accent-pink transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={restart}
          className="px-6 py-2 rounded-full border border-accent-green text-[10px] uppercase tracking-[0.4em] text-accent-green hover:bg-accent-green/10 transition shadow-[0_0_15px_rgba(100,255,218,0.35)]"
        >
          INICIAR SECUENCIA
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            const freshSnake = createInitialSnake();
            setSnake(freshSnake);
            setFood(randomPosition(freshSnake));
          }}
          className="px-6 py-2 rounded-full border border-accent-pink text-[10px] uppercase tracking-[0.4em] text-accent-pink hover:bg-accent-pink/10 transition shadow-[0_0_15px_rgba(247,37,133,0.35)]"
        >
          REINICIAR SISTEMA
        </button>
        <span className="text-[10px] uppercase tracking-[0.4em] text-text-secondary">
          usa las flechas ← ↑ → ↓
        </span>
      </div>
    </div>
  );
};

export default Game;
