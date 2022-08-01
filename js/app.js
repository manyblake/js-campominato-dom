const playground = document.querySelector(`.chessboard`);
const difficultyCheck = document.getElementById(`game-difficulty`);
const gameStart = document.querySelector(`.button`);
let numberOfChessBoxes;
let bombPositions = [];
let score = 0;

gameStart.addEventListener(`click`, function () {
  const selectedDifficulty = parseInt(difficultyCheck.value);
  numberOfChessBoxes = selectedDifficulty ** 2;

  createBoard();

  playground.style.gridTemplateColumns = `repeat(${selectedDifficulty}, 1fr)`;
  playground.classList.remove(`hidden`);
  gameStart.classList.add(`hidden`);
  difficultyCheck.classList.add(`hidden`);
});

function createBoard() {
  for (let i = 0; i < numberOfChessBoxes; i++) {
    const chessBox = document.createElement(`div`);
    chessBox.className = `chess-box`;
    chessBox.innerHTML = i + 1;
    playground.appendChild(chessBox);
    chessBox.addEventListener(`click`, getChessBox);
  }
  setBombs();
}

function setBombs() {
  while (bombPositions.length < 16) {
    let n = Math.floor(Math.random() * numberOfChessBoxes + 1);
    if (!bombPositions.includes(n)) {
      bombPositions.push(n);
    }
  }
  console.log(bombPositions);
}

function endGame(result) {
  const endMask = document.createElement(`div`);
  playground.appendChild(endMask);
  endMask.className = `end-mask`;

  const endBox = document.createElement(`div`);
  endMask.appendChild(endBox);
  endBox.className = `end-box`;

  const endMessage = document.createElement(`p`);
  endBox.appendChild(endMessage);
  endMessage.className = `end-message`;

  const newGame = document.createElement(`button`);
  endBox.appendChild(newGame);
  endBox.classList.add = `new-game`;
  newGame.innerHTML = `Riprova`;

  if (!result) {
    endMessage.innerHTML = `Hai Vinto!`;
  } else {
    endMessage.innerHTML = `Hai Perso.`;
  }
}

function getChessBox() {
  const chessBox = this;

  if (!bombPositions.includes(parseInt(this.innerHTML))) {
    chessBox.classList.add(`success`);
    score++;
  } else {
    chessBox.classList.add(`fail`);
    endGame(false);
  }
}
