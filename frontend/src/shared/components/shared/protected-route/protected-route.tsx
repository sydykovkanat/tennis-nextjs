import { redirect } from 'next/navigation';

import React, {useEffect} from 'react';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React<Props> = ({ isAllowed, children }) => {
  useEffect(() => {
    if (isAllowed) {
      return children
    }
  }, [])

  return redirect('/404');
};

export default ProtectedRoute;
