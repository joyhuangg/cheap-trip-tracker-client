import React, { Component } from 'react';
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { loadRestaurants } from '../store/actions/restaurantActions'
import { Segment, Dimmer, Loader, Grid } from 'semantic-ui-react'


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
    if (this.props.restaurants){
      restaurants = this.props.restaurants.map((restaurantObj) => {
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
    })

    let i = 0;
    let restaurantRows = []
    while (i < restaurants.length){
      let row =
      <Grid.Row>
        <Grid.Column>
          {restaurants[i]}
        </Grid.Column>
        <Grid.Column>
          {restaurants[i+1]}
        </Grid.Column>
        <Grid.Column>
          {restaurants[i+2]}
        </Grid.Column>
      </Grid.Row>
      restaurantRows.push(row)
      i += 3;
    }
    return(
      <Grid className="RestaurantList" columns='equal' selection padded>
        {restaurantRows}
      </Grid>
    )
  }
  else{
    return(
      <Segment className="tall-container">
        <Dimmer active>
          <Loader />
        </Dimmer>

        {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
      </Segment>
    )
  }
}
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
          restaurants: state.restaurants.restaurants,
          selectedRestaurants: state.restaurants.selectedRestaurants}
}

export default connect(mapStateToProps, {loadRestaurants})(RestaurantList)
