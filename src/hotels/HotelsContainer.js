import React, { Component } from 'react';
import HotelList from './HotelList'
import SelectedHotel from './SelectedHotel'
class HotelsContainer extends Component {
  render(){
    return(
      <div>
        HotelsContainer Component
        < HotelList />
        < SelectedHotel />
      </div>
    )
  }
}

export default HotelsContainer
