// Shuffle array
// Durstenfeld Shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// create an array of cell coordinates of a size * size grid and shuffle the order
function getCells(rows, cols) {
  const cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells.push([i, j]);
    }
  }

  shuffleArray(cells);
  return cells;
}

// Given a number of cells, get a number of rows and columns that are closest together
// e.g. given 24, we want to return 6 and 4 (not 8 and 3)
function getDimensions(numCells) {
  let x = Math.floor(Math.sqrt(numCells));
  while (numCells % x !== 0) x--;
  return [x, Math.floor(numCells / x)];
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
export { getCells, shuffleArray, getDimensions, getRandomColor };
