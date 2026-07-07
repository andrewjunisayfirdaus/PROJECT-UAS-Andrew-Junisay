"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { IconBell, IconAlarm, IconAlertCircle, IconClock } from "@tabler/icons-react";
import { toast } from "sonner";

function useSimpleCountdown(initial: number) {
  const [total, setTotal] = useState(initial);
  const [seconds, setSeconds] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newTotal?: number) => {
    const t = newTotal ?? total;
    setTotal(t);
    setSeconds(t);
    setIsRunning(false);
  };
  const formatted = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return { seconds, isRunning, start, pause, reset, formatted };
}

export default function VoiceReminderPage() {
  const [alarmActive, setAlarmActive] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [remindersSent, setRemindersSent] = useState(3);
  const countdown = useSimpleCountdown(300);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const ensureAudioContext = useCallback(async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playAlarmSound = useCallback(async () => {
    try {
      const audioCtx = await ensureAudioContext();
      const pattern = [
        { freq: 880, start: 0, dur: 0.15 },
        { freq: 660, start: 0.15, dur: 0.15 },
        { freq: 880, start: 0.3, dur: 0.15 },
        { freq: 660, start: 0.45, dur: 0.15 },
        { freq: 880, start: 0.6, dur: 0.3 },
      ];

      for (const note of pattern) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = note.freq;
        osc.type = "square";
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime + note.start);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + note.start + note.dur);
        osc.start(audioCtx.currentTime + note.start);
        osc.stop(audioCtx.currentTime + note.start + note.dur);
      }
    } catch {
      // AudioContext not available
    }
  }, [ensureAudioContext]);

  const triggerAlarm = useCallback(() => {
    setAlarmActive(true);
    playAlarmSound();
    toast.warning("ALARM AKTIF! Waktunya istirahat!");
    setTimeout(() => setAlarmActive(false), 3000);
  }, [playAlarmSound]);

  useEffect(() => {
    if (countdown.seconds === 0 && countdown.isRunning) {
      triggerAlarm();
      setRemindersSent((p) => p + 1);
      countdown.reset();
    }
  }, [countdown.seconds, countdown.isRunning, triggerAlarm, countdown]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Voice Reminder"
        description="Pengingat cerdas untuk istirahat berkendara"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Voice Reminder" }]}
      />

      {alarmActive && (
        <div className="fixed inset-0 z-50 bg-red-500/90 flex items-center justify-center animate-pulse">
          <div className="text-center text-white">
            <IconAlertCircle size={80} className="mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold mb-2">WAKTUNYA ISTIRAHAT!</h1>
            <p className="text-xl">Anda sudah berkendara terlalu lama</p>
            <Button
              onClick={() => setAlarmActive(false)}
              variant="secondary"
              size="lg"
              className="mt-6"
            >
              Matikan Alarm
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAlarm size={20} /> Test Alarm
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Klik untuk menguji alarm peringatan
            </p>
            <Button onClick={triggerAlarm} size="lg" className="gradient-primary text-white w-full">
              <IconBell size={18} className="mr-2" />
              Test Alarm
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock size={20} /> Countdown Istirahat
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{countdown.formatted}</span>
            </div>
            <div className="flex gap-2 justify-center mb-4">
              <Button size="sm" variant="outline" onClick={() => countdown.reset()}>
                Reset
              </Button>
              {countdown.isRunning ? (
                <Button size="sm" variant="outline" onClick={countdown.pause}>
                  Pause
                </Button>
              ) : (
                <Button size="sm" onClick={countdown.start}>
                  Start
                </Button>
              )}
            </div>
            <div className="flex gap-2 justify-center">
              {[1, 5, 10, 15].map((mins) => (
                <Button
                  key={mins}
                  size="sm"
                  variant="outline"
                  onClick={() => countdown.reset(mins * 60)}
                >
                  {mins}m
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBell size={20} /> Reminder Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Status</span>
              <Badge variant={reminderEnabled ? "default" : "secondary"}>
                {reminderEnabled ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Reminder Hari Ini</span>
              <span className="font-bold">{remindersSent}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Interval</span>
              <span className="font-medium">Setiap 30 menit</span>
            </div>
            <Button
              variant={reminderEnabled ? "outline" : "default"}
              className="w-full"
              onClick={() => setReminderEnabled(!reminderEnabled)}
            >
              {reminderEnabled ? "Nonaktifkan" : "Aktifkan"} Reminder
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
