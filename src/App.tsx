import './App.css';
import {useContext} from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {Auth0Provider} from '@auth0/auth0-react';
import {Loading} from '@nextui-org/react';
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
=======
=======
>>>>>>> 3ad5f09 ([Integration] Chore : integration rusmir code)
=======
>>>>>>> d9d5994 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
=======
=======
>>>>>>> eec4707 ([Integration] Chore : integration rusmir code)
=======
>>>>>>> 98e79f5 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
import {Auth0Provider} from '@auth0/auth0-react';
import {Loading} from '@nextui-org/react';
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)
import UiProvider from './components/UiProvider';
import {useConfig} from './providers/ConfigProvider';

export default function App() {
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const {auth0DomainUrl, auth0ClientId} = useConfig();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9007ed7 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
=======
>>>>>>> 62a00f0 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
=======
=======
>>>>>>> 9007ed7 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
>>>>>>> bae98b5 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)

<<<<<<< HEAD
=======
<<<<<<< HEAD
  return (
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
            clientId={auth0ClientId}
            domain={auth0DomainUrl}
          />
        </UiProvider>
      )}
    </CredentialsProvider>
=======
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)
=======
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
=======
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
<<<<<<< HEAD
>>>>>>> eec4707 ([Integration] Chore : integration rusmir code)
<<<<<<< HEAD
>>>>>>> 3ad5f09 ([Integration] Chore : integration rusmir code)
=======
=======
=======
    <Loading size="lg" css={{display: 'flex', mt: 150}}>
      Waiting for configuration...
    </Loading>
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
>>>>>>> 98e79f5 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
>>>>>>> d9d5994 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
  );
}
