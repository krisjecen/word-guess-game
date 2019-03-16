//  very simple arrays of one letter and one underscore to represent the puzzle environment
"use strict"

// initialize variables

//var wordBeingGuessed = "_____";
//var wordSet = "apple";
var wrongLetters = [];
var winsCounter = 0;
var remChances = 12;

// define a set of words for the game, one will be picked at the beginning of each game
//var puzzleSet = ["pear", "apple", "persimmon", "canteloupe",];
// var currentWord = "";

var wordSet = ["pear", "apple", "persimmon", "canteloupe",];
var currentWord = "";
var wordBeingGuessed = "";

// we've set up a selector to pick one of the puzzles from the newly expanded wordSet
// and assign it to our currentWord variable -- our puzzle solution
var random = Math.floor(Math.random() * (wordSet.length));
console.log(random);
currentWord = wordSet[random];
console.log(`currentWord: ${currentWord}`);

// generate a string of only "_" characters to match each word string
// these will function as the wordSet and wordBeingGuessed


// define a replaceAt function (found at https://gist.github.com/efenacigiray/9367920)

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


// generating the "blank" string of underscores from the selected puzzle word
// take the currentWord and make wordBeingGuessed equal to it (to get the right length)
// then replace every character of wordBeingGuessed (the in-progres version that changes) with underscores "_"
var wordBeingGuessed = currentWord;

for (let j = 0; j < currentWord.length; j++) {
    wordBeingGuessed = replaceAt(wordBeingGuessed, j, "_");
    console.log(wordBeingGuessed);
}

// winning message
var winMessage = document.createElement("div");
winMessage.textContent = (`You've won!`);

// initial instruction text "Press any key to begin"
var instructionText = document.createElement("div");
instructionText.textContent = (`Press any key to begin`);
document.getElementById("instructions").appendChild(instructionText);

// wins -- how many times the player has won -- inserting text content
var displayWins = document.createElement("div");
displayWins.textContent = (`Wins: ${winsCounter}`);
document.getElementById("winsCount").appendChild(displayWins);

// creating the current word area
var gameArea = document.createElement("div");
// inserting text content, in this simplified case, one underscore
gameArea.textContent = wordBeingGuessed;
document.getElementById("currentWord").appendChild(gameArea);

// display remaining chances (countdown) -- inserting text content
var remaining = document.createElement("div");
remaining.textContent = (`Chances: ${remChances}`);
document.getElementById("remainingGuesses").appendChild(remaining);

// targeting the location for displaying guessed letters that aren't in the current word
//var wrongDiv = ;
// creating a div element in the area for letters guessed
var letterGuessed = document.createElement("div");
letterGuessed.textContent = (`You've guessed: `);
document.getElementById("wrongLetters").appendChild(letterGuessed);


document.onkeyup = (event) => {
    // initial change of text once user starts playing the game
    instructionText.textContent = ('Press letter keys to reveal letters before you run out of chances');

    // change the key press value to lowercase
    var userPlay = event.key.toLowerCase();

    // check that the userPlay is a letter, not some other key (e.g. a number, symbol, F5)
    if ("abcdefghijklmnopqrstuvwxyz".includes(userPlay)) {
        console.log(userPlay); // can remove at end

        // does the userPlay match a character in the current word?
        if (currentWord.includes(userPlay)) {
            // walk through the wordSet (current word) letter by letter
            for (var i = 0; i < currentWord.length; i++) {
                // if the userPlay is the same as the character at that index in the current word
                if (userPlay === currentWord[i]) {
                    // take the in-progress word, go to the indexed character, and
                    // replace it with the userPlay
                    wordBeingGuessed = replaceAt(wordBeingGuessed, i, userPlay);
                    // update the text content with the letter that the user guessed correctly
                    gameArea.textContent = wordBeingGuessed;
                    console.log(wordBeingGuessed);  
                }
                
            }
            
            // if there are no more letters remaining to be guessed (the current word has no more blanks)
            if (wordBeingGuessed.includes("_") == false) {
                // display a winning message
                document.getElementById("gamestatus").appendChild(winMessage);
                // increment the wins counter by +1 
                winsCounter += 1;
                // update the displayed text of winsCounter: 
                displayWins.textContent = (`Wins: ${winsCounter}`);
                // reset the game to a new puzzle, but for now we will reset to the current puzzle

                // redisplay "press any key to begin" in case they've hit F5
                instructionText.textContent = (`Press any key to begin`);

            }


        }
        else {
            // exclude letters already guessed from getting added again
            if (wrongLetters.includes(userPlay) == false) {
                
                // add the wrong guess to the wrongLetters array (now without the extra space!)
                wrongLetters.push(`${userPlay}`);
                // the letterGuessed text area gets updated with the new wrong guess (itself plus the new guess)
                letterGuessed.textContent += `${userPlay}, `;
                remChances -= 1;
                remaining.textContent = (`Chances: ${remChances}`);

            
                // if the player gets down to 1 chance, add a "last chance!" reminder
                if (remChances === 1) {
                    remaining.textContent = (`Chances: ${remChances} -- this is your last chance!`);
                    
                }


                // if the player runs out of chances, what do we do?
                if (remChances === 0) {
                    // tell them that the game is over
                    console.log("game over :(");
                    // reset the chances to 12 so they can play again
                    remChances = 12;
                    // the line below doesn't display as Chances: 0 at all  ._.
                    remaining.textContent = (`Chances: ${remChances}`);
                    // reset the wrong guesses area
                    letterGuessed.textContent = (`You've guessed: `);
                    // clear out the wrongLetters array
                    wrongLetters = [];
                    // redisplay "press any key to begin"
                    instructionText.textContent = (`Press any key to begin`);

                    // reset the game to display a new puzzle to solve -- i need to turn this into a function to call
                    // select a new currentWord
                    var random = Math.floor(Math.random() * (wordSet.length));
                    currentWord = wordSet[random];
                    // create a new wordBeingGuessed string -- wordBeingGuessed needs to be reset to emptystring each time
                    // before it is rebuilt -- somehow it got built as _ _ _ _ _ which was p e a r e, the e from apple
                    // had stuck around -- yikes
                    for (let j = 0; j < currentWord.length; j++) {
                        wordBeingGuessed = replaceAt(wordBeingGuessed, j, "_");
                        console.log(wordBeingGuessed);
                    }
                    // assign a new word to the current word slot (underscores)
                    gameArea.textContent = wordBeingGuessed;
                    
                }
            }
            console.log(remChances);
            console.log(`wrong letters: ${wrongLetters}`);
        
        }
    }
    
}


console.log(gameArea.textContent);