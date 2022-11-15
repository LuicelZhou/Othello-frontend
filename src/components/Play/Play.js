import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Menu,
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
       <h1 style={{ color: 'black' , fontSize:'30px'}}  >
        Welcome to Othello! </h1>

      {game}
      {gameOver}
      <br/>
      {/* Back to dashboard button */}
      {/* <Link to="/">
        <Button primary size='large'>
        Back to Dashboard
        </Button>
      </Link> */}
      </Container>
      {/* restart game button */}
      {/* <button type='button' className="btn btn-primary" onClick={refreshPage}>Restart</button> */}
       <br/>
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
