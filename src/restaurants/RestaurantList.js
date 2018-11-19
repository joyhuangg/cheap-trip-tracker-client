import React, { Component } from 'react';
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { loadRestaurants } from '../store/actions/restaurantActions'
import { Grid } from 'semantic-ui-react'


// TO DO: follow example of restaurants to create a list of restaurants, use yelp api
// STRETCH GOAL: allow users to filter by rating, price, location
// STRETCH GOAL: ADD PAGINATION
class RestaurantList extends Component {

  state = {
    loaded: false
  }

  componentDidMount(){
    if (this.props.currentTrip){
      this.props.loadRestaurants(this.props.currentTrip)
    }
  }

  componentDidUpdate(){
    if (this.props.currentTrip && !this.state.loaded){
      this.props.loadRestaurants(this.props.currentTrip)
      this.setState({loaded:true})
    }
  }

  render(){
    let restaurants = []
    this.props.restaurants &&
(      restaurants = this.props.restaurants.map((restaurantObj) => {
        let cuisines = '';
        let address = ''
        restaurantObj.categories.forEach((category) => cuisines += (category.title + ', '))
        restaurantObj.location.display_address.forEach(addressLine => address += (addressLine + ' '))
        let restaurant = {
          image_url:restaurantObj.image_url,
          name:restaurantObj.name,
          url:restaurantObj.url,
          rating:parseFloat(restaurantObj.rating),
          longitude:parseFloat(restaurantObj.coordinates.longitude),
          latitude:parseFloat(restaurantObj.coordinates.latitude),
          address: address,
          yelp_id: restaurantObj.id,
          // price:restaurantObj.average_cost_for_two/2,
          cuisines: cuisines
        }

        return (< Restaurant key={restaurant.yelp_id} restaurant={restaurant} trip={this.props.currentTrip} />)
    }))

    let i = 0;
    let restaurantRows = []
    while (i < restaurants.length){
      let row =
      <Grid.Row id="card-column">
        <Grid.Column id="card-column">
          {restaurants[i]}
        </Grid.Column>
        <Grid.Column id="card-column">
          {restaurants[i+1]}
        </Grid.Column>
        <Grid.Column id="card-column">
          {restaurants[i+2]}
        </Grid.Column>
      </Grid.Row>
      restaurantRows.push(row)
      i += 3;
    }
    return(
      <Grid className="RestaurantList" columns='equal' padded>
        {restaurantRows}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
          restaurants: state.restaurants.restaurants,
          selectedRestaurants: state.restaurants.selectedRestaurants}
}

export default connect(mapStateToProps, {loadRestaurants})(RestaurantList)
