// // Initialise game
// function startGame() {
    
//     // Cycles through boxes to clear them
//     for (var i = 1; i <= 9; i++) {
//         clearBox(i);
//     }
    
//     document.turn = "X";
//     document.winner = null;
//     setMessage(document.turn + " goes first.")
// }

// // Set player instruction message
// function setMessage(msg) {
//     document.getElementById("message").innerText = msg;
// }

// // Sets selected square to player's symbol
// function nextMove(square) {
//     // Prevents players from continuing to play after game has ended
//     if (document.winner != null) {
//         setMessage(document.turn + " already won.")
//     } 
//     // Prevents player toggling an already chosen square from X to O or vice versa
//     else if (square.innerText == "") {
//         square.innerText = document.turn;
//         switchTurn(); 
//     } 
//     // Warns user square has already been selected
//     else {
//         setMessage("Pick another square.")
//     }
// }

// // Toggles turns between players
// function switchTurn() {
//     // Send congrats message to winner
//     if (checkForWinner(document.turn)) {
//         setMessage("Congrats " + document.turn + ", you won!")
//         document.winner = document.turn;
//     } else if (document.turn == "X") {
//         document.turn = "O";
//         // Tells players whose turn it is
//         setMessage("It's " + document.turn + "'s turn.");
//     } else {
//         document.turn = "X";
//         setMessage("It's " + document.turn + "'s turn.");
//     }
// }

// // Checks win conditions
// function checkForWinner(move) {
//     var result = false;
//     if (checkRow(1, 2, 3, move) ||
//         checkRow(4, 5, 6, move) ||
//         checkRow(7, 8, 9, move) ||
//         checkRow(1, 4, 7, move) ||
//         checkRow(2, 5, 8, move) ||
//         checkRow(3, 6, 9, move) ||
//         checkRow(1, 5, 9, move) ||
//         checkRow(3, 5, 7, move)) {
//             result = true;
//         }
//         return result;
// }

// // Checks for 3 of one symbol in a row
// function checkRow(a, b, c, move) {
//     var result = false;
//     if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
//         result = true;
//     }
//     return result;
// }

// // Checks each position for which symbol it contains
// function getBox(number) {
//     return document.getElementById("s" + number).innerText;
// }

// // Clears boxes to restart game
// function clearBox(number) {
//     document.getElementById("s" + number).innerText = "";
// }





// Make array of elements
var tiles = document.getElementByClassName("tile");
var buttons = document.getElementsByClassName("button");

// Sets initial state of game and board
var state = [0,0,0,0,0,0,0,0,0];
var game = true;

// 
var HUMAN = false;
var COMPUTER = true;

// Sets values for computer and player moves
var HUMVAL = -1;
var COMVAL = 1;

// Resets board to initial state
function reset() {
    for (var x = 0; x < 9; x++) {
        tiles[x].style.background = "#fff";
        state[x] = 0;
    }
    
    for (var x = 0; x < 2; x++) {
        buttons[x].style.width = "15.5vh";
        buttons[x].style.margin = "0.5vh";
        buttons[x].style.opacity = "1";
    }
    
    game = true;
}

function claim(clicked) {
    
}