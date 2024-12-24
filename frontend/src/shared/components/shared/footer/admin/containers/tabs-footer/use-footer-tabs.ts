import { useEffect, useState } from 'react';

export const useFooterTabs = () => {
  const [footerTab, setFooterTab] = useState<string>('social-network');

  useEffect(() => {
    const savedFooterTab = sessionStorage.getItem('footerTab');
    if (savedFooterTab) {
      setFooterTab(savedFooterTab);
    }
  }, []);

  const handleFooterTabChange = (newTab: string) => {
    setFooterTab(newTab);
    sessionStorage.setItem('footerTab', newTab);
  };

  return { footerTab, handleFooterTabChange };
};
