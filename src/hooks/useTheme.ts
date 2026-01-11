import { useState, useEffect } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Prefer previously chosen theme; otherwise default to dark
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';

    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return {
    theme,
    toggleTheme
  };
}