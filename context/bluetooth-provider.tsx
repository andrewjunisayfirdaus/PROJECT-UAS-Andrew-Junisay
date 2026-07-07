"use client";

import { createContext, useContext } from "react";
import { useBluetoothHeartRate } from "@/hooks/use-bluetooth-heart-rate";

interface BluetoothContextType {
  heartRate: number;
  heartRateHistory: { time: string; value: number }[];
  isConnected: boolean;
  isSupported: boolean;
  deviceName: string;
  batteryLevel: number;
  error: string | null;
  isScanning: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const BluetoothContext = createContext<BluetoothContextType>({
  heartRate: 0,
  heartRateHistory: [],
  isConnected: false,
  isSupported: false,
  deviceName: "",
  batteryLevel: 0,
  error: null,
  isScanning: false,
  connect: async () => {},
  disconnect: () => {},
});

export function BluetoothProvider({ children }: { children: React.ReactNode }) {
  const bluetooth = useBluetoothHeartRate();

  return (
    <BluetoothContext.Provider value={bluetooth}>
      {children}
    </BluetoothContext.Provider>
  );
}

export const useBluetooth = () => useContext(BluetoothContext);
