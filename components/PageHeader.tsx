import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ScrollText, Gamepad2, Swords, Crown } from 'lucide-react';

const PageHeader: React.FC = () => {
  // Styles adapted for responsiveness:
  // - Mobile/Tablet (<lg): flex-1 (fills width equally), smaller text/padding
  // - Desktop (>=lg): fixed width, larger text/padding
  const buttonClass = "group relative flex-1 lg:flex-none lg:w-40 py-2 lg:py-3 bg-gradient-to-r from-gray-900 to-midnight text-gray-200 font-bold font-serif text-[11px] sm:text-xs lg:text-base tracking-widest border border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden rounded-sm lg:rounded-none";
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-8 lg:mb-12 relative z-50">
      {/* 
        Mobile/Tablet Layout: Grid (Row 1: Home + CTA, Row 2: Nav Buttons) 
        Desktop Layout: Flex (Home Left, Nav Center, CTA Right)
      */}
      <div className="grid grid-cols-2 gap-y-3 lg:flex lg:flex-row lg:items-center lg:justify-center relative min-h-[60px] lg:gap-0">
        
        {/* Home Button: Top-Left on Mobile/Tablet, Absolute Left on Desktop */}
        <div className="col-span-1 justify-self-start lg:absolute lg:left-0 lg:justify-self-auto order-1">
          <Link 
            to="/" 
            className="w-10 h-10 lg:w-auto lg:h-auto p-2 lg:p-3 bg-midnight border border-white/20 text-gray-400 hover:text-white hover:border-white hover:scale-110 transition-all rounded-full group flex items-center justify-center"
            aria-label="Home"
          >
            <Home className="w-5 h-5 lg:w-6 lg:h-6 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Destiny CTA: Top-Right on Mobile/Tablet, Absolute Right on Desktop */}
        <div className="col-span-1 justify-self-end lg:absolute lg:right-0 lg:justify-self-auto order-2 lg:order-3">
          <a 
            href="https://share.crack.wrtn.ai/nr6uqy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-3 py-1 lg:px-6 lg:py-3 bg-black text-violet-400 font-bold font-serif text-[10px] lg:text-sm tracking-widest border border-violet-500/30 hover:border-violet-400 hover:text-violet-200 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)] transition-all duration-300 hover:scale-105 clip-path-polygon flex items-center justify-center h-full"
          >
            <div className="flex flex-col lg:flex-row items-center gap-0.5 lg:gap-2 leading-tight lg:leading-normal">
                <span className="flex items-center gap-1">
                   <Crown className="w-3 h-3 lg:w-4 lg:h-4" />
                   운명을
                </span>
                <span>선택하라</span>
            </div>
            {/* Purple inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
        </div>

        {/* Navigation Buttons: Bottom Row (Full Width) on Mobile/Tablet, Center on Desktop */}
        <div className="col-span-2 w-full flex gap-2 lg:w-auto lg:gap-4 justify-center lg:col-auto order-3 lg:order-2">
          {/* Worldview: Yellow (Gold) */}
          <Link to="/story" className={`${buttonClass} hover:border-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]`}>
            <span className="flex items-center gap-1 lg:gap-2 relative z-10 group-hover:text-white transition-colors">
              <ScrollText className="w-3 h-3 lg:w-4 lg:h-4 text-white group-hover:text-gold transition-colors" />
              세계관
            </span>
            <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          
          {/* Contents: Blue */}
          <Link to="/contents" className={`${buttonClass} hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]`}>
            <span className="flex items-center gap-1 lg:gap-2 relative z-10 group-hover:text-white transition-colors">
              <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:text-blue-400 transition-colors" />
              콘텐츠
            </span>
            <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
          </Link>

          {/* Classes: Red */}
          <Link to="/classes" className={`${buttonClass} hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]`}>
            <span className="flex items-center gap-1 lg:gap-2 relative z-10 group-hover:text-white transition-colors">
              <Swords className="w-3 h-3 lg:w-4 lg:h-4 text-white group-hover:text-red-500 transition-colors" />
              클래스
            </span>
            <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PageHeader;