# YUKTI (युक्ति) - Smart Waste Management System

![YUKTI Header](public/images/sdg12.png)

**Smart Source Segregation & Optimized Ward Collection platform for Guwahati Municipal Corporation.**

YUKTI is a next-generation waste management ecosystem built to align with **UN Sustainable Development Goal 12 (SDG 12): Responsible Consumption and Production**. It leverages real-time geolocation, intelligent routing algorithms, and a market-linked bidding system to connect citizens and collectors, bridging the gap between waste generation and efficient recovery.

---

## 🚀 Key Features

### 🏢 For Citizens
- **Smart Scheduling**: Easily schedule wet, dry, or E-waste pickups from 50+ registered urban ward locations.
- **Visual Evidence Reporting**: Report bin overflows directly to the GMC Monitoring Command with photo evidence.
- **Green Wallet**: Earn "Green Points" (GP) for every successful pickup and responsible waste disposal.
- ** Tangible Rewards**: Redeem GP for grocery discounts, free compost bags, or municipal tax rebates.

### 🚛 For Collectors
- **Market-Linked Bidding**: Automatically calculated bid values based on waste volume, type, and current municipal guidelines.
- **Global Optimized Routing**: Uses greedy nearest-neighbor algorithms to minimize fuel consumption and travel time.
- **Live Inventory Dashboard**: Track active pickup requests across Guwahati hubs like Maligaon, Beltola, and Chandmari.

### 🔐 Security & Optimization
- **Enterprise Security**: Fully patched against CVE-2025-66478 to ensure data integrity and platform stability.
- **Vercel Optimized**: Pre-configured for seamless cloud deployment with simplified tracing and dependency management.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Animations**: Framer Motion & Lucide React
- **Maps**: React Leaflet & OpenStreetMap
- **State Management**: React Context API
- **Authentication**: Better-Auth (Optimized for Vercel)

---

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Bun or NPM

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sr-857/yukti-prototype.git
   cd yukti-prototype
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌍 SDG 12 Alignment

YUKTI is more than just a pickup app—it's a platform for civic change. By incentivizing source segregation at the household level, we help Guwahati:
- Reduce landfill pressure.
- High-purity recycling streams.
- Promote circular economy principles in urban Assam.

---

## 📞 Support & Initiative

**Guwahati Smart Ward Prototype v1.0**
- **Support**: support@yukti.gov.in / +91 1800-345-6789
- **HQ**: Panbazar, Guwahati, Assam
- **Initiative**: Built for SDG-12 | © 2026 Guwahati Municipal Corporation. All rights reserved.
