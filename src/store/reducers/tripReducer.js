// only reduces on trips key
const initialState = {currentTrip: null, trips: []}

const tripReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "SET_CURRENT_TRIP":
      return {...state, currentTrip: action.payload}
    case "DELETE_CURRENT_TRIP":
      return {...state, currentTrip: null}
    case "DELETE TRIP":
      let newTrips = state.trips.filter((trip) => trip.id !== action.payload.id)
      let currentTrip
      currentTrip.id === action.payload.id ? currentTrip = null : currentTrip = {...state.currentTrip}
      return {...state, currenTrip:currentTrip, trips:newTrips}
    case "LOAD_TRIPS":
      return {...state, trips: action.payload}
    case "ADD_TRIP":
      let addedTrips = [...state.trips]
      addedTrips.push(action.payload)
      return {...state, trips: addedTrips}
    case "EDIT_TRIP":
      let alteredTrips = state.trips.map((trip) => {
        if (trip.id === action.payload.id){
          return action.payload
        }
        else{
          return trip
        }
      })
      return {...state, currentTrip:action.payload, trips: alteredTrips}
      case  "ADD_HOTEL_TO_TRIP":
        return {...state, currentTrip: {...state.currentTrip, longitude:action.payload.longitude, latitude:action.payload.latitude, hotels:[action.payload]}}
    case  "DELETE_HOTEL_FROM_TRIP":
      return {...state, currentTrip: {...state.currentTrip, hotels:[]}}
    case  "ADD_RESTAURANT_TO_TRIP":
      return {...state, currentTrip: {...state.currentTrip, restaurants:[...state.currentTrip.restaurants, action.payload]}}
    case  "DELETE_RESTAURANT_FROM_TRIP":
      let newRestaurants = state.currentTrip.restaurants.filter(((restaurant) => restaurant.id !== action.payload.id))
      return {...state, currentTrip: {...state.currentTrip, restaurants:newRestaurants}}
    case "FINALIZE_TRIP":
      newTrips = [...state.trips, action.payload]
      return {currentTrip:null, trips: newTrips}
    case "REMOVE_TRIPS":
      return {currentTrip: null, trips: []}
    default:
      return state
  }
}

export default tripReducer
