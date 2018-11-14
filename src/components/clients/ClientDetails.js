import React, { Component } from 'react';

import { List, Button, Container, Divider, Grid, Header, Image, Menu, Segment,Item } from 'semantic-ui-react'
import clientsJSON from '../../data/clients.json';
import { displayDetails } from "../../actions/index";
import { connect } from "react-redux";
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return {
    general: state.general,
    job:state.job,
    contact:state.contact,
    address:state.address
   }
}

class ClientDetails extends Component{

  render(){
    return(
      <div>
      <h3>Details</h3>
      {
        this.props.general.firstName
        }
      </div>
    )
  }

}

export default connect(mapStateToProps)(ClientDetails);
