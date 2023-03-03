import {Modal, Button, Text, Grid, Container} from '@nextui-org/react';
import {useAuth0} from '@auth0/auth0-react';
import {useConfig} from '../providers/ConfigProvider';

export default function Modale({visible, onClose}: any) {
  const {user} = useAuth0();
  const {defaultRegion, defaultRole} = useConfig();

  return (
    <div>
      <Modal
        css={{padding: '20px', minWidth: '450px', maxWidth: '900px'}}
        width="60%"
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={onClose}
      >
        <Modal.Header>
          <Container>
            <Text weight="bold" css={{textAlign: 'center'}} h3>
              Welcome to the Self Service Portal
            </Text>
            <Text h4>Connected as : {user?.name}</Text>
          </Container>
        </Modal.Header>
        <Grid.Container gap={2}>
          <Modal.Body>
            <Text weight="bold" h5>
              From this portal, you can view and control AWS EC2 instances predefined by the Galilee infra team.
            </Text>
            <Text weight="bold" h5>
              In order to view AWS Instances please select Account the Region and the target Role
            </Text>
            <Text weight="bold" css={{m: 10}} color="error" h4>
              !Please note that the default region and role selected are :
            </Text>
            <Text weight="bold" css={{m: 10}} h4>
              {defaultRegion?.id} {defaultRegion?.name}
            </Text>
            <Text weight="bold" h4>
              {defaultRole?.id} {defaultRole?.name}
            </Text>
          </Modal.Body>
        </Grid.Container>
        <Modal.Footer>
          <Button auto flat color="error" onClick={onClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
