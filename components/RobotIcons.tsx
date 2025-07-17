
import React from 'react';

interface IconProps {
  className?: string;
}

// Simplified Sad Robot Icon (inspired by example)
export const SadRobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q50 10 80 30 L85 70 Q50 90 15 70 Z" fill="rgb(200, 200, 200)"/>
    <circle cx="35" cy="45" r="5" fill="rgb(50,50,50)"/>
    <circle cx="65" cy="45" r="5" fill="rgb(50,50,50)"/>
    <path d="M35 65 Q50 55 65 65" stroke="rgb(50,50,50)" strokeWidth="3" fill="none" />
    <rect x="45" y="20" width="10" height="10" fill="rgb(255,0,0)" />
    <line x1="40" y1="20" x2="60" y2="30" stroke="rgb(255,0,0)" strokeWidth="3" />
    <line x1="60" y1="20" x2="40" y2="30" stroke="rgb(255,0,0)" strokeWidth="3" />
  </svg>
);

export const NeutralRobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q50 20 80 30 L85 70 Q50 80 15 70 Z" fill="rgb(200, 200, 200)"/>
    <circle cx="35" cy="45" r="5" fill="rgb(50,50,50)"/>
    <circle cx="65" cy="45" r="5" fill="rgb(50,50,50)"/>
    <line x1="35" y1="65" x2="65" y2="65" stroke="rgb(50,50,50)" strokeWidth="3" />
    <rect x="45" y="15" width="10" height="15" fill="rgb(220, 220, 220)"/>
  </svg>
);

export const HappyRobotIcon: React.FC<IconProps> = ({ className }) => (
 <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q50 20 80 30 L85 70 Q50 80 15 70 Z" fill="rgb(200, 200, 200)"/>
    <circle cx="35" cy="45" r="5" fill="rgb(50,50,50)"/>
    <circle cx="65" cy="45" r="5" fill="rgb(50,50,50)"/>
    <path d="M35 60 Q50 70 65 60" stroke="rgb(50,50,50)" strokeWidth="3" fill="none" />
    <rect x="45" y="15" width="10" height="15" fill="rgb(180, 220, 180)"/>
  </svg>
);

// Generic Process Area Icon that changes based on score
export const ProcessAreaIcon: React.FC<IconProps & { score: number }> = ({ className, score }) => {
  let color = "text-slate-500";
  if (score < 2.5) color = "text-red-500";
  else if (score < 3.5) color = "text-yellow-500";
  else color = "text-green-500";

  return (
    <svg viewBox="0 0 24 24" className={`${className} ${color}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
};
