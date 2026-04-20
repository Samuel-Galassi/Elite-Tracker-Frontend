import { useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { setColorScheme } = useMantineColorScheme();

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setColorScheme(theme); // ← sincroniza o Mantine
  }, [theme, setColorScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};
