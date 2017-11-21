import React from 'react';
import { Tab, Tabs } from 'material-ui';

class ToggleTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'rent',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
      </Tabs>
    );
  }
}

export default ToggleTabs;
