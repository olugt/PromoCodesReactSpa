import logo from './logo.svg';
import './App.css';
import MainRouter from './routers/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import TokenDetailContextModel from './common/models/contexts/TokenDetailContextModel';
import ContextProviderValueModel from './common/models/ContextProviderValueModel';
import Notification from './components/shared/Notification';
import ConfigurationContextModel from './common/models/contexts/ConfigurationContextModel';
import NotificationContextModel from './common/models/contexts/NotificationContextModel';

export const NotificationContext = createContext();
export const TokenContext = createContext();
export const ConfigurationContext = createContext();

function App() {

  const [notificationState, setNotificationState] = useState(new NotificationContextModel());
  const [tokenState, setTokenState] = useState(new TokenDetailContextModel());
  const [configurationState, setConfigurationState] = useState(new ConfigurationContextModel());
  let token = tokenState?.token;

  return (
    <ConfigurationContext.Provider value={new ContextProviderValueModel(configurationState, setConfigurationState)}>
      <NotificationContext.Provider value={new ContextProviderValueModel(notificationState, setNotificationState)}>
        <TokenContext.Provider value={new ContextProviderValueModel(tokenState, setTokenState)}>
          <Router>
            <div className="App">
              <header id="header">
                <div className="floating">
                  <Notification model={notificationState}><div>Token in notf: {token}</div></Notification>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-2">
                      <div><h5>Balance</h5></div>
                      <div><p>213 920 $</p></div>
                    </div>
                    <div className="col-2">
                      <div><h5>Payout</h5></div>
                      <div><p>159 465 $</p></div>
                    </div>
                  </div>
                </div>
              </header>
              <main id="main">
                <MainRouter />
              </main>
              <footer id="footer">
              </footer>
            </div>
          </Router>
        </TokenContext.Provider>
      </NotificationContext.Provider >
    </ConfigurationContext.Provider>
  );
}

export default App;
