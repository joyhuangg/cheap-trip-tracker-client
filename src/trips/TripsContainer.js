import React, { Component } from 'react';
import TripTable from './TripTable'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


class TripsContainer extends Component {
  render(){
    // to do: have edit, delete, show button
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div>
          <h1> My Saved Trips </h1>
          <TripTable currentUser={this.props.currentUser} />
        </div>
      )
    }
    else{
      return(
        <Segment>
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
