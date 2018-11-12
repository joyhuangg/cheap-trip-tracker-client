import React, { Component } from 'react';
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { loadRestaurants } from '../store/actions/restaurantActions'
import { List, Image, Segment } from 'semantic-ui-react'


// TO DO: follow example of restaurants to create a list of restaurants, use yelp api
// STRETCH GOAL: allow users to filter by rating, price, location
// STRETCH GOAL: ADD PAGINATION
class RestaurantList extends Component {

  state = {
    loaded: false
  }

  componentDidMount(){
    if (this.props.currentTrip){
      // debugger
      this.props.loadRestaurants(this.props.currentTrip)
    }
  }

  componentDidUpdate(){
    if (this.props.currentTrip && !this.state.loaded){
      // debugger
      this.props.loadRestaurants(this.props.currentTrip)
      this.setState({loaded:true})
    }
  }

  render(){
    let restaurants
    this.props.restaurants ? restaurants = this.props.restaurants.map((restaurant) => < Restaurant key={restaurant.restaurant.id} restaurant={restaurant.restaurant} trip={this.props.currentTrip} />) : restaurants = []
    return(
      <List selection className="RestaurantList" size="big" style={{float: 'left'}} divided>
        {restaurants}
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
          restaurants: state.restaurants.restaurants}
}

export default connect(mapStateToProps, {loadRestaurants})(RestaurantList)
