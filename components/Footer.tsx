import React from 'react';
import { MessageCircle, Youtube, Castle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Logo & Rating */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="font-serif text-2xl font-bold text-white tracking-widest">ARCADIA</h2>
          <div className="flex items-center gap-3 border border-gray-700 px-3 py-1 rounded bg-gray-900">
             <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center text-black font-bold text-xs rounded">15+</div>
             <span className="text-xs">폭력성, 유저 간 상호작용</span>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-xs space-y-2">
          <p>&copy; 2024 ARCADIA STUDIO by_NHM. All Rights Reserved.</p>
          <p>Trademarks are the property of their respective owners.</p>
          <div className="flex gap-4 justify-center text-gray-500 mt-2">
            <a href="#" className="hover:text-gold">개인정보처리방침</a>
            <span>|</span>
            <a href="#" className="hover:text-gold">이용약관</a>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-6">
          <a href="https://open.kakao.com/o/syfylSdi" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAE100] hover:scale-110 transition-transform" aria-label="KakaoTalk"><MessageCircle size={24} /></a>
          
          {/* Custom Crack Icon */}
          <a href="https://share.crack.wrtn.ai/0hr7ce" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-transform" aria-label="AI Chat Crack">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path d="M11 4H3L7 12H15L11 4Z" />
               <path d="M21 20H13L9 12H17L21 20Z" />
             </svg>
          </a>
          
          <a href="https://www.youtube.com/@Crack%ED%81%AC%EB%9E%99/shorts" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] hover:scale-110 transition-transform" aria-label="YouTube"><Youtube size={24} /></a>
          <a href="https://crack.wrtn.ai/?pageId=682c89c39d1325983179b65b" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:scale-110 transition-transform" aria-label="Home"><Castle size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;