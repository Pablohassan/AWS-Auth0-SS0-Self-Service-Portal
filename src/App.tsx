import './App.css';
import {useContext} from 'react';
<<<<<<< HEAD
import {Auth0Provider} from '@auth0/auth0-react';
import {Loading} from '@nextui-org/react';
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
import UiProvider from './components/UiProvider';
import {useConfig} from './providers/ConfigProvider';

export default function App() {
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const {auth0DomainUrl, auth0ClientId} = useConfig();

  return auth0DomainUrl && auth0ClientId ? (
    <Auth0Provider domain={auth0DomainUrl} clientId={auth0ClientId}>
      <AwsProvider>
        <CredentialsProvider>
          {credentials => (
            <UiProvider>
              <Navbar
                account={account}
                region={region}
                role={role}
                credentials={credentials.credentials}
                accounts={[]}
                regions={[]}
                roles={[]}
              />
              <RouterProviderSelf
                account={account}
                region={region}
                role={role}
                credentials={credentials.credentials}
                oidcClientId={auth0ClientId}
                domain={auth0DomainUrl}
              />
            </UiProvider>
          )}
        </CredentialsProvider>
      </AwsProvider>
    </Auth0Provider>
  ) : (
    <Loading size="lg" css={{display: 'flex', mt: 150}}>
      Waiting for configuration...
    </Loading>
=======
import {useAuth0} from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import LoginPage from './pages/LoginPage';
import RouterProviderSelf from './providers/RouterProviderSelf';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';

export default function App() {
  const {isAuthenticated} = useAuth0();
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);

  return isAuthenticated ? (
    <AwsProvider>
      <CredentialsProvider>
        {credentials => (
          <>
            <Navbar account={account} region={region} role={role} credentials={credentials.credentials} />
            <RouterProviderSelf account={account} region={region} role={role} credentials={credentials.credentials} />
          </>
        )}
      </CredentialsProvider>
    </AwsProvider>
  ) : (
    <LoginPage />
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
  );
}
