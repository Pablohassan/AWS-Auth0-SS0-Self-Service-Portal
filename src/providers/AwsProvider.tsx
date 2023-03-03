import {createContext, useState} from 'react';
import {useConfig} from './ConfigProvider';

export const AccountContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);
export const RegionContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);
export const RoleContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

interface Props {
  children?: any;
}

const AwsProvider: React.FC<Props> = ({children}) => {
  const {defaultRegion, defaultRole} = useConfig();

  const [account, setAccount] = useState<string>('');
  const [region, setRegion] = useState<string>(defaultRegion?.id || '');
  const [role, setRole] = useState<string>(defaultRole?.id || '');

  return defaultRegion && defaultRole ? (
    <AccountContext.Provider value={[account, setAccount]}>
      <RegionContext.Provider value={[region, setRegion]}>
        <RoleContext.Provider value={[role, setRole]}>{children}</RoleContext.Provider>
      </RegionContext.Provider>
    </AccountContext.Provider>
  ) : (
    <div>AWS Context Loading...</div>
  );
};
export default AwsProvider;
