import React, { Component } from 'react';
import Board from '../Board/Board';
import Score from '../Score/Score';
import './Game.css';

const directions = [
    [0,1], // right
    [0,-1], // left
    [-1,0], // up
    [1,0], // down
    [1,1], // diagonal - down right
    [-1, 1], // diagonal - up right                        
    [-1,-1], // diagonal - up left
    [1,-1] // diagonal - down left            
];

class Game extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            board: this.createBoard(),
            currentPlayer:'black',
            winner:null,
            lostTurn: false,
            newestDisk:null,
            legalMoves:[],
            isNewGame:true,
        }
        
    }
    
    componentDidMount() {
        this.calculateAllowedCells();
    }

    componentDidUpdate(_, prevState) {

        // console.log(prevState.board===this.state.board);
        // console.log(prevState.legalMoves);
        // console.log(this.state.legalMoves);


        if (prevState.legalMoves !== this.state.legalMoves) {
            console.log("componentDidUpdate - update")
            // check if the game is over
            var allowedCellsCount = this.calculateAllowedCells(this.state.legalMoves);

            if (!allowedCellsCount) { // PLAYER HAS NO MOVE,GAME OVER
                this.props.end(this.winner(), this.score('white'), this.score('black'));
            }
        
        }

    }

    
    
    render() {
                
        return (
            <div className="Game container">
                    <h3 className="Game--title" style={{color:'black'}}>{this.state.currentPlayer}'s turn</h3>
                    {this.lostTurn()}  
                <div className="header">
                    <Score player="black" score={this.score('black')}/>  
                    <Score player="white" score={this.score('white')}/>              
                </div> 
                <div className="center">
                {/* bind reverse function to Board */}
                <Board board={this.state.board} newest={this.state.newestDisk} reverse={this.reverse.bind(this)} player={this.state.currentPlayer}/>
                </div>
            </div>);
        }
        
        winner() {
            var whiteScore = this.score('white');
            var blackScore = this.score('black');

            if (whiteScore > blackScore) return 'white';

            if (whiteScore===blackScore) return 'draw';

            return 'black';
        }

        lostTurn() {
            if (!this.state.lostTurn) return '';

            return <h4>{this.opponent()} lost his turn</h4>
        }

        score(player) {
            var score = 0;
            
            this.state.board.forEach(row=>{
                row.forEach(cell=>{
                    if (cell.disk===player) score++;
                });
            })
            
            return score;
        }
        
        calculateAllowedCellsInitial(){

            console.log("executing calculateAllowedCellsInitial");
            console.log("is new game: " + this.state.isNewGame);

            if(this.state.isNewGame){

            var b = this.state.board;
            var allowedCellsCount = 0;
            var canReverse;

            
             for (let x=0; x<8;x++) {
                    for (let y=0; y<8; y++) {
                        canReverse = this.canReverse(x, y);         
                        b[x][y].canReverse = canReverse; 
                        
                        if (canReverse.length) allowedCellsCount++;
                    }
                }


            this.setState({
                board:b
            })
        
            return allowedCellsCount;
        }
        }

        calculateAllowedCells(legal_moves) {

            console.log("executing calculateAllowedCells");
            console.log("legal moves" + this.state.legalMoves);
            
            var b = this.state.board;
            var allowedCellsCount = 0;
            var canReverse;

            if(this.state.isNewGame){
                for (let x=0; x<8;x++) {
                    for (let y=0; y<8; y++) {
                        canReverse = this.canReverse(x, y);         
                        b[x][y].canReverse = canReverse; 
                        
                        if (canReverse.length) allowedCellsCount++;
                    }
                }
            }
            else{

                // set canReverse to be all [] in board
                for (let x=0; x<8;x++) {
                    for (let y=0; y<8; y++) {
                        b[x][y].canReverse = [];
                    }
                }
            
                legal_moves.forEach(move => {
                    console.log("move: " + move);
                    canReverse = this.canReverse(move[0], move[1]);         
                    b[move[0]][move[1]].canReverse = canReverse; 
                    if (canReverse.length) allowedCellsCount++;
                });
            }

            
            
                this.setState({
                    board:b
                })
            
            return allowedCellsCount;
        }
        
        /** create the initial board state */
        createBoard() {
            let board = new Array(8);
            let rowPos;
            
            for(let x = 0; x < board.length;x++) {
                board[x] = new Array(8);
                rowPos = x * 8;
                for (let y = 0; y < board[x].length; y++) {
                    
                    board[x][y] = {
                        id: rowPos + (y+1),
                        disk: this.initialDisk(x+1, y+1),
                        canReverse:[]
                    };
                }
            }
            
            return board;
        }

        /** set initial disks black: white at 4,4;5,5; white at 4,5; 5,4; */
        initialDisk(x, y) {
            if ((x===4 && y===4) || (x===5 && y===5)) return 'white';
            if ((x===4 && y===5) || (x===5 && y===4)) return 'black';

            return null;
        }

        // api operations

        sendMove(x,y) {
            // send move to server
            // PUT /game/:id
            // request body: JSON striing {"y": 1, "x": 2}
            // api: http://localhost:8080/game/:gameid put
            // response: 200 OK
            // only send when player moves - in Cell.js -> Onclick
            console.log("executing sendMove");
            fetch( '/game/' + this.props.gameId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({x:y, y:x})
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            })
            .then(data => {
                // console.log(data.board);
                this.setState({ board: this.updateBoard(data.board), updateBoardByServer: true,legalMoves:data.legal_state,isNewGame:false, currentPlayer: (data.is_black_turn? 'black': 'white') });;
            })
            .catch((error) => {
                console.error('Error:', error);
                // window.alert("Error: " + error);
            }
            );

        }

        // handleChange(data) {
        //     // update the board
        //     console.log("board in read: " + data.board);
            
        //     let new_board = data.board;

        //     // update board
        //     // eg. json board: [[' ','-','b'],['-','w','-'],['-','-','-']]
        //     for (let i = 0; i < new_board.length; i++) {
        //         for (let j = 0; j < new_board.length; j++) {
        //             if (new_board[i][j] === 'b') {
        //                 new_board[i][j] = {
        //                     disk: 'black'
        //                 }
        //             } else if (new_board[i][j] === 'w') {
        //                 new_board[i][j] = {
        //                     disk: 'white'
        //                 }
        //             } else {
        //                 new_board[i][j] = {
        //                     disk: null
        //                 }
        //             }
        //         }
        // }   

    //     this.setState({
    //         updateBoard: new_board,
    //         currentPlayer: data.is_black_turn ? 'black' : 'white',
    //         status: data.status

    //     });
    // }


        updateBoard(newBoard) {
            let board = this.state.board;
            
            for(let x = 0; x < newBoard.length;x++) {
                for (let y = 0; y < newBoard[x].length; y++) {
                    if (newBoard[x][y] === 'b') {
                        board[x][y].disk = 'black';
                    }
                    else if (newBoard[x][y] === 'w') {
                        board[x][y].disk = 'white';
                    }
                    else {
                        board[x][y].disk = null;
                    }
                }
            }
            return board;
    }

        
        canReverse(x, y) {
            
            var canReverse = [];
            var b = this.state.board;
            var X,Y, distance, cells;
            
            // cell is already occupied
            if (b[x][y].disk) return [];
            
            directions.forEach(dir=>{
                
                distance = 0;
                X = x;
                Y = y;
                cells = [];
                
                do {
                    X+= dir[0];
                    Y+= dir[1];
                    cells.push({X,Y});    
                    distance++;
                } while (this.inBoard(X,Y) && this.hasOpponentsColor(X,Y));
                
                if (distance >=2 && this.inBoard(X,Y) && b[X][Y].disk===this.state.currentPlayer) {
                    canReverse.push(cells);
                }
            });
            
            return [].concat.apply([], canReverse);
            
        }
        
        inBoard(x, y) {
            return x>=0 && x<=7 && y>=0 && y<=7;
        }
        
        hasOpponentsColor(x,y) {
            return this.state.board[x][y].disk===this.opponent();
        }
        
        opponent() {
            return this.state.currentPlayer==='white'?'black':'white';
        }
        
        reverse(x, y) { 

            // do all the updates here (in original code logic)

            // send move to server and update board

            // this.sendMove(x,y);
            // var b = this.state.updateBoard;
            // TODO: cannot update board yet only can read user click and send to server
            var b = this.state.board;
            
            if (!b[x][y].canReverse || !b[x][y].canReverse.length) return;
            
            b[x][y].disk = this.state.currentPlayer;
            b[x][y].canReverse.forEach(cell=>b[cell.X][cell.Y].disk = this.state.currentPlayer);

            this.setState({
                board:b,
                newestDisk:[x,y]
            },()=>{
                // send the PUT request to update server board, also get the updated board from server
                this.sendMove(x,y);

            })


            
            
        }

        getCurrentPlayer() {

            // check whether to opponent has any moves. Count only, without assigning the actual cells
            var allowedCellsCount = this.calculateAllowedCells(); 
            
            if (!allowedCellsCount) {
                this.setState({
                    lostTurn:true
                });
    
                return this.state.currentPlayer;
            
            }
            
            return this.state.currentPlayer==='white'?'black':'white';
        }
    }
    
    export default Game;