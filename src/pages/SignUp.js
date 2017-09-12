import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

import { signup } from '../services/authentication';
import SignUpForm from '../components/auth/SignUpForm';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const useraname = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signup({ email, username, password }, (err) => {
      if (err) {
        console.log(err);
        this.setState({ error: err.response.data.message });
      } else {
        browserHistory.push('/');
      }
    });
  }

  handleAlert() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <h1>Sign Up</h1>
          <hr/>

          { this.state.error &&
            <Alert bsStyle="danger" onDismiss={ this.handleAlert }>{ this.state.error }</Alert>
          }

          <SignUpForm handleSubmit={ this.handleSubmit } />
        </Col>
      </Row>
    );
  }
}

export default SignUp;
