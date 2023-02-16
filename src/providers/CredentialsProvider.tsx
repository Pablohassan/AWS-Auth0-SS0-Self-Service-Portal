import {FC, ReactElement, useEffect, useState} from 'react';
import {AssumeRoleWithWebIdentityCommand, STSClient, Credentials} from '@aws-sdk/client-sts';
import {useAuth0} from '@auth0/auth0-react';
import awsdata from '../assets/awsdata.json';

interface Props {
  children: ({credentials}: {credentials: Credentials | undefined}) => React.ReactNode;
}
const CredentialsProvider: FC<Props> = ({children}) => {
  const [credentials, setCredentials] = useState<Credentials | undefined>();
  const {getIdTokenClaims} = useAuth0();

  useEffect(() => {
    if (!credentials) {
      (async () => {
        try {
          const idToken = await getIdTokenClaims();

          const response = await new STSClient({
            region: awsdata.defaultRegion.id
          }).send(
            new AssumeRoleWithWebIdentityCommand({
              WebIdentityToken: idToken?.__raw,
              RoleArn: process.env.REACT_APP_WEB_IDENTITY_ROLE_ARN,
              RoleSessionName: 'test'
            })
          );

          setCredentials(response?.Credentials);
        } catch (err: any) {
          if (err.code) {
            throw new Error(err.error);
          } else {
            throw err;
          }
        }
      })();
    }
  }, [getIdTokenClaims, credentials]);

  const content = credentials ? children({credentials}) : <div>Loading credentials...</div>;
  return content as ReactElement;
};

export default CredentialsProvider;