import React, { Component } from 'react';
import { Header, Table, Rating, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {loadTrip, removeTrip} from '../store/actions/tripActions'
import DeleteModal from './DeleteModal'
import TripModal from './TripModal'
class TripRow extends Component {

  state = {
    show: true,
    openDelete: false,
    openShow: false,
  }

  closeDelete = (e) => {
    if (e.target.name === "Yes"){
      this.props.removeTrip(this.props.trip, this.props.currentUser)
      .then(() => {this.setState({show: false})})
    }
    this.setState({ openDelete: false })
  }

  closeShow = (e) => {
    this.setState({openShow: false})
  }


  buttonAction = (e) => {
    if (e.target.name === "Edit"){
      this.props.loadTrip(this.props.trip)
      .then(() => this.props.history.push(`/trips/${this.props.trip.id}`))
    }
    // TO DO: make show a modal of information
    else if (e.target.name === "Show"){
      this.props.loadTrip(this.props.trip)
      .then(() => this.setState({openShow: true}))

    }
    else if (e.target.name === "Delete"){
      this.setState({openDelete: true})
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
        <React.Fragment>
          <Table.Row>
            {/* <Table.Cell>
              <Header as='h2' textalign='center'>
                {this.props.trip.name}
              </Header>
            </Table.Cell> */}
            <Table.Cell singleLine>{this.props.trip.location}</Table.Cell>
            <Table.Cell singleLine>
              {start_date_converted}<br/>{end_date_converted}
            </Table.Cell>
            <Table.Cell singleLine>
              ${this.props.trip.price}
            </Table.Cell>
            <Table.Cell singleLine textAlign='left'>
              <Button.Group>
                <Button onClick={this.buttonAction} basic color='blue' name="Edit">Edit</Button>
                <Button onClick={this.buttonAction} basic color='green' name="Show">Show</Button>
                <Button onClick={this.buttonAction} basic color='red' name="Delete" >Delete</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
          <DeleteModal close={this.closeDelete}  open={this.state.openDelete}/>
          <TripModal trip={this.props.trip} close={this.closeShow} open={this.state.openShow}/>
        </React.Fragment>


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
