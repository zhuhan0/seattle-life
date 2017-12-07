import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const GMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdNbDUqv2SNQcXwEtSBAoIvnkcsejL9AM&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div
        style={{
          position: 'absolute',
          height: '87%',
          right: 0,
          width: '80%',
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
    defaultZoom={13}
    center={props.center}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {_.map((props.markers || []), (marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
        >
          {props.isInfoWindowOpen[index] && <InfoWindow>{props.infoWindow}</InfoWindow>}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const categories = ['houses', 'restaurants', 'utilities', 'crimes'];

class MapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 47.608013,
        lng: -122.335167,
      },
      isInfoWindowOpen: [],
      markers: [],
      place: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchResults !== nextProps.searchResults) {
      this.setState({
        isInfoWindowOpen: new Array(nextProps.searchResults.houses.length).fill(false),
        markers: nextProps.searchResults.houses,
      });
    } else {
      const index = nextProps.markerType[0];
      const places = this.props.searchResults[categories[index]];
      this.setState({
        isInfoWindowOpen: new Array(places.length).fill(false),
        markers: places,
      });
      if (nextProps.markerType[1] !== -1) {
        const oldSecond = this.props.markerType[1];
        const newFirst = nextProps.markerType[0];
        const newSecond = nextProps.markerType[1];

        const newPlace = this.props.searchResults[categories[newFirst]][newSecond];
        const { isInfoWindowOpen } = this.state;
        if (oldSecond !== -1) {
          isInfoWindowOpen[oldSecond] = false;
        }
        isInfoWindowOpen[newSecond] = true;

        this.setState({
          center: {
            lat: newPlace.lat,
            lng: newPlace.lng,
          },
          isInfoWindowOpen,
          place: newPlace,
        });
      }
    }
  }

  render() {
    return (
      <GMap
        markers={this.state.markers}
        center={this.state.center}
        infoWindow={<p>${this.state.place['2017-09']}</p>}
        isInfoWindowOpen={this.state.isInfoWindowOpen}
      />
    );
  }
}

MapComponent.defaultProps = {
  markerType: 0,
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

