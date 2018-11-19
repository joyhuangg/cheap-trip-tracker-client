

// USERS
export const getUsers = () => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/users/`)
  .then(r => r.json())
  .then(res => {
    //set state
    if (res.error){
      throw new Error(res.error)
    }
    return res
  })
}

export const getUser = (user) => {
  return fetch("https://cheep-treks-server.herokuapp.com/api/v1/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify({auth:user})
    body: JSON.stringify(user)
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
  return fetch('https://cheep-treks-server.herokuapp.com/api/v1/current_user', {
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
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/users`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({user:user})
    // body: JSON.stringify(user)

  })
  .then(r => r.json())
  .then((res) => {
    if (res.error){
      throw new Error(res.error)
    }
    return res
  })
}


export const deleteUser = (user) => {
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/users/${user.id}`, {
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
  return fetch(`https://cheep-treks-server.herokuapp.com/api/v1/users/${user.id}`, {
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
