import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import { searchresults, hideClients, displayDetails } from "../../actions/index";
import { connect } from "react-redux";
import { getClients } from "../selectors/selector";

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

var source = getClients().map(ob => {
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
    if(this.props.hidenClients === true){
      this.props.hideClients(false)
    }

    return this.setState({ isLoading: false, results: [], value: '' })
  }

  handleResultSelect = (e, { result }) =>{
    this.props.searchresults([result]);
    this.setState({ value: result.title })
  }

  handleSearchChange = (e, { value }) => {
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
      </Grid>

    )
  }
}
export default
connect(mapStateToProps, mapDispatchToProps)(SearchBar);
