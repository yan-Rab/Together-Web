import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home/index';
import Points from './pages/Points/index';
import Login from './pages/Login/index';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/Points" component = {Points} />
            <Route exact path = "/Login" component = {Login} />
        </BrowserRouter>
    )
    
}

export default Routes;