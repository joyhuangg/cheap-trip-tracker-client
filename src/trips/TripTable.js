import React, { Component } from 'react';
import TripRow from './TripRow'
import { connect } from 'react-redux'
import { Header, Table, Rating } from 'semantic-ui-react'


class TripTable extends Component {


  render(){

    let trips = this.props.currentUser.trips.map((trip) => < TripRow key ={trip.id} trip={trip}/>)
    return(
        // <TripRow/>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Trip</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Number of People</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {trips}
          </Table.Body>
        </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips
  }
}

export default connect(mapStateToProps)(TripTable)
