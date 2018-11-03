import {getTrips, getTrip, postTrip, deleteTrip, updateTrip} from './tripAdapter'
/*-------------THUNK CREATORS--------------*/
export const updateMyTrip = (trip) => {
  return (dispatch) => {
    return updateTrip(trip)
    .then(updatedTrip => dispatch(editTrip(updatedTrip)))
  }
}

export const loadMyTrips = () => {
  return (dispatch) => {
    return getTrips()
    .then(allTrips => dispatch({type: "LOAD_TRIP", payload: allTrips}))
  }
}

export const postNewTrip = (trip) => {
  return (dispatch) => {
    return postTrip(trip)
    .then(trip => dispatch(setCurrentTrip(trip)))
  }
}

export const loadTrip = (trip) => {
  return (dispatch) => {
    return getTrip(trip)
    .then(trip => dispatch(setCurrentTrip(trip)))
  }
}

/*----ACTION CREATORS-----*/

export const setCurrentTrip = (trip) => {
  return {type: 'SET_CURRENT_TRIP', payload:trip }
}
export const selectTrip = (trip) => {
  return {type: 'SELECT_TRIP', payload:trip }
}

const editTrip = (trip) => ({type: 'EDIT_TRIP', payload: trip})
