import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const handleQuickScan = () => {
    toast({
      title: "Quick Refresh Scan Initiated",
      description: "Scanning plantation area...",
    });
    
    setTimeout(() => {
      toast({
        title: "Scan Completed",
        description: "All areas scanned successfully",
      });
    }, 3000);
  };
  
  return (
    <header className="flex justify-between items-center pb-6 pt-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <Button 
          onClick={handleQuickScan}
          className="bg-palm-green text-white hover:bg-palm-green/90"
        >
          Refresh Scan
        </Button>
      </div>
    </header>
  );
};

export default Header;
