import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Menu,
  Header,
  Button
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
      newGameId: Math.floor(Math.random() * 1000)
    }
  }
  
  render() {
    let game = this.state.status==='active'?<Game end={this.endGame.bind(this)} gameId={this.props.gameId}/>:'';
    let restartGame = this.state.status==='restart'?<Game end={this.endGame.bind(this)} gameId={this.state.newGameId}/>:'';
    let gameOver = this.state.status==='over'?<GameOver 
    winner={this.state.winner} 
    restart={this.restartGame.bind(this)}
    white={this.state.whiteScore}    
    black={this.state.blackScore}
    />:'';  
    // random: easy, greedy: intermediate, minimax: hard
    let agent = this.props.type==='random'?'Easy':this.props.type==='greedy'?'Intermediate':'Hard';
    console.log(this.props.gameId);
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
      <Container style={{ marginTop: '4em' }}>

      <h1 style={{ color: 'black' , fontSize:'30px',marginTop:'-1.3em',marginBottom:'0.1em'}}  >
             Let's play Othello! 
      </h1>
      {/* black: yellow, white(ai): red */}
      <h3 >
            Black newest position is <span style={{color:'yellow',background:'grey' }}>yellow</span>, White(AI) newest position is <span style={{color:'red'}}>red</span>
       </h3>


      {game}
      {restartGame}
      {gameOver}
      </Container>
      <Button style={{marginBottom:'0.3em'}} onClick={refreshPage}>
        Restart
        </Button>
       <Header  style={{fontSize: '20px',marginTop:'0.4em',marginBottom:'1.5em'}}> 
       Difficulty level: {agent}
       <br/>
       
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
