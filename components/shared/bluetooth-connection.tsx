"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBluetooth } from "@/context/bluetooth-provider";
import {
  IconBluetooth,
  IconBluetoothConnected,
  IconBattery,
  IconAlertTriangle,
  IconLoader2,
} from "@tabler/icons-react";
import { toast } from "sonner";

export function BluetoothConnection() {
  const {
    isConnected,
    isSupported,
    deviceName,
    batteryLevel,
    error,
    isScanning,
    connect,
    disconnect,
  } = useBluetooth();

  const handleConnect = async () => {
    if (!isSupported) {
      toast.error("Browser Anda tidak mendukung Web Bluetooth. Gunakan Chrome atau Edge.");
      return;
    }

    try {
      await connect();
      if (!error) {
        toast.success("Smartwatch terhubung!");
      }
    } catch {
      // Error handled in hook
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info("Smartwatch terputus.");
  };

  if (!isSupported) {
    return (
      <Card className="glass-card border-yellow-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <IconAlertTriangle size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Bluetooth Tidak Didukung</p>
              <p className="text-xs text-muted-foreground">
                Gunakan Chrome atau Edge untuk menghubungkan smartwatch
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isConnected ? "bg-green-500/10" : "bg-muted"
              }`}
            >
              {isConnected ? (
                <IconBluetoothConnected size={20} className="text-green-500" />
              ) : (
                <IconBluetooth size={20} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {isConnected ? deviceName : "Smartwatch"}
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant={isConnected ? "default" : "secondary"}
                  className={
                    isConnected
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : ""
                  }
                >
                  {isConnected ? "Terhubung" : "Terputus"}
                </Badge>
                {isConnected && batteryLevel > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconBattery size={14} />
                    {batteryLevel}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="text-red-500 hover:text-red-600"
              >
                Putuskan
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleConnect}
                disabled={isScanning}
                className="bg-primary"
              >
                {isScanning ? (
                  <>
                    <IconLoader2 size={16} className="animate-spin mr-2" />
                    Memindai...
                  </>
                ) : (
                  <>
                    <IconBluetooth size={16} className="mr-2" />
                    Hubungkan
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 p-2 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
