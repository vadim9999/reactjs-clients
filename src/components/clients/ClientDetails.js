import React, { Component } from 'react';
import {  Grid, Image } from 'semantic-ui-react'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    general: state.Details.general,
    job: state.Details.job,
    contact: state.Details.contact,
    address: state.Details.address
   }
}

class ClientDetails extends Component{

  render(){
    return(
        <Grid>
          <Grid.Row>
            <Grid.Column width = {4} >
                <Image src={this.props.general.avatar} verticalAlign='top' />
            </Grid.Column>
            <Grid.Column width= {10}>
              <div>
                <h2>{this.props.general.firstName +" "+ this.props.general.lastName}</h2>
                {this.props.job.title + " - " + this.props.job.company }
                <br/><h3>Address:</h3>
                <div>
                  <strong>Country: </strong>{this.props.address.country}
                  <br/><strong>City: </strong>{this.props.address.city}
                  <br/><strong>Street: </strong>{this.props.address.street}
                  <br/><strong>zipCode: </strong>{this.props.address.zipCode}
                </div>
                <div>
                  <br/><h3>Contact: </h3>
                  <strong>Email: </strong>{this.props.contact.email}
                  <br/><strong>Phone: </strong>{this.props.contact.phone}
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }

}

export default connect(mapStateToProps)(ClientDetails);
