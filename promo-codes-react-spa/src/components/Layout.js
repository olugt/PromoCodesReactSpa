import React from 'react'
import PropTypes from 'prop-types'
import MainRoutes from '../routes/MainRoutes'
import useTokenContext from '../hooks/contexts/useTokenContext';
import useNotificationContext from '../hooks/contexts/useNotificationContext';
import Notification from './shared/Notification';
import { isTokenValid } from '../common/logic/identityLogic';
import { BrowserRouter as Router } from 'react-router-dom';

function Layout(props) {

    const { state: tokenContextState, setState: _setTokenContextState } = useTokenContext();
    const { state: notificationContextState, setState: _setNotificationContextState } = useNotificationContext();

    return (
        <Router>

            <div className="App">
                <header id="header">
                    {notificationContextState?.show &&
                        <div className="floating">
                            <Notification model={notificationContextState} />
                        </div>
                    }
                    {isTokenValid(tokenContextState) &&
                        <div className="container">
                            <div className="row">
                                <div className="col-4 col-md-2">
                                    <div><h5>Balance</h5></div>
                                    <div><p>### ### $</p></div>
                                </div>
                                <div className="col-4 col-md-2">
                                    <div><h5>Payout</h5></div>
                                    <div><p>### ### $</p></div>
                                </div>
                            </div>
                        </div>
                    }
                </header>
                <main id="main">

                    <MainRoutes />

                </main>
                <footer id="footer">
                </footer>
            </div>

        </Router>
    )
}

Layout.propTypes = {

}

export default Layout

