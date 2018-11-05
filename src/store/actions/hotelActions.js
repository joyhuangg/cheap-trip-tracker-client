import {getHotels, postHotel} from './hotelAdapter'

export const loadHotels = (trip) => {
  return (dispatch) => {
    // return getHotels(trip.trip)
    let tripObj
    trip.trip ? tripObj = trip.trip : tripObj = trip
    return getHotels(tripObj)
    .then(allHotels => {
      dispatch({type: "LOAD_HOTELS", payload: allHotels.results})})
  }
}

export const postNewHotel = (hotel) => {
  return (dispatch) => {
    return postHotel(hotel)
    .then(hotel => dispatch({type: "ADD_HOTEL_TO_TRIP", payload:hotel}))
  }
}

export const selectHotel = (hotel) => {
  return {type: "SELECT_HOTEL", payload: hotel}
}
