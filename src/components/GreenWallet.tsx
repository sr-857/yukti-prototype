"use client";

import React from 'react';
import { useWaste } from '@/context/WasteContext';
import { YuktiLogo } from '@/components/YuktiLogo';
import { SDGLogo } from '@/components/SDGLogo';
import {
  Coins,
  ShoppingBag,
  Leaf,
  FileText,
  ArrowRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Share2,
  Gift,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function GreenWallet() {
  const { citizenPoints, pickups } = useWaste();
  const completedPickups = pickups.filter(p => p.status === 'picked');

  const benefits = [
    {
      id: 1,
      title: "10% Grocery Discount",
      partner: "Partner: Reliance Fresh / Big Bazaar",
      points: 20,
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "from-blue-600 to-indigo-600",
      category: "GROCERIES"
    },
    {
      id: 2,
      title: "Free Compost Bag",
      partner: "Partner: GMC Organic Initiative",
      points: 50,
      icon: <Leaf className="h-6 w-6" />,
      color: "from-green-600 to-emerald-600",
      category: "ECO-FRIENDLY"
    },
    {
      id: 3,
      title: "Municipal Tax Rebate",
      partner: "Partner: Guwahati Municipal Corp",
      points: 100,
      icon: <FileText className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      category: "TAX BENEFIT"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8 overflow-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 font-bold text-[10px] tracking-widest uppercase">
            <Zap className="h-3 w-3 mr-1 fill-current" /> Citizen Appreciation Program
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1E293B]">
            Green <span className="text-green-600">Wallet</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-md leading-relaxed">
            Your contribution to Guwahati's cleanliness translates to tangible rewards.
          </p>
        </div>

        {/* Balance Card */}
        <Card className="w-full md:w-[320px] bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <YuktiLogo className="h-24 w-24" />
          </div>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <Zap className="h-4 w-4" /> Current Balance
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black tracking-tighter text-[#1E293B]">{citizenPoints}</span>
              <span className="text-2xl font-black text-green-600 tracking-tighter">GP</span>
            </div>
            <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-green-100 px-4 py-2 font-black text-[10px] tracking-widest uppercase rounded-full">
              Eco Warrior Status
            </Badge>
          </CardContent>
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
        </Card>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Available Benefits */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-black tracking-tight text-[#1E293B]">Available Benefits</h2>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[2rem] overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all">
                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                  <div className={`w-full md:w-32 bg-gradient-to-br ${benefit.color} flex flex-col items-center justify-center p-6 text-white relative`}>
                    <div className="text-2xl font-black">{benefit.points}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Points</div>
                    <div className="mt-4 bg-white/20 p-2 rounded-xl">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest mb-2 border-zinc-100 text-zinc-400">
                        {benefit.category}
                      </Badge>
                      <h3 className="text-xl font-black text-[#1E293B]">{benefit.title}</h3>
                      <p className="text-sm text-zinc-400 font-medium">{benefit.partner}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Button
                        onClick={() => {
                          if (citizenPoints >= benefit.points) {
                            alert(`🎉 Success! Your voucher for ${benefit.title} has been sent to your registered email.`);
                          }
                        }}
                        disabled={citizenPoints < benefit.points}
                        className={`rounded-2xl h-12 px-8 font-black text-sm uppercase tracking-widest transition-all ${citizenPoints >= benefit.points
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200'
                            : 'bg-zinc-100 text-zinc-400'
                          }`}
                      >
                        {citizenPoints >= benefit.points ? 'Redeem Voucher' : 'Insufficient Balance'}
                      </Button>
                      {citizenPoints < benefit.points && (
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> Needs {benefit.points - citizenPoints} more GP
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Earnings */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-black tracking-tight text-[#1E293B]">Recent Earnings</h2>
            </div>

            <Card className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[2rem] overflow-hidden">
              <CardContent className="p-6">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-6">
                    {completedPickups.length === 0 && (
                      <div className="text-center py-12">
                        <div className="bg-zinc-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="h-8 w-8 text-zinc-200" />
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">No recent earnings yet.</p>
                      </div>
                    )}

                    {completedPickups.map((p, idx) => (
                      <div key={p.id} className="flex items-start gap-4 group">
                        <div className="mt-1 bg-green-50 text-green-600 p-2 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="flex-1 border-b border-zinc-50 pb-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-black text-[#1E293B]">Waste Pickup Confirmed</h4>
                            <span className="text-sm font-black text-green-600">+10</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">
                            {new Date(p.timestamp).toLocaleDateString()} • {p.type} waste
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-start gap-4 group">
                      <div className="mt-1 bg-blue-50 text-blue-600 p-2 rounded-xl">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-black text-[#1E293B]">Daily Login Bonus</h4>
                          <span className="text-sm font-black text-blue-600">+2</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">Today</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <Button variant="ghost" className="w-full mt-6 text-green-600 font-black text-xs uppercase tracking-widest">
                  Full History
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Refer & Multiply */}
          <Card className="bg-[#E2F9EE] border-none rounded-[2.5rem] p-8 space-y-6 overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <Share2 className="h-40 w-40" />
            </div>
            <div className="bg-green-600 h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-200">
              <LayoutGrid className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter text-[#1E293B]">Refer & Multiply</h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                Help your community stay clean and earn 100 GP for every successful referral.
              </p>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText('https://yukti.gov.in/refer/CITIZEN857');
                alert('🚀 Referral link copied to clipboard!');
              }}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-green-200"
            >
              Share Referral Link
            </Button>
          </Card>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="pt-12 border-t border-zinc-100 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <YuktiLogo className="h-6 w-6" />
            <span className="text-lg font-black tracking-tighter uppercase italic text-green-600">YUKTI</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed">
            Smart Source Segregation & Optimized Ward Collection platform for Guwahati Municipal Corporation.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Contact</h4>
          <p className="text-xs font-bold text-zinc-500">support@yukti.gov.in</p>
          <p className="text-xs font-bold text-zinc-500">+91 1800-345-6789</p>
          <p className="text-xs font-bold text-zinc-500">Panbazar, Guwahati, Assam</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Resources</h4>
          <p className="text-xs font-bold text-zinc-500">Waste Guidelines</p>
          <p className="text-xs font-bold text-zinc-500">Schedule FAQ</p>
          <p className="text-xs font-bold text-zinc-500">Rewards Program</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Initiative</h4>
          <p className="text-xs font-medium text-zinc-400">
            Built for SDG-12 | Responsible Consumption and Production. Guwahati Smart Ward Prototype v1.0
          </p>
          <SDGLogo className="h-8 w-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
        </div>
      </footer>

      <div className="text-center py-8">
        <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
          © 2026 Guwahati Municipal Corporation. All rights reserved.
        </p>
      </div>
    </div>
  );
}
