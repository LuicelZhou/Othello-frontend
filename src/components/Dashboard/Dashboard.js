import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    tablet: 768,
    computer: 1024,
  },
})

class DesktopContainer extends Component {
  // state = {}
    constructor(props) {
        super(props);
        this.state = {
            agent: null,
        };
    }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Link to="/rules">
                <Menu.Item as='a'>Rules</Menu.Item>
                </Link>
                {/* <Link to="/settings">
                <Menu.Item as='a'>Settings</Menu.Item>
                </Link> */}
              </Container>
            </Menu>
            {/* <HomepageHeading style={{marginBottom:'10px'}} data={this.state} /> */}
            <Container text>
    <Header
      as='h1'
      content='Welcome to Othello'
      inverted
      style={{
        fontSize:  '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='A game of strategy'
      inverted
      style={{
        fontSize:  '1.7em',
        fontWeight: 'normal',
        marginTop:  '1.5em',
      }}
    />
    <br/>
    
    {/* add three buttons with different difficulty levels */}
    <Grid centered divided='vertically'>
          <Grid.Row columns={3}>
    <Button basic color='teal' onClick={() => this.setState({ agent: 'random' })}>Simple</Button>
    <Button basic color='blue' onClick={() => this.setState({ agent: 'greedy' })}>Intermediate</Button>
    <Button basic color='violet' onClick={() => this.setState({ agent: 'minimax' })}>Hard</Button>
    </Grid.Row>
    <Grid.Row columns={2}>


      {/* when button is clicked, go to game page with query param being agent */}

    <Button disabled={this.state.agent?false:true} marginTop='100px'  primary size='huge' as={Link} 
                                    to={{ pathname: '/game', search: `?agent=${this.state.agent}` }}> 
          Let's Play
          <Icon name='right arrow' />
    </Button>

    </Grid.Row>
    </Grid>

{/* create a button on different row with spacing */}

      
    
  </Container>
          </Segment>
        </Visibility>

        {children}
      </Media>

      
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}


const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class Dashboard extends Component {

    render() {
        return (
        <ResponsiveContainer/>
        )
    }
}

export default Dashboard;
