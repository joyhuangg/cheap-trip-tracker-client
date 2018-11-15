import React, { Component } from 'react';
import Hotel from './Hotel'
import {connect} from 'react-redux'
import {Button, Modal, Icon, List, Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { removeSelectedHotel } from '../store/actions/hotelActions'
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

  render(){
    if( this.props.currentTrip.hotels.length > 0){
      const content =       <List.Item onClick={this.handleClick}>
        <Image src='http://2.bp.blogspot.com/-w0CSWr6g9_A/VBp_wBsXK2I/AAAAAAAAAA4/OBQam61kTds/s1600/2415Mirage-Las-Vegas-3-thumb-550x366.jpg' size="small" />
              <List.Content>
                <List.Header as='a'>{this.props.currentTrip.hotels[0].property_name}</List.Header>
                <List.Description>
                  Price: ${this.props.currentTrip.hotels[0].price}
                  <div>
                    Address: {this.props.currentTrip.hotels[0].address}
                    <br/>Rating: {this.props.currentTrip.hotels[0].rating}
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
      return(
          <Modal
            trigger={< Button id="center"><Icon inverted circular color='teal' name='home' />See Selected Hotel</Button>}
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
  return {selectedHotel: state.trips.currentTrip.hotels[0],
          currentTrip: state.trips.currentTrip}
}

export default withRouter(connect(mapStateToProps, { updateMyTrip, removeSelectedHotel})(SelectedHotel))
