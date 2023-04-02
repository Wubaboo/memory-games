// Shuffle array
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
function getCells(size) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells.push([i, j]);
    }
  }
  // Durstenfeld Shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(cells);
  return cells;
}

export { getCells, shuffleArray };
