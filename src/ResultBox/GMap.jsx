/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import pluralize from 'pluralize';
import { IconButton } from 'material-ui';
import { cyan400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
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
        key={marker._id}
        icon={marker.icon}
        onClick={() => props.onMarkerClick(marker._id)}
        position={{ lat: marker.lat, lng: marker.lng }}
      >
        {props.infoWindowOpen.includes(marker._id) &&
          <InfoWindow>{props.infoWindow[marker._id]}</InfoWindow>}
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
      center: {
        lat: 47.608013,
        lng: -122.335167,
      },
      infoWindowOpen: [],
      markers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { houses } = nextProps.searchResults;
    _.forEach(houses, (house) => {
      _.assign(house, { type: 0, icon: icons[0] });
    });
    let others = [];
    _.forEach(nextProps.markedCategory, (index, ind) => {
      if (ind === 0) {
        return;
      }

      const category = this.props.searchResults[categories[index]];
      _.forEach(category, (item) => {
        _.assign(item, { type: index, icon: icons[index] });
      });
      others = _.concat(others, category);
    });
    const markers = _.concat(houses, others);
    const infoWindowOpen = [];

    if (nextProps.markedPlace !== -1) {
      const newPlace = _.find(markers, place => (place._id) === nextProps.markedPlace);
      infoWindowOpen.push(newPlace._id);

      this.setState({
        center: {
          lat: newPlace.lat,
          lng: newPlace.lng,
        },
        infoWindowOpen,
        markers,
      });
    } else if (this.props.searchResults !== nextProps.searchResults ||
      this.props.markedCategory !== nextProps.markedCategory) {
      this.setState({
        infoWindowOpen: [],
        markers,
      });
    }
  }

  handleMarkerClick = (id) => {
    if (this.state.type === 3) {
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
    _.forEach(this.state.markers, (marker) => {
      if (marker.type === 0) {
        const lineData = [
          { name: '2017-01', price: marker['2017-01'] },
          { name: '2017-02', price: marker['2017-02'] },
          { name: '2017-03', price: marker['2017-03'] },
          { name: '2017-04', price: marker['2017-04'] },
          { name: '2017-05', price: marker['2017-05'] },
          { name: '2017-06', price: marker['2017-06'] },
          { name: '2017-07', price: marker['2017-07'] },
          { name: '2017-08', price: marker['2017-08'] },
          { name: '2017-09', price: marker['2017-09'] },
        ];
        // infoWindow[marker._id] = <span>${marker['2017-09']}</span>;
        infoWindow[marker._id] = (
          <div style={{ overflow: 'hidden' }}>
            <LineChart
              data={lineData}
              height={250}
              width={500}
            >
              <Line type="monotone" dataKey="price" />
              <Tooltip />
              <XAxis dataKey="name" />
              <YAxis domain={['dataMin', 'dataMax']} />
            </LineChart>
          </div>
        );
      } else if (marker.type === 1) {
        let category = '';
        _.forEach(marker.category, (cate) => {
          category += `${cate.title}, `;
        });
        category = _.trimEnd(category, ', ');

        infoWindow[marker._id] = (
          <div style={{ overflow: 'hidden' }}>
            <b>{marker.name}</b><br />
            {category}<br />
            {marker.address}<br />
            {this.renderStars(marker.star)}
          </div>
        );
      } else if (marker.type === 2) {
        infoWindow[marker._id] = (
          <div style={{ overflow: 'hidden' }}>
            <b>{marker.name}</b><br />
            {pluralize.singular(marker['city feature'])}<br />
            {marker.address}
          </div>
        );
      } else if (marker.category === 3) {
        infoWindow[marker._id] = (
          <div style={{ overflow: 'hidden' }}>
            {marker.crime}<br />
            {marker.time}
          </div>
        );
      }
    });

    return (
      <GMap
        markers={this.state.markers}
        center={this.state.center}
        infoWindow={infoWindow}
        infoWindowOpen={this.state.infoWindowOpen}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

MapComponent.propTypes = {
  markedCategory: PropTypes.arrayOf(PropTypes.number).isRequired,
  markedPlace: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  searchResults: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape,
  ]).isRequired,
};

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps)(MapComponent);

