import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectRestaurant, removeRestaurant} from '../store/actions/restaurantActions'
import { Image, Icon, Button, Rating, Grid, Card } from 'semantic-ui-react'
import { postTripRestaurant } from '../store/actions/restaurantAdapter'
import {deleteRestaurantFromTrip} from '../store/actions/tripActions'

// t.string :image_url
// t.string :name
// t.string :url
// t.float :rating
// t.string :longitude
// t.string :latitude
// t.string :address

class Restaurant extends Component{

  state = {
    clicked: false,
    selected: false
  }

  componentDidMount(){
    this.setState({selected: !!this.props.selectedRestaurants.find((restaurant) => restaurant.yelp_id === this.props.restaurant.yelp_id)})
  }

  handleClick = (e) => {
    if (e.target.type !== 'submit'){
      this.setState({clicked: !this.state.clicked})
    }

    // add this fucntaionlity to Hotel
    // if (!this.props.selectedRestaurants.includes(this.props.restaurant)){
    //   this.props.selectRestaurant(this.props.restaurant)
    // }
    // else if (e.target.parentElement.className === "SelectedRestaurants"){
    //   this.props.removeRestaurant(this.props.restaurant)
    // }
  }



 // TODO: add disabled and change text to ADDED
  handleSelect = (e) => {
    if (!this.props.selectedRestaurants.find((restaurant) => restaurant.yelp_id === this.props.restaurant.yelp_id)){
      // let cuisines;
      // this.props.restaurant.categories.forEach((category) => cuisines += (category.title + ', '))
      // let restaurant = {
      //   image_url:this.props.restaurant.image_url,
      //   name:this.props.restaurant.name,
      //   url:this.props.restaurant.url,
      //   rating:parseFloat(this.props.restaurant.rating),
      //   longitude:parseFloat(this.props.restaurant.coordinates.longitude),
      //   latitude:parseFloat(this.props.restaurant.coordinates.latitude),
      //   address:this.props.restaurant.location.display_address,
      //   // price:this.props.restaurant.average_cost_for_two/2,
      //   cuisines: cuisines
      // }
      this.setState({selected:!this.state.selected})
      this.props.selectRestaurant(this.props.restaurant)
      .then((action) => {
        let tripObj
        //save restaurant_trip association in the backend
        this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
        postTripRestaurant(tripObj.id, action.payload.id)
      })
    }
    else if (e.target.innerHTML === "Delete"){
      let tripObj
      //save restaurant_trip association in the backend
      this.props.currentTrip.trip ? tripObj = this.props.currentTrip.trip : tripObj = this.props.currentTrip
      this.props.deleteRestaurantFromTrip(tripObj, this.props.restaurant)
    }
  }

  render(){
    let categories = ''
    this.props.restaurant.categories ? this.props.restaurant.categories.forEach((category) => categories += category.title + ', ') : categories = this.props.restaurant.categories
    return(
      <Grid.Column onClick={this.handleClick}>
        <Card>
          <Image className="pic" src={this.props.restaurant.image_url}  />
          <Card.Content>
            <Card.Header>{this.props.restaurant.name}</Card.Header>
            <Card.Description>
              {/*  TO DO: add half stars*/}
              <Rating icon='star' defaultRating={this.props.restaurant.rating} maxRating={5} />
              {this.state.clicked ? (<div>
                Address: {this.props.restaurant.address}
                <br/>Cuisines: {this.props.restaurant.cuisines}

              </div>) :null}
            </Card.Description>
            {this.state.selected ? <Button disabled floated="right" size="mini" icon onClick={this.handleSelect}>Added</Button>
            : <Button floated="right" size="mini" icon onClick={this.handleSelect}><Icon  name='plus'/></Button>}
          </Card.Content>
        </Card>
      </Grid.Column>

    )
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.trips.currentTrip.restaurants,
  currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectRestaurant, removeRestaurant, deleteRestaurantFromTrip})(Restaurant)
