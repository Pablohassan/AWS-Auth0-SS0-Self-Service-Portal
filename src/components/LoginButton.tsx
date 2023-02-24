import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from '@nextui-org/react';

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <Button ghost shadow color="success" css={{m: 10}} onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
