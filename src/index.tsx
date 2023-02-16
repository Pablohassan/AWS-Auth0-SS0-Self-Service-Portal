import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
=======
import {Auth0Provider} from '@auth0/auth0-react';
<<<<<<< HEAD
// eslint-disable-next-line import/no-extraneous-dependencies
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
import {BrowserRouter} from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import {ConfigProvider} from './providers/ConfigProvider';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import ConfigProvider from './providers/ConfigProvider';
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
=======
=======
>>>>>>> fa02cf2 ([SSP] Chore : Fixed linter errors)
<<<<<<< HEAD
import Auth0Provider from './providers/Auth0Provider';
import AwsProvider from './providers/AwsProvider';
=======
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
<<<<<<< HEAD
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)
=======
=======
=======
import {BrowserRouter} from 'react-router-dom';
import App from './App';
>>>>>>> 06a0e2e ([SSP] Chore : Fixed linter errors)
>>>>>>> 3177d30 ([SSP] Chore : Fixed linter errors)
>>>>>>> fa02cf2 ([SSP] Chore : Fixed linter errors)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

<<<<<<< HEAD
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
<<<<<<< HEAD
        <App />
=======
<<<<<<< HEAD
        <AwsProvider>
          <Auth0Provider>
            <App />
          </Auth0Provider>
        </AwsProvider>
=======
        <App />
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
=======
<<<<<<< HEAD
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
=======
const domain: string = process.env.REACT_APP_PARAM_PROVIDER_DOMAIN_URL as string;
const clientId: string = process.env.REACT_APP_PARAM_PROVIDER_OIDC_CLIENT_ID as string;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider domain={domain} clientId={clientId}>
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
>>>>>>> 3ad5f09 ([Integration] Chore : integration rusmir code)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
<<<<<<< HEAD
<<<<<<< HEAD
=======
reportWebVitals(console.log);
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
=======
>>>>>>> 06a0e2e ([SSP] Chore : Fixed linter errors)
