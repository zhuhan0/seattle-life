import React from 'react';
import MapComponent from './GMap';
import SearchResults from './search_results';

class ResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerType: 0,
    };
  }

  handleCategoryClick = (index) => {
    if (this.state.markerType !== index) {
      this.setState({
        markerType: index,
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SearchResults
          onCategoryClick={this.handleCategoryClick}
        />
        <MapComponent markerType={this.state.markerType} />
      </div>
    );
  }
}

export default ResultBox;
