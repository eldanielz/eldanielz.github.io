"use strict";

const ticTacToe = document.querySelector(".game-tic-tac-toe");
const mainContainer = document.querySelector(".main-container");
const btnLogo = document.querySelector(".logo");
const btnGameTrigger = document.querySelector(".run-tic-tac-toe");
const btnGameBack = document.querySelector(".game-back-button");

btnGameTrigger.addEventListener("click", () => {
  mainContainer.classList.add("hidden");
  ticTacToe.classList.remove("hidden");
});

const showMainView = () => {
  mainContainer.classList.remove("hidden");
  ticTacToe.classList.add("hidden");
};

btnLogo.addEventListener("click", showMainView);

btnGameBack.addEventListener("click", showMainView);

ticTacToe.classList.add("hidden");

const gameStatusDisplay = document.querySelector(".game-status");

let gameIsActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const playerWonMessage = () => `Player ${currentPlayer} won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `Now it's ${currentPlayer}'s turn`;

gameStatusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatusDisplay.innerHTML = currentPlayerTurn();
}

const winningCellsConfiguration = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningCellsConfiguration[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameStatusDisplay.innerHTML = playerWonMessage();
    gameIsActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameStatusDisplay.innerHTML = drawMessage();
    gameIsActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameIsActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameIsActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart-button")
  .addEventListener("click", handleRestartGame);
