import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import {createUser} from '../store'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class Signup extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    current_trip_id: null
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()
    this.props.createUser(this.state)
    this.props.history.push("/profile")
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    return(
      <Form onSubmit={this.handleSignUpSubmit}>
        <h1>Create New User</h1>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' name="name" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' name="email" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {createUser: (user) => dispatch(createUser(user))}
}

export default withRouter(connect(null, mapDispatchToProps)(Signup))
