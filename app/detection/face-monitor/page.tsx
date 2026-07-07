"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { IconCamera, IconEye, IconMoodSad, IconPlayerStop, IconPlayerPlay, IconRefresh, IconBell, IconBellOff, IconPlayerPause } from "@tabler/icons-react";
import { Switch } from "@/components/ui/switch";
import { useFaceDetection } from "@/hooks/use-face-detection";

export default function FaceMonitorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [yawnCount, setYawnCount] = useState(2);
  const [driverStatus, setDriverStatus] = useState<"Alert" | "Drowsy" | "Critical">("Alert");
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const [alarmPlayed, setAlarmPlayed] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isModelLoaded,
    isDetecting,
    eyeStatus,
    blinkCount,
    headPosition,
    faceDetected,
    ear,
    resetBlinkCount,
  } = useFaceDetection(videoRef, isCameraActive);

  const playAlarmSound = useCallback(() => {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx || audioCtx.state === "closed") return;

    const beepCount = 3;
    const beepDuration = 0.3;
    const beepInterval = 0.5;

    for (let i = 0; i < beepCount; i++) {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + i * beepInterval);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * beepInterval + beepDuration);

      oscillator.start(audioCtx.currentTime + i * beepInterval);
      oscillator.stop(audioCtx.currentTime + i * beepInterval + beepDuration);
    }
  }, []);

  const stopAlarm = useCallback(() => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    setIsAlarmRinging(false);
    setAlarmPlayed(true);
  }, []);

  useEffect(() => {
    let newStatus: "Alert" | "Drowsy" | "Critical";
    if (blinkCount > 30 || yawnCount > 5) {
      newStatus = "Critical";
    } else if (blinkCount > 20 || yawnCount > 3) {
      newStatus = "Drowsy";
    } else {
      newStatus = "Alert";
    }

    if (newStatus === "Alert") {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
      setIsAlarmRinging(false);
      setAlarmPlayed(false);
    } else if (isAlarmEnabled && !alarmPlayed) {
      playAlarmSound();
      setIsAlarmRinging(true);
      alarmIntervalRef.current = setInterval(() => {
        playAlarmSound();
      }, 2000);
    }

    setDriverStatus(newStatus);
  }, [blinkCount, yawnCount, isAlarmEnabled, alarmPlayed, playAlarmSound]);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      setIsCameraActive(true);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Gagal mengakses kamera";
      setCameraError(error);
      setIsCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const statusColor = {
    Alert: "bg-green-500",
    Drowsy: "bg-yellow-500",
    Critical: "bg-red-500",
  };

  return (
    <div>
      <PageHeader
        title="Face Monitor"
        description="Pantau status wajah dan kantuk real-time"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Face Monitor" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Blink Counter"
          value={blinkCount}
          icon={<IconEye size={20} />}
          description="Kedipan terdeteksi"
        />
        <StatCard
          title="Yawn Counter"
          value={yawnCount}
          icon={<IconMoodSad size={20} />}
          description="Menguap terdeteksi"
        />
        <StatCard
          title="Driver Status"
          value={driverStatus}
          icon={<IconCamera size={20} />}
          description={`Status: ${driverStatus}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCamera size={20} />
              Webcam Feed
              {!isModelLoaded && (
                <Badge variant="secondary" className="ml-auto">
                  Loading Model...
                </Badge>
              )}
              {isModelLoaded && (
                <Badge variant="default" className="ml-auto bg-green-600">
                  Model Ready
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
              {!isCameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  {cameraError ? (
                    <p className="text-red-400 text-sm text-center px-4">{cameraError}</p>
                  ) : (
                    <>
                      <IconCamera size={64} className="text-white/30" />
                      <p className="text-white/50 text-sm">Klik &quot;Nyalakan Kamera&quot; untuk memulai</p>
                    </>
                  )}
                </div>
              )}
              {isCameraActive && !faceDetected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-yellow-400 text-sm bg-black/50 px-3 py-1 rounded-full">
                    Wajah tidak terdeteksi - pastikan wajah terlihat jelas
                  </p>
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isCameraActive ? statusColor[driverStatus] : "bg-gray-500"} animate-pulse`} />
                <span className="text-white text-xs font-medium">{isCameraActive ? driverStatus : "Kamera Mati"}</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white/70 text-xs">
                <span>Eye: {eyeStatus}</span>
                <span>Head: {headPosition}</span>
                <span>EAR: {ear.toFixed(2)}</span>
                {isCameraActive && <span>REC ●</span>}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {!isCameraActive ? (
                <Button onClick={startCamera} className="flex-1" size="sm" disabled={!isModelLoaded}>
                  <IconPlayerPlay size={16} className="mr-2" />
                  {!isModelLoaded ? "Loading Model..." : "Nyalakan Kamera"}
                </Button>
              ) : (
                <Button onClick={stopCamera} variant="destructive" className="flex-1" size="sm">
                  <IconPlayerStop size={16} className="mr-2" />
                  Matikan Kamera
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Driver Status Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm">Eye Status</span>
              <Badge variant={eyeStatus === "Open" ? "default" : eyeStatus === "Closed" ? "destructive" : "secondary"}>
                {eyeStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm">Head Position</span>
              <Badge variant="secondary">{headPosition}</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm">Eye Aspect Ratio</span>
              <Badge variant={ear > 0.21 ? "default" : "destructive"}>
                {ear.toFixed(3)}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm">Face Detected</span>
              <Badge variant={faceDetected ? "default" : "destructive"}>
                {faceDetected ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm">Status Pengemudi</span>
              <Badge className={statusColor[driverStatus] + " text-white"}>
                {driverStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2">
                {isAlarmEnabled ? (
                  <IconBell size={16} className="text-primary" />
                ) : (
                  <IconBellOff size={16} className="text-muted-foreground" />
                )}
                <span className="text-sm">Alarm Pengingat</span>
              </div>
              <Switch
                size="sm"
                checked={isAlarmEnabled}
                onCheckedChange={setIsAlarmEnabled}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetBlinkCount}
                className="flex-1"
              >
                <IconRefresh size={16} className="mr-2" />
                Reset Blinks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setYawnCount((p) => p + 1)}
                className="flex-1"
              >
                Simulate Yawn
              </Button>
            </div>
            {isAlarmRinging && (
              <Button
                variant="destructive"
                size="sm"
                onClick={stopAlarm}
                className="w-full animate-pulse"
              >
                <IconPlayerPause size={16} className="mr-2" />
                Hentikan Alarm
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
