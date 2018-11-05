import React, { Component } from 'react';
import TripForm from './TripForm'
import { connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
class Profile extends Component {

  handleClick = (e) => {
    this.props.history.push("/hotels")
  }

  render(){

    let loggedIn = !!this.props.currentUser

    let toReturn
    if (loggedIn){
      let user;
      // debugger
      // if (this.props.currentUser.currentUser.user){
      //   user = this.props.currentUser.currentUser.user
      // }
      // else if (this.props.currentUser.currentUser){
      //   user = this.props.currentUser.currentUser
      // }
      // else{
      //   user = this.props.currentUser
      // }



      // TOOOO MOTHERFUCKING FIX LATER WHY THE MOTHERFUCKING
      // IS IT NESTING IT DIFFERENTLY FROM SIGN UP/LOGIN
      if (this.props.currentUser){
        user = this.props.currentUser
        if (this.props.currentUser.currentUser){
          user = this.props.currentUser.currentUser
          if (this.props.currentUser.currentUser.user){
            user = this.props.currentUser.currentUser.user
          }
        }
      }
      // this.props.currentUser.currentUser.user ? user = this.props.currentUser.currentUser : user = this.props.currentUser.currentUser.user

      toReturn =
      (
        <div>
          {user.name}'s Profile Component
          {user.current_trip_id? (<div><Button onClick={this.handleClick}>Continue To Trip in Progress</Button></div>) : (<TripForm currentUser={user} />)}
        </div>
      )
    }
    else{
      toReturn =  (<div>Please Log In</div>)
    }
    return toReturn
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

export default withRouter(connect(mapStateToProps)(Profile))
