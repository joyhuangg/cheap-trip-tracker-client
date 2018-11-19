import React, {Component} from 'react'
import {Modal, Button} from 'semantic-ui-react'
import TripDetail from './TripDetail'
import {connect} from 'react-redux'

class TripModal extends Component{

  render(){
    return(
      <Modal size='large' id='trip-modal' open={this.props.open} onClose={this.props.close}>
        <Modal.Header>Show Trip<Button onClick={this.props.close} negative icon="x" floated='right'/>
          <Modal.Actions>
          </Modal.Actions>
        </Modal.Header>
        <Modal.Content>
          <TripDetail showMenu={false} trip={this.props.trip} currentUser={this.props.currentUser}/>
        </Modal.Content>

      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {trip: state.trips.currentTrip, currentUser: state.currentUser.currentUser}
}

export default connect(mapStateToProps)(TripModal)
