"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { IconCar, IconTarget, IconBrain, IconAlertTriangle } from "@tabler/icons-react";
import { toast } from "sonner";

type TestPhase = "idle" | "reaction" | "focus" | "sleepiness" | "result";

export default function FitDrivePage() {
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [reactionTime, setReactionTime] = useState(0);
  const [focusScore, setFocusScore] = useState(0);
  const [sleepinessLevel, setSleepinessLevel] = useState(5);
  const [totalScore, setTotalScore] = useState(0);

  // Reaction Test State
  const [reactionColor, setReactionColor] = useState<"red" | "green">("red");
  const [reactionStartTime, setReactionStartTime] = useState(0);
  const [waitingForGreen, setWaitingForGreen] = useState(false);

  // Focus Test State
  const [focusGrid] = useState(() => {
    const grid = Array.from({ length: 25 }, () => Math.random() > 0.5);
    return grid;
  });
  const [focusClicked, setFocusClicked] = useState<boolean[]>(new Array(25).fill(false));

  const startReactionTest = () => {
    setReactionColor("red");
    setWaitingForGreen(true);
    const delay = 1000 + Math.random() * 3000;
    setTimeout(() => {
      setReactionColor("green");
      setReactionStartTime(Date.now());
      setWaitingForGreen(false);
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionColor === "green" && reactionStartTime > 0) {
      const time = Date.now() - reactionStartTime;
      setReactionTime(time);
      toast.success(`Waktu reaksi: ${time}ms`);
      setTimeout(() => setPhase("focus"), 1000);
    } else if (waitingForGreen) {
      toast.error("Terlalu cepat! Tunggu layar hijau.");
      setWaitingForGreen(false);
    }
  };

  const handleFocusClick = (index: number) => {
    const newClicked = [...focusClicked];
    newClicked[index] = !newClicked[index];
    setFocusClicked(newClicked);
  };

  const submitFocusTest = () => {
    const correctCount = focusGrid.filter(Boolean).length;
    const userCount = focusClicked.filter(Boolean).length;
    const accuracy = Math.max(0, 100 - Math.abs(correctCount - userCount) * 10);
    setFocusScore(accuracy);
    toast.success(`Akurasi fokus: ${accuracy}%`);
    setPhase("sleepiness");
  };

  const calculateTotal = () => {
    const reactionScore = Math.max(0, 100 - (reactionTime - 150) / 10);
    const sleepinessScore = 100 - sleepinessLevel * 10;
    const total = Math.round((reactionScore + focusScore + sleepinessScore) / 3);
    setTotalScore(total);
    setPhase("result");
  };

  const getCategory = (score: number) => {
    if (score >= 70) return { label: "Aman", color: "text-green-500", bg: "bg-green-500/10" };
    if (score >= 40) return { label: "Waspada", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "Tidak Aman", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const reset = () => {
    setPhase("idle");
    setReactionTime(0);
    setFocusScore(0);
    setSleepinessLevel(5);
    setTotalScore(0);
    setFocusClicked(new Array(25).fill(false));
  };

  return (
    <div>
      <PageHeader
        title="Fit-to-Drive Test"
        description="Uji kesiapan Anda sebelum berkendara"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Fit-to-Drive" }]}
      />

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant={phase === "idle" ? "default" : "secondary"}>1. Reaction</Badge>
          <Badge variant={phase === "focus" || phase === "sleepiness" || phase === "result" ? "default" : "secondary"}>2. Focus</Badge>
          <Badge variant={phase === "sleepiness" || phase === "result" ? "default" : "secondary"}>3. Sleepiness</Badge>
        </div>
        <Progress value={
          phase === "idle" ? 0 : phase === "reaction" ? 33 : phase === "focus" ? 50 : phase === "sleepiness" ? 66 : 100
        } />
      </div>

      {phase === "idle" && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <IconCar size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Siap Uji Kesiapan?</h2>
            <p className="text-muted-foreground mb-6">
              Test ini terdiri dari 3 bagian: Reaction Test, Focus Test, dan Sleepiness Assessment.
            </p>
            <Button onClick={startReactionTest} size="lg" className="gradient-primary text-white">
              Mulai Test
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === "reaction" && (
        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <IconTarget size={20} /> Reaction Test
            </h2>
            <p className="text-muted-foreground mb-4">Klik tombol SEGERA setelah layar berubah hijau!</p>
            <button
              onClick={handleReactionClick}
              className={`w-full h-48 rounded-2xl text-white text-2xl font-bold transition-all duration-300 ${
                reactionColor === "green"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {waitingForGreen ? "Tunggu..." : reactionColor === "green" ? "KLIK!" : "Klik untuk reset"}
            </button>
            {reactionTime > 0 && (
              <p className="text-center mt-4 text-lg">
                Waktu reaksi: <span className="font-bold">{reactionTime}ms</span>
                <span className="text-muted-foreground ml-2">
                  ({reactionTime < 200 ? "Excellent" : reactionTime < 400 ? "Good" : "Slow"})
                </span>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {phase === "focus" && (
        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <IconBrain size={20} /> Focus Test
            </h2>
            <p className="text-muted-foreground mb-4">Klik semua kotak yang BERWARNA untuk menghitungnya!</p>
            <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto mb-4">
              {focusGrid.map((isBlue, i) => (
                <button
                  key={i}
                  onClick={() => handleFocusClick(i)}
                  className={`w-full aspect-square rounded-lg transition-all ${
                    focusClicked[i]
                      ? "bg-blue-500 scale-95"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                />
              ))}
            </div>
            <div className="text-center">
              <Button onClick={submitFocusTest}>Submit Jawaban</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {phase === "sleepiness" && (
        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <IconAlertTriangle size={20} /> Sleepiness Assessment
            </h2>
            <p className="text-muted-foreground mb-6">Seberapa mengantuk Anda saat ini? (1 = Sangat Segar, 10 = Sangat Mengantuk)</p>
            <div className="max-w-md mx-auto">
              <input
                type="range"
                min={1}
                max={10}
                value={sleepinessLevel}
                onChange={(e) => setSleepinessLevel(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1 - Segar</span>
                <span className="text-lg font-bold">{sleepinessLevel}</span>
                <span>10 - Mengantuk</span>
              </div>
              <div className="text-center mt-6">
                <Button onClick={calculateTotal} className="gradient-primary text-white">
                  Lihat Hasil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {phase === "result" && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Hasil Test</h2>
            <div className="max-w-sm mx-auto space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Reaction Time</p>
                <p className="text-xl font-bold">{reactionTime}ms</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Focus Score</p>
                <p className="text-xl font-bold">{focusScore}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Sleepiness Level</p>
                <p className="text-xl font-bold">{sleepinessLevel}/10</p>
              </div>
              <div className={`p-6 rounded-2xl ${getCategory(totalScore).bg}`}>
                <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                <p className="text-4xl font-bold">{totalScore}</p>
                <Badge className={`mt-2 ${getCategory(totalScore).color}`} variant="outline">
                  {getCategory(totalScore).label}
                </Badge>
              </div>
            </div>
            <Button onClick={reset} variant="outline" className="mt-6">
              Ulangi Test
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
