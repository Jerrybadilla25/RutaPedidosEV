'use client';
import { PiSunDuotone, PiMoonLight } from "react-icons/pi";

import { useTheme } from '@/app/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      className="p-2 rounded-lg bg-primary text-white dark:bg-secondary dark:text-black mx-1"
    >
      {theme === 'light' ? <PiMoonLight weight="bold"/> : <PiSunDuotone weight="bold"/>}
    </button>
  );
}