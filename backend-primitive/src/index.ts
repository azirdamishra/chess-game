//ws in node.js, use ws library

import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8081 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws);
  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });
});

//initializes a simple ws server, first bootstrap of our software
// to test it go to postwoman, now called hoppscotch.io



