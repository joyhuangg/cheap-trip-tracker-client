import React, {Component} from 'react'
import {connect} from 'react-redux'
import Restaurant from '../restaurants/Restaurant'
import { Dimmer, Loader, Image, Segment, Divider, Button } from 'semantic-ui-react'
import {deleteCurrentTrip} from '../store/actions/tripActions'

class TripDetail extends Component{
  render(){
    if (this.props.trip){
      let start_date = new Date(this.props.trip.start_date)
      let start_date_converted = (start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear()
      let end_date = new Date(this.props.trip.end_date)
      let end_date_converted = (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear()
      // debugger
      let restaurants = this.props.trip.restaurants.map((restaurant) => < Restaurant key={restaurant.id} restaurant={restaurant}/>)
      // let activites
      return(
        <div>
          <h1>CURRENT TRIP'S DETAIL <Button right>Start New Trip</Button></h1>
          <Divider />
          {this.props.trip.name ? <h2>{this.props.trip.name}</h2> : null}
          <h2>Destination: {this.props.trip.location}</h2>
          <h2>Start date: {start_date_converted}</h2>
          <h2>End date: {end_date_converted}</h2>
          <h2>Party #: {this.props.trip.num_ppl}</h2>
          {this.props.trip.price ? <h2>Price: ${this.props.trip.price}</h2> : null}
          {this.props.trip.hotels.length > 0 ? <div>

            <Divider />
            {/* maybe make this into a HotelDetail component? */}
            <h2>Hotel: {this.props.trip.hotels[0].property_name}</h2>
            <p>Address: {this.props.trip.hotels[0].address}</p>
            <p>Hotel Price: ${this.props.trip.hotels[0].price}</p>
          </div> : null}

          <Divider />
          {/* maybe make this into a RestaurantDetail component? */}
          {this.props.trip.restaurants.length > 0 ? <div>
            <h2>Restaurants: </h2>
            {restaurants}
          </div> : null }


        </div>
      )
    }
    else{
      return(
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      )
    }

  }
}

export default TripDetail
