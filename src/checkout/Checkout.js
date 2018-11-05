import React, { Component } from 'react';
import NameTripForm from '../trips/NameTripForm'
import TripDetail from '../trips/TripDetail'
import { connect } from 'react-redux'

// import Activities

class Checkout extends Component {

  state = {
    loaded: false
  }

  componentDidMount(){
    if (this.props.currentTrip){
      // debugger
      // this.props.loadRestaurants(this.props.currentTrip)
    }
  }

  componentDidUpdate(){
    if (this.props.currentTrip && !this.state.loaded){
      // debugger
      // this.props.loadRestaurants(this.props.currentTrip)
      this.setState({loaded:true})
    }
  }

  render(){
    return(
      <div>
        Checkout Component
        <NameTripForm />
        <TripDetail />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentTrip: state.trips.currentTrip
  }
}

export default connect(mapStateToProps)(Checkout)
