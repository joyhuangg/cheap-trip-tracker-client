import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectHotel} from '../store/actions/hotelActions'
import { List, Image, Icon, Button, Rating, Header } from 'semantic-ui-react'
import {deleteHotelFromTrip} from '../store/actions/tripActions'

// t.string :image_url
// t.string :name
// t.string :url
// t.float :rating
// t.string :longitude
// t.string :latitude
// t.string :address

class HotelItem extends Component{

  state = {
    clicked: false
  }

  handleClick = (e) => {
    if (e.target.type !== 'submit'){
      this.setState({clicked: !this.state.clicked})
    }

    // add this fucntaionlity to Hotel
    // if (!this.props.selectedHotels.includes(this.props.hotel)){
    //   this.props.selectHotel(this.props.hotel)
    // }
    // else if (e.target.parentElement.className === "DeleteedHotels"){
    //   this.props.removeHotel(this.props.hotel)
    // }
  }



 // TODO: add disabled and change text to ADDED
  handleDelete = (e) => {
      let tripObj
      //save hotel_trip association in the backend
      this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
      this.props.deleteHotelFromTrip(tripObj, this.props.hotel)
  }

  render(){
    // debugger
    let categories = ''
    this.props.hotel.categories ? this.props.hotel.categories.forEach((category) => categories += category.title + ', ') : categories = this.props.hotel.categories
    return(
      <List.Item style={{margin: '1em'}} padded onClick={this.handleClick}>
        <List.Content>
          <Image  size='medium' src={this.props.hotel.image_url} />
          <List.Header as='h1'>{this.props.hotel.property_name}             <Button floated="right" size="mini" icon onClick={this.handleDelete}><Icon  name='trash alternate'/></Button></List.Header>
          <List.Description>
            <Header as="h2">Price: ${this.props.hotel.price}</Header>
            <Header as="h2">            {this.state.clicked ? (<div>
                          <Rating disabled icon='star' defaultRating={this.props.hotel.rating} maxRating={5} />
                          Address: {this.props.hotel.address}
                        </div>) :null}</Header>


          </List.Description>
        </List.Content>
      </List.Item>

    )
  }

}

const mapStateToProps = (state) => {
  return {selectedHotels: state.trips.currentTrip.hotels,
  currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectHotel, deleteHotelFromTrip})(HotelItem)
