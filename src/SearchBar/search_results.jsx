import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton, Paper, Toolbar, ToolbarGroup } from 'material-ui';

class SearchResults extends Component {
    showCrimes() {
        if (this.props.searchResults.length != 0) {
            return this.props.searchResults.crimes.length;
        }
    }

    showHouses() {
        if (this.props.searchResults.length != 0) {
            return this.props.searchResults.houses.length;
        }
    }

    showRestaurants() {
        if (this.props.searchResults.length != 0) {
            return this.props.searchResults.restaurants.length;
        }
    }

    showUtilities() {
        if (this.props.searchResults.length != 0) {
            return this.props.searchResults.utilities.length;
        }
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
                width: 800,
              }}
            >
            <p>Houses: {this.showHouses()}</p>
            <p>Crimes: {this.showCrimes()}</p>
            <p>Restaurants: {this.showRestaurants()}</p>
            <p>Utilities: {this.showUtilities()}</p>
            </div>
            </ToolbarGroup>
        </Toolbar>
      </Paper>

            );
    }
}

function mapStateToProps({ searchResults }) {
    return { searchResults };
}

export default connect(mapStateToProps)(SearchResults);