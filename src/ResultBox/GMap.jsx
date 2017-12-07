import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';
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
    defaultZoom={12}
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
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const categories = ['houses', 'restaurants', 'utilities', 'crimes'];

class MapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: {
        lat: 47.608013,
        lng: -122.335167,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchResults !== nextProps.searchResults) {
      this.setState({ markers: nextProps.searchResults.houses });
    } else if (this.props.markerType !== nextProps.markerType) {
      if (!Array.isArray(nextProps.markerType)) {
        const index = nextProps.markerType;
        this.setState({ markers: this.props.searchResults[categories[index]] });
      } else {
        const first = nextProps.markerType[0];
        const second = nextProps.markerType[1];
      }
    }
  }

  render() {
    return (
      <GMap
        markers={this.state.markers}
        center={this.state.center}
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

