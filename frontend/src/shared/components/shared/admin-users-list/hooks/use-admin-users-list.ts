'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';

import { useState } from 'react';

export const useAdminUsersList = () => {
  const userPermission = useAppSelector(selectUserPermission);
  const [currentTab, setCurrentTab] = useState<string>('users');
  const [isClient, setIsClient] = useState(false);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('listOfUsersTab', newTab);
  };

  return {
    userPermission,
    currentTab,
    setCurrentTab,
    isClient,
    setIsClient,
    handleTabChange,
  };
};
