import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { WithTheme } from 'core/@components';
import Map from './views/Map.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Map}/>
    </div>
  </BrowserRouter>
);

export default WithTheme(App);
