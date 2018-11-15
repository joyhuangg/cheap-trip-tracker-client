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
    this.props.hotels ? hotels = this.props.hotels.map((hotel) => < Hotel key={hotel.property_code} hotel={hotel} trip={this.props.currentTrip} />) : hotels = []
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
