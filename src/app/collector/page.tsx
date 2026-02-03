"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useWaste } from '@/core/context/WasteContext';
import CollectorView from '@/components/views/CollectorView';
import { SDGLogo } from '@/components/logos/SDGLogo';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Ruler, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-100 animate-pulse flex items-center justify-center">Loading Interactive Map...</div>
});

export default function CollectorPage() {
  const { pickups, activeRoute } = useWaste();
  const [routeStats, setRouteStats] = useState<{ distance: number, time: number } | null>(null);

  const handleRouteGenerated = (route: [number, number][], stats: { distance: number, time: number }) => {
    setRouteStats(stats);
  };

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row bg-zinc-50 overflow-hidden">
      {/* Sidebar Panel */}
      <div className="w-full md:w-[450px] h-[60vh] md:h-full z-10 bg-white shadow-2xl flex flex-col border-r border-zinc-200">
        <header className="shrink-0 p-6 border-b bg-indigo-950 text-white relative">
          <Link href="/" className="absolute top-6 right-6 text-indigo-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <SDGLogo className="h-8 w-8" />
            <h1 className="text-2xl font-black tracking-tight uppercase italic text-white">YUKTI</h1>
          </div>
          <div className="flex items-center gap-2 mt-1 opacity-60">
            <ShieldCheck className="h-3 w-3" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase">Guwahati Urban Ward Cmd</p>
          </div>
        </header>

        <div className="flex-1 min-h-0">
          <CollectorView onRouteGenerated={handleRouteGenerated} />
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative h-[40vh] md:h-full">
        <Map pickups={pickups} />


        {/* Route Stats Overlay */}
        {routeStats && (
          <div className="absolute top-6 right-6 z-[1000] w-72">
            <Card className="bg-white/95 backdrop-blur shadow-xl border-indigo-100 overflow-hidden">
              <div className="bg-indigo-600 px-4 py-2">
                <p className="text-white text-xs font-bold uppercase tracking-wider">Active Trip Stats</p>
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Ruler className="h-4 w-4" />
                    <span className="text-sm font-medium">Remaining</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-700">{routeStats.distance.toFixed(2)} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Est. Arrival</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-700">{Math.round(routeStats.time)} mins</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Legend Overlay */}
        <div className="absolute bottom-10 right-6 z-[1000]">
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
