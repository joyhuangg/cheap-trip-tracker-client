
/*-------------THUNK CREATORS--------------*/
export const updateTrip = (trip) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/trips/${trip.id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    .then(r => r.json())
    .then(updatedTrip => dispatch(editTrip(updatedTrip)))
  }
}

export const loadTrips = () => {
  return (dispatch) => {
    return fetch('http://localhost:3000/trips')
    .then(r => r.json())
    .then(allTrips => dispatch({type: "LOAD_TRIP", payload: allTrips}))
  }
}

/*----ACTION CREATORS-----*/

export const selectTrip = (trip) => {
  return {type: 'SELECT_TRIP', payload:trip }
}

const editTrip = (trip) => ({type: 'EDIT_TRIP', payload: trip})
