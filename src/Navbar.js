import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends Component {

  render(){
    // debugger
    let loggedIn = !!this.props.currentUser
    let toReturn;

    loggedIn ?

        toReturn = (
          <div>
            <Link to="/" className="logo">Cheap Trip Tracker</Link>
            Logged in NAVBAR component
            <ul className="menu">
              <li><Link to="/trips">My Saved Trips</Link></li>
              <li><Link to="/" onClick={this.props.handleLogout}>Logout</Link></li>
            </ul>
          </div>
        ):

        toReturn = (
          <div>
            <Link to="/" className="logo">Cheap Trip Tracker</Link>
            NOT Logged in NAVBAR component
            <ul className="menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
        )

    return toReturn
  }

}

export default withRouter(Navbar)
