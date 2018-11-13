import React, { Component } from 'react';
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { loadRestaurants } from '../store/actions/restaurantActions'
import { List, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'


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
    let restaurants = []
    if (this.props.restaurants){
      restaurants = this.props.restaurants.map((restaurantObj) => {
        let cuisines = '';
        restaurantObj.categories.forEach((category) => cuisines += (category.title + ', '))
        let restaurant = {
          image_url:restaurantObj.image_url,
          name:restaurantObj.name,
          url:restaurantObj.url,
          rating:parseFloat(restaurantObj.rating),
          longitude:parseFloat(restaurantObj.coordinates.longitude),
          latitude:parseFloat(restaurantObj.coordinates.latitude),
          address:restaurantObj.location.display_address,
          yelp_id: restaurantObj.id,
          // price:restaurantObj.average_cost_for_two/2,
          cuisines: cuisines
        }

        return (< Restaurant key={restaurant.yelp_id} restaurant={restaurant} trip={this.props.currentTrip} />)

    })
    return(
      <List selection className="RestaurantList" size="big" style={{float: 'left'}} divided>
        {restaurants}
      </List>
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
  return {currentTrip: state.trips.currentTrip,
          restaurants: state.restaurants.restaurants}
}

export default connect(mapStateToProps, {loadRestaurants})(RestaurantList)
