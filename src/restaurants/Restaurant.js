import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectRestaurant, removeRestaurant} from '../store/actions/restaurantActions'

// t.string :image_url
// t.string :name
// t.string :url
// t.float :rating
// t.string :longitude
// t.string :latitude
// t.string :address

class Restaurant extends Component{

  handleClick = (e) => {
    // add this fucntaionlity to Hotel
    if (!this.props.selectedRestaurants.includes(this.props.restaurant)){
      this.props.selectRestaurant(this.props.restaurant)
    }
    else if (e.target.parentElement.className === "SelectedRestaurants"){
      this.props.removeRestaurant(this.props.restaurant)
    }
  }

  render(){
    return(
      <div onClick={this.handleClick}>
        {this.props.restaurant.name} - {this.props.restaurant.user_rating.aggregate_rating}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.restaurants.selectedRestaurants}
}

export default connect(mapStateToProps, {selectRestaurant, removeRestaurant})(Restaurant)
