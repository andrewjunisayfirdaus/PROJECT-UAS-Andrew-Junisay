"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { sosContacts } from "@/dummy";
import { IconAlertTriangle, IconPhone, IconMapPin, IconShare } from "@tabler/icons-react";
import { toast } from "sonner";

export default function SOSPage() {
  const [sosActive, setSosActive] = useState(false);
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

  const playEmergencySound = useCallback(async () => {
    try {
      const audioCtx = await ensureAudioContext();
      const now = audioCtx.currentTime;

      // Siren: fast alternating high-low (3 cycles x 1s = 3s)
      for (let cycle = 0; cycle < 5; cycle++) {
        const t = now + cycle * 0.35;

        // High beep
        const oscH = audioCtx.createOscillator();
        const gainH = audioCtx.createGain();
        oscH.connect(gainH);
        gainH.connect(audioCtx.destination);
        oscH.frequency.value = 1200;
        oscH.type = "square";
        gainH.gain.setValueAtTime(0.7, t);
        gainH.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
        oscH.start(t);
        oscH.stop(t + 0.12);

        // Low beep
        const oscL = audioCtx.createOscillator();
        const gainL = audioCtx.createGain();
        oscL.connect(gainL);
        gainL.connect(audioCtx.destination);
        oscL.frequency.value = 400;
        oscL.type = "square";
        gainL.gain.setValueAtTime(0.7, t + 0.12);
        gainL.gain.exponentialRampToValueAtTime(0.01, t + 0.24);
        oscL.start(t + 0.12);
        oscL.stop(t + 0.24);

        // High again
        const oscH2 = audioCtx.createOscillator();
        const gainH2 = audioCtx.createGain();
        oscH2.connect(gainH2);
        gainH2.connect(audioCtx.destination);
        oscH2.frequency.value = 1200;
        oscH2.type = "square";
        gainH2.gain.setValueAtTime(0.7, t + 0.24);
        gainH2.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        oscH2.start(t + 0.24);
        oscH2.stop(t + 0.35);
      }

      // Wailing siren: continuous frequency sweep (1.5s)
      const wail = audioCtx.createOscillator();
      const wailGain = audioCtx.createGain();
      wail.connect(wailGain);
      wailGain.connect(audioCtx.destination);
      wail.type = "sawtooth";
      wailGain.gain.setValueAtTime(0.5, now + 1.75);
      wailGain.gain.linearRampToValueAtTime(0.01, now + 3.25);
      wail.frequency.setValueAtTime(300, now + 1.75);
      wail.frequency.linearRampToValueAtTime(1200, now + 2.5);
      wail.frequency.linearRampToValueAtTime(300, now + 3.25);
      wail.start(now + 1.75);
      wail.stop(now + 3.25);
    } catch {
      // AudioContext not available
    }
  }, [ensureAudioContext]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const triggerSOS = () => {
    setSosActive(true);
    playEmergencySound();
    toast.error("SOS AKTIF! Menghubungi layanan darurat...");
    setTimeout(() => setSosActive(false), 5000);
  };

  return (
    <div>
      <PageHeader
        title="SOS"
        description="Hubungi layanan darurat dalam keadaan mendesak"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "SOS" }]}
      />

      {sosActive && (
        <div className="fixed inset-0 z-50 bg-red-600/95 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6 animate-pulse">
              <IconAlertTriangle size={64} />
            </div>
            <h1 className="text-4xl font-bold mb-2">SOS AKTIF</h1>
            <p className="text-xl mb-6">Menghubungi layanan darurat...</p>
            <Button onClick={() => setSosActive(false)} variant="secondary" size="lg">
              Batalkan
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <div
              className="w-40 h-40 mx-auto rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all hover:scale-105 active:scale-95 mb-6"
              onClick={triggerSOS}
            >
              <span className="text-white text-4xl font-bold">SOS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tekan tombol SOS untuk menghubungi layanan darurat
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconMapPin size={20} /> Status Lokasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">GPS Aktif</span>
                </div>
                <p className="text-xs text-muted-foreground">Lat: -1.2654, Lng: 116.8307</p>
                <p className="text-xs text-muted-foreground">Balikpapan, Kalimantan Timur</p>
              </div>
              <Button variant="outline" className="w-full">
                <IconShare size={16} className="mr-2" />
                Bagikan Lokasi
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Kontak Darurat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sosContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <IconPhone size={14} className="mr-1" />
                      {contact.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
