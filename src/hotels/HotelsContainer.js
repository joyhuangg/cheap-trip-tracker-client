import React, { Component } from 'react';
import HotelList from './HotelList'
import SelectedHotel from './SelectedHotel'
import { Dimmer, Loader, Image, Segment, Header, Grid } from 'semantic-ui-react'

// import { connect } from 'react-redux'

class HotelsContainer extends Component {

  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div>
          <Header>Pick a hotel to stay at!</Header>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                < HotelList />
              </Grid.Column>
              <Grid.Column>
                Show details of hotel here?
              </Grid.Column>
              <Grid.Column>
                < SelectedHotel />
              </Grid.Column>
            </Grid.Row>
          </Grid>


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



export default HotelsContainer
