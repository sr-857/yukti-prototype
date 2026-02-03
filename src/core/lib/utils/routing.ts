export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export interface Point {
  lat: number;
  lng: number;
  id: string;
}

export function nearestNeighbor(start: Point, points: Point[]): Point[] {
  const path: Point[] = [start];
  const remaining = [...points];
  let current = start;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let minDistance = calculateDistance(current.lat, current.lng, remaining[0].lat, remaining[0].lng);

    for (let i = 1; i < remaining.length; i++) {
      const dist = calculateDistance(current.lat, current.lng, remaining[i].lat, remaining[i].lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    current = remaining.splice(nearestIndex, 1)[0];
    path.push(current);
  }

  return path;
}

export function getTotalDistance(path: Point[]): number {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += calculateDistance(path[i].lat, path[i].lng, path[i + 1].lat, path[i + 1].lng);
  }
  return total;
}
