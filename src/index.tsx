import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import {ConfigProvider} from './providers/ConfigProvider';
=======
import ConfigProvider from './providers/ConfigProvider';
>>>>>>> 4945873 ([SSP] Chore : 0.0.3  conf.json move auth0Provider in app)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <App />
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
