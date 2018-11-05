import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
class Hotel extends Component {

// do i need state or componentDidMount?
  state = {
    longitude: '',
    latitude: '',
    address: '',
    price: '',
    property_name: '',
    property_code: '',
    trip_id: ''
  }

  componentDidMount(){
    if(this.props.hotel){
      this.setState({
        longitude: this.props.hotel.location.longitude,
        latitude: this.props.hotel.location.latitude,
        address: this.props.hotel.address.line1 + " " + this.props.hotel.address.city + ", " + this.props.hotel.address.country + " " + this.props.hotel.address.postal_code,
        price: parseInt(this.props.hotel.total_price.amount),
        property_name: this.props.hotel.property_name,
        property_code: this.props.hotel.property_code,
        trip_id: parseInt(this.props.trip.id)
      })
    }
  }


  handleClick = (e) => {
    // console.log(this.state)
    // debugger
    this.props.selectHotel(this.props.hotel)
  }

  render(){
    let toReturn
    this.props.hotel ?
    toReturn = (
      <div onClick={(e) => {this.handleClick(e)}}>
        {this.props.hotel.property_name} - ${this.props.hotel.total_price.amount}
      </div>
    )
    :
    toReturn =(<div>loading</div>)
    return toReturn
  }
}

const mapStateToProps = (state) => {
  return {trip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectHotel})(Hotel)
