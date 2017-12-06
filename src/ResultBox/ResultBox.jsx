import React from 'react';
import MapComponent from './GMap';
import SearchResults from './search_results';

class ResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerType: 'house',
    };
  }

  handleHouseClick = () => {
    if (this.state.markerType !== 'house') {
      this.setState({
        markerType: 'house',
      });
    }
  }

  handleRestaurantClick = () => {
    if (this.state.markerType !== 'restaurant') {
      this.setState({
        markerType: 'restaurant',
      });
    }
  }

  handleUtilityClick = () => {
    if (this.state.markerType !== 'utility') {
      this.setState({
        markerType: 'utility',
      });
    }
  }

  handleCrimeClick = () => {
    if (this.state.markerType !== 'crime') {
      this.setState({
        markerType: 'crime',
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SearchResults
          onHouseClick={this.handleHouseClick}
          onRestaurantClick={this.handleRestaurantClick}
          onUtilityClick={this.handleUtilityClick}
          onCrimeClick={this.handleCrimeClick}
        />
        <MapComponent markerType={this.state.markerType} />
      </div>
    );
  }
}

export default ResultBox;
