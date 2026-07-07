"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { gameScores } from "@/dummy";
import { useTimer } from "@/hooks/use-timer";
import { FocusGame } from "@/components/games/focus-game";
import { IconDeviceGamepad, IconTrophy, IconRefresh, IconTarget } from "@tabler/icons-react";
import { toast } from "sonner";

const MEMORY_ICONS = ["🚀", "🎮", "🎯", "⭐", "🔥", "💎", "🌟", "🎪"];

function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const timer = useTimer();

  const initGame = useCallback(() => {
    const pairs = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(pairs);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    timer.reset();
  }, [timer]);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (id: number) => {
    if (flippedCards.length >= 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    if (flippedCards.length === 0) timer.start();

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, matched: true } : c
            )
          );
          setFlippedCards([]);
          if (newCards.filter((c) => !c.matched).length <= 2) {
            setGameComplete(true);
            timer.stop();
            toast.success("Selamat! Semua pasangan cocok!");
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, flipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <span className="text-sm">Moves: <strong>{moves}</strong></span>
          <span className="text-sm">Time: <strong>{timer.formatted}</strong></span>
        </div>
        <Button variant="outline" size="sm" onClick={initGame}>
          <IconRefresh size={14} className="mr-1" /> New Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-xl text-2xl font-bold transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            } ${card.matched ? "opacity-50" : ""}`}
            disabled={card.matched}
          >
            {card.flipped || card.matched ? card.icon : "?"}
          </button>
        ))}
      </div>
      {gameComplete && (
        <div className="text-center mt-4 p-4 rounded-xl bg-green-500/10">
          <p className="text-green-500 font-semibold">Selesai! {moves} moves</p>
        </div>
      )}
    </div>
  );
}

function ReactionGame() {
  const [phase, setPhase] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [rounds, setRounds] = useState<number[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const totalRounds = 5;

  const startRound = () => {
    setPhase("waiting");
    const delay = 1000 + Math.random() * 3000;
    setTimeout(() => {
      setPhase("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (phase === "waiting") {
      setPhase("idle");
      toast.error("Terlalu cepat! Tunggu layar hijau.");
      return;
    }
    if (phase === "ready") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      const newRounds = [...rounds, time];
      setRounds(newRounds);
      setPhase("result");

      if (currentRound < totalRounds - 1) {
        setTimeout(() => {
          setCurrentRound((r) => r + 1);
          setPhase("idle");
        }, 1500);
      }
    }
  };

  const avg = rounds.length > 0 ? Math.round(rounds.reduce((a, b) => a + b, 0) / rounds.length) : 0;
  const reset = () => {
    setPhase("idle");
    setRounds([]);
    setCurrentRound(0);
    setReactionTime(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm">Round {currentRound + 1}/{totalRounds}</span>
        {avg > 0 && <span className="text-sm">Avg: <strong>{avg}ms</strong></span>}
        <Button variant="outline" size="sm" onClick={reset}>
          <IconRefresh size={14} className="mr-1" /> Reset
        </Button>
      </div>
      <button
        onClick={phase === "idle" ? startRound : handleClick}
        className={`w-full h-48 rounded-2xl text-white text-2xl font-bold transition-all ${
          phase === "waiting"
            ? "bg-red-500"
            : phase === "ready"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-muted text-foreground"
        }`}
      >
        {phase === "idle" && "Klik untuk Mulai"}
        {phase === "waiting" && "Tunggu..."}
        {phase === "ready" && "KLIK SEKARANG!"}
        {phase === "result" && `${reactionTime}ms`}
      </button>
      {rounds.length > 0 && (
        <div className="mt-4 space-y-1">
          {rounds.map((r, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>Round {i + 1}</span>
              <span className={`font-medium ${r < 200 ? "text-green-500" : r < 350 ? "text-yellow-500" : "text-red-500"}`}>
                {r}ms {r < 200 ? "Excellent" : r < 350 ? "Good" : "Slow"}
              </span>
            </div>
          ))}
        </div>
      )}
      {rounds.length === totalRounds && (
        <div className="text-center mt-4 p-4 rounded-xl bg-primary/10">
          <p className="text-lg font-bold">Rata-rata: {avg}ms</p>
          <Badge variant={avg < 200 ? "default" : avg < 350 ? "secondary" : "destructive"}>
            {avg < 200 ? "Excellent" : avg < 350 ? "Good" : "Needs Practice"}
          </Badge>
        </div>
      )}
    </div>
  );
}

export default function GamePage() {
  return (
    <div>
      <PageHeader
        title="Mini Games"
        description="Mainkan game seru untuk melatih kewaspadaan"
        breadcrumbs={[{ label: "Quest", href: "/quest" }, { label: "Mini Games" }]}
      />

      <Tabs defaultValue="focus" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="focus"><IconTarget size={16} className="mr-2" />Focus Test</TabsTrigger>
          <TabsTrigger value="memory"><IconDeviceGamepad size={16} className="mr-2" />Memory Game</TabsTrigger>
          <TabsTrigger value="reaction"><IconTrophy size={16} className="mr-2" />Reaction Game</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>
                  <TabsContent value="focus" className="mt-0">Focus Test - Uji Kefokusan</TabsContent>
                  <TabsContent value="memory" className="mt-0">Memory Game - Cari Pasangan</TabsContent>
                  <TabsContent value="reaction" className="mt-0">Reaction Game - Kecepatan Reaksi</TabsContent>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TabsContent value="focus"><FocusGame /></TabsContent>
                <TabsContent value="memory"><MemoryGame /></TabsContent>
                <TabsContent value="reaction"><ReactionGame /></TabsContent>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gameScores.slice(0, 5).map((score, i) => (
                <div key={score.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm">{score.name}</span>
                  </div>
                  <span className="text-sm font-medium">{score.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
