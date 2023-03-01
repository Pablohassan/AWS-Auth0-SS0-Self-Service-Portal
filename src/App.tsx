import './App.css';
import {useContext} from 'react';
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
  const {domainUrl, oidcClientId} = useConfig();

  return domainUrl && oidcClientId ? (
    <Auth0Provider domain={domainUrl} clientId={oidcClientId} redirectUri={window.location.origin}>
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
                oidcClientId={oidcClientId}
                domain={domainUrl}
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
  );
}
