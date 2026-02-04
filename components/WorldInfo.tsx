import React, { useState, useMemo } from 'react';
import { FEATURES } from '../constants';
import { Sword, Home, Palette } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Sword': <Sword size={32} />,
  'Home': <Home size={32} />,
  'Palette': <Palette size={32} />,
};

const WorldInfo: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Generate random stars for this section
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.4 ? 2 : 1.5,
      animationDelay: `${Math.random() * 4}s`,
      opacity: 0.2 + Math.random() * 0.6
    }));
  }, []);

  // Determine section background style based on hover
  const getSectionBackground = () => {
    switch(hoveredId) {
      case 'raid': return 'bg-[#1a0505] shadow-[inset_0_0_150px_rgba(150,0,0,0.3)]'; // Hellish Red
      case 'guild': return 'bg-[#062c19] shadow-[inset_0_0_150px_rgba(16,185,129,0.3)]'; // Guild Green (Emerald)
      case 'avatar': return 'bg-[#2a0a2a] shadow-[inset_0_0_150px_rgba(216,180,254,0.2)]'; // Avatar Purple/Pink
      default: return 'bg-transparent';
    }
  };

  const handleInteraction = (id: string) => {
    setHoveredId(prev => prev === id ? null : id);
  };

  return (
    <section 
      id="world" 
      className={`py-24 px-4 md:px-12 relative overflow-hidden transition-colors duration-1000 ease-in-out ${getSectionBackground()}`}
    >
      {/* Background Gradient to blend with page, fades when effect is active to show color better */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-midnight/50 to-midnight/80 pointer-events-none transition-opacity duration-700 ${hoveredId ? 'opacity-30' : 'opacity-100'}`}></div>

      {/* Stars Layer */}
      <div className="absolute inset-0 pointer-events-none">
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
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sunset-red/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">Game Features</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-bold">아르카디아 콘텐츠</h3>
          {/* Diamond Divider with Animation */}
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-right" style={{ animationDelay: '600ms' }}></div>
             <div className="w-1.5 h-1.5 bg-gold opacity-0 animate-diamond-pop" style={{ animationDelay: '400ms' }}></div>
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-left" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const isHovered = hoveredId === feature.id;
            
            // Define visual effects based on feature ID
            let borderClass = "group-hover:border-gold/50";
            let overlayEffect = null;
            let iconColor = 'text-gold';
            let lineColor = 'bg-gradient-to-r from-gold to-magenta';

            if (feature.id === 'raid') {
                borderClass = "group-hover:border-red-600";
                iconColor = isHovered ? 'text-red-500' : 'text-gold';
                lineColor = 'bg-red-600';
                overlayEffect = (
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent mix-blend-overlay"></div>
                    <div className="absolute bottom-0 w-full h-1/2 bg-red-600/10 blur-xl animate-pulse"></div>
                  </div>
                );
            } else if (feature.id === 'guild') {
                borderClass = "group-hover:border-emerald-500";
                iconColor = isHovered ? 'text-emerald-400' : 'text-gold';
                lineColor = 'bg-emerald-500';
                overlayEffect = (
                   <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/80 via-teal-500/10 to-transparent mix-blend-overlay"></div>
                    <div className="absolute -left-1/2 top-0 w-full h-full bg-emerald-400/10 blur-2xl animate-pulse transform rotate-45"></div>
                  </div>
                );
            } else if (feature.id === 'avatar') {
                borderClass = "group-hover:border-fuchsia-400";
                iconColor = isHovered ? 'text-fuchsia-300' : 'text-gold';
                lineColor = 'bg-fuchsia-400';
                overlayEffect = (
                   <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-fuchsia-200/10 to-transparent mix-blend-soft-light"></div>
                    <div className="absolute inset-0 bg-white/5 blur-xl animate-pulse"></div>
                  </div>
                );
            }

            return (
              <div 
                key={feature.id} 
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleInteraction(feature.id)}
                className={`group relative h-[500px] overflow-hidden rounded-sm border border-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-midnight/30 backdrop-blur-sm cursor-pointer ${borderClass}`}
              >
                {/* Background Images */}
                <div className="absolute inset-0 bg-black">
                   {/* Default Image */}
                   <div 
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 ${feature.hoverImageUrl && isHovered ? 'opacity-0' : 'opacity-100'}`}
                      style={{ backgroundImage: `url(${feature.imageUrl})` }}
                   ></div>
                   
                   {/* Hover Image (if exists) */}
                   {feature.hoverImageUrl && (
                      <div 
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${feature.hoverImageUrl})` }}
                      ></div>
                   )}
                </div>
                
                {/* Dark Overlay - Fades out slightly on hover to reveal image more, but keeps text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60"></div>

                {/* Specific Hover Effect Layer */}
                {overlayEffect}

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className={`mb-4 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] ${iconColor}`}>
                    {iconMap[feature.icon]}
                  </div>
                  
                  <h4 className="text-2xl font-serif font-bold text-white mb-2 transition-transform duration-300">
                    {feature.title}
                  </h4>
                  
                  <h5 className="text-sm text-gray-400 uppercase tracking-wider mb-4 transition-transform duration-300 whitespace-pre-line">
                    {feature.subtitle}
                  </h5>
                  
                  {/* Description: Initially hidden (h-0), expands on hover/active. This pushes the above content up naturally. */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-300 font-sans leading-relaxed text-sm whitespace-pre-line pb-4">
                        {feature.description}
                      </p>
                  </div>

                  {/* Animated Line */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 transition-all duration-700 group-hover:w-full ${lineColor}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorldInfo;