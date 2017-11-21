import React from 'react';
import { AutoComplete, FontIcon, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import ToggleButtons from './ToggleButtons';

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
              hintText="Type anywhere within Seattle (city, address, zipcode, etc.)"
              dataSource={this.state.dataSource}
              style={{
                width: '410px',
              }}
              textFieldStyle={{
                width: '410px',
              }}
            />
            <ToggleButtons
              style={{
                width: '120px',
              }}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <FontIcon className="material-icons">search</FontIcon>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
