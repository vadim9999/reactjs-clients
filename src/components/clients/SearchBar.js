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

var source = getClients();


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
    this.setState({ value: result.general.firstName })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')

      const isMatch = result => re.test(result.general.firstName + " "+ result.general.lastName)

      const isMatchJob = result => re.test(result.job.title)
      const isMatchCompany = result => re.test(result.job.company)

      const isMatchEmail = result => re.test(result.contact.email)
      const isMatchPhone = result => re.test(result.contact.phone)

      const isMatchStreet = result => re.test(result.address.street)
      const isMatchCity = result => re.test(result.address.city)
      const isMatchZipCode = result => re.test(result.address.zipCode)
      const isMatchCountry = result => re.test(result.address.country)

      var filterByFirstLastName = _.filter(source, isMatch)

      var filterByJob = _.filter(source, isMatchJob)
      var filterByCompany = _.filter(source, isMatchCompany)

      var filterByEmail = _.filter(source, isMatchEmail)
      var filterByPhone = _.filter(source, isMatchPhone)

      var filterByStreet = _.filter(source, isMatchStreet)
      var filterByCity = _.filter(source, isMatchCity)
      var filterByZipCode = _.filter(source, isMatchZipCode)
      var filterByCountry = _.filter(source, isMatchCountry)

      var a = [...filterByFirstLastName,...filterByJob,...filterByCompany,
      ...filterByEmail,...filterByPhone, ...filterByStreet,
      ...filterByCity, ...filterByZipCode, ...filterByCountry]

      for(var i=0; i<a.length; ++i) {
       for(var j=i+1; j<a.length; ++j) {
           if((a[i].general.firstName + " " + a[i].general.lastName) === (a[j].general.firstName + " " + a[j].general.lastName) )
               a.splice(j--, 1);
       }
   }

      this.setState({
        isLoading: false,
        results: a,
      })

      this.props.searchresults(this.state.results);
      this.props.hideClients(true)

    }, 300)
  }
searchGetResults(){
  if(this.state.results.length > 0){
    return [this.state.results[0]]
  }
}
  render() {
    const { isLoading, value } = this.state
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={[{
              "title": " ",
              "description": " ",
              "image": " ",
              "price": " "
            }]}
            value={value}
            open={false}
            {...this.props}
          />
        </Grid.Column>
      </Grid>

    )
  }
}
export default
connect(mapStateToProps, mapDispatchToProps)(SearchBar);
