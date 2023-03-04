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

interface Account {
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
  configData?: Object;
}

export const ConfigContext = createContext<ConfigContextProps>({
  auth0DomainUrl: '',
  auth0ClientId: ''
});

interface ConfigProviderProps {
  children: React.ReactNode;
}
interface Object {
  accounts: Account[];
  regions: Region[];
  roles: Role[];
}

export const useConfig = () => useContext(ConfigContext);

export function ConfigProvider({children}: ConfigProviderProps) {
  const [auth0DomainUrl, setAuth0DomainUrl] = useState<string>('');
  const [auth0ClientId, setAuth0ClientId] = useState<string>('');
  const [defaultRegion, setDefaultRegion] = useState<Region>();
  const [defaultRole, setDefaultRole] = useState<Region>();
  const [federationRoleArn, setFederationRoleArn] = useState<FederationRoleArn>();
  const [configData, setConfigData] = useState<Object | undefined>(); // receving feched data

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/config.json');
        const config = await response.json();

        setAuth0DomainUrl(config.domainUrl);
        setAuth0ClientId(config.oidcClientId);
        setDefaultRegion(config.defaultRegion);
        setDefaultRole(config.defaultRole);
        setFederationRoleArn(config.federationRoleArn);
        setConfigData(config);
      } catch (error) {
        toast.error('Failed to fetch configuration file:');
      }
    })();
  }, []);

  return (
    <ConfigContext.Provider value={{auth0DomainUrl, auth0ClientId, defaultRegion, defaultRole, federationRoleArn, configData}}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;
