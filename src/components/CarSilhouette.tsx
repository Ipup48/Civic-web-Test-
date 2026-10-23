import React from 'react';
import { CivicGeneration } from '../types/car';

interface CarSilhouetteProps {
  generation: CivicGeneration;
  className?: string;
  colorHex?: string;
}

export const CarSilhouette: React.FC<CarSilhouetteProps> = ({
  generation,
  className = 'w-full h-48',
  colorHex = '#dc2626',
}) => {
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#181c25] to-[#0f1118] overflow-hidden select-none ${className}`}>
      {/* Background grid line */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Watermark Generation Code */}
      <div className="absolute right-4 bottom-2 text-7xl font-black italic tracking-tighter text-white/[0.04] pointer-events-none font-heading">
        CIVIC {generation}
      </div>

      <svg
        viewBox="0 0 600 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4/5 max-w-[460px] h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id={`carGrad-${generation}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e2430" />
            <stop offset="50%" stopColor="#2a3243" />
            <stop offset="100%" stopColor="#171b24" />
          </linearGradient>
          <linearGradient id={`redGlow-${generation}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Wheels shadow */}
        <ellipse cx="145" cy="188" rx="42" ry="7" fill="#000000" fillOpacity="0.6" />
        <ellipse cx="455" cy="188" rx="42" ry="7" fill="#000000" fillOpacity="0.6" />

        {/* Civic Body Silhouette varies slightly by generation */}
        {generation === 'FK' ? (
          // FK Hatchback with steep rear spoiler & aggressive front
          <path
            d="M 60 170 
               C 70 148, 100 140, 120 140 
               C 135 140, 150 145, 170 145
               L 220 120
               C 270 95, 330 90, 390 92
               L 470 115
               L 510 135
               L 535 130
               L 540 145
               C 545 155, 545 165, 540 172
               L 495 174
               C 490 145, 420 145, 415 174
               L 185 174
               C 180 145, 110 145, 105 174
               Z"
            fill={`url(#carGrad-${generation})`}
            stroke="#3a4459"
            strokeWidth="2.5"
          />
        ) : (
          // Sedan Profile (FD, FB, FC, FE)
          <path
            d="M 55 170 
               C 65 148, 95 142, 115 142 
               C 130 142, 145 146, 165 146
               L 225 118
               C 280 90, 350 90, 410 102
               L 480 135
               L 535 142
               C 545 150, 545 165, 538 172
               L 495 174
               C 490 145, 420 145, 415 174
               L 185 174
               C 180 145, 110 145, 105 174
               Z"
            fill={`url(#carGrad-${generation})`}
            stroke="#3a4459"
            strokeWidth="2.5"
          />
        )}

        {/* Windows */}
        <path
          d="M 235 124 
             L 320 104 
             C 365 104, 400 112, 420 124 
             L 395 142 
             L 242 142 
             Z"
          fill="#0c0e13"
          stroke="#3b4458"
          strokeWidth="1.5"
        />

        {/* Window Pillar divider */}
        <line x1="325" y1="104" x2="320" y2="142" stroke="#252b39" strokeWidth="3" />

        {/* Headlight LED / Projector */}
        <polygon points="515,142 540,147 528,154 505,150" fill={colorHex} opacity="0.9" />
        <line x1="510" y1="145" x2="540" y2="149" stroke="#fff" strokeWidth="2" opacity="0.8" />

        {/* Taillight C-shape / Type R glow */}
        <path d="M 60 162 L 72 152 L 80 156" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />

        {/* Character line / crease */}
        <path d="M 120 150 Q 300 142 480 146" stroke="#48556f" strokeWidth="1.5" strokeDasharray="6 3" />

        {/* Wheels Front */}
        <circle cx="145" cy="174" r="32" fill="#12151c" stroke="#404a5e" strokeWidth="3" />
        <circle cx="145" cy="174" r="22" fill="#1b202c" stroke="#2c3547" strokeWidth="2" />
        <circle cx="145" cy="174" r="7" fill={colorHex} />
        {/* Wheel spokes */}
        <line x1="145" y1="152" x2="145" y2="196" stroke="#4a5568" strokeWidth="2" />
        <line x1="123" y1="174" x2="167" y2="174" stroke="#4a5568" strokeWidth="2" />
        <line x1="129" y1="158" x2="161" y2="190" stroke="#4a5568" strokeWidth="2" />
        <line x1="129" y1="190" x2="161" y2="158" stroke="#4a5568" strokeWidth="2" />

        {/* Wheels Rear */}
        <circle cx="455" cy="174" r="32" fill="#12151c" stroke="#404a5e" strokeWidth="3" />
        <circle cx="455" cy="174" r="22" fill="#1b202c" stroke="#2c3547" strokeWidth="2" />
        <circle cx="455" cy="174" r="7" fill={colorHex} />
        {/* Wheel spokes */}
        <line x1="455" y1="152" x2="455" y2="196" stroke="#4a5568" strokeWidth="2" />
        <line x1="433" y1="174" x2="477" y2="174" stroke="#4a5568" strokeWidth="2" />
        <line x1="439" y1="158" x2="471" y2="190" stroke="#4a5568" strokeWidth="2" />
        <line x1="439" y1="190" x2="471" y2="158" stroke="#4a5568" strokeWidth="2" />
      </svg>

      {/* Label Badge */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
        <span className="font-semibold text-slate-300">GEN {generation}</span>
        <span>·</span>
        <span>SPECIALIST</span>
      </div>
    </div>
  );
};
