import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
import {Image, Icon, Button, Rating, Grid, Card } from 'semantic-ui-react'
// import { postNewHotel } from '../store/actions/hotelActions'
import { postTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip } from '../store/actions/tripActions'

class Hotel extends Component {

// do i need state or componentDidMount?
  state = {
    clicked: false
  }


  handleClick = (e) => {
    if (e.target.type !== 'submit'){
      this.setState({clicked: !this.state.clicked})
    }
  }

  handleSelect = (e) => {
    // this.setState({clicked: !this.state.clicked})
    // we want to find or create the selected hotel
    let rating = 0
    if (this.props.hotel.awards.length > 0){
      rating = this.props.hotel.awards[0].rating
    }
    let hotel = {
      longitude: this.props.hotel.location.longitude,
      latitude: this.props.hotel.location.latitude,
      address: `${this.props.hotel.address.line1} ${this.props.hotel.address.city}, ${this.props.hotel.address.country} ${this.props.hotel.address.postal_code}`,
      price: parseFloat(this.props.hotel.total_price.amount),
      property_name: this.props.hotel.property_name,
      rating: rating,
      image_url: 'http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg'
    }
    this.props.selectHotel(hotel)
      //alter longitdue/latitude of trip to be the long/lat of hotel

    .then((action) => {
      //
      // this.props.selectHotel(action.payload)
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
      <Grid.Column id="card-column" onClick={this.handleClick}>
        <Card>
          <Image className="pic" src='http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg' />

          <Card.Content>
            <Card.Header>{this.props.hotel.property_name} </Card.Header>
            <Card.Description>
              Price: ${this.props.hotel.total_price.amount}
              {this.state.clicked? (<div>
                Address: {this.props.hotel.address.line1} {this.props.hotel.address.city}, {this.props.hotel.address.country} {this.props.hotel.address.postal_code}
                {this.props.hotel.awards[0] ? (<React.Fragment><br/><Rating icon='star' defaultRating={this.props.hotel.awards[0].rating} maxRating={5} /></React.Fragment>) : null}
              </div>) :null}
            </Card.Description>
            <Button floated="right" size="mini" icon onClick={this.handleSelect}><Icon  name='plus'/></Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    )
    :
    toReturn =(<div>loading</div>)
    return toReturn
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectHotel, updateMyTrip})(Hotel)
