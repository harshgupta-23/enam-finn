import React, { createContext, useContext, useState, useEffect } from 'react';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  // 'desktop' or 'mobile'
  const [viewMode, setViewMode] = useState('desktop');

  // Also track real window width for responsive fallback
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Is effectively mobile if the user selected 'mobile' preview OR the actual window is small (< 768px)
  const isMobile = viewMode === 'mobile' || windowWidth < 768;

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode, isMobile, windowWidth }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}

