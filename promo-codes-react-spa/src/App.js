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

  const [notificationState, setNotificationState] = useState(new NotificationContextModel());
  const [tokenState, setTokenState] = useState(new TokenDetailContextModel());
  const [configurationState, setConfigurationState] = useState(new ConfigurationContextModel());

  return (
    <ConfigurationContext.Provider value={new ContextProviderValueModel(configurationState, setConfigurationState)}>
      <NotificationContext.Provider value={new ContextProviderValueModel(notificationState, setNotificationState)}>
        <TokenContext.Provider value={new ContextProviderValueModel(tokenState, setTokenState)}>

          <Layout />

        </TokenContext.Provider>
      </NotificationContext.Provider >
    </ConfigurationContext.Provider>
  );
}

export default App;
