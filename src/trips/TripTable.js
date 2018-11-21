import React, { Component } from 'react';
import TripRow from './TripRow'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'


class TripTable extends Component {


  render(){

    let trips = this.props.trips.map((trip) => < TripRow key ={trip.id} trip={trip}/>)
    return(
        <Table style={{width: '97%'}} id='trip-table' compact celled textAlign='center' >
          <Table.Header>
            <Table.Row >
              {/* <Table.HeaderCell singleLine>Trip</Table.HeaderCell> */}
              <Table.HeaderCell width={2}>Location</Table.HeaderCell>
              <Table.HeaderCell width={2}>Dates</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
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
    trips: state.trips.trips
  }
}

export default connect(mapStateToProps)(TripTable)
