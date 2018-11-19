import React, { Component } from 'react';
import HotelList from './HotelList'
import SelectedHotel from './SelectedHotel'
import { Dimmer, Loader, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class HotelsContainer extends Component {

  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn && this.props.currentTrip){
      return(
        <div className="scroll-container">
          {/* <VerticalSidebar animation={'push'} direction={'left'} visible={true} id={this.props.currentTrip.id}/> */}
          <div className="nav">
            <Link to={`/trips/${this.props.currentTrip.id}`}><span><Icon name='road' />Current Trip Details | </span></Link>
            <Link to="/restaurants"><span><Icon name='food' />Restaurants | </span></Link>
            <Link to="#"><span><Icon name='plane' />Flights | </span></Link>
            <Link to="#"><span><Icon name='fly' />Activities</span></Link>
          </div>
          {/* TO DO: differentiate between creating and editing, 'Change Hotel' */}
          <Header as="h1" textAlign='center'>Hotels in {this.props.currentTrip.location}</Header>
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
