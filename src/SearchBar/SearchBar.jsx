/* global fetch Headers */

import React from 'react';
import { AutoComplete, IconButton, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import BuyRentToggle from './BuyRentToggle';
import BedroomButtons from './BedroomButtons';

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAxQL9FI5T-oJDht9A8qQr63QOOwhfnhDw',
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bedrooms: 0,
      dataSource: [],
      searchText: '',
      toggled: false,
    };
  }

  handleNewRequest = () => {
    googleMapsClient.geocode({
      address: this.state.searchText,
    }, (err, response) => {
      if (!err) {
        const { location } = response.json.results[0].geometry;
        const url = `http://seattle-life.herokuapp.com/${location.lat}/${location.lng}/${this.state.bedrooms}/${this.state.toggled}`;
        const init = {
          headers: new Headers(),
          mode: 'cors',
        };
        fetch(url, init).then((res) => {
          console.log(res);
        });
      }
    });

    this.setState({
      searchText: '',
    });
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    });
  }

  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
  }

  handlePlusClick = () => {
    this.setState({
      bedrooms: this.state.bedrooms + 1,
    });
  }

  handleMinusClick = () => {
    this.setState({
      bedrooms: this.state.bedrooms - 1,
    });
  }

  render() {
    return (
      <Paper
        style={{ fontSize: 18 }}
        zDepth={2}
      >
        <Toolbar>
          <ToolbarGroup>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: 800,
              }}
            >
              <AutoComplete
                hintText="Type anywhere within Seattle (city, address, zipcode, etc.)"
                dataSource={this.state.dataSource}
                onNewRequest={this.handleNewRequest}
                onUpdateInput={this.handleUpdateInput}
                searchText={this.state.searchText}
                style={{
                  width: 410,
                }}
                textFieldStyle={{
                  width: 410,
                }}
              />
              <BuyRentToggle
                onToggle={this.handleToggle}
                toggled={this.state.toggled}
              />
              <BedroomButtons
                bedrooms={this.state.bedrooms}
                minusDisabled={this.state.bedrooms === 0}
                onMinusClick={this.handleMinusClick}
                onPlusClick={this.handlePlusClick}
                plusDisabled={this.state.bedrooms === 5}
              />
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                marginLeft: 30,
              }}
            >
              <ToolbarSeparator />
              <IconButton
                iconClassName="fa fa-search"
              />
            </div>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
