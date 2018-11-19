import React, { Component } from 'react';
import TripForm from './TripForm'
import { connect} from 'react-redux'
// import {} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { Dimmer, Loader} from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'

class Profile extends Component {



  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e) => {
    this.props.history.push("/hotels")
  }
  render(){

    let loggedIn = !!this.props.currentUser

    let toReturn
    if (loggedIn){
      let user;
      // TODo IX LATER WHY
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
      toReturn =
      (
        <div className="center-form">
            <TripForm currentUser={user} />
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
    return toReturn
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser,
          currentTrip: state.trips.currentTrip}
}

export default withRouter(connect(mapStateToProps)(Profile))
