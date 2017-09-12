import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

import { login } from '../services/authentication';
import LoginForm from '../components/auth/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.response.data.message });
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
          <h1>Login</h1>
          <hr/>

          { this.state.error &&
            <Alert bsStyle="danger" onDismiss={ this.handleAlert }>{ this.state.error }</Alert>
          }

          <LoginForm handleSubmit={ this.handleSubmit } />

          <div className="text-center">
            <Link to="/forgot-password">Forgotten password?</Link>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;
