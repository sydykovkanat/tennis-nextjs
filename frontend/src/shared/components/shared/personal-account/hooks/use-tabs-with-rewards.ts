'use client';

import { useEffect, useState } from 'react';

export const useTabsWithRewards = () => {
  const [currentTab, setCurrentTab] = useState<string>('personalData');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('personalAccount');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('personalAccount', newTab);
  };

  return { currentTab, handleTabChange };
};
