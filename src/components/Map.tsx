"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PickupRequest, WasteType, useWaste } from '@/core/context/WasteContext';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const truckIcon = L.divIcon({
  className: 'truck-icon',
  html: `<div style="background-color: #6366f1; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; items-center; justify-center; box-shadow: 0 0 10px rgba(0,0,0,0.4);">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-4v6Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const getMarkerIcon = (type: WasteType, status: string) => {
  let color = '#22c55e'; // green for wet
  if (type === 'dry') color = '#3b82f6'; // blue
  if (type === 'e-waste') color = '#ef4444'; // red
  if (status === 'picked') color = '#94a3b8'; // grey

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

interface MapProps {
  center?: [number, number];
  zoom?: number;
  pickups: PickupRequest[];
  route?: [number, number][];
  isLanding?: boolean;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function LandingAnimation() {
  const map = useMap();
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.001;
      const lat = 26.1445 + Math.sin(angle) * 0.005;
      const lng = 91.7362 + Math.cos(angle) * 0.005;
      map.panTo([lat, lng], { animate: true, duration: 2 });
    }, 2000);
    return () => clearInterval(interval);
  }, [map]);
  return null;
}

export default function Map({
  center = [26.1445, 91.7362],
  zoom = 13,
  pickups,
  route,
  isLanding = false
}: MapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { collectorLocation, activeRoute } = useWaste();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-zinc-100 animate-pulse flex items-center justify-center">Loading Map...</div>;

  const displayRoute = route || activeRoute;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={!isLanding}
      zoomControl={!isLanding}
      attributionControl={!isLanding}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isLanding && <ChangeView center={center} zoom={zoom} />}
      {isLanding && <LandingAnimation />}

      {pickups.map((pickup) => (
        <Marker
          key={pickup.id}
          position={[pickup.lat, pickup.lng]}
          icon={getMarkerIcon(pickup.type, pickup.status)}
        >
          <Popup>
            <div className="p-1">
              <p className="font-bold text-sm capitalize">{pickup.type} Waste</p>
              <p className="text-xs text-zinc-600">{pickup.address}</p>
              <p className="text-xs mt-1">Status: <span className={pickup.status === 'picked' ? 'text-green-600' : 'text-amber-600'}>{pickup.status}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}

      {collectorLocation && (
        <Marker position={collectorLocation} icon={truckIcon}>
          <Popup>
            <div className="p-1">
              <p className="font-bold text-sm">YUKTI Collector</p>
              <p className="text-xs text-zinc-600">On duty - Moving to next stop</p>
            </div>
          </Popup>
        </Marker>
      )}

      {displayRoute && displayRoute.length > 0 && (
        <Polyline
          positions={displayRoute}
          pathOptions={{ color: '#6366f1', weight: 4, opacity: 0.7, dashArray: '10, 10' }}
        />
      )}
    </MapContainer>
  );
}
