// only reduces on activities  key
const initialState = {activities: null}

const activityReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "LOAD_ACTIVITIES":
      return {...state, activities: action.payload}
    // case "SELECT_ACTIVITY":
    //   return {...state, selectedActivities: [...state.selectedActivities, action.payload]}
    // case "REMOVE_ACTIVITY":
    //   let newActivities = [...state.selectedActivities].filter((activity) => activity.id !== action.payload.id)
    //   return {...state, selectedActivities: newActivities}
    default:
      return state
  }
}

export default activityReducer
