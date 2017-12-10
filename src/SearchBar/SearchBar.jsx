import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IconButton, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import { cyan400 } from 'material-ui/styles/colors';
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
                width: 860,
              }}
            >
              <div>
                <PlacesAutocomplete
                  inputProps={{
                    onChange: this.handleUpdateInput,
                    placeholder: 'Type anywhere within Seattle',
                    value: this.state.searchText,
                  }}
                  onEnterKeyDown={this.handleNewRequest}
                  options={{
                    // eslint-disable-next-line
                    location: new google.maps.LatLng(47.608013, -122.335167),
                    radius: 40000,
                  }}
                  styles={{
                    autocompleteContainer: { width: 424 },
                    input: {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      border: 'none',
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      opacity: 1,
                      outline: 'none',
                      padding: 0,
                      width: '100%',
                    },
                    root: {
                      backgroundColor: 'transparent',
                      display: 'inline-block',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 16,
                      position: 'relative',
                      transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                      width: 400,
                    },
                  }}
                />
                <hr
                  style={{
                    borderBottom: `2px solid ${cyan400}`,
                    borderTop: 'none',
                    marginBottom: -2,
                    marginLeft: -2,
                    marginTop: 2,
                  }}
                />
              </div>
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
