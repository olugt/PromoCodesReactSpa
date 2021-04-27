import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router';
import useTokenContext from '../hooks/contexts/useTokenContext';
import { isTokenValid, makeLoginUrlOnIdentityError } from '../common/logic/identityLogic';

/**
 * A basic authorized Route. It should be used just like Route component, but where user actions and navigation need to be authorized.
 * @param {{path: String, children: Object, rest: Object}} param0 React props.
 * @returns Redirection to login or allows pass through to destination.
 */
function AuthorizedRoute({ path, children, ...rest }) {
    const [isUserAuthenticated, _setIsUserAuthenticated] = useState(isTokenValid(useTokenContext().state));

    return (isUserAuthenticated) ?
        (<Route exact path={path} {...rest}>{children}</Route>) :
        (<Redirect to={makeLoginUrlOnIdentityError(path)} />)
}

AuthorizedRoute.propTypes = {
    path: PropTypes.string.isRequired
}

export default AuthorizedRoute

