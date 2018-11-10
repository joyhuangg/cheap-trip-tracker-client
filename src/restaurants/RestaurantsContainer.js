import React, { Component } from 'react';
import RestaurantList from './RestaurantList'
import SelectedRestaurants from './SelectedRestaurants'
import { Dimmer, Loader, Image, Segment, Header, Grid } from 'semantic-ui-react'


class RestaurantsContainer extends Component {
  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div className="scroll-container">
          <Header textAlign='center'>Select Cheap Eats!</Header>
          < RestaurantList />
          < SelectedRestaurants />
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

export default RestaurantsContainer
