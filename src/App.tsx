import './App.css';
import {useContext} from 'react';
import Navbar from './components/Navbar';
import CredentialsProvider from './providers/CredentialsProvider';
import RouterProviderSelf from './providers/RouterProviderSelf';
import {AccountContext, RegionContext, RoleContext} from './providers/AwsProvider';
import UiProvider from './components/UiProvider';
import {useConfig} from './providers/ConfigProvider';

export default function App() {
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const {auth0DomainUrl, auth0ClientId} = useConfig();

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
  );
}
