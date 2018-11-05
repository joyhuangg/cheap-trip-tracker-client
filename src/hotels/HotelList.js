import React, { Component } from 'react';
import Hotel from './Hotel'
import { connect } from 'react-redux'
import { loadHotels } from '../store/actions/hotelActions'


// STRETCH GOAL: allow users to filter by rating, price, location
// STRETCH GOAL: ADD PAGINATION
class HotelList extends Component {

  state = {
    loaded: false
  }

  componentDidMount(){
    if (this.props.currentTrip){
      // debugger
      this.props.loadHotels(this.props.currentTrip)
    }
  }

  componentDidUpdate(){
    if (this.props.currentTrip && !this.state.loaded){
      // debugger
      this.props.loadHotels(this.props.currentTrip)
      this.setState({loaded:true})
    }
  }

  render(){
    let hotels
    this.props.hotels ? hotels = this.props.hotels.map((hotel) => < Hotel key={hotel.property_code} hotel={hotel} trip={this.props.currentTrip} />) : hotels = []
    return(
      <div>
        {hotels}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
          hotels: state.hotels.hotels}
}

export default connect(mapStateToProps, {loadHotels})(HotelList)
