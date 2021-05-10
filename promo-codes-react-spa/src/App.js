import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import TokenDetailContextModel from './common/models/contexts/TokenDetailContextModel';
import ContextProviderValueModel from './common/models/ContextProviderValueModel';
import ConfigurationContextModel from './common/models/contexts/ConfigurationContextModel';
import NotificationContextModel from './common/models/contexts/NotificationContextModel';
import Layout from './components/Layout';

export const NotificationContext = createContext();
export const TokenContext = createContext();
export const ConfigurationContext = createContext();

function App() {

  const [configurationContextState, setConfigurationContextState] = useState(new ConfigurationContextModel());
  const [notificationContextState, setNotificationContextState] = useState(new NotificationContextModel());
  const [tokenContextState, setTokenContextState] = useState(new TokenDetailContextModel());

  return (
    <ConfigurationContext.Provider value={new ContextProviderValueModel(configurationContextState, setConfigurationContextState)}>
      <NotificationContext.Provider value={new ContextProviderValueModel(notificationContextState, setNotificationContextState)}>
        <TokenContext.Provider value={new ContextProviderValueModel(tokenContextState, setTokenContextState)}>

          <Layout />

        </TokenContext.Provider>
      </NotificationContext.Provider >
    </ConfigurationContext.Provider>
  );
}

export default App;
