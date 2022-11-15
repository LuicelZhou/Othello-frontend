import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Header,
    Image,
    Menu,
  } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Rules = () => (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            Othello Rules
          </Menu.Item>
          <Link to="/">
          <Menu.Item as='a'>Back Home</Menu.Item>
          </Link>
        </Container>
      </Menu>
      <br/>
      <Container text style={{ marginTop: '4em' }}>
        <Header as='h1' style={{fontSize: '40px'}}>How to play Othello</Header>
        <p>Othello is a strategy board game for two players (Black and White), played on an 8 by 8 board. The game traditionally begins with four discs placed in the middle of the board as shown below. Black moves first.</p>
        <Image src="images/how_to_play_othello_0.png" style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} alt="Othello starting position"/>
        <p>Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them. In the starting position, Black has the following 4 options indicated by translucent discs:</p>
        <Image src="images/how_to_play_othello_1.png" style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}  alt="Othello starting position"/>
        <p>After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this:</p>
        <Image src="images/how_to_play_othello_2.png" style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}  alt="Othello starting position"/>
        <p>Now White plays. This player operates under the same rules, with the roles reversed: White lays down a white disc, causing black discs to flip. Possibilities at this time would be:</p>
        <Image src="images/how_to_play_othello_3.png" style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}  alt="Othello starting position"/>
        <p>If White plays the bottom left option and flips one disc:</p>
        <Image src="images/how_to_play_othello_3.png" style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}  alt="Othello starting position"/>
        <p>Players alternate taking turns. If a player does not have any valid moves, play passes back to the other player. When neither player can move, the game ends. A game of Othello may end before the board is completely filled.
        The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw.</p>
        <br/>
      </Container>
  
    </div>
  )
  
export default Rules;