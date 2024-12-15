'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';

import { useEffect, useState } from 'react';

export const useAdminUsersList = () => {
  const userPermission = useAppSelector(selectUserPermission);
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const savedTab = sessionStorage.getItem('listOfUsersTab');
    return savedTab || 'users';
  });
  const [isClient, setIsClient] = useState(false);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('listOfUsersTab', newTab);
  };

  useEffect(() => {
    setIsClient(true);
    const savedTab = sessionStorage.getItem('listOfUsersTab');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, [setCurrentTab, setIsClient]);

  return {
    userPermission,
    currentTab,
    setCurrentTab,
    isClient,
    setIsClient,
    handleTabChange,
  };
};
