import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LocalGame from '../LocalGame/LocalGame';
import GameOver from '../GameOver/GameOver';
import './LocalPlay.css';
import {
    Container,
    Menu,
    Button
  } from 'semantic-ui-react'

class LocalPlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status:'active',
      winner:null, 
      whiteScore:0,
      blackScore:0
    }
  }

  render() {

    let game = this.state.status==='active'?<LocalGame end={this.endGame.bind(this)}/>:''; 
    let gameOver = this.state.status==='over'?<GameOver 
    winner={this.state.winner} 
    restart={this.restartGame.bind(this)}
    white={this.state.whiteScore}    
    black={this.state.blackScore}
    />:'';  
    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <div>
    <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            Othello Game
          </Menu.Item>
          <Link to="/">
          <Menu.Item as='a'>Back Home</Menu.Item>
          </Link>
        </Container>
      </Menu>
      <div className="Play">
       <h1 style={{ color: 'black' }} >
      Welcome to Othello! </h1>

      {game}
      {gameOver}

      <Button style={{marginBottom:'0.3em',marginTop:'1em'}} onClick={refreshPage}>
        Restart
     </Button>

      </div>
    </div>
    );
  }

  restartGame() {
    this.setState({
      status:'active',
    })
  }

  endGame(winner, whiteScore, blackScore) {
    this.setState({
      status:'over',
      winner,
      whiteScore,
      blackScore
    })
  }
}

export default LocalPlay;