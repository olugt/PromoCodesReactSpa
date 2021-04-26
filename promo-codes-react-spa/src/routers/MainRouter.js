import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types'
import { LOCATION_PATHS as lp } from '../common/constants/LocationPathsConstants';
import Services from '../components/services/Services';
import Login from '../components/user/Login';

/**
 * The top level router set-up for rendering all components at top level routes.
 * @param {*} props 
 * @returns 
 */
function MainRouter(props) {
    return (
        <Switch>
            <Route exact path={lp.home}>
                <Redirect to={lp.services} />
            </Route>
            <Route exact path={lp.services}>
                <Services />
            </Route>
            <Route exact path={lp.login}>
                <Login />
            </Route>
        </Switch>
    )
}

// MainRouting.propTypes = {

// }

export default MainRouter

