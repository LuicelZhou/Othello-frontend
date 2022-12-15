import React, { Component } from 'react';
import './GameOver.css';
import {
    Button
  } from 'semantic-ui-react'
// import showmodal from current working directory
import ModalExampleScrollingContent  from '../../HistoryData/ShowModal';

class GameOver extends Component {
    
    render() {
        let history = this.props.type!='local'?<ModalExampleScrollingContent gameId={this.props.gameId} /> : '';
        return (<div className="GameOver">
            <h3>{this.gameOverText()}</h3>
            <p>White Score: <b>{this.props.white}</b></p>
            <p>Black Score: <b>{this.props.black}</b></p>
            <Button primary onClick={this.props.restart}>Play Again</Button>
            <br/>
            <br/>
            {history}
            
        </div>)
    }

     gameOverText() {
        if (this.props.winner==='draw') {
            return 'Draw!';
        }

        return `${this.props.winner} Wins!`;
    }
}

export default GameOver;