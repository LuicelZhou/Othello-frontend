import React, { Component } from 'react';
import "./Rules.css";

class Rules extends Component {
    render() {
        return (
            <div className="Rules">
                <h1>How to play Othello</h1>
                <p>
                Othello is a two-player board game played on a square board (size n x n square grid) using bi-colored disks. The object of the game is to maximize the number of disks on the board with your assigned color. 
                Players take turns placing disks of their color on the board until the game ends. 
                This happens when it is no longer possible for either of the players to make a legal move or until the board is filled. 
                A move is legal if the player can place their disk on the board such that one or more of their opponent's rows of disks is bordered at each end by a disk of the player's color.
                 A row may be made up of one or more disks. When a player places a disk on the board, the disk changes the color of all the opposing player's disks lying on any straight line between the new disk and one of the player's disks. 
                 When the game ends, the player with more disks of their color on the board wins.
                </p>
            </div>
        )
    }

}
export default Rules;