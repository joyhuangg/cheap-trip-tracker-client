
export const getRestaurants = (trip) => {
    const long = trip.longitude;
    const lat = trip.latitude;
    return fetch(`http://localhost:3000/api/v1/yelp_restaurants?lat=${lat}&lon=${long}`, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    })
    .then(r => r.json())
}

export const postRestaurant = (restaurant) => {
  return fetch(`http://localhost:3000/api/v1/restaurants`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(restaurant)
  })
  .then(r => r.json())
}

export const postTripRestaurant = (trip_id, restaurant_id) => {
  // debugger
  return fetch(`http://localhost:3000/api/v1/trip_restaurants`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({trip_id: trip_id, restaurant_id: restaurant_id})
  })
  .then(r => r.json())
}

export const deleteTripRestaurant = (trip_id, restaurant_id) => {
  return fetch(`http://localhost:3000/api/v1/trip_restaurants`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body:JSON.stringify({trip_id:trip_id, restaurant_id:restaurant_id})
  })
}
