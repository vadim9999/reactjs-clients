import React, { Component } from 'react';

import { List, Button, Container, Divider, Grid, Header, Image, Menu, Segment,Item } from 'semantic-ui-react'

class Client extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      details: "Details"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    console.log("Click toggle");
    this.setState({
      modal: !this.state.modal,
      details: "This is details"
    });
  }
  render() {
    return (
      <div>
      <Grid columns={2} divided>
      <Grid.Row stretched>
        <Grid.Column width = {4}>
        <Segment style={{overflow: 'auto', maxHeight: '80%' }}>
        <Item.Group link>

      <Item onClick={this.toggle}>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

        <Item.Content>
          <Item.Header>Stevie Feliciano</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>

      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

        <Item.Content>
          <Item.Header>Veronika Ossi</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>

      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>

      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

        <Item.Content>
          <Item.Header>Jenny Hess</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
    </Segment>
        </Grid.Column>
        <Grid.Column>
        {this.state.details}
        </Grid.Column>

      </Grid.Row>
    </Grid>

    </div>
    );
  }
}

export default Client;
