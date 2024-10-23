"use strict";
//global class that will handle creating and managing the current set of games
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
//user, Game classes 
class GameManager {
    //User, Game classes can be added further
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        //stopping the game because the user left, should ideally have game connector logic
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) { //if pending user exists
                    //start a game
                    console.log("within pending users for new game");
                    const game = new Game_1.Game(this.pendingUser, socket); //single waiting user, and the newly added user
                    this.games.push(game);
                    this.pendingUser = null;
                    console.log(this.games.length);
                }
                else {
                    this.pendingUser = socket;
                    console.log("pending user should exist:");
                    console.log(this.pendingUser === socket);
                }
            }
            if (message.type === messages_1.MOVE) {
                console.log("inside move ");
                const game = this.games.find(game => game.getPlayer1() === socket || game.getPlayer2() === socket);
                //the above callback function checks each game in the array to see if either
                //player 1 or player 2 returns a WebSocket that matches the socket variable 
                //the socket variable represents the WebSocket connection of the user that sent the message
                if (game) {
                    console.log(" inside game move making");
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
