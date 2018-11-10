import {getTrips, getTrip, postTrip, deleteTrip, updateTrip} from './tripAdapter'
import {patchCurrentUser} from './userActions'
/*-------------THUNK CREATORS--------------*/
export const updateMyTrip = (trip) => {
  return (dispatch) => {
    return updateTrip(trip)
    .then(updatedTrip => dispatch(editTrip(updatedTrip)))
  }
}

export const loadMyTrips = (user) => {
  return (dispatch) => {
    return getTrips()
    .then(allTrips => {
      let filteredTrips = allTrips.filter((trip) => trip.user.id === user.id)
      dispatch({type: "LOAD_TRIPS", payload: filteredTrips})
    })
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

export const nameTrip = (trip) => {
  return (dispatch) => {
    return updateTrip(trip)
    .then(updatedTrip => dispatch(finalizeTrip(updatedTrip)))
  }
}

export const removeTrip = (trip, user) => {
  return (dispatch) => {
    return deleteTrip(trip)
    .then(() => {
      if (user.current_trip_id === trip.id){
        let newUser = user
        newUser.current_trip_id = null
        dispatch(patchCurrentUser(newUser))
      }
      dispatch(deleteSelectedTrip(trip))})
  }
}


/*----ACTION CREATORS-----*/

export const setCurrentTrip = (trip) => {
  return {type: 'SET_CURRENT_TRIP', payload:trip }
}


export const selectTrip = (trip) => {
  return {type: 'SELECT_TRIP', payload:trip }
}

export const removeTrips = () => {
  return {type:'REMOVE_TRIPS'}
}

const deleteSelectedTrip = (trip) => ({type: 'DELETE_TRIP', payload: trip})

const editTrip = (trip) => ({type: 'EDIT_TRIP', payload: trip})

const finalizeTrip = (trip) => ({type: 'FINALIZE_TRIP', payload: trip})
