import axios from 'axios';
import { browserHistory } from 'react-router';

class Auth {
  static authenticateUser(token) {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;

    browserHistory.push('/');
  }

  static isAuthenticated() {
    let token = window.localStorage.getItem('token');

    return token;
  }

  static destroyToken() {
    window.localStorage.removeItem('token');

    browserHistory.push('/');
  }

  static getToken() {
    let token = window.localStorage.getItem('token');

    return token;
  }
}

export default Auth;
