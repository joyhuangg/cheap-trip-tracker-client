import React, { Component } from 'react';
import HotelList from './HotelList'
import SelectedHotel from './SelectedHotel'
import { Dimmer, Loader, Image, Segment, Header, Grid, Button } from 'semantic-ui-react'
import StickyLayout from '../trips/StickyLayout'
// import { connect } from 'react-redux'

class HotelsContainer extends Component {

  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div className="scroll-container">
          <Header textAlign='center'>Pick a hotel to stay at!</Header>
          < Button attached="top">See Selected Hotels</Button>
          < HotelList />
          < SelectedHotel />
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
