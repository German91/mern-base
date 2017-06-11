import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './routes';

// Axios configuration
axios.defaults.baseURL = process.env.ROOT_URL;
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

render(Routes, document.getElementById('app'));
