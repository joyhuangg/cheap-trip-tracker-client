import React, { Component } from 'react';
import TripRow from './TripRow'
import { connect } from 'react-redux'
import { Header, Table, Rating } from 'semantic-ui-react'


class TripTable extends Component {


  render(){

    let trips = this.props.trips.map((trip) => < TripRow key ={trip.id} trip={trip}/>)
    return(
        <Table id='trip-table' compact celled textAlign='center' >
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell singleLine>Trip</Table.HeaderCell> */}
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Dates</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {trips.length > 0 ? trips : <Table.Row>Start by planning a trip!</Table.Row>}
          </Table.Body>
        </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.currentUser.currentUser.trips
  }
}

export default connect(mapStateToProps)(TripTable)
