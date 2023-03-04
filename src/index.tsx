import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import {ConfigProvider} from './providers/ConfigProvider';
<<<<<<< HEAD
=======
import ConfigProvider from './providers/ConfigProvider';
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
=======
<<<<<<< HEAD
import Auth0Provider from './providers/Auth0Provider';
import AwsProvider from './providers/AwsProvider';
=======
>>>>>>> 33001af ([Integration] Chore : add last rusmir code part)
>>>>>>> 77ccc13 ([Integration] Chore : add last rusmir code part)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

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
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
