//Game is initialised once two participants are found
// interface Game {
//     id: string;
//     name: string;
//     player1: WebSocket;
//     player2: WebSocket;
// }

import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game{
    private player1: WebSocket;
    private player2: WebSocket;
    private board: Chess;
    private moves: string[];
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
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
        //is it this user's move
        //is the move valid


        //if so then update the board
        //push the move 

        //check if the game is over 
        //send the updated board to both players

    }
}

