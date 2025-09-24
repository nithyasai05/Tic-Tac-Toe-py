const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);

function cellClicked(){
    const cellIndex = this.getAttribute("data-index");

    if(board[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Add different color classes
    if(currentPlayer === "X"){
        cell.classList.add("x");
    } else {
        cell.classList.add("o");
    }
}

function switchPlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `👉 Player ${currentPlayer}'s Turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let condition of winConditions){
        const [a,b,c] = condition;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        running = false;
    } else if(!board.includes("")){
        statusText.textContent = "🤝 It's a Draw!";
        running = false;
    } else {
        switchPlayer();
    }
}

function resetGame(){
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}
