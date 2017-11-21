import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const GMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdNbDUqv2SNQcXwEtSBAoIvnkcsejL9AM&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div
        style={{
          position: 'absolute',
          height: '87%',
          width: '100%',
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
    defaultCenter={{
      lat: 47.608013,
      lng: -122.335167,
    }}
  />
));

export default GMap;
