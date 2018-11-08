import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {Menu, Sidebar, Icon, Segment, Header, Image} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './home/Home'
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
import { getCurrentUser, removeUser} from './store'
import {removeHotels } from './store/actions/hotelActions'
import {removeTrips, loadMyTrips } from './store/actions/tripActions'
import {removeRestaurants } from './store/actions/restaurantActions'
import { loadTrip } from './store/actions/tripActions'
import { Container } from 'semantic-ui-react'
import TripDetail from './trips/TripDetail'

const VerticalSidebar = ({ animation, direction, visible, id }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as={Link} to={`/trips/${id}`}>
      <Icon name='road' />
      Current Trip Details
    </Menu.Item>
    <Menu.Item as={Link} to="/hotels">
      <Icon name='home' />
      Hotels
    </Menu.Item>
    <Menu.Item as={Link} to="/restaurants">
      <Icon name='food' />
      Restaurants
    </Menu.Item>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  id: PropTypes.number,
}

class Navbar extends Component {

  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  }

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

// changed this to just always be visible
  handleAnimationChange = (animation, show) => () => {
    this.setState({ animation, visible: show })
    // this.setState({ animation, visible: !this.state.visible })
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

  render(){
    // debugger
    let loggedIn = !!this.props.currentUser
    let toReturn;
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    let id

    loggedIn ?
        toReturn = (
          <Container>
          <Menu inverted>
            <Menu.Item>
              <Link to="/" disabled={vertical} onClick={this.handleAnimationChange('slide along', false)} className="logo">Cheap Trip Tracker</Link>
            </Menu.Item>
            <Menu.Item >
              {this.props.currentTrip ?
                <Link to="/profile" disabled={vertical} onClick={this.handleAnimationChange('slide along', true)}>Edit Trip</Link>
                :<Link to="/profile" disabled={vertical} onClick={this.handleAnimationChange('slide along', true)}>New Trip</Link>}
            </Menu.Item>
            <Menu.Item >
              <Link disabled={vertical} onClick={this.handleAnimationChange('slide along', false)}to="/trips">My Saved Trips</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/" onClick={this.props.handleLogout}>Logout</Link>
            </Menu.Item>
          </Menu>


          <Sidebar.Pushable as={Segment}>
            {vertical || !this.props.currentTrip ? null : (
              <VerticalSidebar animation={animation} direction={direction} visible={visible} id={this.props.currentTrip.id}/>
            )}

            <Sidebar.Pusher dimmed={dimmed && visible}>
              <Segment basic>
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
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
        ):

        toReturn = (
          <Menu>
            <Menu.Item>
              <Link to="/" className="logo">Cheap Trip Tracker</Link>
            </Menu.Item>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    trips: state.trips.trips,
    currentTrip: state.trips.currentTrip
  }
}


export default withRouter(connect(mapStateToProps, {getCurrentUser, removeUser, loadTrip, removeTrips, removeRestaurants, removeHotels, loadMyTrips })(Navbar))
