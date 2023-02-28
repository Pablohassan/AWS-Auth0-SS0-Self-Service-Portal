import {Routes, Route} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {Credentials} from '@aws-sdk/client-sts';
import ProtectedRoutes from '../components/ProtectedRoutes';
import LoginPage from '../pages/LoginPage';
import ListInstancesEC2 from '../pages/startStopEC2';
import NotFoundPage from '../pages/PageError404';

interface Props {
  credentials: Credentials | undefined;
  account: string | undefined;
  region: string | undefined;
  role: string | undefined;
  oidcClientId: string | undefined;
  domain: string | undefined;
}

const RouterProviderSelf: React.FC<Props> = ({credentials, account, region, role}) => {
  const {isAuthenticated} = useAuth0();

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route
            path=""
            element={
              <ProtectedRoutes>
                <ListInstancesEC2 account={account} region={region} role={role} credentials={credentials} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoutes>
                <NotFoundPage />
              </ProtectedRoutes>
            }
          />
        </>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
    </Routes>
  );
};

export default RouterProviderSelf;
