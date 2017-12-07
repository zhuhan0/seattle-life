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
    const houses = this.showHouses();

    return (
      <Paper
        style={{
          fontSize: 18,
          height: '87%',
          position: 'absolute',
          width: '20%',
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
                onClick={() => this.props.onClick([0, index])}
                primaryText={`${house.city}, ${house.postcode}`}
              />
            ))}
            onClick={() => this.props.onClick(0)}
            primaryText={houses === 1 ? `${houses} House` : `${houses} Houses`}
            primaryTogglesNestedList
          />
          <Divider />
          <ListItem
            leftIcon={<MapsRestaurant color={amber400} />}
            onClick={() => this.props.onClick(1)}
            primaryText={`${this.showRestaurants()} Restaurants`}
          />
          <Divider />
          <ListItem
            leftIcon={<NotificationPower color={green400} />}
            onClick={() => this.props.onClick(2)}
            primaryText={`${this.showUtilities()} Utilities`}
          />
          <Divider />
          <ListItem
            leftIcon={<ActionReportProblem color={darkBlack} />}
            onClick={() => this.props.onClick(3)}
            primaryText={`${this.showCrimes()} Crimes`}
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
