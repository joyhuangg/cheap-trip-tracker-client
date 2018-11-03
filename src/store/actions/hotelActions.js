import {getHotels} from './hotelAdapter'

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
