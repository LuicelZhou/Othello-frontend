import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
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

const HomepageHeading = () => (
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
    <Link to="/game">
    <Button primary size='huge'>
      Let's Play
      <Icon name='right arrow' />
    </Button>
    </Link>
  </Container>
)

class DesktopContainer extends Component {
  state = {}

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
            <HomepageHeading style={{marginBottom:'10px'}} />
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
