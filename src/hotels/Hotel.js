import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
import {List, Image, Icon, Button, Segment } from 'semantic-ui-react'
import { postNewHotel } from '../store/actions/hotelActions'
import { postTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip } from '../store/actions/tripActions'

class Hotel extends Component {

// do i need state or componentDidMount?
  state = {
    // longitude: '',
    // latitude: '',
    // address: '',
    // price: '',
    // property_name: '',
    // property_code: '',
    // trip_id: '',
    clicked: false
  }

  // componentDidMount(){
  //   if(this.props.hotel){
  //     this.setState({
  //       longitude: this.props.hotel.location.longitude,
  //       latitude: this.props.hotel.location.latitude,
  //       address: this.props.hotel.address.line1 + " " + this.props.hotel.address.city + ", " + this.props.hotel.address.country + " " + this.props.hotel.address.postal_code,
  //       price: parseInt(this.props.hotel.total_price.amount),
  //       property_name: this.props.hotel.property_name,
  //       property_code: this.props.hotel.property_code,
  //       trip_id: parseInt(this.props.currentTrip.id)
  //     })
  //   }
  // }


  handleClick = (e) => {
    this.setState({clicked: !this.state.clicked})
  }

  handleSelect = (e) => {
    // this.setState({clicked: !this.state.clicked})
    // we want to find or create the selected hotel
    let hotel = {
      longitude: this.props.hotel.location.longitude,
      latitude: this.props.hotel.location.latitude,
      address: `${this.props.hotel.address.line1} ${this.props.hotel.address.city}, ${this.props.hotel.address.country} ${this.props.hotel.address.postal_code}`,
      price: parseFloat(this.props.hotel.total_price.amount),
      property_name: this.props.hotel.property_name,
      rating: this.props.hotel.awards? this.props.hotel.awards[0].rating : 0,
      image_url: 'http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg'
    }
    this.props.postNewHotel(hotel)
      //alter longitdue/latitude of trip to be the long/lat of hotel

    .then((action) => {

      this.props.selectHotel(action.payload)
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
  }

  render(){
    let toReturn
    this.props.hotel ?
    toReturn = (
      <List.Item onClick={this.handleClick}>
        <Icon small name='hotel' />
        <Image src='http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg' size="small" />
        <List.Content>
          <List.Header as='a'>{this.props.hotel.property_name}<Button onClick={this.handleSelect} floated="right">Add</Button></List.Header>
          <List.Description>
            Price: ${this.props.hotel.total_price.amount}
            {this.state.clicked? (<div>
              Address: {this.props.hotel.address.line1} {this.props.hotel.address.city}, {this.props.hotel.address.country} {this.props.hotel.address.postal_code}
              {this.props.hotel.awards[0] ? (<React.Fragment><br/>Rating: {this.props.hotel.awards[0].rating}</React.Fragment>) : null}
            </div>) :null}
          </List.Description>
        </List.Content>
      </List.Item>
    )
    :
    toReturn =(<div>loading</div>)
    return toReturn
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectHotel, postNewHotel, updateMyTrip})(Hotel)
