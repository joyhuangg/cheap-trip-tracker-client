import React, { Component } from 'react';
import RestaurantList from './RestaurantList'
import SelectedRestaurants from './SelectedRestaurants'

class RestaurantsContainer extends Component {
  render(){
    return(
      <div >
        RestaurantsContainer Component
        < RestaurantList />
        < SelectedRestaurants />
      </div>
    )
  }
}

export default RestaurantsContainer
