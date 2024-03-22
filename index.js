const cell = document.querySelectorAll(".box");
const message = document.getElementById("message");
const restartBtn = document.getElementById("button");

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame() {
    cell.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClicked() {
    const cellIndex = Array.from(this.parentNode.children).indexOf(this);

    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? "O" : "X";
}

function checkWinner() {
    let roundwon = false;
    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundwon = true;
            break;
        }
    }
    if (roundwon) {
        message.textContent = `'${currentPlayer}' won the game!`;
        message.style.display = 'block';
        restartBtn.style.display = 'block';
        running = false;
    } else if (!options.includes("")) {
        message.textContent = `Draw`;
        message.style.display = 'block';
        restartBtn.style.display = 'block';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cell.forEach(cell => cell.textContent = "");
    message.textContent = "";
    message.style.display = 'block';
    restartBtn.style.display = 'block';
    running = true;
}

