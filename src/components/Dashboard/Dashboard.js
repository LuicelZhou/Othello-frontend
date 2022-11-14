import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
        render() {

            return (
                <div className="Dashboard">
                    <br/>
                    <h1 style={{color:'white', fontSize:'10vw'}} className="Stroke" > Othello </h1>
                    <br/>

                    <Link to="/play"> 
                     <button type='button' className="btn btn-primary">Play</button>
                    </Link>

                    <br/>

                    <Link to="/rules"> 
                     <button type='button' className="btn btn-primary">Rules</button>
                    </Link> 

                    <br/>
                    <Link to="/settings"> 
                     <button type='button' className="btn btn-primary">Settings</button>
                    </Link> 
                </div>
            )
        }
}
export default Dashboard;