"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const HEART_RATE_SERVICE_UUID = 0x180d;
const HEART_RATE_MEASUREMENT_UUID = 0x2a37;
const BATTERY_SERVICE_UUID = 0x180f;
const BATTERY_LEVEL_UUID = 0x2a19;

interface UseBluetoothHeartRateReturn {
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

function parseHeartRate(value: DataView): number {
  const flags = value.getUint8(0);
  const is16Bit = (flags & 0x01) === 1;

  if (is16Bit) {
    return value.getUint16(1, true);
  }
  return value.getUint8(1);
}

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export function useBluetoothHeartRate(): UseBluetoothHeartRateReturn {
  const [heartRate, setHeartRate] = useState(0);
  const [heartRateHistory, setHeartRateHistory] = useState<{ time: string; value: number }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const deviceRef = useRef<BluetoothDevice | null>(null);
  const characteristicRef = useRef<BluetoothCharacteristic | null>(null);
  const batteryCharacteristicRef = useRef<BluetoothCharacteristic | null>(null);

  const isSupported = typeof navigator !== "undefined" && "bluetooth" in navigator;

  const handleHeartRateNotification = useCallback((event: Event) => {
    const target = event.target as BluetoothCharacteristic;
    const value = target.value;
    if (!value) return;

    const hr = parseHeartRate(value);
    setHeartRate(hr);

    const time = getCurrentTime();
    setHeartRateHistory((prev) => {
      const newHistory = [...prev, { time, value: hr }];
      if (newHistory.length > 24) {
        return newHistory.slice(-24);
      }
      return newHistory;
    });
  }, []);

  const readBatteryLevel = useCallback(async (device: BluetoothDevice) => {
    try {
      const server = await device.gatt?.connect();
      if (!server) return;

      const batteryService = await server.getPrimaryService(BATTERY_SERVICE_UUID);
      const batteryChar = await batteryService.getCharacteristic(BATTERY_LEVEL_UUID);

      batteryCharacteristicRef.current = batteryChar;

      const batteryValue = await batteryChar.readValue();
      if (batteryValue) {
        setBatteryLevel(batteryValue.getUint8(0));
      }
    } catch {
      // Battery service is optional, ignore errors
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isSupported) {
      setError("Browser Anda tidak mendukung Web Bluetooth. Gunakan Chrome atau Edge.");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [HEART_RATE_SERVICE_UUID] }],
        optionalServices: [BATTERY_SERVICE_UUID],
      });

      deviceRef.current = device;
      setDeviceName(device.name || "Unknown Device");

      device.addEventListener("gattserverdisconnected", () => {
        setIsConnected(false);
        setDeviceName("");
        setHeartRate(0);
        characteristicRef.current = null;
      });

      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error("Gagal terhubung ke device");
      }

      const service = await server.getPrimaryService(HEART_RATE_SERVICE_UUID);
      const characteristic = await service.getCharacteristic(HEART_RATE_MEASUREMENT_UUID);
      characteristicRef.current = characteristic as unknown as BluetoothCharacteristic;

      await (characteristic as any).startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", handleHeartRateNotification);

      setIsConnected(true);

      // Read battery level
      await readBatteryLevel(device);

      // Initial battery read
      try {
        const batteryService = await server.getPrimaryService(BATTERY_SERVICE_UUID);
        const batteryChar = await batteryService.getCharacteristic(BATTERY_LEVEL_UUID);
        const batteryValue = await batteryChar.readValue();
        if (batteryValue) {
          setBatteryLevel(batteryValue.getUint8(0));
        }
      } catch {
        // Battery service optional
      }
    } catch (err: any) {
      if (err.name === "NotFoundError") {
        setError("Tidak ada device yang dipilih.");
      } else if (err.name === "SecurityError") {
        setError("Akses Bluetooth ditolak. Pastikan Bluetooth aktif.");
      } else {
        setError(`Gagal terhubung: ${err.message || "Unknown error"}`);
      }
    } finally {
      setIsScanning(false);
    }
  }, [isSupported, handleHeartRateNotification, readBatteryLevel]);

  const disconnect = useCallback(() => {
    if (characteristicRef.current) {
      try {
        (characteristicRef.current as any).removeEventListener(
          "characteristicvaluechanged",
          handleHeartRateNotification
        );
        (characteristicRef.current as any).stopNotifications();
      } catch {
        // Ignore cleanup errors
      }
    }

    if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    }

    deviceRef.current = null;
    characteristicRef.current = null;
    batteryCharacteristicRef.current = null;
    setIsConnected(false);
    setDeviceName("");
    setHeartRate(0);
    setBatteryLevel(0);
  }, [handleHeartRateNotification]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    heartRate,
    heartRateHistory,
    isConnected,
    isSupported,
    deviceName,
    batteryLevel,
    error,
    isScanning,
    connect,
    disconnect,
  };
}
