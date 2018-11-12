import React, { Component } from 'react';
import RestaurantList from './RestaurantList'
import SelectedRestaurants from './SelectedRestaurants'
import { Dimmer, Loader, Image, Segment, Header, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import VerticalSidebar from '../VerticalSidebar'

class RestaurantsContainer extends Component {
  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn && this.props.currentTrip){
      return(
        <div className="scroll-container">
          <VerticalSidebar animation={'push'} direction={'left'} visible={true} id={this.props.currentTrip.id}/>
          <Header textAlign='center'>Select Cheap Eats!</Header>
          < SelectedRestaurants />
          < RestaurantList />
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

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser.currentUser,
          currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps)(RestaurantsContainer)
