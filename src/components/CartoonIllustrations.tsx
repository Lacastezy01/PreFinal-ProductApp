import React from 'react';

export interface IllustrationProps {
  className?: string;
  size?: number | string;
}

export const RoboStock: React.FC<IllustrationProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg robo-stock ${className}`}
  >
    {/* Head & Antenna */}
    <line x1="85" y1="10" x2="85" y2="25" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
    <circle cx="85" cy="8" r="6" fill="#FF168B" stroke="#111111" strokeWidth="4" />
    <polygon points="70,25 100,25 85,15" fill="#36DDE5" stroke="#111111" strokeWidth="4" />
    <rect x="65" y="25" width="40" height="35" rx="6" fill="#36DDE5" stroke="#111111" strokeWidth="5" />
    {/* Eyes & Mouth */}
    <circle cx="75" cy="38" r="4" fill="#111111" />
    <circle cx="95" cy="38" r="4" fill="#111111" />
    <line x1="72" y1="48" x2="98" y2="48" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    {/* Body resting / lying down */}
    <rect x="95" y="38" width="65" height="35" rx="8" fill="#36DDE5" stroke="#111111" strokeWidth="5" />
    {/* Waving hand */}
    <path d="M80 60 C80 80, 105 85, 120 72" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M120 40 Q130 15, 135 25" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
    <circle cx="136" cy="24" r="5" fill="#36DDE5" stroke="#111111" strokeWidth="4" />
    {/* Legs propped up */}
    <path d="M160 55 L175 40 L185 70" stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="180" y="68" width="16" height="8" rx="3" fill="#36DDE5" stroke="#111111" strokeWidth="4" />
  </svg>
);

export const OfflineCat: React.FC<IllustrationProps> = ({ className = '', size = 100 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg offline-cat ${className}`}
  >
    {/* Body */}
    <path
      d="M30 40 C30 20, 40 25, 45 15 C48 10, 52 18, 55 26 C65 24, 75 25, 82 28 C86 18, 90 10, 93 16 C98 25, 105 20, 105 40 C110 50, 115 65, 100 75 C85 85, 40 85, 25 75 C12 65, 10 30, 20 20"
      fill="#FF168B"
      stroke="#111111"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    {/* Whiskers & Face */}
    <circle cx="50" cy="45" r="4" fill="#111111" />
    <circle cx="75" cy="45" r="4" fill="#111111" />
    <path d="M62 52 L60 56 L64 56 Z" fill="#111111" />
    {/* Offline text on body */}
    <text x="63" y="68" textAnchor="middle" fill="#111111" fontFamily="'Bowlby One', cursive" fontSize="11" fontWeight="bold">
      OFFLINE
    </text>
    {/* Legs */}
    <line x1="38" y1="80" x2="38" y2="95" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
    <line x1="48" y1="80" x2="48" y2="95" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
    <line x1="82" y1="80" x2="82" y2="95" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
    <line x1="92" y1="80" x2="92" y2="95" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const SunDude: React.FC<IllustrationProps> = ({ className = '', size = 70 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg sun-dude ${className}`}
  >
    <circle cx="40" cy="40" r="22" fill="#FFB83F" stroke="#111111" strokeWidth="4" />
    {/* Rays */}
    <line x1="40" y1="6" x2="40" y2="14" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="40" y1="66" x2="40" y2="74" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="6" y1="40" x2="14" y2="40" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="66" y1="40" x2="74" y2="40" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="16" y1="16" x2="22" y2="22" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="58" y1="58" x2="64" y2="64" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="16" y1="64" x2="22" y2="58" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    <line x1="58" y1="22" x2="64" y2="16" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
    {/* Face */}
    <circle cx="34" cy="38" r="3" fill="#111111" />
    <circle cx="46" cy="38" r="3" fill="#111111" />
    <path d="M36 45 Q40 50 44 45" stroke="#111111" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const CauldronCreature: React.FC<IllustrationProps> = ({ className = '', size = 90 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg cauldron-creature ${className}`}
  >
    {/* Fire */}
    <path d="M25 85 L35 70 L45 85 L55 65 L65 85 L75 70 L80 85 Z" fill="#FF168B" stroke="#111111" strokeWidth="3.5" />
    <line x1="20" y1="88" x2="85" y2="88" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
    {/* Creature peeking */}
    <ellipse cx="50" cy="38" rx="20" ry="16" fill="#62D99A" stroke="#111111" strokeWidth="4" />
    <circle cx="43" cy="32" r="4" fill="#111111" />
    <circle cx="57" cy="32" r="4" fill="#111111" />
    <rect x="47" y="40" width="6" height="5" fill="#FFFDF2" stroke="#111111" strokeWidth="2" />
    {/* Pot / Cauldron */}
    <ellipse cx="50" cy="46" rx="36" ry="10" fill="#36DDE5" stroke="#111111" strokeWidth="4.5" />
    <path d="M18 48 C15 75, 85 75, 82 48" fill="#36DDE5" stroke="#111111" strokeWidth="4.5" />
  </svg>
);

export const DeliveryBoxDude: React.FC<IllustrationProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg delivery-box ${className}`}
  >
    <rect x="20" y="30" width="60" height="50" rx="8" fill="#FFFDF2" stroke="#111111" strokeWidth="4.5" />
    {/* Tape */}
    <rect x="42" y="30" width="16" height="50" fill="#FFB83F" stroke="#111111" strokeWidth="3" />
    {/* Face */}
    <circle cx="34" cy="48" r="4" fill="#111111" />
    <circle cx="66" cy="48" r="4" fill="#111111" />
    <path d="M35 60 Q50 68 65 60" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* Feet */}
    <circle cx="35" cy="85" r="7" fill="#FF168B" stroke="#111111" strokeWidth="3.5" />
    <circle cx="65" cy="85" r="7" fill="#FF168B" stroke="#111111" strokeWidth="3.5" />
  </svg>
);

export const CartoonHotdog: React.FC<IllustrationProps> = ({ className = '', size = 80 }) => {
  const numSize = typeof size === 'number' ? size : parseFloat(size) || 80;
  return (
    <svg
      width={numSize}
      height={numSize * 0.45}
      viewBox="0 0 120 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cartoon-svg cartoon-hotdog ${className}`}
    >
      {/* Bun */}
      <rect x="8" y="10" width="104" height="34" rx="17" fill="#FFB83F" stroke="#111111" strokeWidth="4" />
      {/* Sausage */}
      <rect x="4" y="18" width="112" height="18" rx="9" fill="#FF168B" stroke="#111111" strokeWidth="3.5" />
      {/* Eyes */}
      <circle cx="55" cy="26" r="3" fill="#111111" />
      <circle cx="65" cy="26" r="3" fill="#111111" />
      <path d="M57 31 Q60 34 63 31" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
};

export const CartoonGlasses: React.FC<IllustrationProps> = ({ className = '', size = 70 }) => {
  const numSize = typeof size === 'number' ? size : parseFloat(size) || 70;
  return (
    <svg
      width={numSize}
      height={numSize * 0.45}
      viewBox="0 0 100 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cartoon-svg cartoon-glasses ${className}`}
    >
      {/* Left lens frame */}
      <circle cx="26" cy="24" r="16" fill="#36DDE5" stroke="#111111" strokeWidth="4.5" />
      {/* Right lens frame */}
      <circle cx="74" cy="24" r="16" fill="#36DDE5" stroke="#111111" strokeWidth="4.5" />
      {/* Bridge */}
      <path d="M42 22 Q50 16 58 22" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Side temples */}
      <path d="M10 20 L2 14" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M90 20 L98 14" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
};

export const CartoonTrain: React.FC<IllustrationProps> = ({ className = '', size = 90 }) => {
  const numSize = typeof size === 'number' ? size : parseFloat(size) || 90;
  return (
    <svg
      width={numSize}
      height={numSize * 0.45}
      viewBox="0 0 130 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cartoon-svg cartoon-train ${className}`}
    >
      {/* Body */}
      <rect x="6" y="10" width="118" height="26" rx="12" fill="#62D99A" stroke="#111111" strokeWidth="4" />
      {/* Windows */}
      <circle cx="25" cy="23" r="5" fill="#111111" />
      <circle cx="45" cy="23" r="5" fill="#111111" />
      <circle cx="65" cy="23" r="5" fill="#111111" />
      <circle cx="85" cy="23" r="5" fill="#111111" />
      <circle cx="105" cy="23" r="5" fill="#111111" />
      {/* Wheels */}
      <circle cx="25" cy="39" r="4" fill="#FF168B" stroke="#111111" strokeWidth="2.5" />
      <circle cx="45" cy="39" r="4" fill="#FF168B" stroke="#111111" strokeWidth="2.5" />
      <circle cx="65" cy="39" r="4" fill="#FF168B" stroke="#111111" strokeWidth="2.5" />
      <circle cx="85" cy="39" r="4" fill="#FF168B" stroke="#111111" strokeWidth="2.5" />
      <circle cx="105" cy="39" r="4" fill="#FF168B" stroke="#111111" strokeWidth="2.5" />
    </svg>
  );
};

export const StarSparkle: React.FC<IllustrationProps> = ({ className = '', size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cartoon-svg star-sparkle ${className}`}
  >
    <path
      d="M20 2 Q22 18 38 20 Q22 22 20 38 Q18 22 2 20 Q18 18 20 2 Z"
      fill="#FFB83F"
      stroke="#111111"
      strokeWidth="2.5"
    />
  </svg>
);

