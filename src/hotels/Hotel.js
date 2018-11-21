import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
import {Image, Icon, Button, Rating, Grid, Card, Popup } from 'semantic-ui-react'
// import { postNewHotel } from '../store/actions/hotelActions'
import { postTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip } from '../store/actions/tripActions'

class Hotel extends Component {

// do i need state or componentDidMount?
  state = {
    clicked: false,
    showButton: true,
    selected: false,
  }

  componentDidMount(){
    // change to .propery_code after changing in backend, must save it now in backend too
    this.setState({selected: !!this.props.selectedHotels.find((hotel) => hotel.property_name === this.props.hotel.property_name)})
    this.props.showButton === false && this.setState({showButton: false})
  }



  handleClick = (e) => {
    if (e.target.type !== 'submit'){
      this.setState({clicked: !this.state.clicked})
    }
  }

  handleSelect = (e) => {
    // this.setState({clicked: !this.state.clicked})
    // we want to find or create the selected hotel
    // let rating = 0
    // if (this.props.hotel.awards.length > 0){
    //   rating = this.props.hotel.rating
    // }
    // let hotel = {
    //   longitude: this.props.hotel.longitude,
    //   latitude: this.props.hotel.latitude,
    //   address: {this.props.hotel.address},
    //   price: parseFloat(this.props.hotel.amount),
    //   property_name: this.props.hotel.property_name,
    //   rating: rating,
    //   image_url: 'http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg'
    // }
    this.setState({selected:!this.state.selected})
    this.props.selectHotel(this.props.hotel)
      //alter longitdue/latitude of trip to be the long/lat of hotel
    .then((action) => {
      //
      // this.props.selectHotel(action.payload)
      // then create hotel_trip object
      //save hotel_trip association in the backend
      let tripObj
      this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
      postTripHotel(tripObj.id, action.payload.id)
      // TO DO!!!!!
      //alter longitdue/latitude of trip to be the long/lat of hotel in backend
      this.props.currentTrip.longitude = this.props.hotel.longitude
      this.props.currentTrip.latitude = this.props.hotel.latitude
      this.props.currentTrip.price = this.props.hotel.price
      this.props.updateMyTrip(this.props.currentTrip)
    })

  }

  render(){
    let toReturn
    let button;
    if (this.state.selected){
      button = <Button disabled floated="right" color="blue" size="mini" icon onClick={this.handleSelect}>Added</Button>
    }
    else{
      button = <Button floated="right" color="blue" size="mini" icon onClick={this.handleSelect}><Icon  name='plus'/></Button>
    }
    this.props.hotel ?
    toReturn = (
      <Popup
        key={this.props.hotel.id}
        trigger={<Grid.Column >
          <Card id="card-style">
            <Image className="pic" src='http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg' />

            <Card.Content>
              <Card.Header>{this.props.hotel.property_name} </Card.Header>
              <Card.Description>
                Price: ${this.props.hotel.price}
              </Card.Description>
              {this.state.showButton && button }
            </Card.Content>
          </Card>
        </Grid.Column>}
        header="Additional Info"
        content=<div>
          <Rating icon='star' disabled defaultRating={this.props.hotel.rating} maxRating={5} />
          <b>Address:</b> {this.props.hotel.address}
        <br/>
      </div>
      />
    )
    :
    toReturn =(<div>loading</div>)
    return toReturn
  }
}

const mapStateToProps = (state) => {
  return {currentTrip: state.trips.currentTrip,
      selectedHotels: state.trips.currentTrip.hotels}
}

export default connect(mapStateToProps, {selectHotel, updateMyTrip})(Hotel)
