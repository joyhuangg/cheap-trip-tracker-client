import React, {Component} from 'react'

class NameTripForm extends Component{
  render(){
    return(
      <form>
        <label>Name Your Trip:</label>
        <input type="text" name="name"/>
        <input type="submit" value="Save Trip"/>
      </form>
    )
  }
}

export default NameTripForm
