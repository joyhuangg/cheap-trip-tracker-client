import React, { Component } from 'react';

class Hotel extends Component {

  state = {
    longitude: '',
    latitude: '',
    address: '',
    price: '',
    property_name: '',
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
        trip_id: parseInt(this.props.trip.id)
      })
    }
  }

  handleClick = (e) => {
    console.log(this.state)
  }
  render(){
    return(
      <div onClick={this.handleClick}>
        {this.state.property_name} - ${this.state.price}
      </div>
    )
  }
}

export default Hotel
