import React from 'react';
import { AutoComplete, FontIcon, Paper, Toggle, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';

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
                marginRight: '20px',
                width: '410px',
              }}
              textFieldStyle={{
                width: '410px',
              }}
            />
            <p>BUY</p>
            <Toggle
              style={{
                width: 55,
              }}
              thumbStyle={{
                backgroundColor: '#00bcd4',
              }}
              trackStyle={{
                backgroundColor: '#80deea',
              }}
            />
            <p>RENT</p>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <FontIcon className="fa fa-search" />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
