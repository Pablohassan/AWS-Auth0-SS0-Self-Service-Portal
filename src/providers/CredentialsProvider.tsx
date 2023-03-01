import React, {FC, useEffect, useState} from 'react';
import {AssumeRoleWithWebIdentityCommand, STSClient, Credentials} from '@aws-sdk/client-sts';
import {useAuth0} from '@auth0/auth0-react';
import {Loading} from '@nextui-org/react';
import {useConfig} from './ConfigProvider';

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

  const {defaultRegion, federationRoleArn} = useConfig();
  const {getIdTokenClaims} = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const delay = setTimeout(async () => {
      try {
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

        setCredentials(response?.Credentials);
      } catch (err: any) {
        if (err.code) {
          throw new Error(err.error);
        } else {
          throw err;
        }
      } finally {
        if (isMounted) setLoaded(true);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(delay);
    };
  }, [defaultRegion?.id, federationRoleArn?.arn, getIdTokenClaims]);

  if (!defaultRegion?.id || !federationRoleArn?.arn || loaded === false) {
    return (
      <Loading size="lg" css={{display: 'flex', mt: 150}}>
        Loading credentials...
      </Loading>
    );
  }

  return <>{children({credentials})}</>;
};

export default CredentialsProvider;
