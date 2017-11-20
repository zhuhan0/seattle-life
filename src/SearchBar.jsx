import React from 'react';
import { AutoComplete, Paper, Toolbar, ToolbarGroup } from 'material-ui';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <Paper zDepth={2}>
        <Toolbar>
          <ToolbarGroup>
            <AutoComplete
              hintText="Search anywhere in Seattle (city, address, zipcode, etc.)"
              dataSource={this.state.dataSource}
              textFieldStyle={{
                width: '400px',
              }}
            />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
