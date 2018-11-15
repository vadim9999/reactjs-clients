import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import clientsJSON from '../../data/clients.json';
import { searchresults, hideClients, displayDetails } from "../../actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    searchresults: results => dispatch(searchresults(results)),
    hideClients: isHidden => dispatch(hideClients(isHidden)),
    displayDetails: details => dispatch(displayDetails(details))
  };
};

const mapStateToProps = state => {
  return {
    hidenClients: state.SearchResults.isHiddenClients
   }
}

const clients = JSON.parse( JSON.stringify(clientsJSON));

var source =

clients.map(ob => {
  return {
  "title": ob.general.firstName + " " + ob.general.lastName,
  "description" : ob.job.title,
  "image": ob.general.avatar
}
}
  );

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    console.log("resetComponent");
    if(this.props.hidenClients === true){
      this.props.hideClients(false)
    }

    return this.setState({ isLoading: false, results: [], value: '' })
  }
  handleResultSelect = (e, { result }) =>{
    console.log(result);

    this.props.searchresults([result]);
    this.setState({ value: result.title })
  }



  handleSearchChange = (e, { value }) => {

    this.props.searchresults(this.state.results);
    this.props.hideClients(true)

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')


      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })

      this.props.searchresults(this.state.results);
      this.props.hideClients(true)

    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state


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
connect(mapStateToProps, mapDispatchToProps)(SearchBar);
