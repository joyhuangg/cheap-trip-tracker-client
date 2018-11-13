import { Dimmer, Sidebar, Header, Menu, Icon, Loader, Image, Segment, Divider, Button, Modal } from 'semantic-ui-react'
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

 const VerticalSidebar = ({ animation, direction, visible, id }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as={Link} to={`/trips/${id}`}>
      <Icon name='road' />
      Current Trip Details
    </Menu.Item>
    <Menu.Item as={Link} to="/hotels">
      <Icon name='hotel' />
      Hotels
    </Menu.Item>
    <Menu.Item as={Link} to="/restaurants">
      <Icon name='food' />
      Restaurants
    </Menu.Item>
    <Menu.Item as={Link} to="/">
      <Icon name='plane' />
      Flights
    </Menu.Item>
    <Menu.Item as={Link} to="/">
      <Icon name='fly' />
      Activities
    </Menu.Item>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  id: PropTypes.number,
}

export default VerticalSidebar
