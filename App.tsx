import React, { useState, useEffect } from 'react';
import { SurahList } from './pages/SurahList';
import { HadithExplorer } from './pages/HadithExplorer';
import { Bookmarks } from './pages/Bookmarks';
import { SettingsPage } from './pages/Settings';
import { AskAI } from './pages/AskAI';
import { Tools } from './pages/Tools';
import Navbar from './components/Navbar';
import { BrandLogo } from './components/Logo';
import { AppState, FontSize } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('surah');
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('noorayan_state');
    return saved ? JSON.parse(saved) : {
      bookmarks: { surahs: [], hadiths: [] },
      theme: 'light',
      fontSize: 'medium',
      language: 'bn',
      autoPlay: true
    };
  });

  useEffect(() => {
    localStorage.setItem('noorayan_state', JSON.stringify(appState));
    
    if (appState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const sizes = {
      small: { arabic: '1.5rem', bengali: '0.875rem' },
      medium: { arabic: '1.875rem', bengali: '1rem' },
      large: { arabic: '2.25rem', bengali: '1.125rem' }
    };
    const currentSize = sizes[appState.fontSize] || sizes.medium;
    document.documentElement.style.setProperty('--arabic-size', currentSize.arabic);
    document.documentElement.style.setProperty('--bengali-size', currentSize.bengali);
    
  }, [appState]);

  const toggleBookmark = (type: 'surah' | 'hadith', id: any) => {
    setAppState(prev => {
      const collection = type === 'surah' ? 'surahs' : 'hadiths';
      const current = prev.bookmarks[collection] as any[];
      const exists = current.includes(id);
      const updated = exists 
        ? current.filter(i => i !== id)
        : [...current, id];
      
      return {
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [collection]: updated
        }
      };
    });
  };

  const updateSettings = (key: keyof AppState, value: any) => {
    setAppState(prev => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'surah': return <SurahList language={appState.language} bookmarks={appState.bookmarks.surahs} onToggleBookmark={(id) => toggleBookmark('surah', id)} />;
      case 'hadith': return <HadithExplorer language={appState.language} bookmarks={appState.bookmarks.hadiths} onToggleBookmark={(id) => toggleBookmark('hadith', id)} />;
      case 'tools': return <Tools language={appState.language} />;
      case 'ask': return <AskAI language={appState.language} />;
      case 'settings': return <SettingsPage state={appState} updateSettings={updateSettings} />;
      default: return <SurahList language={appState.language} bookmarks={appState.bookmarks.surahs} onToggleBookmark={(id) => toggleBookmark('surah', id)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <header className="sticky top-0 bg-[#0f172a] text-white p-4 shadow-xl z-40 flex items-center justify-between border-b border-white/5">
        <BrandLogo />
        <div className="flex items-center space-x-2">
           <div className="px-2 py-1 rounded-md bg-teal-500/10 text-[10px] font-mono font-bold text-teal-400 border border-teal-500/20">
            v1.0.5
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {renderContent()}
      </main>

      <Navbar language={appState.language} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;