import {AMADEUS_API_KEY} from "../../.keys"

export const getHotels = (trip) => {
    const long = trip.longitude;
    const lat = trip.latitude;
    const check_in = trip.start_date;
    const check_out = trip.end_date;
    return fetch(`https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=${AMADEUS_API_KEY}&latitude=${lat}&longitude=${long}&radius=42&check_in=${check_in}&check_out=${check_out}`)
    .then(r => r.json())
}
