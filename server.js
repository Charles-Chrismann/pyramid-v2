const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const webSocketServer = require('ws').Server;

const PORT = process.env.PORT || 5000;
const INDEX = './public/index.html';

const server = express()
.use(favicon(path.join(__dirname,'public','assets','images','favicon.ico')))

.get('/', (req, res) => {
    res.sendFile(INDEX, {root: __dirname});
})

.get('/js/:jsName', (req, res) => {
    console.log(req.params.jsName)
    res.sendFile(`./public/js/${req.params.jsName}`, {root: __dirname});
})

.get('/style/:cssName', (req, res) => {
    console.log(req.params.cssName)
    res.sendFile(`./public/style/${req.params.cssName}`, {root: __dirname});
})

.get('/share', (req, res) => {
    console.log(req.query.id)
    fs.readFile(__dirname + '/public/page/share.html', 'utf8', (err, text) => {
        console.log(text)
        // let customResponse = text
        // customResponse
        res.send(text.replaceAll("7382e81e-f6e5-47e2-bc47-e890f2304cdc", "un truc custom"));
    });
})

.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new webSocketServer({ server, clientTracking: true });
const { v4: uuidv4 } = require('uuid');
const { Game } = require('./game/game');
const { Player } = require('./game/player');

let clients = new Map()
let games = new Map()
wss.on("connection", (ws) => {
    console.log(ws.id)
    ws.id = 4
    console.log(ws.id)
    // console.log(ws)
    ws.on("message", (data) => {
        try{
            message = JSON.parse(data);
        }catch(e){
            console.log("unrecognized data : \n"+data.data);
            return;
        }
        switch(message.state){
            case "ID":
                if(!message.wsId){
                    wsId = uuidv4();
                    clients.set(wsId, {wsId: wsId})
                    detail = "new connection";
                } else {
                    wsId = message.wsId;
                    detail = "resume connection";
                }
                ws.send(JSON.stringify({
                    state: "ID",
                    detail: detail,
                    wsId: wsId
                }))
                break;
            case "SETUP":
                switch(message.action){
                    case "height":
                        console.log(message)
                        let newGame = new Game(message.height, message.playerName, message.wsId)
                        let owner = new Player(message.playerName, message.wsId)
                        newGame.players.set(message.wsId, owner)
                        games.set(newGame.id, newGame)
                        console.log(games)
                        console.log(newGame.players)
                        break;
                }
                break;
        }
    })

    ws.on("close", () => {
        console.log("dead co")
    })

    ws.onclose = data => {
        console.log("dead co")
    }
    // if(!ws.id) {

    // }
    
    // setInterval(() => {
    //     ws.send("meh")
    // },1000)
})


// setInterval(() => {
//     console.log(wss.clients)
// }, 1000)