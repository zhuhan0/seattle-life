/* global document */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppBar, IconButton, MuiThemeProvider } from 'material-ui';

import reducers from './reducers';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchBar/search_results';
import MapComponent from './GMap';

const createStoreWithMiddleware = applyMiddleware(logger, ReduxPromise)(createStore);

class App extends Component {
  render() {
    return (
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
          <div style={{ display: 'flex' }}>
            <SearchResults />
            <MapComponent />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
