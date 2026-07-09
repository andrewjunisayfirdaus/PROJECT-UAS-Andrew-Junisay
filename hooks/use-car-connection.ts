"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface CarData {
  rpm: number;
  speed: number;
  engineTemp: number;
  fuelLevel: number;
  checkEngine: boolean;
  odometer: number;
  tripDistance: number;
}

interface UseCarConnectionReturn {
  isSupported: boolean;
  isConnected: boolean;
  isScanning: boolean;
  deviceName: string;
  error: string | null;
  carData: CarData;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const defaultCarData: CarData = {
  rpm: 0,
  speed: 0,
  engineTemp: 90,
  fuelLevel: 75,
  checkEngine: false,
  odometer: 12543,
  tripDistance: 0,
};

export function useCarConnection(): UseCarConnectionReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [carData, setCarData] = useState<CarData>(defaultCarData);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const deviceRef = useRef<BluetoothDevice | null>(null);

  useEffect(() => {
    setIsSupported("bluetooth" in navigator);
  }, []);

  const simulateCarData = useCallback(() => {
    setCarData((prev) => ({
      ...prev,
      rpm: Math.floor(800 + Math.random() * 2200),
      speed: Math.floor(Math.random() * 120),
      engineTemp: Math.floor(85 + Math.random() * 20),
      fuelLevel: Math.max(0, prev.fuelLevel - Math.random() * 0.1),
      tripDistance: prev.tripDistance + Math.random() * 0.1,
    }));
  }, []);

  const connect = useCallback(async () => {
    if (!("bluetooth" in navigator)) {
      setError("Bluetooth tidak didukung di browser ini");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ["heart_rate"] },
          { namePrefix: "OBD" },
          { namePrefix: "ELM" },
          { namePrefix: "Car" },
        ],
        optionalServices: ["heart_rate"],
      });

      deviceRef.current = device;
      setDeviceName(device.name || "Mobil (OBD-II)");
      setIsConnected(true);

      intervalRef.current = setInterval(simulateCarData, 1000);

      device.addEventListener("gattserverdisconnected", () => {
        setIsConnected(false);
        setDeviceName("");
        setCarData(defaultCarData);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "NotFoundError") {
          setError("Tidak ada perangkat yang dipilih. Pastikan OBD-II adapter aktif.");
        } else {
          setError(`Gagal menghubungkan: ${err.message}`);
        }
      } else {
        setError("Terjadi kesalahan saat menghubungkan");
      }
    } finally {
      setIsScanning(false);
    }
  }, [simulateCarData]);

  const disconnect = useCallback(() => {
    if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    }
    deviceRef.current = null;
    setIsConnected(false);
    setDeviceName("");
    setCarData(defaultCarData);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isSupported,
    isConnected,
    isScanning,
    deviceName,
    error,
    carData,
    connect,
    disconnect,
  };
}
