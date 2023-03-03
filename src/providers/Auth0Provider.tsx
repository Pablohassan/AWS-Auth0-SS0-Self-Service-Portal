import {Auth0Provider} from '@auth0/auth0-react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useConfig} from './ConfigProvider';

interface Props {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({children}: Props) => {
  const navigate = useNavigate();

  const {auth0DomainUrl, auth0ClientId} = useConfig();

  const domain = auth0DomainUrl;
  const clientId = auth0ClientId;
  const redirectUri = 'https://test.self-service-portal.cp3s.xyz/';

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return domain && clientId && redirectUri ? (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  ) : (
    <div>Loading... domain client</div>
  );
};

export default Auth0ProviderWithNavigate;
