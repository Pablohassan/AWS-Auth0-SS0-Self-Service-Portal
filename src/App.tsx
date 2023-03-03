import './App.css';
import {useContext} from 'react';
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9007ed7 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)

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
=======
import {Auth0Provider} from '@auth0/auth0-react';
import {Loading} from '@nextui-org/react';
import {useConfig} from './providers/ConfigProvider';
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
import UiProvider from './components/UiProvider';

export default function App() {
  // const {isAuthenticated} = useAuth0();

  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const {domainUrl, oidcClientId} = useConfig();
=======
>>>>>>> d451d9d ([SSP] Chore : 0.0.6, fix useEffect and dependencies)

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
<<<<<<< HEAD
                oidcClientId={undefined}
                domain={undefined}
=======
                oidcClientId={auth0ClientId}
                domain={auth0DomainUrl}
>>>>>>> d451d9d ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
              />
            </UiProvider>
          )}
        </CredentialsProvider>
      </AwsProvider>
    </Auth0Provider>
  ) : (
<<<<<<< HEAD
    <LoginPage />
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
=======
    <Loading size="lg" css={{display: 'flex', mt: 150}}>
      Waiting for configuration...
    </Loading>
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
  );
}
