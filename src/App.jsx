/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppBar, MuiThemeProvider } from 'material-ui';
import SearchBar from './SearchBar/SearchBar';
import GMap from './GMap';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Welcome to the most comprehensive Seattle housing search site!"
        showMenuIconButton={false}
      />
      <SearchBar />
      <GMap />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
