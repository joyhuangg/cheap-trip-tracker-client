export const getActivities = (trip) => {
  const location = trip.location.split(" ").join("%20")
  let url = `https://serpapi.com/search.json?q=Cheap%20things%20to%20do&location=${location}&hl=en&gl=us`
  return fetch(url).then(r=>r.json())
}


export const postActivity = (activity) => {
  return fetch(`http://localhost:3000/api/v1/activities`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(activity)
  })
  .then(r => r.json())
}
