const { v4: uuidv4 } = require('uuid');

module.exports = {
    Player: class Player {
        constructor(pseudo, wsId){
            this.pseudo = pseudo;
            this.wSid = wsId;
            this.gameId;
            this.deck;
            this.hasDrunk;
            this.madeDrink;
        }

        CreateUUID(){

        }
        
    }

}