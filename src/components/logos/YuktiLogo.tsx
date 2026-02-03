import React from 'react';

export function YuktiLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Infinity Loop (Figure 8) */}
      <path 
        d="M25 50 C25 30 45 30 50 50 C55 70 75 70 75 50 C75 30 55 30 50 50 C45 70 25 70 25 50" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round"
        className="text-green-600"
      />
      {/* Integrated Arrow on the right side of the loop */}
      <path 
        d="M70 42L78 50L70 58" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-green-600"
      />
    </svg>
  );
}
