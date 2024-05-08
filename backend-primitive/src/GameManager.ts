//global class that will handle creating and managing the current set of games

import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";
//user, Game classes 

export class GameManager {
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null;

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    
    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
        //stopping the game because the user left
    }

    private addHandler(socket: WebSocket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            
            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    //start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }else{
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(game => game.getPlayer1() === socket || game.getPlayer2() === socket);
                //the above callback function checks each game in the array to see if either
                //player 1 or player 2 returns a WebSocket that matches the socket variable 
                //the socket variable represents the WebSocket connection of the user that sent the message
                if(game){
                    game.makeMove(socket, message.move);
                }
            }
        });
    }


}

