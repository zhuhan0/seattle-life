import React from 'react';
import { AutoComplete, FontIcon, Paper, Toolbar, ToolbarGroup } from 'material-ui';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <Paper
        style={{
          width: '50%',
        }}
        zDepth={2}
      >
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
          <ToolbarGroup>
            <FontIcon className="material-icons">search</FontIcon>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
