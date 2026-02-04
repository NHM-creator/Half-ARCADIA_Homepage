import React from 'react';

const notices = [
  { id: 1, type: '[공지]', title: '12월 대규모 업데이트 안내', date: '2024.12.01' },
  { id: 2, type: '[이벤트]', title: '신규 유저 정착 지원 패키지 지급', date: '2024.11.28' },
  { id: 3, type: '[점검]', title: '서버 안정화를 위한 임시 점검', date: '2024.11.25' },
  { id: 4, type: '[공지]', title: '클래스 밸런스 조정 사항', date: '2024.11.20' },
  { id: 5, type: '[이벤트]', title: '겨울맞이 출석체크 이벤트', date: '2024.11.15' },
];

const CommunityPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen max-w-5xl mx-auto">
       <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">Community</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-bold">소식 & 커뮤니티</h3>
          <div className="h-1 w-20 bg-gold mx-auto mt-6"></div>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="bg-white/5 p-4 border-b border-white/10 flex font-bold text-gold text-sm md:text-base">
          <div className="w-20 text-center">분류</div>
          <div className="flex-1 text-center">제목</div>
          <div className="w-32 text-center">날짜</div>
        </div>
        {notices.map((notice) => (
          <div key={notice.id} className="p-4 border-b border-white/5 flex text-sm md:text-base hover:bg-white/5 transition-colors cursor-pointer text-gray-300 hover:text-white">
             <div className="w-20 text-center text-gold/80">{notice.type}</div>
             <div className="flex-1 px-4 truncate">{notice.title}</div>
             <div className="w-32 text-center text-gray-500">{notice.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;