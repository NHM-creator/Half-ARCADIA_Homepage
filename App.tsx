import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import StarryBackground from './components/StarryBackground';
import { RoleType } from './types';

// Page Components
import Home from './pages/Home';
import StoryPage from './pages/StoryPage';
import ContentsPage from './pages/ContentsPage';
import ClassesPage from './pages/ClassesPage';

// Wrapper to handle location-based logic if needed
const AppContent = () => {
  const [currentRole, setCurrentRole] = useState<RoleType>('DEALER');
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-gold selection:text-midnight relative flex flex-col">
      {/* Background stays fixed across all pages */}
      <StarryBackground role={currentRole} />
      
      {/* Main Content Area - grows to fill space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/classes" element={<ClassesPage role={currentRole} setRole={setCurrentRole} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;