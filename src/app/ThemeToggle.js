'use client';

import { useTheme } from '@/app/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      className="p-2 rounded-lg bg-primary text-white dark:bg-secondary dark:text-black"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}