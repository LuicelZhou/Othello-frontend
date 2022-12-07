// Page to choose a agent type: random, minimax, or alpha-beta pruning
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Button,
    Modal,
    Menu,
    Icon, 
    Header,
    Divider,
    Dropdown, 
    Grid,
  } from 'semantic-ui-react'
  import Play from '../Play/Play';


class MainPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            secondOpen: false,
            // random gameid
            gameId: Math.floor(Math.random() * 1000000),
            agent: new URLSearchParams(window.location.search).get('agent'),
        }
        
    }

    componentDidMount() {
        this.initialGame();
      }

    // initial a game using POST
    //  POST /game/:id, body: {"message": "random"}
    // api: http://localhost:8080/game/1

    initialGame() {

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


    render() {
        
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
            
            <h1 style={{ color: 'black' , fontSize:'30px'}}  >
             Welcome to Othello! </h1>
             <br/>
            {/* Game settings using Modal */}
            {/* Put the settings in the same page to handle changes and transfer infomation. eg. gameID */}
            {/* <Button onClick={() => this.setState({ open: 'true' })} primary>Game Settings</Button> */}
            <Modal
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
                open={this.state.open}
                size={'small'}
                >

                <Modal.Header>Please choose a difficulty level (default: Simple)</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <p>
                    <Button onClick={() => this.setState({ agent: 'Simple' })}>Simple</Button>
                    <Button onClick={() => this.setState({ agent: 'Intermediate' })}>Intermediate</Button>
                    <Button onClick={() => this.setState({ agent: 'Hard' })}>Hard</Button>
                    </p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
    
                    <Button onClick={() => this.setState({ secondOpen: true })} primary>
                    Proceed <Icon name='right chevron' />
                </Button>
                </Modal.Actions>
                
                <Modal
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
                open={this.state.open}
                size={'small'}
                >
          <Modal.Header>Layout Settings</Modal.Header>
            <Modal.Content>
            <Header as='h2'>Please choose a Board Theme (default: trditional)</Header>
                <Modal.Description>
                    <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider />
                            <Dropdown
                            options={[
                                { key: 'Traditoional', value: 'Traditoional', text: 'Traditoional',icon: 'circle'},
                                { key: 'Fire and Water', value: 'Fire and Water', text: 'Fire and Water',icon: 'fire'},
                            ]}
                            placeholder='Traditoional'
                            selection
                            />
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="All done, let's go!"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => this.setState({ secondOpen: false,open: false })}
                    positive
                    />
            </Modal.Actions>
            </Modal>
            </Modal>

            <Play type={this.state.agent} gameId = {this.state.gameId}/>
            
            </div>
        );
    }
}
export default MainPage;