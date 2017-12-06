import React from 'react';
import PropTypes from 'prop-types';
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
      {(props.markers || []).map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

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
      switch (nextProps.markerType) {
        case 'house':
          this.setState({ markers: nextProps.searchResults.houses });
          break;
        case 'restaurant':
          this.setState({ markers: nextProps.searchResults.restaurants });
          break;
        case 'utility':
          this.setState({ markers: nextProps.searchResults.utilities });
          break;
        case 'crime':
          this.setState({ markers: nextProps.searchResults.crimes });
          break;
        default:
          this.setState({ markers: [] });
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
  markerType: 'house',
};

MapComponent.propTypes = {
  markerType: PropTypes.string,
  searchResults: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape,
  ]).isRequired,
};

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps)(MapComponent);

