import {Routes, Route} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {Credentials} from '@aws-sdk/client-sts';
import ProtectedRoutes from '../components/ProtectedRoutes';
import LoginPage from '../pages/LoginPage';
import ListInstances from '../pages/startStopEC2';
import NotFoundPage from '../pages/PageError404';

interface Props {
  credentials: Credentials | undefined;
  account: string | undefined;
  region: string | undefined;
  role: string | undefined;
  clientId: string | undefined;
  domain: string | undefined;
}

const RouterProviderSelf: React.FC<Props> = ({credentials, account, region, role}) => {
  const {isAuthenticated} = useAuth0();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route
          path=""
          element={
            <ProtectedRoutes>
              <ListInstances account={account} region={region} role={role} credentials={credentials} />
            </ProtectedRoutes>
          }
        />
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterProviderSelf;
