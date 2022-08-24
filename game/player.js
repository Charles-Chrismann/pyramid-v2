const { v4: uuidv4 } = require('uuid');

module.exports = {
    Player: class Player {
        constructor(pseudo){
            this.pseudo = pseudo;
            this.id = uuidv4();
            this.gameId;
            this.deck;
            this.hasDrunk;
            this.madeDrink;
        }

        CreateUUID(){

        }
        
    }

}