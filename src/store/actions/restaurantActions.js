import {getRestaurants, postRestaurant} from './restaurantAdapter'

export const loadRestaurants = (trip) => {
  return (dispatch) => {
    // return getRestaurants(trip.trip)
    let tripObj
    trip.trip ? tripObj = trip.trip : tripObj = trip
    return getRestaurants(tripObj)
    .then(allRestaurants => {
      dispatch({type: "LOAD_RESTAURANTS", payload: allRestaurants.businesses})})
  }
}

export const postNewRestaurant = (restaurant) => {
  return (dispatch) => {
    return postRestaurant(restaurant)
    .then(restaurant => dispatch({type: "ADD_RESTAURANT_TO_TRIP", payload:restaurant}))
  }
}

export const selectRestaurant = (restaurant) => {
  return {type: "SELECT_RESTAURANT", payload: restaurant}
}

export const removeRestaurant = (restaurant) => {
  return {type: "REMOVE_RESTAURANT", payload: restaurant}
}

export const removeRestaurants = () => {
  return {type: "REMOVE_RESTAURANTS"}
}
