import React from 'react';
import { AutoComplete, FontIcon, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';

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
              style={{
                width: '400px',
              }}
              textFieldStyle={{
                width: '400px',
              }}
            />
            <ToolbarSeparator />
            <FontIcon className="material-icons">search</FontIcon>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
