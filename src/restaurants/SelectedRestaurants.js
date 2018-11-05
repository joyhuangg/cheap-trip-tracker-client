import React, {Component} from 'react'
import Restaurant from './Restaurant'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'


class SelectedRestaurants extends Component {

  state = {
    restaurants:this.props.selectedRestaurants
  }


  render(){
    let restaurantCards = this.props.selectedRestaurants.map((restaurant) => < Restaurant key={restaurant.id} restaurant={restaurant} trip={this.props.currentTrip} />)
    return(
      <div style={{background: 'cyan'}} className="SelectedRestaurants">
        SelectedRestaurants Component
        {restaurantCards}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurants: state.restaurants.selectedRestaurants,
          currentTrip: state.trips.currentTrip}
}
export default connect(mapStateToProps)(SelectedRestaurants)
