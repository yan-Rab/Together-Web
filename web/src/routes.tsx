import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import Points from './pages/Points/index';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/Points" component = {Points} />
        </BrowserRouter>
    )
    
}

export default Routes;