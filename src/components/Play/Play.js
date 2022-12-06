import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Menu,
  Header
} from 'semantic-ui-react'
import Game from '../Game/Game';
import GameOver from '../GameOver/GameOver';

class Play extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status:'active',
      winner:null, 
      whiteScore:0,
      blackScore:0,
      newGameId: Math.floor(Math.random() * 1000000)
    }
  }
  
  render() {
    let game = this.state.status==='active'?<Game end={this.endGame.bind(this)} gameId={this.props.gameId}/>:'';
    let restartGame = this.state.status==='restart'?<Game end={this.endGame.bind(this)} gameId={this.state.newGameId}/>:'';

    // let game = this.state.status==='active'?<Game end={this.endGame.bind(this)} gameId={this.props.gameId}/>:''; 
    let gameOver = this.state.status==='over'?<GameOver 
    winner={this.state.winner} 
    restart={this.restartGame.bind(this)}
    white={this.state.whiteScore}    
    black={this.state.blackScore}
    />:'';  
    let agent = this.props.type;
    console.log(this.props.gameId);

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
      <Container style={{ marginTop: '4em' }}>

      {game}
      {restartGame}
      {gameOver}
      </Container>
       <Header as='h1' style={{fontSize: '25px',marginTop:'2em',marginBottom:'1em'}}> 
       Difficulty level: {agent}
       </Header>
      </div>
    );
  }
  
  restartGame() {
    this.initialGame(this.state.newGameId);
    this.setState({
      status:'restart',
    })
  }

  initialGame(gameId) {

    fetch('/game/'+ gameId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "message": "minimax" })
    })
    .then(res => res.text())
    .then((data) => {
        console.log("game create success" + data);
    })
    .catch(console.log)
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

export default Play;
