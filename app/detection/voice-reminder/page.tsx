"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { IconCar, IconAlertCircle, IconPlayerStop, IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";

const PRESETS = [
  { hours: 2, rest: 15, label: "2 Jam", restLabel: "15 menit" },
  { hours: 4, rest: 30, label: "4 Jam", restLabel: "30 menit" },
  { hours: 6, rest: 60, label: "6 Jam", restLabel: "1 jam" },
  { hours: 8, rest: 480, label: "8 Jam", restLabel: "8 jam" },
];

export default function VoiceReminderPage() {
  const [alarmActive, setAlarmActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [nextRestAt, setNextRestAt] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playAlarm = useCallback(async () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
      const ctx = audioCtxRef.current;
      const notes = [880, 660, 880, 660, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "square";
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.15);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.15);
      });
    } catch {}
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const startJourney = () => {
    const preset = PRESETS[selectedPreset];
    const restSeconds = preset.rest * 60;
    setNextRestAt(restSeconds);
    setElapsed(0);
    setStarted(true);
    toast.info(`Perjalanan dimulai! Istirahat dalam ${preset.restLabel}`);
  };

  const stopJourney = () => {
    setStarted(false);
    setElapsed(0);
    setNextRestAt(0);
    setAlarmActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const dismissAlarm = () => {
    setAlarmActive(false);
    const preset = PRESETS[selectedPreset];
    const restSeconds = preset.rest * 60;
    setNextRestAt(elapsed + restSeconds);
    toast.info("Lanjutkan perjalanan. Istirahat berikutnya sudah direset.");
  };

  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (nextRestAt > 0 && next >= nextRestAt) {
          setAlarmActive(true);
          playAlarm();
          toast.warning("Waktunya istirahat!");
        }
        return next;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started, nextRestAt, playAlarm]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close();
    };
  }, []);

  const preset = PRESETS[selectedPreset];
  const remainingToRest = nextRestAt > 0 ? Math.max(0, nextRestAt - elapsed) : 0;
  const progressToRest = nextRestAt > 0 ? Math.min(100, (elapsed / nextRestAt) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Voice Reminder"
        description="Pengingat cerdas untuk istirahat berkendara"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Voice Reminder" }]}
      />

      {alarmActive && (
        <div className="fixed inset-0 z-50 bg-red-500/90 flex items-center justify-center">
          <div className="text-center text-white">
            <IconAlertCircle size={80} className="mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold mb-2">WAKTUNYA ISTIRAHAT!</h1>
            <p className="text-xl mb-2">Anda sudah berkendara {formatTime(elapsed)}</p>
            <p className="text-lg mb-6 opacity-80">Istirahat minimal {preset.restLabel}</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={dismissAlarm} variant="secondary" size="lg">
                <IconCheck size={18} className="mr-2" />
                Sudah Istirahat
              </Button>
              <Button onClick={stopJourney} variant="outline" size="lg" className="text-white border-white/30">
                Akhiri Perjalanan
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Utama */}
        <Card className="glass-card">
          <CardContent className="p-8 text-center space-y-6">
            {!started ? (
              <>
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <IconCar size={40} className="text-primary" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">Mulai Perjalanan</h2>
                  <p className="text-sm text-muted-foreground">
                    Pilih durasi perjalanan Anda
                  </p>
                </div>

                <div className="flex gap-2 justify-center flex-wrap">
                  {PRESETS.map((p, i) => (
                    <Button
                      key={p.hours}
                      variant={selectedPreset === i ? "default" : "outline"}
                      onClick={() => setSelectedPreset(i)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground">Anda akan diingatkan untuk istirahat</p>
                  <p className="text-2xl font-bold mt-1">setiap {preset.restLabel}</p>
                </div>

                <Button size="lg" className="w-full gradient-primary text-white" onClick={startJourney}>
                  <IconCar size={20} className="mr-2" />
                  Mulai Perjalanan
                </Button>
              </>
            ) : (
              <>
                <Badge className="mb-2" variant="default">Perjalanan Aktif</Badge>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Waktu Berkendara</p>
                  <p className="text-5xl font-bold font-mono">{formatTime(elapsed)}</p>
                </div>

                <div className="w-full max-w-xs mx-auto">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Istirahat berikutnya</span>
                    <span className="font-medium">{formatTime(remainingToRest)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000"
                      style={{ width: `${progressToRest}%` }}
                    />
                  </div>
                </div>

                <Button size="lg" variant="destructive" className="w-full" onClick={stopJourney}>
                  <IconPlayerStop size={20} className="mr-2" />
                  Akhiri Perjalanan
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Card Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Jadwal Istirahat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PRESETS.map((p, i) => (
              <div
                key={p.hours}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedPreset === i && started
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedPreset === i && started ? "bg-primary" : "bg-muted-foreground/30"
                  }`} />
                  <span className="text-sm font-medium">{p.label} berkendara</span>
                </div>
                <span className="text-sm text-muted-foreground">istirahat {p.restLabel}</span>
              </div>
            ))}

            {started && (
              <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Tips Keselamatan
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Berhenti di tempat yang aman dan terang</li>
                  <li>• Regangkan tubuh minimal 5 menit</li>
                  <li>• Minum air putih yang cukup</li>
                  <li>• Jangan mengemudi setelah minum obat anti kantuk</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
