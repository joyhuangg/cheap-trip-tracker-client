import React from 'react'
import {Segment, Container, Grid, Header, List, Divider, Image} from 'semantic-ui-react'

const Footer = () => {
  return(

            <Segment inverted style={{ margin: '1em 0em 0em', padding: '1em 1em' }} vertical>
              <Container textAlign='center'>
                <Grid columns={4} divided stackable inverted>
                  <Grid.Row>
                    <Grid.Column>
                      <Header inverted as='h4' content='Cheap Trip Tracker' />
                      <p>
                        Plan dirt-cheap trips -- Comparing custom made travel packages
                        for ease of planning before commitment.
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header inverted as='h4' content='Hotels' />
                      <p>
                        Choose from plenty of budget hotels to save yourself
                        from breaking the bank while you're out adventuring!
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header inverted as='h4' content='Restaurants' />
                      <p>
                        Select cheap 1 dollar sign restaurants to try the local cuisine
                        and save your must eat places in one location.
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header inverted as='h4' content='Activities & Flights' />
                      <p>
                        Coming Soon!
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider inverted section />
                <List horizontal inverted divided link size='small'>
                  <List.Item as='a' href='joyhuangg@gmail.com'>
                    Contact Us
                  </List.Item>
                  <List.Item as='a' href='#'>
                    Terms and Conditions
                  </List.Item>
                  <List.Item as='a' href='#'>
                    Privacy Policy
                  </List.Item>
                </List>
              </Container>
            </Segment>
  )
}

export default Footer
