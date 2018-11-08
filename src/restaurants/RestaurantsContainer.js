import React, { Component } from 'react';
import RestaurantList from './RestaurantList'
import SelectedRestaurants from './SelectedRestaurants'
import { Dimmer, Loader, Image, Segment, Header, Grid } from 'semantic-ui-react'


class RestaurantsContainer extends Component {
  render(){
    let loggedIn = !!this.props.currentUser
    if (loggedIn){
      return(
        <div >

          <Header>Select Cheap Eats!</Header>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                < RestaurantList />
              </Grid.Column>
              <Grid.Column>
                Show details of restaurant here?
              </Grid.Column>
              <Grid.Column>
                < SelectedRestaurants />
              </Grid.Column>
            </Grid.Row>
          </Grid>


        </div>
      )
    }
    else{
      return(
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      )
    }

  }
}

export default RestaurantsContainer
