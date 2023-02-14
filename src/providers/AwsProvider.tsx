import {createContext, useState} from 'react';

export const AccountContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);
export const RegionContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);
export const RoleContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

interface Props {
  children?: any;
}

interface Props {
  children?: any;
}

const AwsProvider: React.FC<Props> = ({children}) => {
  const [account, setAccount] = useState<string>('');
  const [region, setRegion] = useState<string>('eu-west-3');
  const [role, setRole] = useState<string>('galilee_roles');

  return (
    <AccountContext.Provider value={[account, setAccount]}>
      <RegionContext.Provider value={[region, setRegion]}>
        <RoleContext.Provider value={[role, setRole]}>{children}</RoleContext.Provider>
      </RegionContext.Provider>
    </AccountContext.Provider>
  );
};
export default AwsProvider;
