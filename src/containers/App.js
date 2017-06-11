import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

import Navigation from '../components/Navigation';

const App = ({ children }) => (
  <div>
    <Navigation />

    <Grid>
      { children }
    </Grid>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
