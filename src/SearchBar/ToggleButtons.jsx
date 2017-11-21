import React from 'react';
import { RaisedButton } from 'material-ui';

class ToggleButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <div>
        <RaisedButton label="Buy" />
        <RaisedButton label="Rent" />
      </div>
    );
  }
}

export default ToggleButtons;
