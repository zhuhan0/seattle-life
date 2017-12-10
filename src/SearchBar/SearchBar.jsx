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

const BingButton = props => (
  <IconButton
    style={{
      height: 24,
      padding: 0,
      width: 24,
    }}
    tooltip="Bing Search"
    tooltipStyles={{ marginTop: -20 }}
  >
    {<svg enableBackground="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512"><g><path d="M172.1,363.1c52.7-27.8,104.9-55.2,157.8-83.1c-14.2-6.5-27.5-12.5-40.8-18.5c-10.2-4.6-20.3-9.1-30.5-13.7   c-2.4-1-4-2.5-5.2-5c-15.7-34.2-31.5-68.3-47.2-102.4c-0.5-1-0.8-2.1-1.5-4c11.5,3.5,22.3,6.8,33,10.1c45,13.8,90,27.6,135,41.4   c25.9,7.9,51.8,16,77.8,23.7c3.6,1.1,4.4,2.8,4.4,6.3c-0.1,37.7-0.1,75.3,0,113c0,3.2-0.9,4.9-3.7,6.6   c-88.9,52.8-177.8,105.8-266.7,158.8c-4,2.4-8.1,4.6-12,7.2c-2,1.4-3.4,1-5.2-0.3c-36.1-25.3-72.2-50.6-108.3-75.9   c-1.8-1.3-2.6-2.7-2.5-5c0.1-6.7,0-13.3,0-20c0-101.6,0.1-203.3,0.1-304.9c0-28.3,0-56.7-0.2-85c0-4.4,1-4.9,5-3.6   c35.2,12.1,70.5,24.1,105.8,36c3,1,3.6,2.7,3.6,5.5c0,20.5,0,41,0.1,61.5c0.4,82.1,0.8,164.3,1.2,246.4   C172.1,359.7,172.1,361,172.1,363.1z" fill="#0D8484" /></g></svg>}
  </IconButton>
);

const HorizontalRule = () => (
  <hr
    style={{
      borderBottom: `2px solid ${cyan400}`,
      borderTop: 'none',
      marginBottom: -2,
      marginLeft: -2,
      marginTop: 2,
    }}
  />
);

const autocompleteStyles = {
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
    fontSize: 18,
    position: 'relative',
    transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    width: 400,
  },
};

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
                  styles={autocompleteStyles}
                />
                <BingButton />
                <HorizontalRule />
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
