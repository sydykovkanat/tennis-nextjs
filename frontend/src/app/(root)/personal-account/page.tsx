'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import dynamic from 'next/dynamic';

const UserCabinet = dynamic(
  () => import('@/shared/components/shared/personal-account/personal-account/personal-account'),
  {
    ssr: false,
  },
);

const ProtectedRoute = dynamic(() => import('@/shared/components/shared/protected-route/protected-route'), {
  ssr: false,
});

export default function Page() {
  const userPermission = useAppSelector(selectUserPermission);

  return (
    <ProtectedRoute isAllowed={userPermission >= 1}>
      <UserCabinet />
    </ProtectedRoute>
  );
}
