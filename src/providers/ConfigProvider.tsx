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
  domainUrl: string;
  oidcClientId: string;
  defaultRegion?: Region;
  defaultRole?: Role;
  federationRoleArn?: FederationRoleArn;
}

export const ConfigContext = createContext<ConfigContextProps>({
  domainUrl: '',
  oidcClientId: ''
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const useConfig = () => useContext(ConfigContext);

export function ConfigProvider({children}: ConfigProviderProps) {
  const [domainUrl, setAuth0Domain] = useState<string>('');
  const [oidcClientId, setAuth0ClientId] = useState<string>('');
  const [defaultRegion, setDefaultRegion] = useState<Region>();
  const [defaultRole, setDefaultRole] = useState<Region>();
  const [federationRoleArn, setFederationRoleArn] = useState<FederationRoleArn>();

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/conf.json');
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
    <ConfigContext.Provider value={{domainUrl, oidcClientId, defaultRegion, defaultRole, federationRoleArn}}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;
