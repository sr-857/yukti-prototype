"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useWaste } from '@/core/context/WasteContext';
import CitizenView from '@/components/views/CitizenView';
import GreenWallet from '@/components/views/GreenWallet';
import { SDGLogo } from '@/components/logos/SDGLogo';
import { YuktiLogo } from '@/components/logos/YuktiLogo';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowLeft, Coins, Wallet, Map as MapIcon, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-100 animate-pulse flex items-center justify-center">Loading Interactive Map...</div>
});

export default function CitizenPage() {
  const { pickups, citizenPoints } = useWaste();
  const [activeView, setActiveView] = useState<'map' | 'wallet'>('map');

  if (activeView === 'wallet') {
    return (
      <div className="relative h-screen w-full bg-[#F8FAFC] overflow-hidden flex flex-col">
        <nav className="p-4 border-b bg-white flex justify-between items-center z-50 shadow-sm">
          <div className="flex items-center gap-2">
            <YuktiLogo className="h-6 w-6" />
            <span className="font-black text-sm uppercase tracking-tighter text-green-600">YUKTI</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('map')}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-green-600 transition-colors"
            >
              <MapIcon className="h-4 w-4" /> Map View
            </button>
            <Link href="/">
              <ArrowLeft className="h-5 w-5 text-zinc-400" />
            </Link>
          </div>
        </nav>
        <div className="flex-1 overflow-auto">
          <GreenWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row bg-zinc-50 overflow-hidden">
      {/* Sidebar Panel */}
      <div className="w-full md:w-[450px] h-[60vh] md:h-full z-10 bg-white shadow-2xl flex flex-col border-r border-zinc-200">
        <header className="shrink-0 p-6 border-b bg-zinc-900 text-white relative">
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <button
              onClick={() => setActiveView('wallet')}
              className="text-zinc-400 hover:text-green-400 transition-colors"
              title="Green Wallet"
            >
              <Wallet className="h-5 w-5" />
            </button>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <YuktiLogo className="h-8 w-8" />
            <h1 className="text-2xl font-black tracking-tight uppercase italic text-green-600">YUKTI</h1>
          </div>

          <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">Citizen Initiative • SDG 12</p>

          <div className="mt-4 bg-white/10 rounded-2xl px-4 py-3 flex items-center justify-between border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Earned Rewards</span>
              <span className="text-2xl font-black flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                {citizenPoints}
              </span>
            </div>
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Verified</Badge>
          </div>
        </header>

        <div className="flex-1 min-h-0">
          <CitizenView />
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative h-[40vh] md:h-full">
        <Map pickups={pickups} />

        {/* Legend Overlay */}
        <div className="absolute bottom-10 right-6 z-[1000] hidden md:block">
          <Card className="bg-white/90 backdrop-blur-sm shadow-md border-zinc-200">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Wet Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs font-medium">Dry Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs font-medium">E-Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-400" />
                <span className="text-xs font-medium">Picked Up</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
