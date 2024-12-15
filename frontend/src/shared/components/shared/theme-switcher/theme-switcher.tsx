import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';

import React from 'react';

import styles from './theme-switcher.module.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button className={styles.themeSwitcherButton}>
      {theme === 'dark' ? (
        <SunIcon onClick={() => setTheme('light')} className={styles.themeSwitcherIconSun} />
      ) : (
        <MoonIcon onClick={() => setTheme('dark')} className={styles.themeSwitcherIconMoon} />
      )}
    </button>
  );
};
