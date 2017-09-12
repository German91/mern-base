import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './containers/App';
import Welcome from './pages/Welcome';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      {/* Public Routes */}
      <IndexRoute name="welcome" component={ Welcome } />

      {/* Auth Routes */}
      <Route path="login" component={ Login } />
      <Route path="signup" component={ SignUp } />
    </Route>

    <Route path="*" component={ NotFound } />
  </Router>
);

export default Routes;
