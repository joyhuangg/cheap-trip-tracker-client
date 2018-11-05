import { combineReducers } from 'redux'
import  tripReducer  from './tripReducer'
import userReducer from './userReducer'
import hotelReducer from './hotelReducer'
import restaurantReducer from './restaurantReducer'

const rootReducer = combineReducers({
  trips: tripReducer,
  currentUser: userReducer,
  hotels: hotelReducer,
  restaurants: restaurantReducer
  // tripReducer
  // selectedTrip: selectedTripReducer
})

export default rootReducer
