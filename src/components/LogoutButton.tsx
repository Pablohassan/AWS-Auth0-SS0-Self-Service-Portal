import {useAuth0} from '@auth0/auth0-react';
import {Button} from '@nextui-org/react';

const LogoutButton = () => {
  const {logout} = useAuth0();

  return (
    <Button ghost shadow color="warning" onClick={() => logout({returnTo: window.location.origin})}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
