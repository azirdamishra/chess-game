//Game is initialised once two participants are found
// interface Game {
//     id: string;
//     name: string;
//     player1: WebSocket;
//     player2: WebSocket;
// }

import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    private player1: WebSocket;
    private player2: WebSocket;
    private board: Chess;
    private moves: string[]; // not updated
    private startTime: Date;
    private moveCount: number;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.moveCount = 0;
        this.player1.send(JSON.stringify({ //the guy who connects first or the guy who sends first? sends first
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }  
        }))
    }

    getPlayer1(): WebSocket{
        return this.player1;
    }

    getPlayer2(): WebSocket{
        return this.player2;
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }){
        // validate the type of move using zod
        if (this.moveCount % 2 === 0 && socket !== this.player1){ //for even number the player has to be 1
            return;
        }

        if (this.moveCount % 2 === 1 && socket !== this.player2){ //for odd number the player has to be 2
            return;
        }

        console.log("Did not early return");

        try{
            this.board.move(move); //check function
        } catch (e){
            console.log(e);
            return;
        }
        //is it this user's move
        //is the move valid

        console.log("move succeeded");

        //checking if the game is over 
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify( {
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w"? "black": "white"
                }
            } ))
            return;
        }
  
        //if game is not over then update the game board with the new move of next player and 
        //send the updated board to both players
        console.log("board moves length:")
        console.log(this.moveCount); //this is 0 for the first player as we are starting from 0th move because js and board length
        if(this.moveCount % 2 === 0){
            console.log("sent to player 2");
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }else {
            console.log("sent to player 1");
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;

    }
}

