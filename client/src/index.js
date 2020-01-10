import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

//Development only axios helpers!
import axios from 'axios';
window.axios = axios;

const store = createStore( reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider apiKey='pk_test_xojHZzyy0qEaT1rY4Z1GrfHJ00phCrt2Qf' store={store}><App /></Provider>,
  document.querySelector('#root')
);
