# YUKTI (युक्ति) - Smart Waste Management Ecosystem

![YUKTI SDG 12 Aligned](public/images/sdg12.png)

**Smart Source Segregation & Optimized Ward Collection platform for Guwahati Municipal Corporation.**

YUKTI is a comprehensive digital solution designed to modernize waste management in Guwahati. Built specifically to address **UN Sustainable Development Goal 12 (SDG 12)**, the platform incentivizes citizens to segregate waste at the source while providing collectors with AI-driven route optimization and market-linked bidding.

---

## 🏛 Project Architecture

The project follows a modern, type-safe architecture using Next.js 15 and React.

### Folder Structure Reorganization (Tight)
```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── citizen/          # Citizen dashboard & pickup flow
│   ├── collector/        # Collector mission control
│   └── layout.tsx        # Global providers & root layout
├── components/           # Reorganized Component Library
│   ├── ui/               # Primary UI primitives (Shadcn/UI)
│   ├── logos/            # Branding & SDG assets
│   ├── views/            # Domain-specific page views
│   └── Map.tsx           # Interactive Leaflet Map Engine
├── context/              # Centralized State Management (WasteContext)
├── hooks/                # Custom React Hooks
├── lib/                  # Utilities & Routing Algorithms
│   └── utils/            # Greedy Nearest Neighbor logic
└── public/               # Static assets & Localized SDG images
```

---

## � End-to-End Workflow

### 1. Citizen Participation
- **Login/Access**: Citizens enter the portal to manage their household waste.
- **Schedule Pickup**: Select a location (from 50+ registered Guwahati Ward points), waste type (Wet/Dry/E-waste), and preferred slot.
- **Reporting**: Report bin overflows with **photo evidence** via the integrated visual evidence upload system.
- **Rewards**: Earn **Green Points (GP)** for every pickup. GP can be redeemed for vouchers (Groceries, Compost, Tax Rebates).

### 2. Collector Missions
- **Live Queue**: Collectors receive a real-time feed of pickup requests.
- **Route Optimization**: The system uses a **Greedy Nearest Neighbor (NN)** algorithm to calculate the most fuel-efficient route from the collector's start point.
- **Bidding Engine**: Each pickup has a market-linked bid value based on current Guwahati municipal waste rates.
- **Execution**: Collectors follow the interactive map, marking nodes as "Picked" to update the global state and earn GP for the citizen.

### 3. Monitoring & SDG Compliance
- **GMC Command**: All data (overflow reports, pickup efficiency) is tracked for compliance with SDG 12 targets.
- **Live Feed**: The main landing page features a live feed of active nodes and coverage areas across Guwahati.

---

## 🛠 Technical Specifications

- **Next.js 15 (App Router)**: Leveraging Server Components and optimized routing.
- **Tailwind CSS 4**: Modern design system with premium HSL palettes.
- **Leaflet & OpenStreetMap**: Geo-precision mapping without reliance on expensive third-party APIs.
- **Better-Auth**: Secure, Vercel-ready authentication layer.
- **Framer Motion**: Smooth, micro-animated user experience.

---

## � Deployment Guide

### Vercel Ready
The project is explicitly configured for Vercel:
- **`.npmrc`**: Configured with `legacy-peer-deps=true` for stable builds.
- **`vercel.json`**: Defined build settings for Next.js.
- **Security**: Patched for CVE-2025-66478.

### 💻 Local Development

Follow these steps to run the project on your local machine:

1. **Install Dependencies**:
   Open your terminal in the project root and run:
   ```bash
   npm install --legacy-peer-deps
   ```
   > [!NOTE]
   > We use `--legacy-peer-deps` to handle specific version requirements in the ecosystem.

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **View in Browser**:
   Open **[http://localhost:3000](http://localhost:3000)** in your browser to see the live application.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📞 Initiatives & Contact

**Yukti v1.0 - Guwahati Smart Ward Prototype**
- **Email**: support@yukti.gov.in
- **Helpline**: +91 1800-345-6789
- **SDG 12**: Responsible Consumption and Production.
- **© 2026 Guwahati Municipal Corporation.**
