import Auth from './Auth';

class Middlewares {
  static isLogged(nextState, replace) {
    if (!Auth.isAuthenticated()) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };
}

export default Middlewares;
