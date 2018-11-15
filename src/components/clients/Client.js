import React, { Component } from 'react';

import { List, Button, Container, Divider, Grid, Header, Image, Menu, Segment,Item } from 'semantic-ui-react'
import clientsJSON from '../../data/clients.json';
import { displayDetails } from "../../actions/index";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import ClientDetails from './ClientDetails';
import SearchBarCustom from "./SearchBarCustom"
import store from '../../store/index';

const mapDispatchToProps = dispatch => {
  return {
    displayDetails: details => dispatch(displayDetails(details))
  };
};



// const mapStateToProps = state => {
//   return {
//     results: state.SearchResults.clients
//    }
// }

class Client extends Component {
clients = JSON.parse( JSON.stringify(clientsJSON));

  constructor(props){
    super(props);
    this.state = {
      details: " ",
      isHidden: true,
      isHiddenClients: false,
      clients: this.clients
    };


    store.subscribe(() =>{
    if(store.getState().SearchResults.isHiddenClients){
    this.setState({
      isHiddenClients: store.getState().SearchResults.isHiddenClients,
      clients: store.getState().SearchResults.clients
    })
  } else {
    this.setState({
      isHiddenClients: store.getState().SearchResults.isHiddenClients,
      clients: this.clients
    })
  }
  })
  }




  handleClick(e, data){
    var result = this.clients.map(ob => ob.general)

    e.preventDefault();

    const id = uuidv1();

    this.props.displayDetails(data);
    this.setState({ details: "",
                    isHidden: false});
  }


  handleClickSearch(e, data1){

    var found = this.clients.find(function (obj){
      return ((obj.general.firstName + " "+obj.general.lastName) === data1.title);
    })
    console.log("Found");
    console.log(found);
    console.log("Data");
      this.props.displayDetails(found);
      this.setState({ details: "",
                      isHidden: false});
  }


  dispalayClients(clients,isSearch){
    if(isSearch === false){

  return ( clients.map( obj => (
      <Item  key = {uuidv1()} onClick={((e) => this.handleClick(e, obj))}>
        <Item.Image size='tiny' src={obj.general.avatar} />

        <Item.Content>
          <Item.Header >{obj.general.firstName +" "+obj.general.lastName} </Item.Header>
          <Item.Description >{obj.job.title}</Item.Description>
        </Item.Content>
      </Item>
    )
  ));
}else {

  return (clients.map( obj => (
      <Item  key = {uuidv1()}
        onClick={((e) => this.handleClickSearch(e, obj))}
        >
        <Item.Image size='tiny' src={obj.image} />

        <Item.Content>
          <Item.Header>{obj.title} </Item.Header>
          <Item.Description >{obj.description}</Item.Description>
        </Item.Content>
      </Item>
    )

  ))
}

  }

  render() {
    return (
      <div>
      <Grid columns={2} style={{height: '100vh'}} divided>
      <Grid.Row stretched>
        <Grid.Column width = {4}>
          <Segment>

            <SearchBarCustom/>

          </Segment>
          <Segment
            style={{overflow: 'auto'}}
            >

            <Item.Group link>
              {this.dispalayClients(this.state.clients, this.state.isHiddenClients)}
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment hidden = {this.state.isHidden}>
            <h3>Details</h3>
            <ClientDetails />
          </Segment>

        </Grid.Column>
      </Grid.Row>
    </Grid>

    </div>
    );
  }
}


export default connect(null, mapDispatchToProps)(Client);
