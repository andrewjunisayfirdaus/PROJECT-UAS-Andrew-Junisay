"use client";

import { createContext, useContext } from "react";
import { useCarConnection } from "@/hooks/use-car-connection";

interface CarData {
  rpm: number;
  speed: number;
  engineTemp: number;
  fuelLevel: number;
  checkEngine: boolean;
  odometer: number;
  tripDistance: number;
}

interface CarContextType {
  isSupported: boolean;
  isConnected: boolean;
  isScanning: boolean;
  deviceName: string;
  error: string | null;
  carData: CarData;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const CarContext = createContext<CarContextType>({
  isSupported: false,
  isConnected: false,
  isScanning: false,
  deviceName: "",
  error: null,
  carData: {
    rpm: 0,
    speed: 0,
    engineTemp: 90,
    fuelLevel: 75,
    checkEngine: false,
    odometer: 0,
    tripDistance: 0,
  },
  connect: async () => {},
  disconnect: () => {},
});

export function CarProvider({ children }: { children: React.ReactNode }) {
  const car = useCarConnection();

  return (
    <CarContext.Provider value={car}>
      {children}
    </CarContext.Provider>
  );
}

export const useCar = () => useContext(CarContext);
