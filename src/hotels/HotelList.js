import React, { Component } from 'react';
import Hotel from './Hotel'
import { connect } from 'react-redux'
import { loadHotels } from '../store/actions/hotelActions'
import { Grid } from 'semantic-ui-react'


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
    this.props.hotels ? hotels = this.props.hotels.map((hotel) => {
      let rating = 0
      if (hotel.awards.length > 0){
        rating = hotel.awards[0].rating
      }
      return < Hotel key={hotel.property_code} hotel={{
          longitude: hotel.location.longitude,
          latitude: hotel.location.latitude,
          address: `${hotel.address.line1} ${hotel.address.city}, ${hotel.address.country} ${hotel.address.postal_code}`,
          price: parseFloat(hotel.total_price.amount),
          property_name: hotel.property_name,
          rating: rating,
          image_url: 'http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg'
        }} trip={this.props.currentTrip} />}) : hotels = []
    let i = 0;
    let hotelRows = []
    while (i < hotels.length){

      let row =
      <Grid.Row id="card-column">
        <Grid.Column id="card-column">
          {hotels[i]}
        </Grid.Column>
        <Grid.Column id="card-column">
          {hotels[i+1]}
        </Grid.Column>
        <Grid.Column id="card-column">
          {hotels[i+2]}
        </Grid.Column>
      </Grid.Row>
      hotelRows.push(row)
      i += 3;
    }
    return(
      <Grid style={{margin: '1em'}} columns='equal' selection>
        {hotelRows}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
          hotels: state.hotels.hotels}
}

export default connect(mapStateToProps, {loadHotels})(HotelList)
