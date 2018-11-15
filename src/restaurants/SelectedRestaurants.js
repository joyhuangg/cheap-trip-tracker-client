import React, {Component} from 'react'
import RestaurantItem from './RestaurantItem'
import {connect} from 'react-redux'
import {Button, Modal, Icon, List} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { updateMyTrip } from '../store/actions/tripActions'

class SelectedRestaurants extends Component {

  state = {
    restaurants:this.props.selectedRestaurants,
    open: false
  }

  handleDelete = (e, trip, hotel) => {
    // deleteTripHotel(trip.id, hotel.id)
    // let newTrip = {...trip }
    // newTrip.price -= parseFloat(hotel.price)
    // newTrip.hotels = []
    //
    // this.props.removeSelectedHotel()
    // this.props.updateMyTrip(newTrip)
    debugger
  }
  // handleClick = (e) => {
  //   // t.string :image_url
  //   // t.string :name
  //   // t.string :url
  //   // t.float :rating
  //   // t.string :longitude
  //   // t.string :latitude
  //   // t.string :address
  //   // might want to add avg price
  //
  //   // for each restaurant in selected restaurants...
  //   this.props.selectedRestaurants.forEach((selectedRestaurant) => {
  //     // we want to find or create the selected restaurant
  //
  //     let cuisines;
  //     selectedRestaurant.categories.forEach((category) => cuisines += (category.title + ', '))
  //     let restaurant = {
  //       image_url:selectedRestaurant.image_url,
  //       name:selectedRestaurant.name,
  //       url:selectedRestaurant.url,
  //       rating:parseFloat(selectedRestaurant.rating),
  //       longitude:parseFloat(selectedRestaurant.coordinates.longitude),
  //       latitude:parseFloat(selectedRestaurant.coordinates.latitude),
  //       address:selectedRestaurant.location.display_address,
  //       // price:selectedRestaurant.average_cost_for_two/2,
  //       cuisines: cuisines
  //     }
  //     // this.props.postNewRestaurant(restaurant)
  //
  //
  //   })
  //
  //   //alter longitdue/latitude of trip to be the long/lat of restaurant in backend
  //
  //
  //
  //       // I probably want to show all trip information in some sort of div
  //       // so i can keep track of the saved information
  //       // render restaurnats list now based on new long/lat
  //       // do it similar as restaurants
  //
  //
  //
  //
  //     // then patch the current Trip's restaurant
  //       // if there is already a restaurant for the current trip
  //
  //       // we want to make a patch request to restaurant trip association
  //
  //
  //
  //   // link to /restaurants
  //   this.props.history.push('/checkout')
  // }

  render(){
    let restaurantItems = this.props.selectedRestaurants.map((restaurant) => < RestaurantItem key={restaurant.id} restaurant={restaurant} trip={this.props.currentTrip} />)
    return(
        <Modal open={this.state.open}
          trigger={< Button id="center" onClick={() => this.setState({open:true})}><Icon inverted circular color='teal' name='food' />See Selected Restaurants</Button>}
          actions={[{ key: 'done', content: 'Done'}]}>
          <Modal.Header>
            {/* TODO: add number of restaurants in button (2 restaurants)  */}
            <div>Selected Restaurants <Button floated='right' circular color='teal' icon onClick={() => this.setState({open:false})}><Icon inverted  name='angle double up' /></Button>
            </div>
          </Modal.Header>
          <Modal.Content>
            <List ordered className="SelectedRestaurants" size="big" style={{float: 'left', 'padding-bottom': '1em'}} divided>
                  {restaurantItems}</List>
          </Modal.Content>
        </Modal>
    )

  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.trips.currentTrip.restaurants,
          currentTrip: state.trips.currentTrip}
}
export default withRouter(connect(mapStateToProps, { updateMyTrip})(SelectedRestaurants))
