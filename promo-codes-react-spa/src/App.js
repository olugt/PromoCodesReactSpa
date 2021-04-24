import logo from './logo.svg';
import './App.css';
import MainRouter from './routers/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { NotificationContext, TokenContext } from './Contexts'
import TokenDetailModel from './common/models/TokenDetailModel';
import ContextProviderValueModel from './common/models/ContextProviderValueModel';
import NotificationModel from './common/models/NotificationModel';

function App() {
  const [notificationState, setNotificationState] = useState(new NotificationModel());
  const [tokenState, setTokenState] = useState(new TokenDetailModel());

  return (
    <NotificationContext.Provider value={new ContextProviderValueModel(notificationState, setNotificationState)}>
      <TokenContext.Provider value={new ContextProviderValueModel(tokenState, setTokenState)}>
        <Router>
          <div className="App">
            <header>
              Notification: {notificationState.message}<br />
              Token: {tokenState.token}
            </header>
            <main>
              <MainRouter />
            </main>
            <footer>
            </footer>
          </div>
        </Router>
      </TokenContext.Provider>
    </NotificationContext.Provider >
  );
}

export default App;
