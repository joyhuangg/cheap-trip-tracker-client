import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {Menu,  Icon, } from 'semantic-ui-react'
import './App.css';
import { connect } from 'react-redux'
import { getCurrentUser, removeUser} from './store'
import {removeHotels } from './store/actions/hotelActions'
import {removeTrips, loadMyTrips } from './store/actions/tripActions'
import {removeRestaurants } from './store/actions/restaurantActions'
import { loadTrip } from './store/actions/tripActions'


class Navbar extends Component {

  state = {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  }


  componentDidMount(){
    // TO DO: load all the trips related to user
    const pathname = this.props.history.location.pathname
    // debugger
    if (pathname === "/trips"){
      this.handleAnimationChange('push', false)
    }

    // else{
    //   this.handleAnimationChange('push', true)
    // }
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
  }

  componentDidUpdate(){
    const pathname = this.props.history.location.pathname

    if (pathname === "/trips"){
      this.handleAnimationChange('push', false)
    }
  }

// changed this to just always be visible
  handleAnimationChange = (animation, show) => () => {
    this.setState({ animation, visible: show })
  }


    handleLogout = () => {
      localStorage.removeItem("token")
      this.props.removeUser()
      this.props.removeHotels()
      this.props.removeRestaurants()
      this.props.removeTrips()
      // NEED TO REMOVE HOTELS, RESTUARANTS, TRIPS ETC.
    }

  render(){
    let loggedIn = !!this.props.currentUser
    let toReturn;
    const { direction } = this.state
    const vertical = direction === 'bottom' || direction === 'top'

    loggedIn ?
        toReturn = (
          <Menu inverted style={{background: 'rgb(111, 128, 124)'}}>
            <Menu.Item >
              <Link disabled={vertical} onClick={this.handleAnimationChange('push', false)}to="/trips"> <Icon name ="folder open outline"/> My Saved Trips</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/profile" disabled={vertical} onClick={this.handleAnimationChange('push', true)}><Icon name ="plus square outline"/> New Trip</Link>
            </Menu.Item>
            <Menu.Item position="right" >
              <Link to="/" onClick={this.props.handleLogout}>Logout <Icon name="sign out"/></Link>
            </Menu.Item>
          </Menu>
        ):

        toReturn = (
          <Menu inverted>
            <Menu.Item >
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          </Menu>
        )

    return toReturn
  }

}

const dontShow = ['/', '/trips', '/profile', '/login', '/signup' ]
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser.currentUser,
    trips: state.trips.trips,
    currentTrip: state.trips.currentTrip,
    show: !dontShow.includes(ownProps.history.location.pathname),
  }
}


export default withRouter(connect(mapStateToProps, {getCurrentUser, removeUser, loadTrip, removeTrips, removeRestaurants, removeHotels, loadMyTrips })(Navbar))
