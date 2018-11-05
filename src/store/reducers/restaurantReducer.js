// only reduces on restaurants key
const initialState = {restaurants: null, selectedRestaurants: []}

const restaurantReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "LOAD_RESTAURANTS":
      return {...state, restaurants: action.payload}
    case "SELECT_RESTAURANT":
      return {...state, selectedRestaurants: [...state.selectedRestaurants, action.payload]}
    case "REMOVE_RESTAURANT":
      let newRestaurants = [...state.selectedRestaurants].filter((restaurant) => restaurant.id !== action.payload.id)
      return {...state, selectedRestaurants: newRestaurants}
    default:
      return state
  }
}

export default restaurantReducer
