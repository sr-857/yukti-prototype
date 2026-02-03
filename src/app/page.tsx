"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SDGLogo } from '@/components/logos/SDGLogo';
import { YuktiLogo } from '@/components/logos/YuktiLogo';
import { MapPin, Truck, ShieldCheck, Zap, Globe, ArrowRight, Coins, Recycle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWaste } from '@/core/context/WasteContext';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-100 animate-pulse flex items-center justify-center">Loading Live Map...</div>
});

export default function LandingPage() {
  const { pickups } = useWaste();
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 selection:text-green-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <YuktiLogo className="h-8 w-8" />
          <span className="text-xl font-black tracking-tighter uppercase italic text-green-600">YUKTI</span>
          <Badge variant="outline" className="ml-2 border-green-200 text-green-600 text-[10px] font-black tracking-widest uppercase">SDG 12</Badge>
        </div>

        <div className="flex gap-4">
          <Link href="/citizen">
            <Button variant="ghost" className="text-sm font-bold uppercase tracking-wider">Citizen</Button>
          </Link>
          <Link href="/collector">
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-bold uppercase tracking-wider px-6">Collector</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3 fill-current" /> Next-Gen Waste Routing & Bidding
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              SMART <span className="text-green-600">GUWAHATI</span> <br />
              STARTS HERE.
            </h1>
            <p className="text-xl text-zinc-500 max-w-lg font-medium leading-relaxed">
              YUKTI (युक्ति) is an intelligent waste management ecosystem focusing on SDG 12, connecting citizens with collectors through real-time optimized routing and market-linked bidding.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/citizen">
                <Button className="bg-green-600 hover:bg-green-700 text-white h-16 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-green-200 group">
                  I'm a Citizen <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/collector">
                <Button variant="outline" className="h-16 px-10 text-lg font-bold rounded-2xl border-2 border-zinc-200 hover:bg-zinc-50">
                  I'm a Collector
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[650px] bg-zinc-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl z-0"
          >
            <div className="absolute inset-0 z-0 opacity-80 grayscale-[0.2]">
              <Map pickups={pickups.slice(0, 15)} zoom={12} isLanding={true} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent pointer-events-none z-10" />

            {/* Floating Stats */}
            <div className="absolute top-10 left-10 p-6 bg-white/90 backdrop-blur shadow-2xl rounded-3xl border border-white space-y-2 z-20">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Feed</p>
              <p className="text-4xl font-black">GUWAHATI</p>
            </div>

            <div className="absolute bottom-10 right-10 p-6 bg-zinc-900 shadow-2xl rounded-3xl border border-zinc-800 space-y-2 text-white z-20">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Nodes</p>
              <p className="text-4xl font-black text-green-400">{pickups.length}+</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Process */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Simple Process</h2>
            <p className="text-zinc-500 font-medium">From request to collection in 4 easy steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-100 -z-10" />

            {[
              { step: 1, title: "Select Location", desc: "Choose your household from 50+ registered locations" },
              { step: 2, title: "Choose Waste Type", desc: "Wet, Dry, or E-Waste with source segregation" },
              { step: 3, title: "Submit Request", desc: "Your request appears on collector dashboard with real-time bid" },
              { step: 4, title: "Get Collected", desc: "Collector follows optimized route and earns market rates" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-6 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-green-200">
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Categories & Market Rates */}
      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">Targeting <span className="text-green-400">Source Segregation</span></h2>
              <p className="text-zinc-400 text-lg font-medium">Following Assam Government market trends for Urban Wards in Guwahati.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <Trash2 className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold uppercase">Wet Waste</h4>
                    <span className="text-green-400 font-black">₹15/Bag</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Organic waste, food scraps, vegetable peels, garden waste. Critical for composting.</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Recycle className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold uppercase">Dry Waste</h4>
                    <span className="text-blue-400 font-black">₹25/Bag</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Plastic, paper, cardboard, metal, glass. Direct feeding to recycling centers.</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400">
                  <Zap className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold uppercase">E-Waste</h4>
                    <span className="text-red-400 font-black">₹150/Unit</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Electronics, batteries, chargers. Handled with specialized hazardous protocols.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 bg-green-500/20 blur-[100px] rounded-full" />
            <div className="relative p-8 bg-zinc-800 rounded-[3rem] border border-zinc-700 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Coins className="text-yellow-400 h-6 w-6" />
                  <h3 className="text-xl font-black uppercase italic">Market Bidding Engine</h3>
                </div>
                <div className="p-6 rounded-2xl bg-black/20 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-zinc-500">
                    <span>Pickup ID</span>
                    <span>Bid Value</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="font-mono text-zinc-300">#P-24891</span>
                      <span className="text-green-400 font-black">₹45.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="font-mono text-zinc-300">#P-24892</span>
                      <span className="text-blue-400 font-black">₹25.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="font-mono text-zinc-300">#P-24893</span>
                      <span className="text-red-400 font-black">₹150.00</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 font-medium">Automatic calculation based on waste volume, type, and current Guwahati municipal guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-white rounded-[2rem] shadow-sm border border-zinc-100">
              <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Geo-Precision</h3>
              <p className="text-zinc-500 font-medium">Pin-point accuracy for pickup requests using real-time geolocation mapping across Guwahati wards.</p>
            </div>

            <div className="space-y-4 p-8 bg-white rounded-[2rem] shadow-sm border border-zinc-100">
              <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Smart Routing</h3>
              <p className="text-zinc-500 font-medium">Optimized paths using the Greedy Nearest Neighbor algorithm to reduce fuel and time for urban collectors.</p>
            </div>

            <div className="space-y-4 p-8 bg-white rounded-[2rem] shadow-sm border border-zinc-100">
              <div className="h-12 w-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">SDG 12 Aligned</h3>
              <p className="text-zinc-500 font-medium">Promoting responsible consumption and production through incentivized source segregation systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Guwahati Focus */}
      <section className="py-24 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase italic">Serving <span className="text-green-600 underline decoration-4 underline-offset-8">Guwahati</span></h2>
            <p className="text-xl text-zinc-500 font-medium max-w-2xl">Covering major hubs from Maligaon to Six Mile, Beltola to Chandmari. Our mission is a cleaner Gateway to Northeast India.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Coverage Areas</p>
              <p className="text-5xl font-black tracking-tighter">12+</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Daily Capacity</p>
              <p className="text-5xl font-black tracking-tighter">5.2T</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Citizen Rating</p>
              <p className="text-5xl font-black tracking-tighter">4.9/5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 px-6 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
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
            <p className="text-xs font-bold text-zinc-500 cursor-pointer hover:text-green-600 transition-colors">Waste Guidelines</p>
            <p className="text-xs font-bold text-zinc-500 cursor-pointer hover:text-green-600 transition-colors">Schedule FAQ</p>
            <p className="text-xs font-bold text-zinc-500 cursor-pointer hover:text-green-600 transition-colors">Rewards Program</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Initiative</h4>
            <p className="text-xs font-medium text-zinc-400">
              Built for SDG-12 | Responsible Consumption and Production. Guwahati Smart Ward Prototype v1.0
            </p>
            <div className="flex items-center gap-2">
              <SDGLogo className="h-8 w-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Goal 12 Aligned</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-50 text-center">
          <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
            © 2026 Guwahati Municipal Corporation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
