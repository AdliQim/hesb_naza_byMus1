
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SimulationProvider } from '@/contexts/SimulationContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SimulationProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          {children}
        </div>
      </SimulationProvider>
    </ThemeProvider>
  );
};

export default Layout;
