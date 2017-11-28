import React from 'react';
import { AutoComplete, IconButton, Paper, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import BuyRentToggle from './BuyRentToggle';
import BedroomButtons from './BedroomButtons';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchText: '',
    };
  }

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    });
  }

  render() {
    return (
      <Paper
        style={{ fontSize: 18 }}
        zDepth={2}
      >
        <Toolbar>
          <ToolbarGroup
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 800,
            }}
          >
            <AutoComplete
              hintText="Type anywhere within Seattle (city, address, zipcode, etc.)"
              dataSource={this.state.dataSource}
              onNewRequest={this.handleNewRequest}
              onUpdateInput={this.handleUpdateInput}
              searchText={this.state.searchText}
              style={{
                width: 410,
              }}
              textFieldStyle={{
                width: 410,
              }}
            />
            <BuyRentToggle />
            <BedroomButtons />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <IconButton
              iconClassName="fa fa-search"
              style={{
                marginLeft: 10,
              }}
            />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default SearchBar;
