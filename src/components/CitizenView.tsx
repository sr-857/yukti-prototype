"use client";

import { useState } from 'react';
import { useWaste, WasteType, WASTE_RATES, WASTE_DESCRIPTIONS } from '@/context/WasteContext';
import { SDGLogo } from '@/components/SDGLogo';
import { YuktiLogo } from '@/components/YuktiLogo';
import {
  Trash2,
  Truck,
  Clock,
  CheckCircle2,
  Info,
  Coins,
  TriangleAlert,
  Camera,
  Zap,
  MapPin,
  User,
  Phone,
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

export default function CitizenView() {
  const { households, addPickup, reportBinOverflow, pickups, citizenPoints, collectorLocation } = useWaste();
  const [activeTab, setActiveTab] = useState<'pickup' | 'overflow' | 'history'>('pickup');

  return (
    <div className="flex flex-col h-full bg-zinc-50/50 p-6">
      {/* Navigation Tabs */}
      <div className="flex p-1 bg-zinc-200/50 rounded-2xl gap-1">
        <button
          onClick={() => setActiveTab('pickup')}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'pickup' ? "bg-white shadow-sm text-green-600" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          Schedule Pickup
        </button>
        <button
          onClick={() => setActiveTab('overflow')}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'overflow' ? "bg-white shadow-sm text-orange-600" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          Report Overflow
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'history' ? "bg-white shadow-sm text-zinc-800" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-6 pr-4 custom-scrollbar">
        {activeTab === 'pickup' && <SchedulePickupForm households={households} addPickup={addPickup} citizenPoints={citizenPoints} />}
        {activeTab === 'overflow' && <ReportOverflowForm reportBinOverflow={reportBinOverflow} />}
        {activeTab === 'history' && <PickupHistory pickups={pickups} />}
      </div>
    </div>
  );
}

function SchedulePickupForm({ households, addPickup, citizenPoints }: {
  households: any[],
  addPickup: (req: any) => void,
  citizenPoints: number
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    householdId: '',
    type: 'wet' as WasteType,
    slot: 'morning'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.householdId && formData.fullName) {
      addPickup(formData);
      // Success feedback
      setFormData({
        fullName: '',
        phone: '',
        householdId: '',
        type: 'wet',
        slot: 'morning'
      });
      alert("✅ Pickup Scheduled Successfully! Our collector will be notified.");
    } else {
      alert("Please fill in your name and select a location.");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden border border-zinc-100">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest text-green-600 bg-green-50 border-green-100 rounded-full px-3 py-1">
                Civic Service Portal
              </Badge>
              <SDGLogo className="h-5 w-5" />
            </div>
            <h2 className="text-[32px] font-black leading-[0.9] text-zinc-900 tracking-tighter">
              Schedule<br />
              <span className="text-green-600">Waste Pickup</span>
            </h2>
            <p className="text-xs font-medium text-zinc-400 mt-2">Targeting Source Segregation in Guwahati Urban Wards.</p>
          </div>

          <div className="bg-zinc-950 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/10">
            <div className="bg-green-500/20 p-2 rounded-xl">
              <Zap className="h-5 w-5 text-green-400 fill-green-400" />
            </div>
            <div>
              <p className="text-[14px] font-black text-green-400 leading-none">+10</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">Green Points</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Full Name</Label>
              <Input
                placeholder="Arjun Das"
                className="bg-zinc-50 border-none rounded-2xl h-12 px-5 font-bold text-sm focus:ring-2 focus:ring-green-500/20"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Phone Number</Label>
              <Input
                placeholder="+91 98765 43210"
                className="bg-zinc-50 border-none rounded-2xl h-12 px-5 font-bold text-sm focus:ring-2 focus:ring-green-500/20"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Guwahati Ward / Area</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, householdId: v })} value={formData.householdId}>
              <SelectTrigger className="bg-zinc-50 border-none rounded-2xl h-14 px-5 font-bold text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <SelectValue placeholder="Select your location" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-2xl max-h-[300px]">
                {households.map(h => (
                  <SelectItem key={h.id} value={h.id} className="font-bold py-3">
                    <div className="flex flex-col">
                      <span>{h.address}</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{h.area}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Source Segregation (Waste Category)</Label>
            <div className="grid grid-cols-1 gap-3">
              {(['wet', 'dry', 'e-waste'] as WasteType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                    formData.type === type
                      ? "bg-white border-green-600 text-zinc-900 shadow-lg"
                      : "bg-zinc-50 border-transparent text-zinc-400 hover:bg-zinc-100"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    type === 'wet' ? "bg-green-100 text-green-600" : type === 'dry' ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                  )}>
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black capitalize">{type} Waste</p>
                    <p className="text-[10px] font-medium leading-tight text-zinc-400 mt-0.5">{WASTE_DESCRIPTIONS[type]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-green-600">₹{WASTE_RATES[type]}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-300">Market Rate</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Preferred Collection Slot</Label>
            <div className="grid grid-cols-3 gap-3">
              {['Morning', 'Afternoon', 'Evening'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData({ ...formData, slot: slot.toLowerCase() })}
                  className={cn(
                    "py-4 rounded-2xl border-2 transition-all font-bold text-sm capitalize",
                    formData.slot === slot.toLowerCase()
                      ? "bg-zinc-900 border-zinc-900 text-white shadow-lg"
                      : "bg-zinc-50 border-transparent text-zinc-400 hover:bg-zinc-100"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-[24px] h-16 font-black text-lg shadow-xl shadow-green-600/20 active:scale-95 transition-transform"
            >
              Confirm Schedule
            </Button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, fullName: '', householdId: '' })}
              className="text-sm font-bold text-zinc-900 px-4"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Market Trends Footer */}
      <div className="bg-zinc-900 text-white p-6 rounded-[32px] border border-zinc-800 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-green-500/10 p-2 rounded-xl">
            <Info className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">Urban Ward Trends</p>
            <p className="text-xs font-medium text-zinc-400">Following Assam Govt. market trends for Guwahati.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(WASTE_RATES).map(([type, rate]) => (
            <div key={type} className="bg-white/5 rounded-xl p-3 border border-white/5">
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{type}</p>
              <p className="text-sm font-black text-white">₹{rate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportOverflowForm({ reportBinOverflow }: { reportBinOverflow: (loc: string, desc: string) => void }) {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location) {
      reportBinOverflow(formData.location, formData.description);
      setFormData({ location: '', description: '', image: null });
      alert("⚠️ Overflow Reported! Our rapid response team has been dispatched.");
    } else {
      alert("Please provide the location of the overflow.");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-1">
            <div className="bg-orange-100 p-2 rounded-xl w-fit mb-4">
              <TriangleAlert className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-[32px] font-black leading-[0.9] text-zinc-900 tracking-tighter">
              Report Bin<br />
              <span className="text-orange-600">Overflow</span>
            </h2>
            <p className="text-xs font-medium text-zinc-400 mt-2">Guwahati Rapid Civic Response System.</p>
          </div>
          <SDGLogo className="h-10 w-10 opacity-20" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Exact Location / Landmark</Label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Near Ganeshguri Flyover, Guwahati"
                className="bg-zinc-50 border-none rounded-2xl h-14 pl-12 pr-5 font-bold text-sm focus:ring-2 focus:ring-orange-500/20"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Contextual Description</Label>
            <Textarea
              placeholder="Describe the accumulation level and waste types..."
              className="bg-zinc-50 border-none rounded-[24px] min-h-[140px] px-5 py-4 font-bold text-sm resize-none focus:ring-2 focus:ring-orange-500/20"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div
            onClick={() => document.getElementById('visual-evidence-input')?.click()}
            className={cn(
              "border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center gap-3 group transition-all cursor-pointer",
              formData.image ? "border-orange-500 bg-orange-50/50" : "border-zinc-100 bg-zinc-50/50 hover:border-orange-200"
            )}
          >
            <input
              id="visual-evidence-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFormData({ ...formData, image: file });
              }}
            />
            <div className={cn(
              "shadow-md p-4 rounded-2xl transition-colors",
              formData.image ? "bg-orange-600 text-white" : "bg-white text-zinc-300 group-hover:text-orange-600"
            )}>
              <Camera className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-zinc-900">
                {formData.image ? formData.image.name : "Upload Visual Evidence"}
              </p>
              <p className="text-[10px] font-medium text-zinc-400 mt-1">
                {formData.image ? "Image selected successfully" : "Direct upload to GMC Monitoring Command."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-[24px] h-16 font-black text-lg shadow-xl shadow-orange-600/20 active:scale-95 transition-transform"
            >
              Initiate Urgent Cleanup
            </Button>
          </div>
        </form>
      </div>

      {/* Emergency Contact */}
      <div className="bg-orange-50 border border-orange-100 rounded-[32px] p-6 flex items-center gap-4">
        <div className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-600/20">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">GMC Emergency Helpline</p>
          <p className="text-lg font-black text-zinc-900">+91 361 254 0000</p>
        </div>
      </div>
    </div>
  );
}

function PickupHistory({ pickups }: { pickups: any[] }) {
  return (
    <div className="space-y-4 pb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Request History</h3>
        <Badge className="bg-zinc-900 text-[10px]">{pickups.length} Total</Badge>
      </div>

      <div className="space-y-3">
        {pickups.map((p) => (
          <div key={p.id} className="bg-white border border-zinc-100 rounded-[24px] p-5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                p.status === 'picked' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
              )}>
                {p.status === 'picked' ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
              </div>
              <div>
                <p className="text-sm font-black text-zinc-900">{p.address}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={cn(
                    "text-[8px] font-black uppercase",
                    p.type === 'wet' ? "border-green-200 text-green-600" : p.type === 'dry' ? "border-blue-200 text-blue-600" : "border-red-200 text-red-600"
                  )}>
                    {p.type}
                  </Badge>
                  <span className="text-[10px] font-bold text-zinc-400">₹{p.bidValue}</span>
                  <span className="text-[10px] font-bold text-zinc-300">• {new Date(p.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            {p.status === 'pending' && (
              <Button size="icon" variant="ghost" className="rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {p.status === 'picked' && (
              <div className="text-green-600 flex items-center gap-1">
                <Plus className="h-3 w-3" />
                <span className="text-xs font-black">10</span>
              </div>
            )}
          </div>
        ))}
        {pickups.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[32px]">
            <p className="text-zinc-400 font-bold text-sm">No activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
