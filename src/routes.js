import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './containers/App';
import Welcome from './components/Welcome';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute name="welcome" component={ Welcome } />
      <Route path="about" component={ About } />
    </Route>

    <Route path="*" component={ NotFound } />
  </Router>
);

export default Routes;
