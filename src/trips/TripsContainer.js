import React, { Component } from 'react';
import TripTable from './TripTable'
import { Dimmer, Loader, Image, Segment, Header } from 'semantic-ui-react'


class TripsContainer extends Component {
  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div className="tall-container" >
          <Header style={{ margin: '1em' }} as='h2' textAlign='center'>Saved Trips</Header>
          <TripTable currentUser={this.props.currentUser} />
        </div>
      )
    }
    else{
      return(
        <Segment className="tall-container">
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      )
    }

  }
}

export default TripsContainer
