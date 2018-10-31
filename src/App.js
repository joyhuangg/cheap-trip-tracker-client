import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
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

import {YELP_API_KEY, AMADEUS_API_KEY, MAPBOX_API_KEY} from "./.keys"


class App extends Component {

  state = {
    auth: {currentUser: {}},
    trips: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (!!token){
      this.getCurrentUser(token)
      // Promise.all([this.getCurrentUser(token), this.fetchStores(), this.getDeals(),this.getStampCards()])
    }
    // fetch('http://localhost:3003/api/v1/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       email: 'guy',
    //       password: 'hi',
    //       name: 'King of Flavortown, USA',
    //     }
    //   })
    // })
    //   .then(r => r.json())
    //   .then(console.log)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar/>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/trips" render={(routerProps) => <TripsContainer {...routerProps} trips={this.state.trips} currentUser={this.state.auth.currentUser}/>} />
        <Route exact path="/signup" render={()=> <Signup handleSignUpSubmit={this.handleSignUpSubmit}/>} />
        <Route exact path="/login" render={()=> <Login  handleLogin={this.handleLogin}/>} />
        <Route exact path="/profile" render={(routerProps) => <Profile {...routerProps} currentUser={this.state.auth.currentUser}/>}/>
        <Route exact path="/hotels" render={(routerProps) => <HotelsContainer {...routerProps} currentUser={this.state.auth.currentUser}/>}/>
        <Route exact path="/restaurants" render={(routerProps) => <RestaurantsContainer {...routerProps} currentUser={this.state.auth.currentUser}/>}/>
        <Route exact path="/checkout" render={(routerProps) => <Checkout {...routerProps} currentUser={this.state.auth.currentUser}/>}/>
        {/* add activities and flights later */}
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
