import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ROUTES = [
  { path: '/', label: 'HOME' },
  { path: '/story', label: 'WORLDVIEW' },
  { path: '/contents', label: 'CONTENTS' },
  { path: '/classes', label: 'CLASSES' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 block">
      <div className="flex flex-col gap-4 lg:gap-6 items-end">
        {ROUTES.map((route) => {
          const isActive = currentPath === route.path;
          return (
            <Link
              key={route.path}
              to={route.path}
              className={`
                group flex items-center gap-2 transition-all duration-300
                ${isActive ? 'text-gold' : 'text-gray-500 hover:text-white'}
              `}
            >
              <span className={`
                font-serif text-[10px] lg:text-sm tracking-widest uppercase transition-all duration-300
                ${isActive 
                  ? 'border-b border-gold pb-1 opacity-100' 
                  : 'border-b border-transparent pb-1 opacity-70 group-hover:opacity-100 hidden md:block'}
              `}>
                {route.label}
              </span>
              <div className={`
                w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300
                ${isActive ? 'bg-gold scale-125' : 'bg-gray-600 group-hover:bg-white'}
              `} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;