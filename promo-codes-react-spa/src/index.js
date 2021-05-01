import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import processLogin from './services/processLogin';
import { effectCreateServer } from './infrastructure/promo-codes/dependencies-doubles/web-api-servers/PromoCodesAspNetCoreWebApiServer';
import { convertFromBooleanString } from './common/logic/configurationLogic';
import ConfigurationContextModel from './common/models/contexts/ConfigurationContextModel';

// This block of code check if Mirage JS should be used to mock promo codes web API.
if (new ConfigurationContextModel().shouldMockPromoCodesInfrastructure()) {
  if (process.env.NODE_ENV === "development") {
    effectCreateServer({ environment: "development" });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
