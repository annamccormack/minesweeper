document.addEventListener('DOMContentLoaded', startGame)

function createBoard(size) {
  document.querySelector(".board")
  board = {
    cells: []
  }

  let mines = 0.2


  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      board.cells.push({
        row: x,
        col: y,
        isMine: Math.random() < mines,
        isMarked: false,
        hidden: true
      })
    }
  }
  return board
}

createBoard(5);

function startGame() {
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function checkForWin() {
  let totalCells = board.cells.length;
  let totalMines = 0;
  let totalVisible = 0;

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == true && board.cells[i].isMarked == true) {
      totalMines++
    } else if (board.cells[i].isMine == false && board.cells[i].hidden == false) {
      totalVisible++
    }

    if (totalMines + totalVisible == totalCells) {
      return lib.displayMessage('You win!')
    }
  }
}

document.addEventListener("click", checkForWin);

document.addEventListener("contextmenu", checkForWin);

function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;

  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count += 1;
    }
  }
  return count;
}

function resetBoard() {
  document.querySelector(".board").innerHTML = " ";
  createBoard(5);
  startGame();
}


