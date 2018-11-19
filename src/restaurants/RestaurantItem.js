import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectRestaurant, removeRestaurant} from '../store/actions/restaurantActions'
import { List, Image, Icon, Button, Rating } from 'semantic-ui-react'
import {deleteRestaurantFromTrip} from '../store/actions/tripActions'

// t.string :image_url
// t.string :name
// t.string :url
// t.float :rating
// t.string :longitude
// t.string :latitude
// t.string :address

class RestaurantItem extends Component{

  state = {
    clicked: false
  }

  handleClick = (e) => {
    if (e.target.type !== 'submit'){
      this.setState({clicked: !this.state.clicked})
    }

    // add this fucntaionlity to Hotel
    // if (!this.props.selectedRestaurants.includes(this.props.restaurant)){
    //   this.props.selectRestaurant(this.props.restaurant)
    // }
    // else if (e.target.parentElement.className === "DeleteedRestaurants"){
    //   this.props.removeRestaurant(this.props.restaurant)
    // }
  }



 // TODO: add disabled and change text to ADDED
  handleDelete = (e) => {
      let tripObj
      //save restaurant_trip association in the backend
      this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
      this.props.deleteRestaurantFromTrip(tripObj, this.props.restaurant)
  }

  render(){
    // debugger
    let categories = ''
    this.props.restaurant.categories ? this.props.restaurant.categories.forEach((category) => categories += category.title + ', ') : categories = this.props.restaurant.categories
    return(
      <List.Item padded onClick={this.handleClick}>
        <Image avatar src={this.props.restaurant.image_url} />
        <List.Content>
          <List.Header as='a'>{this.props.restaurant.name}             <Button floated="right" size="mini" icon onClick={this.handleDelete}><Icon  name='trash alternate'/></Button></List.Header>
          <List.Description>
            {/*  TO DO: add half stars*/}
            <Rating disabled icon='star' defaultRating={this.props.restaurant.rating} maxRating={5} />
            {this.state.clicked ? (<div>
              Address: {this.props.restaurant.address}
              <br/>Cuisines: {this.props.restaurant.cuisines}

            </div>) :null}
          </List.Description>
        </List.Content>
      </List.Item>

    )
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.trips.currentTrip.restaurants,
  currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectRestaurant, removeRestaurant, deleteRestaurantFromTrip})(RestaurantItem)
