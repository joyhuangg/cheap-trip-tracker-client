import React, {Component} from 'react'
import {connect} from 'react-redux'
import Restaurant from '../restaurants/Restaurant'
import Hotel from '../hotels/Hotel'
import { Dimmer, Loader, Segment, Divider, Icon, Grid } from 'semantic-ui-react'
import {removeCurrentTrip} from '../store/actions/userActions'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { loadTrip } from '../store/actions/tripActions'



class TripDetail extends Component{
  state = { open: false,
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
    showMenu: true,
    className: "trip-detail-container",
    trip: this.props.currentTrip
  }

  componentDidMount(){
    // debugger
    // if (this.props.trip){
    //   this.props.loadTrip(this.props.trip)
    //   .then(this.setState({trip: this.props.trip}))
    // }

    this.props.showMenu === false && this.setState({showMenu:false, className: "trip-detail-container-plain"})
  }

  show = size => () => this.setState({ size, open: true })
  close = (e) => {
    if (e.target.name === "Yes"){
      this.props.removeCurrentTrip(this.props.currentUser)
      this.props.history.push('/profile')
    }
    this.setState({ open: false })
  }

  render(){
    if (this.props.currentTrip && this.props.currentUser){
      let start_date = new Date(this.props.currentTrip.start_date)
      let start_date_converted = (start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear()
      let end_date = new Date(this.props.currentTrip.end_date)
      let end_date_converted = (end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear()
      // debugger
      let restaurants
      this.props.currentTrip.restaurants ? restaurants = this.props.currentTrip.restaurants.map((restaurant) => < Restaurant showButton={false} key={restaurant.id} restaurant={restaurant}/>) : restaurants =  []
      // let activites

      // TODO: indent text with margin or padding, borders, colors
      return(
        <React.Fragment>

          <div className={this.state.className}>
            {this.state.showMenu && <div className="nav2">
                        {/* <Link to={`/trips/${this.props.currentTrip.id}`}><span><Icon name='road' />Current Trip Details | </span></Link> */}
                        <Link to="/hotels"><span><Icon name='hotel' />Hotels | </span></Link>
                        <Link to="/restaurants"><span><Icon name='food' />Restaurants | </span></Link>
                        <Link to="#"><span><Icon name='plane' />Flights | </span></Link>
                        <Link to="#"><span><Icon name='fly' />Activities</span></Link>
                      </div>}
            {/* {this.props.history.location.pathname === '/trips' ? null : <VerticalSidebar animation={animation} direction={direction} visible={visible} id={this.props.currentTrip.id}/>} */}
            <h1 style={{color: '#005e8b'}}>{this.props.currentTrip.location} ({start_date_converted} - {end_date_converted})</h1>
            <Divider />
            {this.props.currentTrip.name ? <h1>{this.props.currentTrip.name}</h1> : null}

            <div className='box'>
              <h2>Number of Guests: {this.props.currentTrip.num_ppl}</h2>
              {this.props.currentTrip.price ? <h2>Price: ${this.props.currentTrip.price}</h2> : null}
            </div>


            {this.props.currentTrip.hotels && this.props.currentTrip.hotels.length > 0 ? <div>

              <Divider />
                <Grid columns='3' padded centered>
                    < Hotel showButton={false} hotel={this.props.currentTrip.hotels[0]}/>
                    {restaurants}
                </Grid>
            </div> : null}
          </div>
        </React.Fragment>

      )
    }
    else{
      return(
        <Segment className='tall-container'>
          <Dimmer active>
            <Loader />
          </Dimmer>

        </Segment>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser.currentUser,
          currentTrip: state.trips.currentTrip}
}
export default withRouter(connect(mapStateToProps, {removeCurrentTrip, loadTrip})(TripDetail))
