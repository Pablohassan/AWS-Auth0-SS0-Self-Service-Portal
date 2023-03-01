import {Modal, Button, Text, Grid, Container} from '@nextui-org/react';
import {useAuth0} from '@auth0/auth0-react';

export default function Modale({visible, onClose}: any) {
  const {user} = useAuth0();

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
              Bienvenu dans votre Portail Self Service{' '}
            </Text>
            <Text h4>Connecté en tant que : {user?.name}</Text>
          </Container>
        </Modal.Header>
        <Grid.Container gap={2}>
          <Modal.Body>
            <Text weight="bold" h5>
              Vous pouvez à partir de ce portail, visualiser et contrôler des instances AWS EC2 prédefinies par la team infra.
            </Text>
            <Text weight="bold" h5>
              Afin d`afficher les Instances AWS veuillez selectionner Account la Region et le Role cible
            </Text>
            <Text weight="bold" css={{m: 10}} color="error" h4>
              !Attention la région et le rôle par default selectionnés sont :
            </Text>
            <Text weight="bold" css={{m: 10}} h4>
              `eu-west-3`
            </Text>
            <Text weight="bold" h4>
              `galilee_roles`
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
