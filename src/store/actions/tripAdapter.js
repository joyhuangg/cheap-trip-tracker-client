// TRIPS
export const getTrips = () => {
  return fetch(`http://localhost:3000/api/v1/trips/`, {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const getTrip = (trip) => {
  return fetch(`http://localhost:3000/api/v1/trips/${trip.id}`, {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const postTrip = (trip) => {
  return fetch(`http://localhost:3000/api/v1/trips`, {
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
  return fetch(`http://localhost:3000/api/v1/trips/${trip.id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const updateTrip = (trip) => {
  return fetch(`http://localhost:3000/api/v1/trips/${trip.id}`, {
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
