import React, {Component} from 'react'
import Restaurant from './Restaurant'
import {connect} from 'react-redux'
import {Button, Modal, Icon} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { postNewRestaurant } from '../store/actions/restaurantActions'
import { postTripRestaurant } from '../store/actions/restaurantAdapter'
import { updateMyTrip } from '../store/actions/tripActions'

class SelectedRestaurants extends Component {

  state = {
    restaurants:this.props.selectedRestaurants
  }

  handleDelete = (e, trip, hotel) => {
    // deleteTripHotel(trip.id, hotel.id)
    // let newTrip = {...trip }
    // newTrip.price -= parseFloat(hotel.price)
    // newTrip.hotels = []
    //
    // this.props.removeSelectedHotel()
    // this.props.updateMyTrip(newTrip)
    debugger
  }
  handleClick = (e) => {
    // t.string :image_url
    // t.string :name
    // t.string :url
    // t.float :rating
    // t.string :longitude
    // t.string :latitude
    // t.string :address
    // might want to add avg price

    // for each restaurant in selected restaurants...
    this.props.selectedRestaurants.forEach((selectedRestaurant) => {
      // we want to find or create the selected restaurant

      let cuisines;
      selectedRestaurant.categories.forEach((category) => cuisines += (category.title + ', '))
      let restaurant = {
        image_url:selectedRestaurant.image_url,
        name:selectedRestaurant.name,
        url:selectedRestaurant.url,
        rating:parseFloat(selectedRestaurant.rating),
        longitude:parseFloat(selectedRestaurant.coordinates.longitude),
        latitude:parseFloat(selectedRestaurant.coordinates.latitude),
        address:selectedRestaurant.location.display_address,
        // price:selectedRestaurant.average_cost_for_two/2,
        cuisines: cuisines
      }
      this.props.postNewRestaurant(restaurant)
      .then((action) => {
        let tripObj
        //save restaurant_trip association in the backend
        this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
        postTripRestaurant(tripObj.id, action.payload.id)
      })

      this.props.currentTrip.price += restaurant.price
      this.props.updateMyTrip(this.props.currentTrip)

    })

    //alter longitdue/latitude of trip to be the long/lat of restaurant in backend



        // I probably want to show all trip information in some sort of div
        // so i can keep track of the saved information
        // render restaurnats list now based on new long/lat
        // do it similar as restaurants




      // then patch the current Trip's restaurant
        // if there is already a restaurant for the current trip

        // we want to make a patch request to restaurant trip association



    // link to /restaurants
    this.props.history.push('/checkout')
  }

  render(){
    let restaurantCards = this.props.selectedRestaurants.map((restaurant) => < Restaurant key={restaurant.id} restaurant={restaurant} trip={this.props.currentTrip} />)
    return(
        <Modal
          trigger={< Button attached="top"><Icon inverted circular color='teal' name='food' />See Selected Restaurants</Button>}
          header='Selected Restaurants'
          content={restaurantCards}
          actions={[<Button
              content='Confirm'
              key='confirm'
              positive='true'
              onClick={(e) => this.handleClick(e)}
              />,<Button
              content='Delete'
              key='delete'
              negative='true'
              onClick={(e) => this.handleDelete(e, this.props.currentTrip, this.props.selectedHotel)}
              />, { key: 'done', content: 'Done', positive: true }]}
        />
    )

    // return(
    //   <div className="SelectedRestaurants">
    //     SelectedRestaurants Component
    //     {restaurantCards}<br/>
    //     {this.props.selectedRestaurants.length > 0 ? <Button onClick={this.handleClick}>Go To Checkout</Button> : <Button disabled>Please Select Restaurants</Button>}
    //
    //   </div>
    // )
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.restaurants.selectedRestaurants,
          currentTrip: state.trips.currentTrip}
}
export default withRouter(connect(mapStateToProps, {postNewRestaurant, updateMyTrip})(SelectedRestaurants))
