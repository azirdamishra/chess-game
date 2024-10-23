//ws in node.js, use wss library

import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8081 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws);
  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });
  // ws.on('message', function message(data, isBinary) {
  //   console.log('received: ', data); //we are receiving a message in buffer format
  //   const msg = isBinary ? data : data.toString();
  //   console.log('message: ', msg);
  // });

});



//initializes a simple ws server, first bootstrap of our software
// to test it go to postwoman, now called hoppscotch.io



