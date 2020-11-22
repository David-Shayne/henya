import React from 'react';
import ReactDOM from 'react-dom';
import './css/font-awesome.min.css';
import './css/bootstrap.min.css';
import './css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
