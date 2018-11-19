import {AMADEUS_API_KEY} from "../../keys"

export const getHotels = (trip) => {
    const long = trip.longitude;
    const lat = trip.latitude;
    const check_in = trip.start_date;
    const check_out = trip.end_date;
    return fetch(`https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=${AMADEUS_API_KEY}&latitude=${lat}&longitude=${long}&radius=42&currency=USD&check_in=${check_in}&check_out=${check_out}`)
    .then(r => r.json())
}

export const postHotel = (hotel) => {
  return fetch(`http://localhost:3000/api/v1/hotels`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(hotel)
  })
  .then(r => r.json())
}

export const postTripHotel = (trip_id, hotel_id) => {
  // debugger
  return fetch(`http://localhost:3000/api/v1/trip_hotels`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({trip_id: trip_id, hotel_id: hotel_id})
  })
  .then(r => r.json())
}

export const deleteTripHotel = (trip_id, hotel_id) => {
  return fetch(`http://localhost:3000/api/v1/trip_hotels`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body:JSON.stringify({trip_id:trip_id, hotel_id:hotel_id})
  })
}
