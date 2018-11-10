import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
import {List, Image, Icon, Button, Segment } from 'semantic-ui-react'
class Hotel extends Component {

// do i need state or componentDidMount?
  state = {
    longitude: '',
    latitude: '',
    address: '',
    price: '',
    property_name: '',
    property_code: '',
    trip_id: '',
    clicked: false
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
    this.setState({clicked: !this.state.clicked})
    // console.log(this.state)
    // debugger

  }

  handleSelect = (e) => {
    this.setState({clicked: !this.state.clicked})
    this.props.selectHotel(this.props.hotel)
  }

  render(){
    let toReturn
    this.props.hotel ?
    toReturn = (
      <List.Item onClick={this.handleClick}>
        <Icon small name='hotel' />
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
  return {trip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectHotel})(Hotel)
