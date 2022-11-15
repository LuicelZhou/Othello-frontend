import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Message,
    Menu,
  } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

// class Settings extends Component {
//     render() {
//         return (
            
//             <div>
//             <Menu fixed='top' inverted>
//                 <Container>
//                 <Menu.Item header>
//                     Settings
//                 </Menu.Item>
//                 <Link to="/">
//                 <Menu.Item as='a'>Back Home</Menu.Item>
//                 </Link>
//                 </Container>
//             </Menu>
//             <br/>
//             <h2>Not implemented yet</h2>
//             <Link to="/">
//                 <Button primary size='large'>
//                 Back to Dashboard
//                 </Button>
//             </Link>
//             </div>
//         )
//     }

// }
const Settings = () => (
    <div>
             <Menu fixed='top' inverted>
                 <Container>
                 <Menu.Item header>
                     Settings
                 </Menu.Item>
                 <Link to="/">
                 <Menu.Item as='a'>Back Home</Menu.Item>
                 </Link>
                 </Container>
             </Menu>

  <Grid container style={{ padding: '5em 0em' }} divided>
    <Grid.Row>
      <Grid.Column>
        <Header as='h1' style={{fontSize:'40px'}}>
          Settings
        </Header>
      </Grid.Column>
    </Grid.Row>
   
    <Grid.Row>
      <Grid.Column>
      <Message positive>Welcome to Settings! 
            <br/>
            Here you can edit the difficulty of the AI(Easy/Medium/Hard), and the color of the pieces, etc.
        </Message>
      </Grid.Column>
    </Grid.Row>
    <br/>

    <Grid.Row>
      <Grid.Column>
        <Header as='h1'>AI Difficulty Level</Header>
        <Divider />
        <Dropdown
          options={[
            { key: 'Easy', value: 'Easy', text: 'Easy' },
            { key: 'Medium', value: 'Medium', text: 'Medium' },
            { key: 'Hard', value: 'Hard', text: 'Hard' },
          ]}
          placeholder='Easy'
          selection
        />
    </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Header as='h1'>Board Theme</Header>
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
    </div>
)


export default Settings;