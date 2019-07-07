// Initialise game
function startGame() {
    
    // Cycles through boxes to clear them
    for (var i = 1; i <= 9; i++) {
        clearBox(i);
    }
    
    document.turn = "X";
    document.winner = null;
    setMessage(document.turn + " goes first.")
}

// Set player instruction message
function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}

// Sets selected square to player's symbol
function nextMove(square) {
    // Prevents players from continuing to play after game has ended
    if (document.winner != null) {
        setMessage(document.turn + " already won.")
    } 
    // Prevents player toggling an already chosen square from X to O or vice versa
    else if (square.innerText == "") {
        square.innerText = document.turn;
        switchTurn(); 
    } 
    // Warns user square has already been selected
    else {
        setMessage("Pick another square.")
    }
}

// Toggles turns between players
function switchTurn() {
    // Send congrats message to winner
    if (checkForWinner(document.turn)) {
        setMessage("Congrats " + document.turn + ", you won!")
        document.winner = document.turn;
    } else if (document.turn == "X") {
        document.turn = "O";
        // Tells players whose turn it is
        setMessage("It's " + document.turn + "'s turn.");
    } else {
        document.turn = "X";
        setMessage("It's " + document.turn + "'s turn.");
    }
}

// Checks win conditions
function checkForWinner(move) {
    var result = false;
    if (checkRow(1, 2, 3, move) ||
        checkRow(4, 5, 6, move) ||
        checkRow(7, 8, 9, move) ||
        checkRow(1, 4, 7, move) ||
        checkRow(2, 5, 8, move) ||
        checkRow(3, 6, 9, move) ||
        checkRow(1, 5, 9, move) ||
        checkRow(3, 5, 7, move)) {
            result = true;
        }
        return result;
}

// Checks for 3 of one symbol in a row
function checkRow(a, b, c, move) {
    var result = false;
    if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
        result = true;
    }
    return result;
}

// Checks each position for which symbol it contains
function getBox(number) {
    return document.getElementById("s" + number).innerText;
}

// Clears boxes to restart game
function clearBox(number) {
    document.getElementById("s" + number).innerText = "";
}






