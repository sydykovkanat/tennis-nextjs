import { Container, GradientCircle, gradientCircles } from '@/shared/components/shared';
import dynamic from 'next/dynamic';

import React from 'react';

const UserCabinet = dynamic(() => import('@/shared/components/shared/user-cabinet/user-cabinet'), { ssr: false });

export default function Page() {
  return (
    <Container className={'flex items-center justify-center h-screen'}>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}
      <UserCabinet />
    </Container>
  );
}
