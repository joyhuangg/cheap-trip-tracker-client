import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form} from 'semantic-ui-react'
import { loginUser } from '../store'
import { connect } from 'react-redux'

// const login = () => (
//   return null
// )
class Login extends React.Component{

  state={
    // error: false,
    email: "",
    password: ""
  }

  // login = (email, password) => {
  //   fetch("https://go-stamp-card-api.herokuapp.com/login",{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(resp => {
  //     if (resp.error){
  //       this.setState({error: true})
  //     }
  //     else{
  //       this.props.handleLogin(resp)
  //       this.props.history.push('/stores');
  //     }
  //   })
  // }

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
    }
      // TO DO
      // setlocal state error = true
      // console.error

    )

    // debugger
    // .then(resp => {
    //   if (resp.error){
    //     this.setState({error: true})
    //   }
    //   else{
    //     // this.props.handleLogin(resp)
    //     this.props.history.push("/profile")
    //   }
    // })
  }

  render(){
    // if (this.state.error){
    //   alert("Invalid Login Information")
    //   this.props.history.push('/');
    //   return null
    // }else{
      return(
        <Form onSubmit={this.handleSubmit}>
          <label>LOGIN</label>
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
    // }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {loginUser: (user) => dispatch(loginUser(user))}
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
