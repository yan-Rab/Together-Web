import React from 'react';
import {Route, Redirect} from 'react-router-dom'

import authLogin from '../authentication/authPoints';

export const PrivateMyPoint = ({component: Component,...rest}) => (
    <Route {...rest} render = {props => (
        authLogin() ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: '/', state: { from: props.location }}} />
        )
    )} />
)