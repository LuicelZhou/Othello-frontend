// Page to choose a agent type: random, minimax, or alpha-beta pruning
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Menu,
  } from 'semantic-ui-react'
import Play from '../Play/Play';
import LocalPlay from '../LocalPlay/LocalPlay';


class MainPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            secondOpen: false,
            // random gameid
            gameId: Math.floor(Math.random() * 1000),
            agent: new URLSearchParams(window.location.search).get('agent'),
            gameMode: new URLSearchParams(window.location.search).get('mode'),
        }
        
    }

    componentDidMount() {
        this.initialGame();
      }

    // initial a game using POST
    //  POST /game/:id, body: {"message": "random"}
    // api: http://localhost:8080/game/1

    initialGame() {

        if (this.state.gameMode === 'ai') {

            fetch('/game/'+ this.state.gameId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "message": this.state.agent }) 
            })
            .then(res => res.text())
            .then((data) => {
                console.log("game create success" + data);
            })
            .catch(console.log)
        }
    }


    render() {

        console.log(this.state.gameMode);

        let playAi = this.state.gameMode === 'ai'?<Play type={this.state.agent} gameId = {this.state.gameId}/>:'';
        let playLocal = this.state.gameMode === 'local'?<LocalPlay type={this.state.gameMode} />:'';
        
        return (
            <div>
                <Menu fixed='top' inverted>
                <Container>
                <Menu.Item header>
                    Game difficulty level
                </Menu.Item>
                <Link to="/">
                <Menu.Item as='a'>Back Home</Menu.Item>
                </Link>
                </Container>
                </Menu>
            <br/>
            <br/>

            {playAi}
            {playLocal}

            
            </div>
        );
    }
}
export default MainPage;