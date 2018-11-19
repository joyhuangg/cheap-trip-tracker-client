import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectRestaurant, removeRestaurant} from '../store/actions/restaurantActions'
import { Image, Icon, Button, Rating, Grid, Card, Popup } from 'semantic-ui-react'
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
    selected: false,
    showButton: true
  }

  componentDidMount(){
    this.setState({selected: !!this.props.selectedRestaurants.find((restaurant) => restaurant.yelp_id === this.props.restaurant.yelp_id)})
    this.props.showButton === false && this.setState({showButton: false})
  }

 // TODO: add disabled and change text to ADDED
  handleSelect = (e) => {
    if (!this.props.selectedRestaurants.find((restaurant) => restaurant.yelp_id === this.props.restaurant.yelp_id)){
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
    let button;
    if (this.state.selected){
      button = <Button disabled floated="right" color="blue" size="mini" icon onClick={this.handleSelect}>Added</Button>
    }
    else{
      button = <Button floated="right" color="blue" size="mini" icon onClick={this.handleSelect}><Icon  name='plus'/></Button>
    }
    this.props.restaurant.categories ? this.props.restaurant.categories.forEach((category) => categories += category.title + ', ') : categories = this.props.restaurant.categories
    return(
      <Popup
        key={this.props.restaurant.id}
        trigger={<Grid.Column>
          <Card id="card-style">
            <Image className="pic" src={this.props.restaurant.image_url}  />
            <Card.Content>
              <Card.Header>{this.props.restaurant.name}</Card.Header>
              <Card.Description>
                {/*  TO DO: add half stars*/}
                <Rating icon='star' disabled defaultRating={this.props.restaurant.rating} maxRating={5} /><br/>
              </Card.Description>

              {this.state.showButton && button }
            </Card.Content>
          </Card>
        </Grid.Column>}
        header="Additional Info"
        content=<div>
          <b>Address:</b> {this.props.restaurant.address}
          <br/><b>Cuisines:</b> {this.props.restaurant.cuisines}

        </div>
      />


    )
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.trips.currentTrip.restaurants,
  currentTrip: state.trips.currentTrip}
}

export default connect(mapStateToProps, {selectRestaurant, removeRestaurant, deleteRestaurantFromTrip})(Restaurant)
