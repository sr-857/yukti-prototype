"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import householdData from '@/core/lib/data/households.json';

export type WasteType = 'wet' | 'dry' | 'e-waste';
export type Status = 'pending' | 'picked';

export const WASTE_RATES = {
  wet: 15,    // ₹15 per bag (Standard)
  dry: 25,    // ₹25 per bag
  'e-waste': 150 // ₹150 average per item
};

export const WASTE_DESCRIPTIONS = {
  wet: 'Organic waste, food scraps, vegetable peels, garden waste.',
  dry: 'Plastic bottles, paper, cardboard, metal cans, glass.',
  'e-waste': 'Batteries, old phones, cables, chargers, electronic parts.'
};

export interface PickupRequest {
  id: string;
  householdId: string;
  lat: number;
  lng: number;
  type: WasteType;
  status: Status;
  timestamp: number;
  address: string;
  bidValue: number;
  fullName?: string;
  phone?: string;
  slot?: string;
}

export interface BinOverflow {
  id: string;
  location: string;
  description: string;
  timestamp: number;
  status: 'pending' | 'resolved';
}

export interface Household {
  id: string;
  lat: number;
  lng: number;
  defaultWasteType: string;
  address: string;
  area: string;
}

interface WasteContextType {
  pickups: PickupRequest[];
  binOverflows: BinOverflow[];
  households: Household[];
  addPickup: (request: Partial<PickupRequest>) => void;
  reportBinOverflow: (location: string, description: string) => void;
  cancelPickup: (pickupId: string) => void;
  markAsPicked: (pickupId: string) => void;
  citizenPoints: number;
  collectorLocation: [number, number] | null;
  setCollectorLocation: (loc: [number, number] | null) => void;
  activeRoute: [number, number][] | null;
  setActiveRoute: (route: [number, number][] | null) => void;
}

const WasteContext = createContext<WasteContextType | undefined>(undefined);

export function WasteProvider({ children }: { children: React.ReactNode }) {
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [binOverflows, setBinOverflows] = useState<BinOverflow[]>([]);
  const [citizenPoints, setCitizenPoints] = useState(0);
  const [collectorLocation, setCollectorLocation] = useState<[number, number] | null>(null);
  const [activeRoute, setActiveRoute] = useState<[number, number][] | null>(null);
  const households = householdData as Household[];

  // Persistence
  useEffect(() => {
    const savedPickups = localStorage.getItem('yukti_pickups');
    const savedOverflows = localStorage.getItem('yukti_overflows');
    const savedPoints = localStorage.getItem('yukti_points');
    if (savedPickups) setPickups(JSON.parse(savedPickups));
    if (savedOverflows) setBinOverflows(JSON.parse(savedOverflows));
    if (savedPoints) setCitizenPoints(parseInt(savedPoints));
  }, []);

  useEffect(() => {
    localStorage.setItem('yukti_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('yukti_overflows', JSON.stringify(binOverflows));
  }, [binOverflows]);

  useEffect(() => {
    localStorage.setItem('yukti_points', citizenPoints.toString());
  }, [citizenPoints]);

  const addPickup = (request: Partial<PickupRequest>) => {
    const household = households.find(h => h.id === request.householdId);
    if (!household) return;

    const type = request.type || 'wet';

    const newPickup: PickupRequest = {
      id: `P${Date.now()}`,
      householdId: request.householdId!,
      lat: household.lat,
      lng: household.lng,
      type: type,
      status: 'pending',
      timestamp: Date.now(),
      address: request.address || household.address,
      bidValue: WASTE_RATES[type],
      fullName: request.fullName,
      phone: request.phone,
      slot: request.slot
    };

    setPickups(prev => [newPickup, ...prev]);
  };

  const reportBinOverflow = (location: string, description: string) => {
    const newOverflow: BinOverflow = {
      id: `O${Date.now()}`,
      location,
      description,
      timestamp: Date.now(),
      status: 'pending'
    };
    setBinOverflows(prev => [newOverflow, ...prev]);
  };

  const cancelPickup = (pickupId: string) => {
    setPickups(prev => prev.filter(p => p.id !== pickupId));
  };

  const markAsPicked = (pickupId: string) => {
    setPickups(prev => prev.map(p =>
      p.id === pickupId ? { ...p, status: 'picked' as Status } : p
    ));
    setCitizenPoints(prev => prev + 10);
  };

  return (
    <WasteContext.Provider value={{
      pickups,
      binOverflows,
      households,
      addPickup,
      reportBinOverflow,
      cancelPickup,
      markAsPicked,
      citizenPoints,
      collectorLocation,
      setCollectorLocation,
      activeRoute,
      setActiveRoute
    }}>
      {children}
    </WasteContext.Provider>
  );
}

export function useWaste() {
  const context = useContext(WasteContext);
  if (context === undefined) {
    throw new Error('useWaste must be used within a WasteProvider');
  }
  return context;
}
