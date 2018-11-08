import React, { Component } from 'react';
import Hotel from './Hotel'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { postNewHotel } from '../store/actions/hotelActions'
import { postTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip } from '../store/actions/tripActions'

class SelectedHotel extends Component {

  state = {
    hotel:this.props.selectedHotel
  }

  handleClick = (e) => {

    // we want to find or create the selected hotel
    let hotel = {
      longitude: this.props.selectedHotel.location.longitude,
      latitude: this.props.selectedHotel.location.latitude,
      address: `${this.props.selectedHotel.address.line1} ${this.props.selectedHotel.address.city}, ${this.props.selectedHotel.address.country} ${this.props.selectedHotel.address.postal_code}`,
      price: parseFloat(this.props.selectedHotel.total_price.amount),
      property_name: this.props.selectedHotel.property_name
    }
      //alter longitdue/latitude of trip to be the long/lat of hotel
    this.props.postNewHotel(hotel)
    .then((action) => {


      // then create hotel_trip object
      //save hotel_trip association in the backend
      let tripObj
      this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
      postTripHotel(tripObj.id, action.payload.id)
    })
    // TO DO!!!!!
    //alter longitdue/latitude of trip to be the long/lat of hotel in backend
    this.props.currentTrip.longitude = hotel.longitude
    this.props.currentTrip.latitude = hotel.latitude
    this.props.currentTrip.price = hotel.price
    this.props.updateMyTrip(this.props.currentTrip)


        // I probably want to show all trip information in some sort of div
        // so i can keep track of the saved information
        // render restaurnats list now based on new long/lat
        // do it similar as hotels




      // then patch the current Trip's hotel
        // if there is already a hotel for the current trip

        // we want to make a patch request to hotel trip association



    // link to /restaurants
    this.props.history.push('/restaurants')
  }

  render(){
    if (this.props.selectedHotel){
      return(
        <div>
          Featured Hotel:
          <Hotel hotel={this.props.selectedHotel} trip={this.props.currentTrip}/>
          {/* hotel should be equal to the currentTrips first hotel or maybe last hotel added?  */}
          {this.props.selectedHotel ? <Button onClick={this.handleClick}>Save Hotel</Button> : <Button disabled>Please Select a Hotel</Button>}

        </div>
      )
    }
    else{
      return null
    }
  }

}

const mapStateToProps = (state) => {
  return {selectedHotel: state.hotels.selectedHotel,
          currentTrip: state.trips.currentTrip}
}

export default withRouter(connect(mapStateToProps, {postNewHotel, updateMyTrip})(SelectedHotel))
