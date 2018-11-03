

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

export const getUserByToken = (token) => {
  console.log("Token",token)
  return fetch('http://localhost:3000/api/v1/current_user', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    })
    .then(res => res.json())
    .then(user => {
      if (user.error){
        console.log("error")
        throw new Error("Invalid token")
      }
      return user
      // const currentUser = {currentUser: user};
      // console.log({auth: currentUser})
      // this.setState({auth: currentUser});
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
    body: JSON.stringify({user:user})
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
