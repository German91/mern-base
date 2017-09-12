import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './routes';
import Auth from './utils/Auth';

// Axios configuration
axios.defaults.baseURL = process.env.ROOT_URL;
axios.defaults.headers.common['Authorization'] = Auth.getToken();
axios.defaults.headers.post['Content-Type'] = 'application/json';

render(Routes, document.getElementById('app'));
