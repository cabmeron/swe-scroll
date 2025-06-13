
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-amber-100 hover:bg-amber-200 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-amber-300 dark:border-gray-600"
    >
      {theme === 'light' ? (
        <span className="text-2xl">🌙</span>
      ) : (
        <span className="text-2xl">☀️</span>
      )}
    </Button>
  );
};

export default ThemeToggle;
