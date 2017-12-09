/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Divider, List, ListItem, Paper, Subheader } from 'material-ui';
import { amber400, cyan400, darkBlack, green400 } from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionReportProblem from 'material-ui/svg-icons/action/report-problem';
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';
import NotificationPower from 'material-ui/svg-icons/notification/power';

class SearchResults extends Component {
  getNestedItems = (groups, category) => _.map(_.sortBy(_.keys(groups)), (key, index) => (
    <ListItem
      key={index}
      nestedItems={_.map(
        _.sortBy(groups[key], item => _.lowerCase(item.name)),
        (item, ind) => (
          <ListItem
            key={ind}
            onClick={() => this.props.onClick([category, item.id || item._id])}
            primaryText={<span><b>{item.name}</b>, {item.address}</span>}
          />
        ),
      )}
      primaryText={key}
      primaryTogglesNestedList
    />
  ));

  showCrimes() {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults.crimes.length;
    }
    return 0;
  }

  showHouses() {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults.houses.length;
    }
    return 0;
  }

  showRestaurants() {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults.restaurants.length;
    }
    return 0;
  }

  showUtilities() {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults.utilities.length;
    }
    return 0;
  }

  render() {
    const numHouses = this.showHouses();

    const { restaurants } = this.props.searchResults;
    const restaurantGroups = {};
    _.forEach(restaurants, (restaurant) => {
      _.forEach(restaurant.category, (category) => {
        if (_.includes(_.keys(restaurantGroups), category.title)) {
          restaurantGroups[category.title].push(restaurant);
        } else {
          restaurantGroups[category.title] = [restaurant];
        }
      });
    });

    const utilityGroups = _.groupBy(this.props.searchResults.utilities, 'city feature');
    const crimeGroups = _.groupBy(this.props.searchResults.crimes, 'crime');

    return (
      <Paper
        style={{
          fontSize: 18,
          height: window.innerHeight - 120,
          overflow: 'scroll',
          position: 'absolute',
          width: '25%',
          zIndex: -1,
        }}
        zDepth={1}
      >
        <List>
          <Subheader>Result</Subheader>
          <Divider />
          <ListItem
            leftIcon={<ActionHome color={cyan400} />}
            nestedItems={_.map(this.props.searchResults.houses, (house, index) => (
              <ListItem
                key={index}
                onClick={() => this.props.onClick([0, house.id])}
                primaryText={`${house.city}, ${house.postcode}`}
              />
            ))}
            onClick={() => this.props.onClick([0, -1])}
            primaryText={
              numHouses === 1 ?
                <span><b>{numHouses}</b> House</span> : <span><b>{numHouses}</b> Houses</span>
            }
          />
          <Divider />
          <ListItem
            leftIcon={<MapsRestaurant color={amber400} />}
            nestedItems={this.getNestedItems(restaurantGroups, 1)}
            onClick={() => this.props.onClick([1, -1])}
            primaryText={<span><b>{this.showRestaurants()}</b> Restaurants</span>}
          />
          <Divider />
          <ListItem
            leftIcon={<NotificationPower color={green400} />}
            nestedItems={this.getNestedItems(utilityGroups, 2)}
            onClick={() => this.props.onClick([2, -1])}
            primaryText={<span><b>{this.showUtilities()}</b> Utilities</span>}
          />
          <Divider />
          <ListItem
            leftIcon={<ActionReportProblem color={darkBlack} />}
            nestedItems={_.map(_.sortBy(_.keys(crimeGroups)), (key, index) => (
              <ListItem
                key={index}
                primaryText={
                  <span><b>{crimeGroups[key].length}</b> {_.startCase(_.lowerCase(key))}</span>
                }
              />
            ))}
            onClick={() => this.props.onClick([3, -1])}
            primaryText={<span><b>{this.showCrimes()}</b> Crimes</span>}
          />
          <Divider />
        </List>
      </Paper>
    );
  }
}

SearchResults.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchResults: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape,
  ]).isRequired,
};

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps)(SearchResults);
