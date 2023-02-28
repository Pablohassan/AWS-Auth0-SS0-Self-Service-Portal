import {useContext, useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Grid, Navbar, Text} from '@nextui-org/react';
import {Credentials} from '@aws-sdk/client-sts';
import {useConfig} from '../providers/ConfigProvider';
import {AccountContext, RegionContext, RoleContext} from '../providers/AwsProvider';

const logo = require('../assets/img/galilee-logo.png');

interface Account {
  id: string;
  name: string;
}

interface Region {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

interface Props {
  selectedValue?: string;
  accounts: Account[];
  regions: Region[];
  region?: Region | string;
  defaultRegion?: Region;
  roles: Role[];
  role?: Role | string;
  defaultRole?: Role;
  children?: any;
  credentials?: Credentials;
  account?: string;
}

const NavbarGlobal: React.FC<Props> = ({children}) => {
  const {user} = useAuth0();

  const [account, setAccount] = useContext(AccountContext);
  const [region, setRegion] = useContext(RegionContext);
  const [role, setRole] = useContext(RoleContext);

  const [data, setData] = useState<Props | null>(null); // receving feched data

  const handleAccount = (event: any) => setAccount(event.currentTarget.value);
  const handleRegion = (event: any) => setRegion(event.currentTarget.value);
  const handleRole = (event: any) => setRole(event.currentTarget.value);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/conf.json');
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  const defaultRegion = data?.defaultRegion;
  const defaultRole = data?.defaultRole;

  

  return user ? (
    <Grid css={{mw: '1400px'}}>
      <Navbar isBordered isCompact variant="sticky">
        <Grid css={{display: 'flex', backgroundColor: '$blue900', mb: 10}}>
          <img src={logo} height={50} alt="galilée logo" />
        </Grid>

        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Grid css={{m: 5}}>
            <Text h5 css={{m: 2, pb: 2}}>
              AWS Account
            </Text>
            <Text h6>
              <select onChange={handleAccount}>
                <option>Select account</option>
                {data?.accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.id} - {account.name}
                  </option>
                ))}
              </select>
            </Text>
          </Grid>
          <Grid>
            <Text h5 css={{m: 2, pb: 2}}>
              Region
            </Text>
            <Text h6>
              <select onChange={handleRegion}>
                <option> Default selection {defaultRegion?.id} </option>
                {data?.regions.map((region: {id: string; name: string}) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </Text>
          </Grid>
          <Grid>
            <Text h5 css={{m: 2, pb: 2}}>
              Role{' '}
            </Text>
            <Text h6>
              <select onChange={handleRole}>
                <option>Default {defaultRole?.id}</option>
                {data?.roles.map((role: {id: string; name: string}) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Text>
          </Grid>
        </Navbar.Content>

        {children}
        <Navbar.Content>
          <Text h6>Connecté en tant que : {user?.name}</Text>
        </Navbar.Content>
      </Navbar>
    </Grid>
  ) : null;
};

export default NavbarGlobal;
