import React, { useState, useEffect } from 'react';
import { LogProvider } from './context/LogContext';
import InputBox from './components/InputBox';
import RoleSelector from './components/RoleSelector';
import TimeConfig from './components/TimeConfig';
import OutputSection from './components/OutputSection';
import ControlsPanel from './components/ControlsPanel';
import { Moon, Sun, Clock } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  return (
    <LogProvider>
      <div className="app-container">
        <header className="header fade-in">
          <div className="logo-container">
            <Clock className="logo-icon" size={32} />
            <h1 className="title">TimeLog Assistant</h1>
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="main-grid">
          <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="fade-in" style={{ animationDelay: '0.1s' }}>
              <RoleSelector />
            </div>
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <TimeConfig />
            </div>
            <div className="fade-in" style={{ animationDelay: '0.3s', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <ControlsPanel />
            </div>
          </div>
          
          <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <InputBox />
            </div>
            <div className="fade-in" style={{ animationDelay: '0.5s' }}>
              <OutputSection />
            </div>
          </div>
        </main>
      </div>
    </LogProvider>
  );
}

export default App;
