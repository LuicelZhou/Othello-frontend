import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Game from '../Game/Game';
import GameOver from '../GameOver/GameOver';
import './Play.css';

class Play extends Component {

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
        
    let game = this.state.status==='active'?<Game end={this.endGame.bind(this)}/>:''; 
    let gameOver = this.state.status==='over'?<GameOver 
    winner={this.state.winner} 
    restart={this.restartGame.bind(this)}
    white={this.state.whiteScore}    
    black={this.state.blackScore}
    />:'';  

    // function refreshPage() {
    //   window.location.reload(false);
    // }

    return (
      <div className="Play">
        <br/>
       <h1 style={{ color: 'black' }} >
      Welcome to Othello! </h1>

      {game}
      {gameOver}
      {/* Back to dashboard button */}
      <Link to="/">
      <button type='button' className="btn btn-primary">Back to Dashboard</button>
      </Link>
      {/* restart game button */}
      {/* <button type='button' className="btn btn-primary" onClick={refreshPage}>Restart</button> */}

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

export default Play;
