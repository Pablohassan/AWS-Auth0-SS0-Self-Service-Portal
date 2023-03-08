import {Grid, Container, Card, Text} from '@nextui-org/react';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';

const bgImage = require('../assets/img/pont.jpeg'); // importer des images en ts, apriori necessite un require !!

export default function LoginPage() {
  const {error} = useAuth0();

  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      responsive={false}
      css={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        p: 0,
        background: `url(${bgImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}
    >
      <Grid xs={10} sm={6} md={4}>
        <Card as="form">
          <Card.Header css={{justifyContent: 'center'}}>
            <Text h1>SSO Galilée</Text>
          </Card.Header>

          <Card.Header
            css={{
              justifyContent: 'center',
              mb: '10%',
              ml: '-10px'
            }}
          >
            <LoginButton />
            {error && <Text>Authentification error</Text>}
          </Card.Header>
        </Card>
      </Grid>
    </Container>
  );
}
