import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

import Navigation from '../components/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />

        <Grid>
          { this.props.children }
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
