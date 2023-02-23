import {useContext} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Grid, Navbar, Text} from '@nextui-org/react';
import {Credentials} from '@aws-sdk/client-sts';
import awsdata from '../assets/awsdata.json';
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
  roles: Role[];
  role?: Role | string;
  children?: any;
  credentials?: Credentials;
  account?: string;
}

const NavbarGlobal: React.FC<Props> = ({children}) => {
  const {user} = useAuth0();

  const [account, setAccount] = useContext(AccountContext); // eslint-disable-line
  const [region, setRegion] = useContext(RegionContext); // eslint-disable-line
  const [role, setRole] = useContext(RoleContext); // eslint-disable-line

  // const [data, setData] = useState<Props | null>(null); // receving feched data

  const handleAccount = (event: any) => setAccount(event.target.value);
  const handleRegion = (event: any) => setRegion(event.target.value);
  const handleRole = (event: any) => setRole(event.target.value);

  // en attente d'upload du fichier config.json
  // async function fetchData(){;
  // const response = await fetch('https://test.self-service-portal.cp3s.xyz/config.json');
  //   const data = await response.json();
  //   return Promise.resolve(data);
  // }

  // useEffect(() => {
  //   fetchData()
  //     .then(data => setData(data))
  //     .catch(error => console.error(error));
  // }, []);

  return user ? (
    <Grid css={{mw: '1450px'}}>
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
              <option>Select account</option>
              {awsdata.accounts.map(account => (
                <option key={account.id} value={account.id}>
                  <Text>
                    {account.id} - {account.name}
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
              <option> Default selection {awsdata.defaultRegion.id} </option>

              {awsdata.regions.map((region: {id: string; name: string}) => (
                <option key={region.id} value={region.id}>
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
              <option>Default {awsdata.defaultRole.id}</option>
              {awsdata.roles.map((role: {id: string; name: string}) => (
                <option key={role.id} value={role.id}>
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
    </Grid>
  ) : null;
};

export default NavbarGlobal;
