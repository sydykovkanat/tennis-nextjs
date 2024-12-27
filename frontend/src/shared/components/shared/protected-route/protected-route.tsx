import { redirect } from 'next/navigation';

import React, { useEffect } from 'react';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  useEffect(() => {
    if (!isAllowed) {
      return redirect('/404');
    }
  }, [isAllowed]);

  return isAllowed && children;
};

export default ProtectedRoute;
