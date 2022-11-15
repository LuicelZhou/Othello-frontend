import React, { Component } from 'react';
import "./Rules.css";

class Rules extends Component {
    render() {
        return (
            <div className="Rules">
                <br/>
                <h1 className='header'>How to play Othello</h1>
                <p className='p'>
                Othello is a strategy board game for two players (Black and White), played on an 8 by 8 board. The game traditionally begins with four discs placed in the middle of the board as shown below. Black moves first.
                </p>
                <img src="how_to_play_othello_0.png" alt="Othello starting position"/>
                <p>
                Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them. In the starting position, Black has the following 4 options indicated by translucent discs:
                </p>
                <img src="how_to_play_othello_1.png" alt="Othello starting position"/>
                <p>After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this:</p>
                <img src="how_to_play_othello_2.png" alt="Othello starting position"/>
                <p>Now White plays. This player operates under the same rules, with the roles reversed: White lays down a white disc, causing black discs to flip. Possibilities at this time would be:</p>
                <img src="how_to_play_othello_3.png" alt="Othello starting position"/>
                <p>If White plays the bottom left option and flips one disc:</p>
                <img src="how_to_play_othello_4.png" alt="Othello starting position"/>
                <p>Players alternate taking turns. If a player does not have any valid moves, play passes back to the other player. When neither player can move, the game ends. A game of Othello may end before the board is completely filled.

The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw.</p>
            </div>
        )
    }

}
export default Rules;