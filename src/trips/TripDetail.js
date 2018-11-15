import React, {Component} from 'react'
import {connect} from 'react-redux'
import Restaurant from '../restaurants/Restaurant'
import { Dimmer, Loader, Image, Segment, Divider, Button, Modal, Icon, Grid } from 'semantic-ui-react'
import {removeCurrentTrip} from '../store/actions/userActions'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'



class TripDetail extends Component{
  state = { open: false,
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  }

  show = size => () => this.setState({ size, open: true })
  close = (e) => {
    if (e.target.name === "Yes"){
      this.props.removeCurrentTrip(this.props.currentUser)
      this.props.history.push('/profile')
    }
    this.setState({ open: false })
  }

  render(){
    const { open, size } = this.state

    if (this.props.trip && this.props.currentUser){
      let start_date = new Date(this.props.trip.start_date)
      let start_date_converted = (start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear()
      let end_date = new Date(this.props.trip.end_date)
      let end_date_converted = (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear()
      // debugger
      let restaurants
      this.props.trip.restaurants ? restaurants = this.props.trip.restaurants.map((restaurant) => < Restaurant key={restaurant.id} restaurant={restaurant}/>) : restaurants =  []
      // let activites

      // TODO: indent text with margin or padding, borders, colors
      return(
        <React.Fragment>
          <div className="nav2">
            <Link to={`/trips/${this.props.currentTrip.id}`}><span><Icon name='road' />Current Trip Details | </span></Link>
            <Link to="/hotels"><span><Icon name='hotel' />Hotels | </span></Link>
            <Link to="/restaurants"><span><Icon name='food' />Restaurants | </span></Link>
            <Link to="/"><span><Icon name='plane' />Flights | </span></Link>
            <Link to="/"><span><Icon name='fly' />Activities</span></Link>
          </div>
          <div className="trip-detail-container">
            {/* {this.props.history.location.pathname === '/trips' ? null : <VerticalSidebar animation={animation} direction={direction} visible={visible} id={this.props.currentTrip.id}/>} */}
            <h1>{this.props.trip.location} ({start_date_converted} - {end_date_converted})</h1>
            <Divider />
            {this.props.trip.name ? <h1>{this.props.trip.name}</h1> : null}

            <div className='box'>
              <h2>Number of Guests: {this.props.trip.num_ppl}</h2>
              {this.props.trip.price ? <h2>Price: ${this.props.trip.price}</h2> : null}
            </div>


            {this.props.trip.hotels && this.props.trip.hotels.length > 0 ? <div>

              <Divider />
              {/* maybe make this into a HotelDetail component? */}
              <Image src={this.props.trip.hotels[0].image_url}/>
              <div className='box'>
                <h2>Hotel: {this.props.trip.hotels[0].property_name}</h2>
                <p>Address: {this.props.trip.hotels[0].address}</p>
                <p>Hotel Price: ${this.props.trip.hotels[0].price}</p>
              </div>
            </div> : null}

            <Divider />
            {/* maybe make this into a RestaurantDetail component? */}
            {this.props.trip.restaurants.length > 0 ? <div>
              <h2>Restaurants: </h2>
              <Grid columns='3' selection padded>
                {restaurants}
              </Grid>
            </div> : null }

            <Modal size={size} open={open} onClose={this.close}>
              <Modal.Header>Start a New Trip</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want to start a new trip?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close} negative icon="x" labelPosition='right' content='No' name="No" />
                <Button onClick={this.close} positive icon='checkmark' labelPosition='right' content='Yes' name="Yes" />
              </Modal.Actions>
            </Modal>


          </div>
        </React.Fragment>

      )
    }
    else{
      return(
        <Segment className='tall-container'>
          <Dimmer active>
            <Loader />
          </Dimmer>

        </Segment>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser.currentUser,
          currentTrip: state.trips.currentTrip}
}
export default withRouter(connect(mapStateToProps, {removeCurrentTrip})(TripDetail))
