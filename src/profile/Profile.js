import React, { Component } from 'react';
import TripForm from './TripForm'
import { connect} from 'react-redux'
// import {} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { Dimmer, Loader, Image } from 'semantic-ui-react'
import { Grid, Menu, Segment, Button} from 'semantic-ui-react'
import TripDetail from '../trips/TripDetail'

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
      const { activeItem } = this.state
      toReturn =
      (
        <div className="tall-container">
          {user.current_trip_id?
            (<TripDetail trip={this.props.currentTrip} />)
            : (<TripForm currentUser={user} />)}
        </div>
      )
    }
    else{
      return(
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
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
