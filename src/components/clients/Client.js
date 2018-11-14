import React, { Component } from 'react';

import { List, Button, Container, Divider, Grid, Header, Image, Menu, Segment,Item } from 'semantic-ui-react'
import clientsJSON from '../../data/clients.json';
import { displayDetails } from "../../actions/index";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import ClientDetails from './ClientDetails';

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps");
  return {
    displayDetails: details => dispatch(displayDetails(details))
  };
};

class Client extends Component {
clients = JSON.parse( JSON.stringify(clientsJSON));

  constructor(props){
    super(props);
    this.state = {
      details: " "
    };

  }

  handleClick(e, data){
    console.log(e.target);
    console.log(data.general.firstName);
    e.preventDefault();

    const id = uuidv1();

    this.props.displayDetails(data);
    this.setState({ details: "" });
  }

  dispalayClients(){
  return ( this.clients.map( obj => (
      <Item onClick={((e) => this.handleClick(e, obj))}>
        <Item.Image size='tiny' src={obj.general.avatar} />

        <Item.Content>
          <Item.Header>{obj.general.firstName +" "+obj.general.lastName} </Item.Header>
          <Item.Description>{obj.job.title}</Item.Description>
        </Item.Content>
      </Item>
    )
  ));
  }
  render() {
    return (
      <div>
      <Grid columns={2} divided>
      <Grid.Row stretched>
        <Grid.Column width = {4}>
        <Segment style={{overflow: 'auto', maxHeight: '80%' }}>
        <Item.Group link>

      <Item key = {2} onClick={((e) => this.handleClick(e, "Mikle Jackson"))}>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

        <Item.Content>
          <Item.Header>Stevie Feliciano</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      {this.dispalayClients()}

    </Item.Group>
    </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>
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
