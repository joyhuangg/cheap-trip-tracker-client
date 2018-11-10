import React, { Component } from 'react';
import { Header, Table, Rating, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {loadTrip, removeTrip} from '../store/actions/tripActions'


class TripRow extends Component {

  state = {
    show: true
  }


  buttonAction = (e) => {
    if (e.target.name === "Edit"){
      this.props.loadTrip(this.props.trip)
      .then(() => this.props.history.push(`/trips/${this.props.trip.id}`))
    }
    else if (e.target.name === "Show"){
      this.props.loadTrip(this.props.trip)
      .then(() => this.props.history.push(`/trips/${this.props.trip.id}`))


    }
    else if (e.target.name === "Delete"){
      console.log('delete', this.props.trip)
      this.props.removeTrip(this.props.trip, this.props.currentUser)
      .then(() => {this.setState({show: false})})
    }

  }
  render(){
    let start_date = new Date(this.props.trip.start_date)
    let start_date_converted = (start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear()
    let end_date = new Date(this.props.trip.end_date)
    let end_date_converted = (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear()
// ToDO: if == current trip indicate it some how
    if (this.state.show){
      return(
        <Table.Row>
          <Table.Cell>
            <Header as='h2' textAlign='center'>
              {this.props.trip.name}
            </Header>
          </Table.Cell>
          <Table.Cell singleLine>{this.props.trip.location}</Table.Cell>
          <Table.Cell>
            {start_date_converted}<br/>{end_date_converted}
          </Table.Cell>
          {/* <Table.Cell>
            {this.props.trip.num_ppl}
          </Table.Cell> */}
          <Table.Cell>
            {this.props.trip.price}
          </Table.Cell>
          <Table.Cell>
            <Button.Group>
              <Button onClick={this.buttonAction} name="Edit">Edit</Button>
              <Button onClick={this.buttonAction} name="Show">Show</Button>
              <Button onClick={this.buttonAction} name="Delete" >Delete</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      )
    }
    else{
      return null
    }

  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser.currentUser}
}

export default withRouter(connect(mapStateToProps, {loadTrip, removeTrip})(TripRow))
