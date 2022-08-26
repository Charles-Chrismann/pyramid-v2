const { v4: uuidv4 } = require('uuid');
const colors = ["♦️", "♥️", "♣️", "♠️"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

module.exports = {
    Game: class Game {
        constructor(height, owner, ownerId){
            this.height = height;
            this.finalCardPackage;
            this.players = new Map;
            this.id = uuidv4();
            this.owner = owner;
            this.ownerId = ownerId;
        }
    
        /**
         * @returns Array of Card represent a deck of 52 cards
         */
        CreateCardPackage(){
            let cardPackage = [];
            colors.forEach(color => {
                values.forEach(value => {
                    cardPackage.push({color: color, value: value})
                })
            })
            return cardPackage
        }
    
        /**
         * Create an array of all cards in the game
         * @param {number} numberOfDecks 
         */
        CreateAllCards(numberOfDecks){
            console.log("CreateAllCards")
            let cardPackage = this.CreateCardPackage();
            console.log(cardPackage)
            let finalCardPackage = []
            for (let i = 0; i < numberOfDecks; i++) {
                finalCardPackage = finalCardPackage.concat(cardPackage)
                console.log("finalCardPackage:", finalCardPackage)
            }
            return finalCardPackage;
        }
    
        shuffleFinalCardPackage(array){
            console.log("shuffleFinalCardPackage")
            var m = array.length, t, i;
    
            // While there remain elements to shuffle…
            while (m) {
          
              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);
          
              // And swap it with the current element.
              t = array[m];
              array[m] = array[i];
              array[i] = t;
            }
          
            return array;
        }
    
        startGame(numberOfDecks){
            console.log("startGame")
            let allCards = this.shuffleFinalCardPackage(this.CreateAllCards(numberOfDecks));
            console.log(allCards)
            console.log(allCards.length)
        }
    
        // ShuffleGames(a[])
    
    }

}