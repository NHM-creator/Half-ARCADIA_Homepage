import React from 'react';
import { Play } from 'lucide-react';

const MediaPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">Gallery & Video</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-bold">미디어</h3>
          <div className="h-1 w-20 bg-gold mx-auto mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="group relative aspect-video bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-gold transition-all cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
               <Play className="w-12 h-12 text-white/50 group-hover:text-gold transition-colors" />
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
               <span className="text-sm text-gray-300">Cinematic Teaser #{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPage;