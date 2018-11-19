import React, { Component } from 'react';
import RestaurantList from './RestaurantList'
import SelectedRestaurants from './SelectedRestaurants'
import { Dimmer, Loader, Segment, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RestaurantsContainer extends Component {




  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn && this.props.currentTrip){
      return(
        <div className="scroll-container">
          <div className="nav">
            <Link to={`/trips/${this.props.currentTrip.id}`}><span><Icon name='road' />Current Trip Details | </span></Link>
            <Link to="/hotels"><span><Icon name='hotel' />Hotels | </span></Link>
            <Link to="#"><span><Icon name='plane' />Flights | </span></Link>
            <Link to="#"><span><Icon name='fly' />Activities</span></Link>
          </div>
          {/* <VerticalSidebar animation={'push'} direction={'left'} visible={true} id={this.props.currentTrip.id}/> */}
          <Header as="h1" id="apply-font" textAlign='center'>Restaurants in {this.props.currentTrip.location}</Header>
          < SelectedRestaurants />
          < RestaurantList />
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
          currentTrip: state.trips.currentTrip,
          restaurants: state.restaurants.restaurants}
}

export default connect(mapStateToProps)(RestaurantsContainer)
