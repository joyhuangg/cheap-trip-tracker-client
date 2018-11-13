import React, { Component } from 'react';
import HotelList from './HotelList'
import SelectedHotel from './SelectedHotel'
import { Dimmer, Loader, Image, Segment, Header, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import VerticalSidebar from '../VerticalSidebar'


class HotelsContainer extends Component {

  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn && this.props.currentTrip){
      return(
        <div className="scroll-container">
          <VerticalSidebar animation={'push'} direction={'left'} visible={true} id={this.props.currentTrip.id}/>
          <Header textAlign='center'>PICK A HOTEL TO STAY AT</Header>
          < SelectedHotel />
          < HotelList />

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

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser.currentUser,
          currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps)(HotelsContainer)
