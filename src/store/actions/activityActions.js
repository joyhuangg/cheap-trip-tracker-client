import {getActivities, postActivity} from './activityAdapter'

export const loadActivities = (trip) => {
  return (dispatch) => {
    // return getActivities(trip.trip)
    let tripObj
    trip.trip ? tripObj = trip.trip : tripObj = trip
    return getActivities(tripObj)
    .then(allActivities => {
      dispatch({type: "LOAD_ACTIVITIES", payload: allActivities.organic_results})})
  }
}

export const postNewActivity = (activity) => {
  return (dispatch) => {
    return postActivity(activity)
    .then(activity => dispatch({type: "ADD_ACTIVITY_TO_TRIP", payload:activity}))
  }
}

// export const selectActivity = (activity) => {
//   return {type: "SELECT_RESTAURANT", payload: activity}
// }
//
// export const removeActivity = (activity) => {
//   return {type: "REMOVE_RESTAURANT", payload: activity}
// }
