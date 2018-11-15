import React, { Component } from 'react';
import { Button, Form, Header, Icon, Dropdown, Image } from 'semantic-ui-react'
import {MAPBOX_API_KEY} from "../.keys"
import {postNewTrip} from '../store/actions/tripActions'
import {patchCurrentUser} from '../store/actions/userActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import logo.png
import _ from 'lodash'
// import {Geocoder} from 'react-geocoder-autocomplete';

class TripForm extends Component {

  state={
    location: "",
    start_date: "",
    end_date: "",
    num_ppl: "",
    countryOptions: [],
  }

  handleSearchChange = (e) => {
    this.setState({ location: e.target.value})

    setTimeout(() => {
      this.setState({countryOptions: this.fetchOptions() })
    }, 500)
  }

  fetchOptions = () => {
      console.log(this.state.location)
      if(this.state.location.length > 0){
        const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
        const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_API_KEY });
        geocodingClient
        .forwardGeocode({
          query: this.state.location,
          limit: 10,
          autocomplete: true,
          types: ['country', 'region', 'district', 'place']
        })
        .send()
        .then(response => {
          let newPlaces = []
          if (response.body.features.length > 0){
            response.body.features.forEach((place) => {
              newPlaces.push({key: `${place.place_name}`, value: `${place.place_name}`, text: `${place.place_name}`})
            })
          }

          // debugger

          this.setState({countryOptions: newPlaces})
          return newPlaces
        })
      }
      else{
        let arr = []
        return arr
      }
  }


// Debounce here, move, map search function here
  handleChange = (e) => {
    if (e.target.className === 'search'){
      this.setState({location: e.target.value}, this.setCountries)

    }
    else{
      this.setState({[e.target.name]: e.target.value})
    }
  }

  handleSubmit = (e) => {
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_API_KEY });
    geocodingClient
    .forwardGeocode({
      query: document.querySelector('#location div').innerHTML,
      limit: 1,
      autocomplete: true
    })
    .send()
    .then(response => {
      const match = response.body;
      if (Date.parse(this.state.end_date) <= Date.parse(this.state.start_date)){
        alert("End date must be later than start date")
      }
      else if (Date.parse(this.state.end_date) <= Date.now() || Date.parse(this.state.start_date) < Date.now()){
        alert("Dates cannot be on or before today's date")
      }
      else if (match.features.length > 0){
        let trip = {
          user_id: this.props.currentUser.id,
          location: match.features[0].place_name,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          num_ppl: parseInt(this.state.num_ppl),
          longitude: match.features[0].center[0],
          latitude: match.features[0].center[1]
        }
        this.props.postNewTrip(trip)
        .then((resp) => {
          const trip_id = resp.payload.id
          this.props.currentUser.current_trip_id = trip_id
          console.log(this.props.currentUser)
          this.props.patchCurrentUser(this.props.currentUser)
          // need to set user's current_trip_id to trip they just made
          // in both front end and back end
          // debugger
          this.props.history.push("/hotels")
        })


      }
      else{
        alert("NOT AN ACTUAL PLACE DUMMY")
      }
    });


    e.preventDefault();
  }

  render(){
    console.log(this.state.countryOptions)
      return(
        <Form  onSubmit={this.handleSubmit} onKeyDown={this.handleChange}>
          <Header as='h1' icon textAlign='center'>
            {/* <Icon name='plane' circular /> */}
            {/* <Header.Content>Plan a Trip</Header.Content> */}
            <img id="App-logo" src={'../logo.png'}/>
          </Header>
          <Form.Group>
            <Form.Field>
              <label><h1>Destination</h1></label>
              {/* <input placeholder='i.e. Berlin, Las Vegas' name="location" onChange={this.handleChange}/> */}
              <Dropdown
                button
                className='icon'
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                labeled
                icon='world'
                id="location"
                placeholder='Select Destination'
                fluid
                search
                clearable
                options={this.state.countryOptions} />
            </Form.Field>
            <Form.Field>
              <label><h1>Start Date</h1></label>
              <input type="date" placeholder='Start Date' name="start_date" onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label><h1>End Date</h1></label>
              <input type="date" placeholder='End Date' name="end_date" onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label><h1>Guests</h1></label>
              <input type="number" placeholder='How Many?' name="num_ppl" onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
            <Button circular icon='plane' color='violet' type='submit'></Button>
            </Form.Field>
          </Form.Group>

        </Form>
      )


  }
}

const mapDispatchToProps = dispatch => {
  return {postNewTrip: (trip) => dispatch(postNewTrip(trip)),
          patchCurrentUser: (user) => dispatch(patchCurrentUser(user))
          }
}

export default withRouter(connect(null, mapDispatchToProps)(TripForm))
