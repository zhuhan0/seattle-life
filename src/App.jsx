/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppBar, IconButton, MuiThemeProvider } from 'material-ui';
import SearchBar from './SearchBar/SearchBar';
import GMap from './GMap';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        iconElementRight={
          <IconButton
            href="https://github.com/zhuhan0/CIS550-Project"
            iconClassName="fa fa-github"
          />
        }
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
