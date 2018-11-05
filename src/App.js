import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import Home from './home/Home'
import Navbar from './Navbar'
import Footer from './Footer'
import Signup from './signup/Signup'
import Login from './login/Login'
import Profile from './profile/Profile'
import TripsContainer from './trips/TripsContainer'
import HotelsContainer from './hotels/HotelsContainer'
import RestaurantsContainer from './restaurants/RestaurantsContainer'
import Checkout from './checkout/Checkout'
import { connect } from 'react-redux'
import {YELP_API_KEY, AMADEUS_API_KEY, MAPBOX_API_KEY} from "./.keys"
import { getCurrentUser, removeUser } from './store'
import { loadTrip } from './store/actions/tripActions'


class App extends Component {
// currentUser has keys of
// name: "",
// email: "",
// password: "",

  componentDidMount(){
    // TO DO: load all the trips related to user
    const token = localStorage.getItem("token")
    if (!!token && token !== "undefined"){
      this.props.getCurrentUser(token)
      .then((resp) => {
        // need to find currentTrip if it exists, and set it in the front end for a logged in user
        if (this.props.currentUser.current_trip_id){
          this.props.loadTrip(this.props.currentUser.current_trip)
          // debugger
        }

      })



      // the current user returns an object with message: "please log in"
      // if (this.props.currentUser.message){
      //   localStorage.removeItem("token")
      //   this.props.removeUser()
      //   console.log("logging out")
      // }
    }
    else{
      console.log("no one logged in")
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.removeUser()
    // TO DO: NEED TO REMOVE HOTELS, RESTUARANTS, TRIPS ETC.
    console.log("logging out")
  }

  render() {
    return (
      <div className="App">

          <Navbar currentUser={this.props.currentUser} handleLogout={this.handleLogout}/>
          <Switch>
            <Route path="/trips" render={(routerProps) => <TripsContainer {...routerProps} trips={this.state.trips} currentUser={this.props.currentUser}/>} />
            <Route path="/signup" render={(routerProps)=> <Signup {...routerProps} handleSignUpSubmit={this.handleSignUpSubmit}/>} />
            <Route path="/login" render={()=> <Login  handleLogin={this.handleLogin}/>} />
            <Route path="/profile" render={(routerProps) => <Profile {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/hotels" render={(routerProps) => <HotelsContainer {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/restaurants" render={(routerProps) => <RestaurantsContainer {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/checkout" render={(routerProps) => <Checkout {...routerProps} currentUser={this.props.currentUser}/>}/>
            <Route path="/" component={Home} />
          </Switch>
          {/* add activities and flights later */}
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {getCurrentUser: (token) => dispatch(getCurrentUser(token))}
// }

export default withRouter(connect(mapStateToProps, {getCurrentUser, removeUser, loadTrip})(App))
