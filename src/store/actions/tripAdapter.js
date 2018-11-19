// TRIPS
export const getTrips = () => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/trips/`, {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const getTrip = (trip) => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/trips/${trip.id}`, {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const postTrip = (trip) => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/trips`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(trip)
  })
  .then(r => r.json())
}

export const deleteTrip = (trip) => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/trips/${trip.id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
}

export const updateTrip = (trip) => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/trips/${trip.id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(trip)
  })
  .then(r => r.json())
}
