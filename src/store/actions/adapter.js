// TRIPS
export const getTrips = () => {
  return fetch(`http://localhost:3000/api/v1/trips/`)
  .then(r => r.json())
}

export const getTrip = (trip) => {
  return fetch(`http://localhost:3000/api/v1/trips/${trip.id}`)
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

// USERS
export const getUsers = () => {
  return fetch(`http://localhost:3000/api/v1/trips/`)
  .then(r => r.json())
}

export const getUser = (user) => {
  return fetch("http://localhost:3000/api/v1/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({auth:user})
  })
  .then(res => res.json())
  .then(res => {
    //set state
    if (res.message){
      throw new Error("Invalid username or password")
    }
    return res
  })

}

export const postUser = (user) => {
  return fetch(`http://localhost:3000/api/v1/users`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(user)
  })
  .then(r => r.json())
}


export const deleteUser = (user) => {
  return fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
  })
  .then(r => r.json())
}

export const updateUser = (user) => {
  return fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(user)
  })
  .then(r => r.json())
}
