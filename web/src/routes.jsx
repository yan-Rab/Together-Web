import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home/index';
import Points from './pages/Points/index';
import Login from './pages/Login/index';
import MyPoint from './pages/MyPoint/index';

import {PrivateMyPoint, PrivateLogin} from './private/PrivateRoutes';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/Points" component = {Points} />
            <PrivateLogin exact path = '/Login' component = {Login}/>
            <PrivateMyPoint exact path = '/MyPoint' component = {MyPoint} />
        </BrowserRouter>
    )
    
}

export default Routes;