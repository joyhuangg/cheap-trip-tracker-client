import {getTrips, getTrip, postTrip, deleteTrip, updateTrip} from './adapter'
/*-------------THUNK CREATORS--------------*/
export const updateMyTrip = (trip) => {
  return (dispatch) => {
    updateTrip(trip)
    .then(updatedTrip => dispatch(editTrip(updatedTrip)))
  }
}

export const loadMyTrips = () => {
  return (dispatch) => {
    getTrips()
    .then(allTrips => dispatch({type: "LOAD_TRIP", payload: allTrips}))
  }
}

/*----ACTION CREATORS-----*/

export const selectTrip = (trip) => {
  return {type: 'SELECT_TRIP', payload:trip }
}

const editTrip = (trip) => ({type: 'EDIT_TRIP', payload: trip})
