import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const SignUpForm = ({ handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <FormGroup controlId="email">
      <ControlLabel htmlFor="email">Email Address</ControlLabel>
      <FormControl id="email" type="email" placeholder="Email Address" />
    </FormGroup>

    <FormGroup controlId="username">
      <ControlLabel htmlFor="username">Username</ControlLabel>
      <FormControl id="username" type="text" placeholder="Username" />
    </FormGroup>

    <FormGroup controlId="password">
      <ControlLabel htmlFor="password">Password</ControlLabel>
      <FormControl id="password" type="password" placeholder="Password" />
    </FormGroup>

    <FormGroup>
      <Button type="submit" bsStyle="primary">Sign Up</Button>
    </FormGroup>
  </form>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
