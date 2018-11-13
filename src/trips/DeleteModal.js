import React, {Component} from 'react'
import {Modal, Button} from 'semantic-ui-react'

export default class DeleteModal extends Component{

  render(){
    return(
      <Modal size='tiny' open={this.props.open} onClose={this.props.close}>
        <Modal.Header>Delete Trip</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this trip?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.close} negative icon="x" labelPosition='right' content='No' name="No" />
          <Button onClick={this.props.close} positive icon='checkmark' labelPosition='right' content='Yes' name="Yes" />
        </Modal.Actions>
      </Modal>
    )
  }
}
