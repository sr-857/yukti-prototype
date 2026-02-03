export interface GeoEntity {
    id: string;
    type: 'COLLECTOR' | 'BIN' | 'DISPOSAL_CENTER';
    display_name: string;
    accepts: string[];
    lat: number;
    lng: number;
    status?: 'AVAILABLE' | 'UNAVAILABLE';
}

export const GEO_ENTITIES: GeoEntity[] = [
    {
        id: "collector_01",
        type: "COLLECTOR",
        display_name: "Local Waste Collector (Ward 12)",
        accepts: ["plastic", "metal", "paper"],
        lat: 26.1451,
        lng: 91.7368,
        status: "AVAILABLE"
    },
    {
        id: "collector_02",
        type: "COLLECTOR",
        display_name: "Kabadiwala – Ganeshguri",
        accepts: ["paper", "metal"],
        lat: 26.1483,
        lng: 91.7399,
        status: "AVAILABLE"
    },
    {
        id: "bin_01",
        type: "BIN",
        display_name: "Community Recycling Bin",
        accepts: ["plastic", "paper"],
        lat: 26.1439,
        lng: 91.7341
    },
    {
        id: "disposal_ewaste_01",
        type: "DISPOSAL_CENTER",
        display_name: "Authorized E-Waste Center",
        accepts: ["e_waste", "glass"],
        lat: 26.1472,
        lng: 91.7395
    }
];
