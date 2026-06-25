import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    if (!toggleTheme) return;
    
    // Add transition class
    const html = document.documentElement;
    html.classList.add('theme-transitioning');
    
    // Toggle theme
    toggleTheme();
    
    // Remove transition class after animation
    setTimeout(() => {
      html.classList.remove('theme-transitioning');
    }, 600);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={!toggleTheme}
      className="p-2 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold dark:bg-brand-gold/20 dark:hover:bg-brand-gold/30 transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
