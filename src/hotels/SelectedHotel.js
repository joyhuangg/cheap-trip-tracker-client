import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Button, Modal, Icon, List, Image, Rating} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { removeSelectedHotel } from '../store/actions/hotelActions'
import { deleteTripHotel } from '../store/actions/hotelAdapter'
import { updateMyTrip } from '../store/actions/tripActions'
import HotelItem from './HotelItem'




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
      const content =  < HotelItem hotel={this.props.currentTrip.hotels[0]}/>
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
  return {
          currentTrip: state.trips.currentTrip}
}

export default withRouter(connect(mapStateToProps, { updateMyTrip, removeSelectedHotel})(SelectedHotel))
