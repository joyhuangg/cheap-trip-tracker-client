import { combineReducers } from 'redux'
import  tripReducer  from './tripReducer'

const rootReducer = combineReducers({
  trips: tripReducer,
  // tripReducer
  // selectedTrip: selectedTripReducer
})

export default rootReducer
