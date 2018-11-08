import React, {Component} from 'react'
import {nameTrip} from '../store/actions/tripActions'
import {removeCurrentTrip} from '../store/actions/userActions'
import {removeHotels} from '../store/actions/hotelActions'
import {removeRestaurants} from '../store/actions/restaurantActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, Form} from 'semantic-ui-react'

class NameTripForm extends Component{

  state = {
    name: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e)  => {
    e.preventDefault()
    this.props.trip.name = this.state.name
    // add name to front and back end trip
    this.props.nameTrip(this.props.trip)
    this.props.removeCurrentTrip(this.props.currentUser)
    this.props.removeHotels()
    this.props.removeRestaurants()
    // redirect to trips list
    this.props.history.push('/trips')

  }
  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label><h1>Name Your Trip:</h1></label>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
        </Form.Field>

        <Button type="submit">Save Trip</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {nameTrip, removeCurrentTrip, removeHotels, removeRestaurants})(NameTripForm))
