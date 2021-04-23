import React from 'react'
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'
import { LOCATION_PATHS as lp } from '../common/constants/LocationPaths';
import Services from '../components/services/Services';

function MainRouting(props) {
    return (
        <Switch>
            <Route exact path={lp.home}>
                <Services />
            </Route>
        </Switch>
    )
}

// MainRouting.propTypes = {

// }

export default MainRouting

