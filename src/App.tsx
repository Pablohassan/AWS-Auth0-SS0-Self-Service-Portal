import './App.css';
import {useContext} from 'react';
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
            <Navbar
              account={account}
              region={region}
              role={role}
              credentials={credentials.credentials}
              accounts={[]}
              regions={[]}
              roles={[]}
            />
            <RouterProviderSelf account={account} region={region} role={role} credentials={credentials.credentials} />
          </>
        )}
      </CredentialsProvider>
    </AwsProvider>
  ) : (
    <LoginPage />
  );
}
