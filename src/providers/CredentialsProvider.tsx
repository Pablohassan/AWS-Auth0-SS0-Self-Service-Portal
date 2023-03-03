import React, {FC, useEffect, useState} from 'react';
import {AssumeRoleWithWebIdentityCommand, STSClient, Credentials} from '@aws-sdk/client-sts';
import {useAuth0} from '@auth0/auth0-react';
import {useConfig} from './ConfigProvider';
import LoginPage from '../pages/LoginPage';

interface Region {
  id: string;
  name: string;
}

interface FederationRoleArn {
  arn: string;
  name: string;
}

interface Props {
  defaultRegion?: Region;
  federationRoleArn?: FederationRoleArn;

  children: ({credentials}: {credentials: Credentials | undefined}) => React.ReactNode;
}
const CredentialsProvider: FC<Props> = ({children}) => {
  const [credentials, setCredentials] = useState<Credentials | undefined>();
  const [loaded, setLoaded] = useState(false);

  const {getIdTokenClaims} = useAuth0();
  const {defaultRegion, federationRoleArn} = useConfig();

  useEffect(() => {
    let isMounted = true;

    const fetchCredentials = async () => {
      if (!isMounted) return;
      const idToken = await getIdTokenClaims();
      if (!idToken) {
        throw new Error('Could not retrieve idToken');
      }

      const response = await new STSClient({
        region: defaultRegion?.id
      }).send(
        new AssumeRoleWithWebIdentityCommand({
          WebIdentityToken: idToken?.__raw,
          RoleArn: federationRoleArn?.arn,
          RoleSessionName: 'test'
        })
      );

      if (isMounted) {
        setCredentials(response?.Credentials);
        setLoaded(true);
      }
    };
    if (!loaded) {
      fetchCredentials();
    }
    return () => {
      isMounted = false;
    };
  });

  if (!credentials) {
    return <LoginPage />;
  }

  return <>{children({credentials})}</>;
};

export default CredentialsProvider;
