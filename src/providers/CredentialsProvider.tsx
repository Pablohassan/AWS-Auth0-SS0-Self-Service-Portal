import {useEffect, useState} from 'react';
import {AssumeRoleWithWebIdentityCommand, STSClient, Credentials} from '@aws-sdk/client-sts';
import {useAuth0} from '@auth0/auth0-react';
import regions from '../assets/regions';

interface Props {
  children: (props: {credentials: Credentials | undefined}) => React.ReactNode;
}

const CredentialsProvider: React.FC<Props> = ({children}) => {
  const [credentials, setCredentials] = useState<Credentials | undefined>();
  const {getIdTokenClaims} = useAuth0();

  useEffect(() => {
    if (!credentials) {
      (async () => {
        try {
          const idToken = await getIdTokenClaims();

          const response = await new STSClient({region: regions.defaultRegion.Id}).send(
            new AssumeRoleWithWebIdentityCommand({
              WebIdentityToken: idToken?.__raw,
              RoleArn: process.env.REACT_APP_WEB_IDENTITY_ROLE_ARN,
              RoleSessionName: 'test'
            })
          );

          setCredentials(response?.Credentials);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [getIdTokenClaims]);

  return credentials ? children({credentials}) : <div>Loading credentials...</div>;
};

export default CredentialsProvider;
