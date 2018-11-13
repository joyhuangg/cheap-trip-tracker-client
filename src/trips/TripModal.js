import React, {Component} from 'react'
import {Modal, Button} from 'semantic-ui-react'
import TripDetail from './TripDetail'
import {connect} from 'react-redux'

class TripModal extends Component{

  render(){
    console.log(this.props.trip)
    return(
      <Modal size='tiny' open={this.props.open} onClose={this.props.close}>
        <Modal.Header>Show Trip</Modal.Header>
        <Modal.Content>
          <TripDetail trip={this.props.trip} currentUser={this.props.currentUser}/>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.close} negative icon="x" labelPosition='right' content='X' name="X" />
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {trip: state.trips.currentTrip, currentUser: state.currentUser.currentUser}
}

export default connect(mapStateToProps)(TripModal)
