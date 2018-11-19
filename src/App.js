import React, { Component } from 'react';
import './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import Home from './home/Home'
import Navbar from './Navbar'
import Footer from './Footer'
import Signup from './signup/Signup'
import Login from './login/Login'
import Profile from './profile/Profile'
import TripsContainer from './trips/TripsContainer'
import TripDetail from './trips/TripDetail'
import HotelsContainer from './hotels/HotelsContainer'
import RestaurantsContainer from './restaurants/RestaurantsContainer'
import Checkout from './checkout/Checkout'
import { connect } from 'react-redux'
import { getCurrentUser, removeUser} from './store'
import {removeHotels } from './store/actions/hotelActions'
import {removeTrips, loadMyTrips } from './store/actions/tripActions'
import {removeRestaurants } from './store/actions/restaurantActions'
import { loadTrip } from './store/actions/tripActions'
import { Segment} from 'semantic-ui-react'



class App extends Component {

  componentDidMount(){
    // TO DO: load all the trips related to user
    const token = localStorage.getItem("token")
    if (!!token && token !== "undefined"){
      this.props.getCurrentUser(token)
      .then((resp) => {
        // need to find currentTrip if it exists, and set it in the front end for a logged in user
        if (this.props.currentUser.current_trip_id){
          this.props.loadTrip(this.props.currentUser.current_trip)
        }
        this.props.loadMyTrips(this.props.currentUser)

        // load user's trips


      })



      // the current user returns an object with message: "please log in"
      // if (this.props.currentUser.message){
      //   localStorage.removeItem("token")
      //   this.props.removeUser()
      //   console.log("logging out")
      // }
    }
    else{
      alert("No one logged in")
      this.props.history.push("/")
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.removeUser()
    this.props.removeHotels()
    this.props.removeRestaurants()
    this.props.removeTrips()
    // TO DO: NEED TO REMOVE HOTELS, RESTUARANTS, TRIPS ETC.
    console.log("logging out")
  }

  render() {
    return (
      // make this take up the whole width
      <Segment>
          <Navbar currentUser={this.props.currentUser} handleLogout={this.handleLogout}/>
          <Switch>
            <Route path ="/trips/:id" render={(routerProps) => <TripDetail {...routerProps} trip={this.props.currentTrip} currentUser={this.props.currentUser}/>}/>
            <Route path="/trips" render={(routerProps) => <TripsContainer {...routerProps} trips={this.props.trips} currentUser={this.props.currentUser}/>} />
            <Route path="/signup" render={(routerProps)=> <Signup {...routerProps} handleSignUpSubmit={this.handleSignUpSubmit}/>} />
            <Route path="/login" render={()=> <Login  handleLogin={this.handleLogin}/>} />




            <Route path="/profile" render={(routerProps) => <Profile {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/hotels" render={(routerProps) => <HotelsContainer {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/restaurants" render={(routerProps) => <RestaurantsContainer {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/checkout" render={(routerProps) => <Checkout {...routerProps} currentUser={this.props.currentUser}/>}/>


            <Route exact path="/" component={Home} />
          </Switch>
          {/* add activities and flights later */}
        <footer>
          <Footer/>
        </footer>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    trips: state.trips.trips,
    currentTrip: state.trips.currentTrip
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {getCurrentUser: (token) => dispatch(getCurrentUser(token))}
// }

export default withRouter(connect(mapStateToProps, {getCurrentUser, removeUser, loadTrip, removeTrips, removeRestaurants, removeHotels, loadMyTrips })(App))
