import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Geometric Compliance Node & Aperture Logo
 * Inspired by high-end tech-legal design (Myriad style):
 * Monolithic geometric cuts, negative space aperture, single precision focal diamond.
 */
export const LogoMark: React.FC<LogoProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top Precision Beam */}
      <path 
        d="M4 8L16 3L28 8L25 10.5L16 6.8L7 10.5L4 8Z" 
        fill="currentColor" 
      />
      {/* Upper Monolith segment */}
      <path 
        d="M5 13L16 8.5L27 13L24 15.5L16 12.2L8 15.5L5 13Z" 
        fill="currentColor"
        opacity="0.8"
      />
      {/* Base Foundation Anchor */}
      <path 
        d="M6 23.5L16 28L26 23.5L26 26L16 30.5L6 26V23.5Z" 
        fill="currentColor" 
      />
      {/* Central Compliance Node / Diamond Aperture */}
      <rect 
        x="13" 
        y="14.5" 
        width="5" 
        height="5" 
        rx="1" 
        className="fill-emerald-400"
        transform="rotate(45 15.5 17)"
      />
      {/* Sub-lateral framing marks */}
      <circle cx="9.5" cy="19.5" r="1.25" fill="currentColor" opacity="0.5" />
      <circle cx="22.5" cy="19.5" r="1.25" fill="currentColor" opacity="0.5" />
    </svg>
  );
};

export default LogoMark;
