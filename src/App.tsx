import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { NotificationModal } from './components/NotificationModal';
import { modules } from './modules/registry';
import { useNotifications } from './hooks/useNotifications';
import Home from './pages/Home';
import Export from './pages/Export';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const { 
    activeNotification, 
    handleSnooze, 
    handleComplete, 
    handleClose 
  } = useNotifications();

  return (
    <Router>
      <div className="app-container" style={{ paddingBottom: '80px' }}>
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/export" element={<Export />} />
            <Route path="/settings" element={<Settings />} />
            {modules.map((module) => (
              <Route 
                key={module.id} 
                path={module.route} 
                element={<module.component />} 
              />
            ))}
          </Routes>
        </Suspense>
        <NavBar />
        
        {activeNotification && (
          <NotificationModal
            moduleName={activeNotification.moduleName}
            motivation={activeNotification.motivation}
            onSnooze={handleSnooze}
            onComplete={handleComplete}
            onClose={handleClose}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
