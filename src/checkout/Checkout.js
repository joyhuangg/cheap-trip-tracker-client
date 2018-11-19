import React, { Component } from 'react';
import NameTripForm from '../trips/NameTripForm'
import TripDetail from '../trips/TripDetail'
import { connect } from 'react-redux'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

// import { loadActivities } from '../store/actions/activityActions'

// import Activities

class Checkout extends Component {

  state = {
    loaded: false
  }

  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div>
          <NameTripForm trip={this.props.currentTrip}/>
          <TripDetail trip={this.props.currentTrip}/>
        </div>
      )
    }
    else{
      return(
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>


        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentTrip: state.trips.currentTrip
  }
}

export default connect(mapStateToProps)(Checkout)
