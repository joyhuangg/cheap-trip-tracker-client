import React, { Component } from 'react';
import TripForm from './TripForm'
import { connect } from 'react-redux'

class Profile extends Component {
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
          <TripForm currentUser={user} />
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

export default connect(mapStateToProps)(Profile)
