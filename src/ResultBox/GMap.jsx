/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { IconButton } from 'material-ui';
import { cyan400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import houseIcon from '../icons/ic_home_black_36px.svg';
import restaurantIcon from '../icons/ic_restaurant_black_36px.svg';
import utilityIcon from '../icons/ic_power_black_36px.svg';
import crimeIcon from '../icons/ic_report_problem_black_36px.svg';

// const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const GMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdNbDUqv2SNQcXwEtSBAoIvnkcsejL9AM&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div
        style={{
          position: 'absolute',
          height: window.innerHeight - 120,
          right: 0,
          width: '75%',
          zIndex: -1,
        }}
      >
        <div style={{ height: '100%' }} />
      </div>
    ),
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    center={props.center}
    defaultZoom={13}
  >
    {_.map((props.markers || []), marker => (
      <Marker
        key={marker.id || marker._id}
        icon={props.icon}
        onClick={() => props.onMarkerClick(marker.id || marker._id)}
        position={{ lat: marker.lat, lng: marker.lng }}
      >
        {props.infoWindowOpen.includes(marker.id || marker._id) &&
          <InfoWindow>{props.infoWindow[marker.id || marker._id]}</InfoWindow>}
      </Marker>
    ))}
  </GoogleMap>
));

const categories = ['houses', 'restaurants', 'utilities', 'crimes'];
const icons = [houseIcon, restaurantIcon, utilityIcon, crimeIcon];

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      center: {
        lat: 47.608013,
        lng: -122.335167,
      },
      infoWindowOpen: [],
      markers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchResults !== nextProps.searchResults) {
      this.setState({
        infoWindowOpen: [],
        markers: nextProps.searchResults.houses,
      });
    } else {
      const index = nextProps.markerType[0];
      const category = this.props.searchResults[categories[index]];
      const infoWindowOpen = [];

      if (nextProps.markerType[1] !== -1) {
        const first = nextProps.markerType[0];
        const second = nextProps.markerType[1];

        const newPlace = _.find(
          this.props.searchResults[categories[first]],
          place => (place.id || place._id) === second,
        );
        infoWindowOpen.push(newPlace.id || newPlace._id);

        this.setState({
          category: index,
          center: {
            lat: newPlace.lat,
            lng: newPlace.lng,
          },
          infoWindowOpen,
          markers: category,
        });
      } else {
        this.setState({
          category: index,
          infoWindowOpen,
          markers: category,
        });
      }
    }
  }

  handleMarkerClick = (id) => {
    if (this.state.category === 3) {
      return;
    }

    const { infoWindowOpen } = this.state;
    if (_.includes(infoWindowOpen, id)) {
      _.remove(infoWindowOpen, n => n === id);
    } else {
      infoWindowOpen.push(id);
    }
    this.setState({
      infoWindowOpen,
    });
  }

  renderStars = (number) => {
    let stars = [];
    let i = 0;

    for (i = 0; i < number; i += 1) {
      stars.push(<IconButton
        iconClassName="fa fa-star"
        iconStyle={{ color: cyan400 }}
        key={i}
        style={{ margin: -10 }}
      />);
    }
    if (number % 1 !== 0) {
      stars = _.dropRight(stars);
      stars.push(<IconButton
        iconClassName="fa fa-star-half-o"
        iconStyle={{ color: cyan400 }}
        key={0.5}
        style={{ margin: -10 }}
      />);
    }
    return stars;
  }

  render() {
    const infoWindow = {};
    const category = this.props.markerType[0];
    if (category === 0) {
      _.forEach(this.state.markers, (place) => {
        infoWindow[place.id] = <span>${place['2017-09']}</span>;
      });
    } else if (category === 1) {
      _.forEach(this.state.markers, (place) => {
        infoWindow[place._id] = (
          <div style={{ overflow: 'hidden' }}>
            {place.name}<br />
            {place.address}<br />
            {this.renderStars(place.star)}
          </div>
        );
      });
    } else if (category === 2) {
      _.forEach(this.state.markers, (place) => {
        infoWindow[place.id] = (
          <div style={{ overflow: 'hidden' }}>
            {place.name}<br />
            {place.address}
          </div>
        );
      });
    }

    return (
      <GMap
        markers={this.state.markers}
        center={this.state.center}
        icon={icons[this.state.category]}
        infoWindow={infoWindow}
        infoWindowOpen={this.state.infoWindowOpen}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

MapComponent.defaultProps = {
  markerType: [0, -1],
};

MapComponent.propTypes = {
  markerType: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  searchResults: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape,
  ]).isRequired,
};

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps)(MapComponent);

