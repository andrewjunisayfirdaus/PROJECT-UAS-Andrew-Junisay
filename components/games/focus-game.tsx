"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconRefresh, IconTarget, IconClock, IconCheck, IconX } from "@tabler/icons-react";
import { toast } from "sonner";

interface Target {
  id: number;
  x: number;
  y: number;
  type: "target" | "distractor";
  color: string;
  size: number;
  speed: number;
  direction: number;
  spawnTime: number;
}

interface FocusGameProps {
  onScoreUpdate?: (score: number) => void;
}

const TARGET_COLORS = ["#22c55e", "#10b981", "#059669"];
const DISTRACTOR_COLORS = ["#ef4444", "#f97316", "#eab308"];
const SHAPES = ["circle", "square", "triangle"];

export function FocusGame({ onScoreUpdate }: FocusGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [avgReactionTime, setAvgReactionTime] = useState(0);
  const [bestReactionTime, setBestReactionTime] = useState(Infinity);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current) return;

    const area = gameAreaRef.current.getBoundingClientRect();
    const isTarget = Math.random() > 0.4;
    const targetShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    const newTarget: Target = {
      id: Date.now() + Math.random(),
      x: Math.random() * (area.width - 60) + 30,
      y: Math.random() * (area.height - 60) + 30,
      type: isTarget ? "target" : "distractor",
      color: isTarget
        ? TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)]
        : DISTRACTOR_COLORS[Math.floor(Math.random() * DISTRACTOR_COLORS.length)],
      size: 30 + Math.random() * 20,
      speed: 0.5 + Math.random() * (level * 0.3),
      direction: Math.random() * Math.PI * 2,
      spawnTime: Date.now(),
    };

    setTargets((prev) => [...prev, newTarget]);

    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
    }, 3000 + Math.random() * 2000);
  }, [level]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    setLevel(1);
    setCombo(0);
    setMaxCombo(0);
    setReactionTimes([]);
    setAvgReactionTime(0);
    setBestReactionTime(Infinity);
    setTargets([]);

    spawnIntervalRef.current = setInterval(() => {
      spawnTarget();
    }, 1200);

    gameLoopRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("finished");
          return 0;
        }
        if (prev % 10 === 0) {
          setLevel((l) => Math.min(l + 1, 5));
        }
        return prev - 1;
      });
    }, 1000);
  }, [spawnTarget]);

  const endGame = useCallback(() => {
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setGameState("finished");
    setTargets([]);
    onScoreUpdate?.(score);
  }, [score, onScoreUpdate]);

  useEffect(() => {
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const moveTargets = setInterval(() => {
      setTargets((prev) =>
        prev.map((target) => {
          if (!gameAreaRef.current) return target;

          const area = gameAreaRef.current.getBoundingClientRect();
          let newX = target.x + Math.cos(target.direction) * target.speed * 2;
          let newY = target.y + Math.sin(target.direction) * target.speed * 2;
          let newDirection = target.direction;

          if (newX < 0 || newX > area.width - target.size) {
            newDirection = Math.PI - target.direction;
            newX = Math.max(0, Math.min(area.width - target.size, newX));
          }
          if (newY < 0 || newY > area.height - target.size) {
            newDirection = -target.direction;
            newY = Math.max(0, Math.min(area.height - target.size, newY));
          }

          return { ...target, x: newX, y: newY, direction: newDirection };
        })
      );
    }, 50);

    return () => clearInterval(moveTargets);
  }, [gameState]);

  const handleTargetClick = (target: Target) => {
    if (gameState !== "playing") return;

    if (target.type === "target") {
      const reactionTime = Date.now() - target.spawnTime;
      setScore((s) => s + 10 * (1 + Math.floor(combo / 5)));
      setCombo((c) => {
        const newCombo = c + 1;
        setMaxCombo((max) => Math.max(max, newCombo));
        return newCombo;
      });
      setReactionTimes((prev) => {
        const newTimes = [...prev, reactionTime];
        const avg = Math.round(newTimes.reduce((a, b) => a + b, 0) / newTimes.length);
        setAvgReactionTime(avg);
        return newTimes;
      });
      setBestReactionTime((best) => Math.min(best, reactionTime));

      if (reactionTime < 300) {
        toast.success(`Super cepat! ${reactionTime}ms`);
      } else if (reactionTime < 500) {
        toast.success(`Bagus! ${reactionTime}ms`);
      } else {
        toast(`Lambat: ${reactionTime}ms`);
      }
    } else {
      setMisses((m) => m + 1);
      setCombo(0);
      toast.error("Salah! Itu bukan target!");
    }

    setTargets((prev) => prev.filter((t) => t.id !== target.id));
  };

  const getRating = () => {
    const accuracy = score + misses > 0 ? score / (score + misses) * 100 : 0;
    const hasGoodReaction = avgReactionTime > 0 && avgReactionTime < 500;

    if (accuracy >= 90 && combo >= 10 && hasGoodReaction) return { label: "Excellent", color: "bg-green-500" };
    if (accuracy >= 70 && hasGoodReaction) return { label: "Good", color: "bg-blue-500" };
    if (accuracy >= 50) return { label: "Fair", color: "bg-yellow-500" };
    return { label: "Needs Practice", color: "bg-red-500" };
  };

  const renderShape = (target: Target) => {
    const baseStyle = {
      width: target.size,
      height: target.size,
      backgroundColor: target.color,
    };

    if (target.type === "distractor") {
      return (
        <div
          style={{
            ...baseStyle,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
      );
    }

    return (
      <div
        style={{
          ...baseStyle,
          borderRadius: target.size / 2,
        }}
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 flex-wrap">
          <span className="text-sm flex items-center gap-1">
            <IconTarget size={14} /> Score: <strong>{score}</strong>
          </span>
          <span className="text-sm flex items-center gap-1">
            <IconClock size={14} /> Time: <strong>{timeLeft}s</strong>
          </span>
          <span className="text-sm">
            Level: <strong>{level}</strong>
          </span>
          {avgReactionTime > 0 && (
            <span className={`text-sm font-medium ${avgReactionTime < 300 ? "text-green-500" : avgReactionTime < 500 ? "text-yellow-500" : "text-red-500"}`}>
              RT: <strong>{avgReactionTime}ms</strong>
            </span>
          )}
          {combo > 0 && (
            <Badge variant="default" className="bg-orange-500">
              {combo}x Combo
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={gameState === "playing" ? endGame : startGame}>
          <IconRefresh size={14} className="mr-1" />
          {gameState === "playing" ? "Stop" : "New Game"}
        </Button>
      </div>

      <div
        ref={gameAreaRef}
        className="relative w-full h-80 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden cursor-crosshair"
      >
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <IconTarget size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">Focus Test</p>
            <p className="text-sm text-white/70 mb-4 text-center px-4">
              Klik target hijau (lingkaran).<br />
              Hindari distractor oranye (segitiga)!
            </p>
            <Button onClick={startGame}>Mulai Game</Button>
          </div>
        )}

        {gameState === "playing" && targets.map((target) => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target)}
            className="absolute transition-transform hover:scale-110 active:scale-95"
            style={{
              left: target.x,
              top: target.y,
              width: target.size,
              height: target.size,
            }}
          >
            {renderShape(target)}
          </button>
        ))}

        {gameState === "finished" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
            <p className="text-2xl font-bold mb-2">Game Selesai!</p>
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{score}</p>
                <p className="text-xs text-white/70">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{maxCombo}</p>
                <p className="text-xs text-white/70">Max Combo</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500">{misses}</p>
                <p className="text-xs text-white/70">Misses</p>
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${avgReactionTime < 300 ? "text-green-400" : avgReactionTime < 500 ? "text-yellow-400" : "text-red-400"}`}>
                  {avgReactionTime}ms
                </p>
                <p className="text-xs text-white/70">Avg Reaction</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {bestReactionTime === Infinity ? "-" : `${bestReactionTime}ms`}
                </p>
                <p className="text-xs text-white/70">Best Reaction</p>
              </div>
            </div>
            <Badge className={`${getRating().color} text-white mb-4`}>
              {getRating().label}
            </Badge>
            <Button onClick={startGame}>Main Lagi</Button>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span>Target (klik ini)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <span>Distractor (jangan klik)</span>
        </div>
      </div>
    </div>
  );
}
