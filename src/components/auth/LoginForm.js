import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const LoginForm = ({ handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <FormGroup controlId="email">
      <ControlLabel htmlFor="email">Email Address</ControlLabel>
      <FormControl id="email" type="email" placeholder="Email Address" />
    </FormGroup>

    <FormGroup controlId="password">
      <ControlLabel htmlFor="password">Password</ControlLabel>
      <FormControl id="password" type="password" placeholder="Password" />
    </FormGroup>

    <FormGroup>
      <Button type="submit" bsStyle="primary">Login</Button>
    </FormGroup>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
