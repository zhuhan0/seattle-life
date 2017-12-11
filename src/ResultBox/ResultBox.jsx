import React from 'react';
import _ from 'lodash';
import MapComponent from './GMap';
import SearchResults from './search_results';

class ResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedCategory: [0],
      markedPlace: -1,
    };
  }

  handleClick = (index) => {
    const { markedCategory } = this.state;
    let { markedPlace } = this.state;
    if (index[0] !== 0) {
      if (index[1] === -1 && _.includes(markedCategory, index[0])) {
        _.remove(markedCategory, element => element === index[0]);
      } else if (!_.includes(markedCategory, index[0])) {
        markedCategory.push(index[0]);
      }
      markedPlace = -1;
    }
    if (index[1] !== -1) {
      // eslint-disable-next-line
      markedPlace = index[1];
    }

    this.setState({ markedCategory: _.clone(markedCategory), markedPlace });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SearchResults onClick={this.handleClick} />
        <MapComponent
          markedCategory={this.state.markedCategory}
          markedPlace={this.state.markedPlace}
        />
      </div>
    );
  }
}

export default ResultBox;
