import {useContext, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Grid, Navbar, Text} from '@nextui-org/react';
import {Credentials} from '@aws-sdk/client-sts';
import regionsData from '../assets/regions';
import accounts from '../assets/accounts';
import roleData from '../assets/roles';
import {AccountContext, RegionContext, RoleContext} from '../providers/AwsProvider';

const logo = require('../assets/img/galilee-logo.png');

interface Props {
  selectedValue?: string;
  account: string | undefined;
  region: string | undefined;
  role: string | undefined;
  children?: any;
  credentials?: Credentials;
}

const NavbarGlobal: React.FC<Props> = ({children}) => {
  const {user} = useAuth0();

  const [account, setAccount] = useContext(AccountContext);
  const [region, setRegion] = useContext(RegionContext);
  const [role, setRole] = useContext(RoleContext);

  const handleAccount = (event: any) => setAccount(event.target.value);
  const handleRegion = (event: any) => setRegion(event.target.value);
  const handleRole = (event: any) => setRole(event.target.value);

  return user ? (
    <div>
      <Navbar isBordered isCompact variant="sticky">
        <Grid css={{display: 'flex', backgroundColor: '$blue900', mb: 10}}>
          <img src={logo} height={50} alt="galilé logo" />
        </Grid>

        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Grid>
            <Text h4 css={{m: 1, pb: 2}}>
              AWS Account
            </Text>
            <select onChange={handleAccount}>
              <option>Select an account</option>
              {accounts.map(account => (
                <option key={account.Id} value={account.Id}>
                  <Text>
                    {account.Id} -{account.Name}
                  </Text>
                </option>
              ))}
            </select>
          </Grid>
          <Grid>
            <Text h4 css={{m: 1, pb: 2}}>
              Region
            </Text>
            <select onChange={handleRegion}>
              <option> Default selection {regionsData.defaultRegion.name} </option>

              {regionsData.regions.map((region: {Id: string; name: string}) => (
                <option key={region.Id} value={region.Id}>
                  {region.name}
                </option>
              ))}
            </select>
          </Grid>
          <Grid>
            <Text h4 css={{m: 1, pb: 2}}>
              Role{' '}
            </Text>

            <select onChange={handleRole}>
              <option>Default {roleData.defaultRole.name}</option>
              {roleData.roles.map((role: {Id: string; name: string}) => (
                <option key={role.Id} value={role.Id}>
                  {role.name}
                </option>
              ))}
            </select>
          </Grid>
        </Navbar.Content>

        {children}
        <Navbar.Content>
          <Text h5>Connecté en tant que : {user?.name}</Text>
        </Navbar.Content>
      </Navbar>
    </div>
  ) : null;
};

export default NavbarGlobal;
