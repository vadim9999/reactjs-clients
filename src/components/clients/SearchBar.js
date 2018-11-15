import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import clientsJSON from '../../data/clients.json';
import { searchresults, hideClients } from "../../actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps");
  return {
    searchresults: results => dispatch(searchresults(results))
  };
};

const clients = JSON.parse( JSON.stringify(clientsJSON));

var source =

clients.map(ob => {
  return {
  "title": ob.general.firstName + " " + ob.general.lastName,
  "image": ob.general.avar
}
}
  );

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    console.log("This.state.results");
    console.log(this.state.results);
//     if(this.state.results.length != 0){
//     this.props.searchResults(this.state.results);
//     this.props.hideClients(true)
// }
    this.setState({ isLoading: true, value })


    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      console.log("re");
      console.log(re);

      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
      console.log("State timeout");
      console.log(this.state.results);
      if(this.state.results.length != 0){
      this.props.searchresults(this.state.results);
      // this.props.hideClients(false)
  }
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    console.log("results");
    console.log(results);

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          {/* <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>

          </Segment> */}
        </Grid.Column>
      </Grid>
    )
  }
}
export default
connect(null, mapDispatchToProps)(SearchBar);
