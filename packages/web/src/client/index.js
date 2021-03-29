// import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/mainStyle.scss';

import(/* webpackChunkName: "react" */ 'react').then(({ default: React }) => {
  ReactDOM.render(<App />, document.querySelector('#app') || document.createElement('div'));
});
