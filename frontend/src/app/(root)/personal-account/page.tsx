import dynamic from 'next/dynamic';

import React from 'react';

const UserCabinet = dynamic(() => import('@/shared/components/shared/personal-account/personal-account'), {
  ssr: false,
});

export default function Page() {
  return <UserCabinet />;
}
