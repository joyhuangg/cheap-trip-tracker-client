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


class App extends Component {
// currentUser has keys of
// name: "",
// email: "",
// password: "",


  componentDidMount(){
    const token = localStorage.getItem("token")
    // if (!!token){
    //   this.getCurrentUser(token)
    //   // Promise.all([this.getCurrentUser(token), this.fetchStores(), this.getDeals(),this.getStampCards()])
    // }



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

  // handleSignUpSubmit = (e, obj) => {
  //   this.setState({auth:{ currentUser: {obj}}})
  //   debugger
  //   fetch("https://localhost:3000/api/v1/users",{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: localStorage.getItem("token")
  //
  //     },
  //     body: JSON.stringify(obj)
  //   })
  //   .then(resp => this.props.history.push("/profile"))
  // }

  render() {
    return (
      <div className="App">

          <Navbar currentUser={this.props.currentUser}/>
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

export default withRouter(connect(mapStateToProps)(App))
