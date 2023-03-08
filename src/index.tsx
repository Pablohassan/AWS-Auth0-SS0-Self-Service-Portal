import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {ConfigProvider} from './providers/ConfigProvider';
import Auth0Provider from './providers/Auth0Provider';
import AwsProvider from './providers/AwsProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <AwsProvider>
          <Auth0Provider>
            <App />
          </Auth0Provider>
        </AwsProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
