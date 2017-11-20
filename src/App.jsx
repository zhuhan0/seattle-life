/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from 'material-ui';
import SearchBar from './SearchBar';

const App = () => (
  <MuiThemeProvider>
    <SearchBar />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
