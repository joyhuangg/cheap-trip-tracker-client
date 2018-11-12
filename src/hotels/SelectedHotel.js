import React, { Component } from 'react';
import Hotel from './Hotel'
import {connect} from 'react-redux'
import {Button, Modal, Icon, List} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { postNewHotel, removeSelectedHotel } from '../store/actions/hotelActions'
import { postTripHotel, deleteTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip, deleteHotelFromTrip } from '../store/actions/tripActions'




class SelectedHotel extends Component {

  state = {
    hotel:this.props.selectedHotel
  }

  handleDelete = (e, trip, hotel) => {
    deleteTripHotel(trip.id, hotel.id)
    let newTrip = {...trip }
    newTrip.price -= parseFloat(hotel.price)
    newTrip.hotels = []

    this.props.removeSelectedHotel()
    this.props.updateMyTrip(newTrip)
  }
  // handleClick = (e) => {
  //
  //   // we want to find or create the selected hotel
  //   let hotel = {
  //     longitude: this.props.selectedHotel.location.longitude,
  //     latitude: this.props.selectedHotel.location.latitude,
  //     address: `${this.props.selectedHotel.address.line1} ${this.props.selectedHotel.address.city}, ${this.props.selectedHotel.address.country} ${this.props.selectedHotel.address.postal_code}`,
  //     price: parseFloat(this.props.selectedHotel.total_price.amount),
  //     property_name: this.props.selectedHotel.property_name
  //   }
  //     //alter longitdue/latitude of trip to be the long/lat of hotel
  //   this.props.postNewHotel(hotel)
  //   .then((action) => {
  //
  //
  //     // then create hotel_trip object
  //     //save hotel_trip association in the backend
  //     let tripObj
  //     this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
  //     postTripHotel(tripObj.id, action.payload.id)
  //   })
  //   // TO DO!!!!!
  //   //alter longitdue/latitude of trip to be the long/lat of hotel in backend
  //   this.props.currentTrip.longitude = hotel.longitude
  //   this.props.currentTrip.latitude = hotel.latitude
  //   this.props.currentTrip.price = hotel.price
  //   this.props.updateMyTrip(this.props.currentTrip)
  //
  //
  //       // I probably want to show all trip information in some sort of div
  //       // so i can keep track of the saved information
  //       // render restaurnats list now based on new long/lat
  //       // do it similar as hotels
  //
  //
  //
  //
  //     // then patch the current Trip's hotel
  //       // if there is already a hotel for the current trip
  //
  //       // we want to make a patch request to hotel trip association
  //
  //
  //
  //   // link to /restaurants
  //   this.props.history.push('/restaurants')
  // }

  render(){
    if (this.props.selectedHotel){
      const content =       <List.Item onClick={this.handleClick}>
              <Icon small name='hotel' />
              <List.Content>
                <List.Header as='a'>{this.props.selectedHotel.property_name}</List.Header>
                <List.Description>
                  Price: ${this.props.selectedHotel.price}
                  <div>
                    Address: {this.props.selectedHotel.address}
                    {/* {this.props.currentTrip.hotels[0].awards[0] ? (<React.Fragment><br/>Rating: {this.props.currentTrip.hotels[0].awards[0].rating}</React.Fragment>) : null} */}
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
      return(
          <Modal
            trigger={< Button attached="top"><Icon inverted circular color='teal' name='home' />See Selected Hotel</Button>}
            header='Selected Hotel'
            content={content}
            actions={[<Button
                content='Delete'
                key='delete'
                negative='true'
                onClick={(e) => this.handleDelete(e, this.props.currentTrip, this.props.selectedHotel)}
                />, { key: 'done', content: 'Done', positive: true }]}
          />
      )
    }
    else if( this.props.currentTrip.hotels[0]){
      const content =       <List.Item onClick={this.handleClick}>
              <Icon small name='hotel' />
              <List.Content>
                <List.Header as='a'>{this.props.currentTrip.hotels[0].property_name}</List.Header>
                <List.Description>
                  Price: ${this.props.currentTrip.hotels[0].price}
                  <div>
                    Address: {this.props.currentTrip.hotels[0].address}
                    {/* {this.props.currentTrip.hotels[0].awards[0] ? (<React.Fragment><br/>Rating: {this.props.currentTrip.hotels[0].awards[0].rating}</React.Fragment>) : null} */}
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
      return(
          <Modal
            trigger={< Button attached="top"><Icon inverted circular color='teal' name='home' />See Selected Hotel</Button>}
            header='Selected Hotel'
            content={content}
            actions={[<Button
                content='Delete'
                key='delete'
                negative='true'
                onClick={(e) => this.handleDelete(e, this.props.currentTrip, this.props.currentTrip.hotels[0])}
                />, { key: 'done', content: 'Done', positive: true }]}
          />
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

export default withRouter(connect(mapStateToProps, {postNewHotel, updateMyTrip, removeSelectedHotel})(SelectedHotel))
