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
var tiles = document.getElementsByClassName("tile");
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

// List of possible win conditions
var winMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

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
    // Prevents this function from running if there is no game
    if(!game)
        return;
        
    for (var x = 0; x < 9; x++) {
        // Checks to see if tile is unoccupied and fills it if so
        if (tiles[x] == clicked && state[x] == 0) {
            set(x, HUMAN);
            callAI();
        }
    }
}

function set(index, player) {
    // Prevents this function from running if there is no game
    if(!game)
        return;
    
    // Hides Computer button when game is being played
    if (state[index] == 0) {
        buttons[0].style.width = "0";
        buttons[0].style.margin = "0";
        buttons[0].style.opacity = "0";
        
        buttons[1]. style.width = "32vh";
        
    // Sets background of tile based on whether it is taken by the player or the computer
        if (player == HUMAN) {
            tiles[index].style.background = "#cc0c0c";
            state[index] = HUMVAL;
        } else {
            tiles[index].style.background = "#0c39cc";
            state[index] = COMPUTER;
        }
        
    // Ends game if win state has been reached
        if (checkWin(state, player)) {
            game = false;
        }
    }
}

// Checks board to see if win conditions have been fulfilled
function checkWin(board, player) {
    // If the player is human, set value to the human value; otherwise, set it to the computer value
    var value = player == HUMAN ? HUMVAL : COMVAL;
    
    for (var x = 0; x < 8; x++) {
        // Win state is set to a default of true
        var win = true;
        
        // Sets win state to false if no win condition is met
        for (var y = 0; y < 3; y++) {
            if (board[winMatrix[x][y]] != value) {
                win = false;
                break;
            }
        }
        
        if (win)
            return true;
    }
    
    return false;
}

// Checks for draw state
function checkFull(board) {
    for (var x = 0; x < 9; x++) {
        if (board[x] == 0)
            return false;
    }
    return true;
}

// Tells the computer to take a turn
function callAI() {
    aiturn(state, 0, COMPUTER);
}

// Takes computers turn
function aiturn(board, depth, player) {
    if (checkWin(board, !player))
        return -10 + depth;
        
    if (checkFull(board))
        return 0;
    
    // If the player is human, set value to the human value; otherwise, set it to the computer value
    var value = player == HUMAN ? HUMVAL : COMVAL;
    
    // Sets baseline
    var max = -Infinity;
    var index = 0;
        
    // Checks all values on the board    
    for (var x = 0; x < 9; x++) {
        // Checks if tile is empty
        if (board[x] == 0) {
            // If it's empty, it creates a new temporary board
            var newboard = board.slice();
            // Sets value to whoever is taking their turn
            newboard[x] = value;
            
            // Checks value of every possible move combination and determines best moves for computer
            var moveval = -aiturn(newboard, depth + 1, !player);
            
            if (moveval > max) {
                max = moveval;
                index = x;
            }
        }
    }
    
    if (depth == 0) 
        set(index, COMPUTER);
    
    return max;
}