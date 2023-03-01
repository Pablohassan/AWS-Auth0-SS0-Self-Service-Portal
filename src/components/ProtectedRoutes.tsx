import {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';

import {useLocation} from 'react-router-dom';

export default function ProtectedRoutes({children}: any) {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: {targetUrl: location.pathname}
      });
    }
  }, [isAuthenticated, location, loginWithRedirect]);

  return isAuthenticated ? children : null;
}
