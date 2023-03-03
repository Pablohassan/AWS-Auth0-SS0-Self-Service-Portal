import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import {ConfigProvider} from './providers/ConfigProvider';
<<<<<<< HEAD
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
=======
import Auth0Provider from './providers/Auth0Provider';
import AwsProvider from './providers/AwsProvider';
>>>>>>> 62a00f0 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
<<<<<<< HEAD
<<<<<<< HEAD
        <App />
=======
<<<<<<< HEAD
=======
>>>>>>> 62a00f0 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
        <AwsProvider>
          <Auth0Provider>
            <App />
          </Auth0Provider>
        </AwsProvider>
<<<<<<< HEAD
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
=======
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ConfigProvider from './providers/ConfigProvider';
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>
>>>>>>> 3d7419c ([Integration] Chore : integration rusmir code)
>>>>>>> 3ad5f09 ([Integration] Chore : integration rusmir code)
=======
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
>>>>>>> 62a00f0 ([SSP] Chore : 0.0.6, fix useEffect and dependencies)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
