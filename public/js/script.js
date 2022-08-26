'use strict'

let pyramidHeightBtn = document.querySelector("#setupForm").addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("pyramideHeight")
    ws.send(JSON.stringify({
        state: "SETUP",
        action: "height",
        height: document.querySelector("#pyramidHeight").value,
        playerName: document.querySelector("#playerName").value,
        wsId: localStorage.getItem("wsId"),
    }))
})

let ws = new WebSocket(location.origin.replace(/^http/, 'ws'))

ws.onopen = data => {
    console.log("connecté au server", data)

    let wsId;
    localStorage.getItem("wsId") ? wsId = localStorage.getItem("wsId") : null
    ws.send(JSON.stringify({
        state: "ID",
        wsId: wsId
    }))
}

ws.onmessage = data => {
    console.log("data received", JSON.parse(data.data))
    let message = JSON.parse(data.data)
    switch(message.state){
        case "ID":
            localStorage.setItem("wsId", message.wsId)
            break;
    }
}