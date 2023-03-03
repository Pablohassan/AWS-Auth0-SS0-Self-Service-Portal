import {createContext, useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';

interface Region {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

interface FederationRoleArn {
  arn: string;
  name: string;
}

interface ConfigContextProps {
  auth0DomainUrl: string;
  auth0ClientId: string;
  defaultRegion?: Region;
  defaultRole?: Role;
  federationRoleArn?: FederationRoleArn;
}

export const ConfigContext = createContext<ConfigContextProps>({
  auth0DomainUrl: '',
  auth0ClientId: ''
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const useConfig = () => useContext(ConfigContext);

export function ConfigProvider({children}: ConfigProviderProps) {
  const [auth0DomainUrl, setAuth0Domain] = useState<string>('');
  const [auth0ClientId, setAuth0ClientId] = useState<string>('');
  const [defaultRegion, setDefaultRegion] = useState<Region>();
  const [defaultRole, setDefaultRole] = useState<Region>();
  const [federationRoleArn, setFederationRoleArn] = useState<FederationRoleArn>();

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(`/config.json`);
        const config = await response.json();

        setAuth0Domain(config.domainUrl);
        setAuth0ClientId(config.oidcClientId);
        setDefaultRegion(config.defaultRegion);
        setDefaultRole(config.defaultRole);
        setFederationRoleArn(config.federationRoleArn);
      } catch (error) {
        toast.error('Failed to fetch configuration file:');
      }
    }

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{auth0DomainUrl, auth0ClientId, defaultRegion, defaultRole, federationRoleArn}}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;
