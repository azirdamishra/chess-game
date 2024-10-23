"use strict";
//Game is initialised once two participants are found
// interface Game {
//     id: string;
//     name: string;
//     player1: WebSocket;
//     player2: WebSocket;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.moveCount = 0;
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer2() {
        return this.player2;
    }
    makeMove(socket, move) {
        // validate the type of move using zod
        if (this.moveCount % 2 === 0 && socket !== this.player1) { //for even number the player has to be 1
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) { //for odd number the player has to be 2
            return;
        }
        console.log("Did not early return");
        try {
            this.board.move(move); //check function
        }
        catch (e) {
            console.log(e);
            return;
        }
        //is it this user's move
        //is the move valid
        console.log("move succeeded");
        //checking if the game is over 
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        //if game is not over then update the game board with the new move of next player and 
        //send the updated board to both players
        console.log("board moves length:");
        console.log(this.moveCount); //this is 0 for the first player as we are starting from 0th move because js and board length
        if (this.moveCount % 2 === 0) {
            console.log("sent to player 2");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            console.log("sent to player 1");
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
