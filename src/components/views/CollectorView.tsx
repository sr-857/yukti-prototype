"use client";

import { useState } from 'react';
import { useWaste, PickupRequest, WASTE_RATES } from '@/core/context/WasteContext';
import { SDGLogo } from '@/components/logos/SDGLogo';
import { YuktiLogo } from '@/components/logos/YuktiLogo';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { nearestNeighbor, Point, getTotalDistance } from '@/core/lib/utils/routing';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, CheckCircle2, Navigation, Target, MapPin, Coins, TrendingUp } from 'lucide-react';

interface CollectorViewProps {
  onRouteGenerated: (route: [number, number][], stats: { distance: number, time: number }) => void;
}

export default function CollectorView({ onRouteGenerated }: CollectorViewProps) {
  const { pickups, markAsPicked, setCollectorLocation, setActiveRoute, activeRoute, collectorLocation } = useWaste();
  const [isTravelling, setIsTravelling] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<PickupRequest | null>(null);
  const pendingPickups = pickups.filter(p => p.status === 'pending');

  const totalRouteValue = pendingPickups.reduce((sum, p) => sum + (WASTE_RATES[p.type] || 0), 0);

  const simulateTrip = async (route: [number, number][]) => {
    setIsTravelling(true);
    for (let i = 0; i < route.length; i++) {
      setCollectorLocation(route[i]);

      const atPickup = pendingPickups.find(p => p.lat === route[i][0] && p.lng === route[i][1]);
      if (atPickup) {
        setCurrentDestination(atPickup);
        await new Promise(resolve => setTimeout(resolve, 800)); // Pause at destination
        markAsPicked(atPickup.id);
        setCurrentDestination(null);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setIsTravelling(false);
    setCollectorLocation(null);
    setActiveRoute(null);
  };

  const handleGenerateRoute = () => {
    if (pendingPickups.length === 0) {
      alert('No pending pickups to route!');
      return;
    }

    const start: Point = { lat: 26.1445, lng: 91.7362, id: 'START' };
    const points: Point[] = pendingPickups.map(p => ({ lat: p.lat, lng: p.lng, id: p.id }));

    const optimizedPath = nearestNeighbor(start, points);
    const distance = getTotalDistance(optimizedPath);
    const estimatedTime = distance * 5;

    const routeCoords: [number, number][] = optimizedPath.map(p => [p.lat, p.lng]);
    setActiveRoute(routeCoords);
    onRouteGenerated(routeCoords, { distance, time: estimatedTime });
  };

  const handleStartTrip = () => {
    if (!activeRoute) return;
    simulateTrip(activeRoute);
  };

  return (
    <div className="space-y-6 flex flex-col h-full overflow-hidden p-6">
      {/* Branding & Route Value */}
      <div className="flex justify-between items-center bg-indigo-950 text-white p-4 rounded-3xl border border-indigo-900 shadow-xl">
        <div className="flex items-center gap-2">
          <YuktiLogo className="h-6 w-6" />
          <span className="font-black text-sm tracking-tighter uppercase italic text-green-400">YUKTI Ops</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
            <Coins className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-black text-green-400">₹{totalRouteValue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-black text-indigo-400">MT: {pendingPickups.length * 0.05}T</span>
          </div>
        </div>
      </div>

      {/* Current Target Card */}
      {currentDestination && (
        <Card className="bg-green-600 text-white border-none shadow-xl animate-in slide-in-from-top duration-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full animate-bounce">
              <Target className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Next Destination</p>
              <p className="text-sm font-black truncate">{currentDestination.address}</p>
              <div className="flex items-center gap-1 mt-1">
                <Coins className="h-3 w-3 text-yellow-300" />
                <span className="text-[10px] font-bold">BID VALUE: ₹{WASTE_RATES[currentDestination.type]}.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-white">
          <div>
            <CardTitle className="text-xl font-black italic">MISSION QUEUE</CardTitle>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">SDG 12 Urban Ward Operations</p>
          </div>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1 font-black">
            {pendingPickups.length} NODES
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 bg-zinc-50/50">
          <ScrollArea className="h-full px-4">
            <div className="space-y-3 py-6">
              {pickups.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center gap-4 text-zinc-300">
                  <div className="p-6 bg-zinc-100 rounded-full">
                    <Navigation className="h-12 w-12 opacity-40" />
                  </div>
                  <p className="font-bold uppercase tracking-widest text-sm">No Missions Available</p>
                </div>
              )}
              {pickups.map((pickup) => {
                const isTarget = currentDestination?.id === pickup.id;
                const bid = WASTE_RATES[pickup.type];
                return (
                  <div
                    key={pickup.id}
                    className={`group relative p-4 rounded-2xl border transition-all duration-500 flex justify-between items-center ${isTarget
                      ? 'bg-indigo-50 border-indigo-300 shadow-lg scale-[1.02] z-10'
                      : pickup.status === 'picked'
                        ? 'bg-zinc-100/50 border-zinc-200 opacity-50 grayscale'
                        : 'bg-white shadow-sm border-zinc-200 hover:border-indigo-200 hover:shadow-md'
                      }`}
                  >
                    {isTarget && (
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 bg-indigo-500 rounded-full" />
                    )}

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full shadow-inner ${pickup.type === 'wet' ? 'bg-green-500' :
                            pickup.type === 'dry' ? 'bg-blue-500' : 'bg-red-500'
                            }`} />
                          <span className="font-black text-[9px] tracking-[0.2em] uppercase text-zinc-400">{pickup.type} WASTE</span>
                        </div>
                        {pickup.status === 'pending' && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full border border-green-100">
                            <Coins className="h-2.5 w-2.5 text-green-600" />
                            <span className="text-[10px] font-black text-green-600">₹{bid}</span>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm font-black leading-none ${isTarget ? 'text-indigo-900' : 'text-zinc-800'}`}>
                        {pickup.address}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5" /> Guwahati Urban Ward
                        </span>
                        <span className="text-[10px] font-bold text-zinc-300">|</span>
                        <span className="text-[10px] font-bold text-zinc-400">
                          {new Date(pickup.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 shrink-0">
                      {pickup.status === 'pending' ? (
                        <Button
                          size="sm"
                          variant={isTarget ? "default" : "ghost"}
                          onClick={() => markAsPicked(pickup.id)}
                          className={`rounded-full h-10 w-10 p-0 ${isTarget
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg'
                            : 'text-zinc-300 hover:text-green-600 hover:bg-green-50 border-2 border-dashed border-zinc-100'
                            }`}
                          disabled={isTravelling && !isTarget}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </Button>
                      ) : (
                        <div className="bg-green-100 text-green-700 p-2 rounded-full border border-green-200">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 pt-2">
        {!activeRoute ? (
          <Button
            onClick={handleGenerateRoute}
            disabled={pendingPickups.length === 0}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white h-16 text-lg font-black italic uppercase tracking-tighter shadow-2xl shadow-indigo-200 rounded-2xl group transition-all"
          >
            <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
              Optimize Route <Navigation className="h-5 w-5 fill-current" />
            </span>
          </Button>
        ) : (
          <Button
            onClick={handleStartTrip}
            disabled={isTravelling}
            className="w-full bg-black hover:bg-zinc-900 text-white h-16 text-lg font-black italic uppercase tracking-tighter shadow-2xl shadow-zinc-200 rounded-2xl group transition-all overflow-hidden relative"
          >
            {isTravelling && (
              <div className="absolute inset-0 bg-indigo-600/20 animate-pulse" />
            )}
            <span className="relative z-10 flex items-center gap-3">
              <Play className={`h-6 w-6 fill-current ${isTravelling ? 'animate-pulse' : ''}`} />
              {isTravelling ? 'Executing Trip...' : 'Start Collection'}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
