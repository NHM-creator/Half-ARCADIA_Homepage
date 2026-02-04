import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import { Mountain, Cog, Skull } from 'lucide-react';

const StoryPage: React.FC = () => {
  const [activeNation, setActiveNation] = useState<string | null>(null);

  // Generate stars locally for this page
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

  const handleNationClick = (nation: string) => {
    setActiveNation(prev => prev === nation ? null : nation);
  };

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen max-w-7xl mx-auto flex flex-col items-center relative">
      
      {/* Stars Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      {/* Top Navigation for Sub-pages */}
      <PageHeader />

      <div className="text-center mb-16 animate-fade-in-down w-full relative z-10">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">The Saga</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white font-bold">아르카디아 : 신이 떠난 낙원</h3>
          {/* Diamond Divider with Animation */}
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-right" style={{ animationDelay: '600ms' }}></div>
             <div className="w-1.5 h-1.5 bg-gold opacity-0 animate-diamond-pop" style={{ animationDelay: '400ms' }}></div>
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-left" style={{ animationDelay: '600ms' }}></div>
          </div>
      </div>
      
      <div className="glass-panel p-6 md:p-12 max-w-6xl text-gray-300 leading-8 space-y-8 font-serif text-lg relative z-10">
        {/* Quote Section */}
        <div className="text-center space-y-4">
            <p className="text-xl md:text-3xl font-bold text-white border-y border-white/10 py-8 px-4 leading-normal">
            "별의 운명을 결정하는 것은<br className="md:hidden"/> 신이 아니라, <span className="text-gold">당신</span>입니다."
            </p>
        </div>
        
        {/* Intro Text - Centered & Larger */}
        <div className="prose prose-invert max-w-5xl mx-auto space-y-8 px-2 md:px-8">
            <p className="text-center text-xl md:text-2xl leading-relaxed text-gray-200">
            <span className="text-gold font-bold text-3xl md:text-4xl align-middle">태</span>초의 신들이 무의 공간에서 질서와 빛으로 낙원 <strong className="text-white">'아르카디아'</strong>를 창조했습니다.<br/>그러나 그 완벽한 질서를 시기한 심연의 혼돈 군주들이 <br className="hidden md:block"/> 차원의 벽을 찢고 침공을 시작하며, 낙원은 불길에 휩싸였습니다.
            </p>
            <p className="text-center text-xl md:text-2xl leading-relaxed text-gray-200">
            신들은 수천 년에 걸친 '신화 대전' 끝에 자신들의 영혼을 코어에 갈아 넣어 <br className="hidden md:block"/> 군주들을 차원의 틈새에 봉인했습니다.<br/><br/>그 대가로 신들은 육신을 잃고 영원한 잠에 빠져들었으며, <br className="hidden md:block"/> 그들의 권능은 대지 곳곳에 파편으로 흩어졌습니다.<br/><br/>그러나 오랜 세월이 흘러 신들의 힘이 희미해지자, <br className="hidden md:block"/> 균열 너머에서 다시금 군주들의 속삭임이 들려오기 시작했습니다.
            </p>
        </div>

        {/* Divider */}
        <div className="py-8 flex items-center justify-center gap-4 opacity-50">
             <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1"></div>
             <div className="w-2 h-2 rotate-45 bg-gold"></div>
             <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1"></div>
        </div>

        {/* Nations Section Title */}
        <div className="text-center mb-8">
            <h3 className="text-2xl text-white font-bold mb-2">분열된 대륙, 세 개의 힘</h3>
            <p className="text-sm text-gray-500">각기 다른 신념으로 아르카디아를 지탱하는 3대 강국</p>
        </div>

        {/* Enhanced Nation Cards with Undulating Effects */}
        <div className="grid md:grid-cols-3 gap-8">
           {/* East: Nature/Gold/Green */}
           <div 
             className={`relative group rounded-xl transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${activeNation === 'EAST' ? 'scale-105 z-10' : ''}`}
             onClick={() => handleNationClick('EAST')}
           >
             {/* Undulating Glow Effect */}
             <div className={`absolute -inset-1 bg-emerald-500/40 rounded-xl blur-xl opacity-0 transition duration-500 animate-pulse ${activeNation === 'EAST' ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>
             
             {/* Card Content */}
             <div className={`relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1a1f0a] to-black border transition-colors duration-300 p-8 shadow-lg ${activeNation === 'EAST' ? 'border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-emerald-900/30 group-hover:border-emerald-400/80 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]'}`}>
                <div className={`absolute top-0 right-0 p-4 transition-opacity transform duration-700 ${activeNation === 'EAST' ? 'opacity-30 scale-110' : 'opacity-10 group-hover:opacity-30 group-hover:scale-110'}`}>
                  <Mountain size={80} className="text-emerald-500" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-emerald-400 font-bold text-2xl mb-1 flex items-center gap-3">
                        <Mountain size={24} />
                        동방 제국
                    </h4>
                    <p className="text-xs text-emerald-100/40 uppercase tracking-[0.2em] mb-6 font-sans">Eastern Empire</p>
                    <div className={`h-px bg-emerald-500/50 mb-6 transition-all duration-700 ${activeNation === 'EAST' ? 'w-full' : 'w-12 group-hover:w-full'}`}></div>
                    <p className={`text-base leading-relaxed font-sans transition-colors ${activeNation === 'EAST' ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    자연과 조화를 이루는<br/>무술과 정령술의 본고장.<br/>울창한 산림 속에 가려진<br/>신비로운 힘을 숭상하며,<br/>고대의 전통을 지키는<br/>무인들의 나라입니다.
                    </p>
                </div>
             </div>
           </div>

           {/* West: Machine/Blue */}
           <div 
             className={`relative group rounded-xl transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${activeNation === 'WEST' ? 'scale-105 z-10' : ''}`}
             onClick={() => handleNationClick('WEST')}
           >
             {/* Undulating Glow Effect */}
             <div className={`absolute -inset-1 bg-blue-500/40 rounded-xl blur-xl opacity-0 transition duration-500 animate-pulse ${activeNation === 'WEST' ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>

             {/* Card Content */}
             <div className={`relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0a1525] to-black border transition-colors duration-300 p-8 shadow-lg ${activeNation === 'WEST' ? 'border-blue-400/80 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-blue-900/30 group-hover:border-blue-400/80 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'}`}>
                <div className={`absolute top-0 right-0 p-4 transition-opacity transform duration-700 ${activeNation === 'WEST' ? 'opacity-30 scale-110' : 'opacity-10 group-hover:opacity-30 group-hover:scale-110'}`}>
                  <Cog size={80} className="text-blue-500" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-blue-400 font-bold text-2xl mb-1 flex items-center gap-3">
                        <Cog size={24} />
                        서부 연방
                    </h4>
                    <p className="text-xs text-blue-100/40 uppercase tracking-[0.2em] mb-6 font-sans">Western Federation</p>
                    <div className={`h-px bg-blue-500/50 mb-6 transition-all duration-700 ${activeNation === 'WEST' ? 'w-full' : 'w-12 group-hover:w-full'}`}></div>
                    <p className={`text-base leading-relaxed font-sans transition-colors ${activeNation === 'WEST' ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    증기기관과 마도공학이<br/>융합된 강철의 대지.<br/>하늘을 뒤덮은 공장 연기와<br/>거대한 톱니바퀴가 돌아가는,<br/>혁신과 이성의 산업 국가입니다.
                    </p>
                </div>
             </div>
           </div>

           {/* South: Dark/Purple (Updated from Red) */}
           <div 
             className={`relative group rounded-xl transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${activeNation === 'SOUTH' ? 'scale-105 z-10' : ''}`}
             onClick={() => handleNationClick('SOUTH')}
           >
             {/* Undulating Glow Effect */}
             <div className={`absolute -inset-1 bg-violet-600/40 rounded-xl blur-xl opacity-0 transition duration-500 animate-pulse ${activeNation === 'SOUTH' ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>

             {/* Card Content */}
             <div className={`relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1a051a] to-black border transition-colors duration-300 p-8 shadow-lg ${activeNation === 'SOUTH' ? 'border-violet-500/80 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'border-violet-900/30 group-hover:border-violet-500/80 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'}`}>
                <div className={`absolute top-0 right-0 p-4 transition-opacity transform duration-700 ${activeNation === 'SOUTH' ? 'opacity-30 scale-110' : 'opacity-10 group-hover:opacity-30 group-hover:scale-110'}`}>
                  <Skull size={80} className="text-violet-600" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-violet-500 font-bold text-2xl mb-1 flex items-center gap-3">
                        <Skull size={24} />
                        남부 왕국
                    </h4>
                    <p className="text-xs text-violet-100/40 uppercase tracking-[0.2em] mb-6 font-sans">Southern Kingdom</p>
                    <div className={`h-px bg-violet-500/50 mb-6 transition-all duration-700 ${activeNation === 'SOUTH' ? 'w-full' : 'w-12 group-hover:w-full'}`}></div>
                    <p className={`text-base leading-relaxed font-sans transition-colors ${activeNation === 'SOUTH' ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    흑마법과 고딕 양식이<br/>지배하는 어둠의 대륙.<br/>악마의 힘마저 통제하여<br/>힘으로 승화시킨,<br/>귀족들의 냉혹하지만<br/>강력한 국가입니다.
                    </p>
                </div>
             </div>
           </div>
        </div>

        {/* Footer Text */}
        <div className="mt-12 p-8 bg-gradient-to-r from-transparent via-white/5 to-transparent text-center rounded-xl border-t border-b border-white/5 w-full">
            <p className="text-gray-300 text-lg md:text-xl">
            고대 문명의 유산과 현대의 마법 기술이 공존하는 이 대항해 시대에, 봉인은 한계에 다다랐습니다.<br className="hidden md:block"/>
            이제 아르카디아의 평화는 신의 기적이 아닌, 바로 <strong className="text-gold text-2xl mx-1">'수호자'</strong>인 당신의 칼끝에 달려 있습니다.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;