"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCar } from "@/context/car-provider";
import {
  IconCar,
  IconEngine,
  IconAlertTriangle,
  IconLoader2,
  IconGauge,
  IconThermometer,
  IconGasStation,
} from "@tabler/icons-react";
import { toast } from "sonner";

export function CarConnection() {
  const {
    isConnected,
    isSupported,
    deviceName,
    error,
    isScanning,
    carData,
    connect,
    disconnect,
  } = useCar();

  const handleConnect = async () => {
    if (!isSupported) {
      toast.error("Browser Anda tidak mendukung Web Bluetooth. Gunakan Chrome atau Edge.");
      return;
    }

    try {
      await connect();
      if (!error) {
        toast.success("Mobil terhubung!");
      }
    } catch {
      // Error handled in hook
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info("Mobil terputus.");
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
                Gunakan Chrome atau Edge untuk menghubungkan mobil
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
                <IconCar size={20} className="text-green-500" />
              ) : (
                <IconCar size={20} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {isConnected ? deviceName : "Koneksi Mobil (OBD-II)"}
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
                {isConnected && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconEngine size={14} />
                    {carData.rpm} RPM
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
                    <IconCar size={16} className="mr-2" />
                    Hubungkan Mobil
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {isConnected && (
          <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <IconGauge size={16} className="text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Speed</p>
                <p className="text-sm font-medium">{carData.speed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconEngine size={16} className="text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">RPM</p>
                <p className="text-sm font-medium">{carData.rpm}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconThermometer size={16} className="text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Temp</p>
                <p className="text-sm font-medium">{carData.engineTemp}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconGasStation size={16} className="text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Fuel</p>
                <p className="text-sm font-medium">{Math.round(carData.fuelLevel)}%</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 p-2 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
