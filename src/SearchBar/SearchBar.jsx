import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AutoComplete, IconButton, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import { fetchData } from '../actions/index';
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
    if (this.state.searchText.length === 0) {
      return;
    }

    googleMapsClient.geocode({
      address: this.state.searchText,
    }, (err, response) => {
      if (!err) {
        const { location } = response.json.results[0].geometry;
        this.props.fetchData(location.lat, location.lng, this.state.bedrooms, this.state.toggled);
      }
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
                onClick={this.handleNewRequest}
              />
            </div>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

SearchBar.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchData }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
