import React from 'react';
import { ChevronDown, ScrollText, Gamepad2, Swords, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_VIDEO_PLACEHOLDER } from '../constants';

const Hero: React.FC = () => {
  const buttonBaseClass = "group relative w-52 py-4 bg-gradient-to-r from-gray-900 to-midnight text-gray-200 font-bold font-serif text-lg tracking-widest border border-white/20 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]";
  
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image / Pseudo-Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${HERO_VIDEO_PLACEHOLDER})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full pt-12 md:pt-0">
        
        {/* Logo Area */}
        <div className="mb-4 md:mb-8 opacity-0 animate-[fadeInDown_1s_ease-out_forwards]">
          <h1 className="font-serif text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            ARCADIA
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px w-24 md:w-80 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-right" style={{ animationDelay: '800ms' }}></div>
             <div className="w-2 h-2 bg-gold opacity-0 animate-diamond-spin" style={{ animationDelay: '600ms' }}></div>
             <div className="h-px w-24 md:w-80 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-left" style={{ animationDelay: '800ms' }}></div>
          </div>
        </div>

        {/* Catchphrase */}
        <p 
          className="font-serif text-xl md:text-2xl text-gray-200 mb-8 md:mb-12 tracking-wider drop-shadow-md leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
          style={{ animationDelay: '1000ms' }}
        >
          "신들이 떠난 낙원,<br />구원은 당신의 손에 달려 있습니다."
        </p>

        {/* 3 Main Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8 md:mb-12">
          
          <Link 
            to="/story" 
            className={`${buttonBaseClass} hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]`}
            style={{ animationDelay: '1200ms' }}
          >
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <ScrollText className="w-5 h-5 text-white group-hover:text-gold transition-colors" />
              세계관
            </span>
            <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          
          <Link 
            to="/contents" 
            className={`${buttonBaseClass} hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]`}
            style={{ animationDelay: '1400ms' }}
          >
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <Gamepad2 className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
              콘텐츠
            </span>
            <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
          </Link>

          <Link 
            to="/classes" 
            className={`${buttonBaseClass} hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]`}
            style={{ animationDelay: '1600ms' }}
          >
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <Swords className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
              클래스
            </span>
            <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
          </Link>

        </div>

        {/* Bottom CTA Area */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
           <div className="flex items-center justify-center gap-3">
             <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-right" style={{ animationDelay: '2000ms' }}></div>
             <div className="w-1.5 h-1.5 bg-gold opacity-0 animate-diamond-pop" style={{ animationDelay: '1800ms' }}></div>
             <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-left" style={{ animationDelay: '2000ms' }}></div>
           </div>
           
           <div 
              className="relative group opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{ animationDelay: '2200ms' }}
           >
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              
              <a 
                href="https://share.crack.wrtn.ai/nr6uqy"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-violet-400 font-bold font-serif text-xl tracking-[0.2em] border border-violet-500/50 hover:border-violet-400 hover:text-violet-200 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] transition-all duration-300 hover:scale-105 clip-path-polygon inline-flex items-center gap-3"
              >
                <Crown className="w-6 h-6" />
                운명을 선택하라
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;