import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router} from 'react-router-dom'
import history from './history';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import todoApp from './reducers';

const store = createStore(todoApp)

ReactDOM.render( 
  <Provider store = {store} >
    <Router history={history} >
      <App />
    </Router>  
  </Provider>
,document.getElementById('root'));
