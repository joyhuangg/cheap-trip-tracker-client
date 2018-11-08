import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form} from 'semantic-ui-react'
import { loginUser } from '../store'
import { connect } from 'react-redux'

class Login extends React.Component{

  state={
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state)
    .then(() => {
      this.props.history.push("/profile")
    })
    .catch(() => {
      alert("Invalid username or password")
      this.props.history.push("/")
    })
  }

  render(){
      return(
        <Form onSubmit={this.handleSubmit}>
          <label>LOGIN</label>
          <Form.Field>
            <label>Email</label>
            <input type='email' placeholder='Email' name="email" onChange={this.handleChange}/>
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
  return {loginUser: (user) => dispatch(loginUser(user))}
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
