const express = require('express');
const webSocketServer = require('ws').Server;

const PORT = process.env.PORT || 5000;
const INDEX = './public/index.html';

const server = express()
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

.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new webSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("new ws connection")
    setInterval(() => {
        ws.send("meh")
    },1000)
})