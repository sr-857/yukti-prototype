import React from 'react';

export function SDGLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <img
      src="/images/sdg12.png"
      alt="SDG 12: Responsible Consumption and Production"
      className={className}
    />
  );
}
