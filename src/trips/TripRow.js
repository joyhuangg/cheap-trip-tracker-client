import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react'


class TripRow extends Component {
  render(){
    let start_date = new Date(this.props.trip.start_date)
    let start_date_converted = (start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear()
    let end_date = new Date(this.props.trip.end_date)
    let end_date_converted = (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear()
    return(
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            {this.props.trip.name}
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>{this.props.trip.location}</Table.Cell>
        <Table.Cell>
          {start_date_converted}
        </Table.Cell>
        <Table.Cell >
          {end_date_converted}
        </Table.Cell>
        <Table.Cell>
          {this.props.trip.num_ppl}
        </Table.Cell>
        <Table.Cell>
          {this.props.trip.price}
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default TripRow
