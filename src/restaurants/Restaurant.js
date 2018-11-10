import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectRestaurant, removeRestaurant} from '../store/actions/restaurantActions'
import { List, Image, Icon, Button } from 'semantic-ui-react'
// t.string :image_url
// t.string :name
// t.string :url
// t.float :rating
// t.string :longitude
// t.string :latitude
// t.string :address

class Restaurant extends Component{

  state = {
    clicked: false
  }

  handleClick = (e) => {

    this.setState({clicked: !this.state.clicked})
    // add this fucntaionlity to Hotel
    // if (!this.props.selectedRestaurants.includes(this.props.restaurant)){
    //   this.props.selectRestaurant(this.props.restaurant)
    // }
    // else if (e.target.parentElement.className === "SelectedRestaurants"){
    //   this.props.removeRestaurant(this.props.restaurant)
    // }
  }


  handleSelect = (e) => {
    if (!this.props.selectedRestaurants.includes(this.props.restaurant)){
      this.props.selectRestaurant(this.props.restaurant)
    }
    else if (e.target.parentElement.className === "SelectedRestaurants"){
      this.props.removeRestaurant(this.props.restaurant)
    }
  }

  render(){
    return(

      <List.Item onClick={this.handleClick}>
        {/* <Image avatar src='/images/avatar/small/rachel.png' /> */}
        <Icon small name='food' />
        {/* <Image src={this.props.restaurant.photos_url} size='small' /> */}
        <List.Content>
          <List.Header as='a'>{this.props.restaurant.name}<Button onClick={this.handleSelect} floated="right">Add</Button></List.Header>
          <List.Description>
            Rating: {this.props.restaurant.user_rating? this.props.restaurant.user_rating.aggregate_rating : this.props.restaurant.rating}
            {this.state.clicked ? (<div>
              Address: {this.props.restaurant.location.address}
              Cuisines: {this.props.restaurant.cuisines}

            </div>) :null}
          </List.Description>
        </List.Content>
      </List.Item>
      //
      // <div onClick={this.handleClick}>
      //   {this.props.restaurant.name} - {this.props.restaurant.user_rating? this.props.restaurant.user_rating.aggregate_rating : this.props.restaurant.rating}
      // </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.restaurants.selectedRestaurants}
}

export default connect(mapStateToProps, {selectRestaurant, removeRestaurant})(Restaurant)
