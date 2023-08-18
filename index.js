let buttons = document.querySelectorAll("td");
let playerTrunElement = document.querySelector(".player-turn");
let playerWonElement = document.querySelector(".player-won");
let gameOver = false;
let combos = [
    "abc", "def", "ghi", "adg", "beh", "cfi", "aei", "ceg",
]
let playerTurn = "O";
let player1Combo = "";
let player2Combo = "";


buttons.forEach((btn) => {
    btn.addEventListener("click", btnClick);
})

function btnClick(event) {
    // check if specific button is empty or not
    let isEmpty = event.target.textContent == "" ? true : false;
    if (!isEmpty || gameOver) return

    let slotID = event.target.id;

    if (playerTurn == "X") {
        event.target.textContent = "X";
        player2Combo += slotID;
    } else if (playerTurn == "O") {
        event.target.textContent = "O";
        player1Combo += slotID;
    }
    playerTurn = playerTurn == "X" ? "O": "X";

    playerTrunElement.textContent = `Player Turn : ${playerTurn}`;

    checkWinner();
}

function checkComninationMatch(targetString) {
    let matchFound = false;
    let matchCombo = "";

    combos.forEach((combo) => {
        let tempMatch = true;
        for (let i=0; i<combo.length; i++) {
            if (!targetString.includes(combo[i])) {
                tempMatch = false;
                break;
            }
        }
        if (tempMatch) {
            matchFound = true
            matchCombo = combo;
            return
        }
    })
    return [matchFound, matchCombo];
}

function checkWinner() {
    if (checkComninationMatch(player1Combo)[0]) {
        playerWonElement.classList.remove("hide");
        playerWonElement.textContent = "O Player Won";
        highlighTiles(checkComninationMatch(player1Combo)[1]);
        gameOver = true; 
    } else if (checkComninationMatch(player2Combo)[0]) {
        playerWonElement.classList.remove("hide");
        playerWonElement.textContent = "X Player Won";
        highlighTiles(checkComninationMatch(player2Combo)[1]);
        gameOver = true; 
    } else if (checkDraw()) {
        playerWonElement.classList.remove("hide");
        playerWonElement.textContent = "It's a tie";
        gameOver = true; 
    }
}

function highlighTiles(str) {
    let letters = str.split("");
    letters.forEach((letter) => {
        let element = document.querySelector(`#${letter}`);
        element.classList.add("highlight");
    })
}


function checkDraw() {
    let result = true;
    buttons.forEach((btn) => {
        if (btn.textContent == "") {
            result = false;
            return;
        }
    })
    return result;
}