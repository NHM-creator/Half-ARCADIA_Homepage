import React, { useMemo } from 'react';
import { RoleType } from '../types';

interface StarryBackgroundProps {
  role: RoleType;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ role }) => {
  // Generate random stars only once
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`, // Focus stars on the upper 70% (Navy area)
      size: Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1, // Varied star sizes
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 4}s`,
      opacity: 0.1 + Math.random() * 0.7,
    }));
  }, []);

  const getGradientEndColor = (r: RoleType) => {
    switch (r) {
      case 'TANK': return 'to-tank-blue'; // Navy -> Bright Defense Blue
      case 'SUPPORT': return 'to-support-holy'; // Navy -> Holy Yellow
      case 'DEALER': 
      default: return 'to-sunset-red'; // Navy -> Sunset Red
    }
  };

  const gradientClass = `absolute inset-0 bg-gradient-to-b from-midnight via-[#1a0b2e] ${getGradientEndColor(role)} transition-colors duration-[2000ms] ease-in-out`;

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none">
      {/* Main Gradient Background */}
      <div className={gradientClass}></div>
      
      {/* Stars Container */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size + 2}px rgba(255, 255, 255, 0.6)`
            }}
          />
        ))}
      </div>

      {/* Subtle Noise Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

export default StarryBackground;