import axios from 'axios';
import Auth from '../utils/Auth';

/**
 * Create new account
 * @param  {Object}   payload  Username, password and email
 * @param  {Function} callback Callback function
 * @return {Object}            Response
 */
export const signup = (payload, callback) => {
  axios.post('/v1/auth/signup', payload)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      console.log(err);
      return callback(err);
    });
};

/**
 * Login user
 * @param  {Object}   payload  Username, password and email
 * @param  {Function} callback Callback function
 * @return {Object}            Response
 */
export const login = (payload, callback) => {
  axios.post('/v1/auth/login', payload)
    .then((response) => {
      Auth.authenticateUser(response.data.token);
    })
    .catch((err) => {
      return callback(err);
    });
};

/**
 * Send email to reset password
 * @param  {Object}   payload  Email
 * @param  {Function} callback Callback function
 * @return {Object}            Response
 */
export const forgotPassword = (payload, callback) => {
  axios.post('/v1/auth/forgot-password', payload)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
};

/**
 * Reset password
 * @param  {String}   token    Auth token
 * @param  {Object}   payload  password
 * @param  {Function} callback Callback function
 * @return {Object}            Response
 */
export const resetPassword = (token, payload, callback) => {
  axios.post(`/v1/auth/reset-password/${token}`, payload)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
};

/**
 * Get current user profile
 * @param  {Function} callback Callback function
 * @return {Object}            User profile
 */
export const getProfile = (callback) => {
  axios.get('/v1/auth/profile')
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
};

/**
 * Logout user
 * @param  {Function} callback Callback function
 * @return {Object}            Message
*/
export const logout = (callback) => {
  axios.get('/v1/auth/logout')
    .then((response) => {
      Auth.destroyToken();
    })
    .catch((err) => {
      return callback(err);
    });
};
