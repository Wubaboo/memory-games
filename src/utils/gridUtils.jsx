const ROWS = 4;
const COLS = 4;
const DIRS = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];
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

// Get a random color
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Given an index of a cell in a 1d representation of a 2d array, get the coordinates of the 2d array
// e.g. if [1,2,3,4] is a 2x2 matrix, getRC(3,2,2) will return (1,0) (row 1 column 0)
function getRC(i, rows = ROWS, cols = COLS) {
  return [Math.floor(i / cols), i % cols];
}

// Given the coordinates of a 2d array, get its corresponding index in the 1d representation
// e.g. given (1,0) of grid [[1,2], [3,4]], getIndex(1,0,2,2) will return 2
function getIndex(r, c, rows = ROWS, cols = COLS) {
  return r * cols + c;
}

// return 1d representation of a 2d grid with rows and cols with values filled with 0
function getGrid(rows = ROWS, cols = COLS) {
  return Array.from({ length: rows * cols }, (v, i) => 0);
}

//  given an index of a 1d array representation of a 2d array,
//    get the indices of its neighbours
function getNeighbors(i, rows = ROWS, cols = COLS) {
  const [r, c] = getRC(i, rows, cols);
  let neighs = [];
  for (let i of DIRS) {
    const [x, y] = i;
    if (0 <= r + x && r + x < rows && 0 <= c + y && c + y < cols) {
      neighs.push([r + x, c + y]);
    }
  }
  return neighs;
}

// create a rows * cols grid and return an adjacency list
// e.g. createGrid(2,2) => {0: {1,2}, 1: {0, 3}, 2: {0,3}, 3:{1,2}}
function createGrid(rows = ROWS, cols = COLS) {
  const g = {};
  for (let i = 0; i < rows * cols; i++) {
    const neigh = getNeighbors(i, rows, cols);
    const neighIdx = neigh.map(([r, c], i) => getIndex(r, c, rows, cols));
    g[i] = new Set(neighIdx);
  }
  return g;
}

// Given the adjacency list of a graph, get the cut vertices and non cut vertices
//https://web.archive.org/web/20161130155755/https://www.eecs.wsu.edu/~holder/courses/CptS223/spr08/slides/graphapps.pdf
function getCutVertices(graph) {
  const nums = {};
  const parents = {};
  const low = {};
  const seen = new Set();
  let count = 0;
  const articulation = new Set();
  const other = new Set();
  function findArt(node) {
    seen.add(node);
    low[node] = count;
    nums[node] = count;
    count += 1;
    let cutVertex = false;
    for (let neigh of graph[node]) {
      if (!seen.has(neigh)) {
        parents[neigh] = node;
        findArt(neigh);
        if (low[neigh] >= nums[node]) {
          cutVertex = true;
        }
        low[node] = Math.min(low[node], low[neigh]);
      } else {
        if (parents[node] != neigh) {
          low[node] = Math.min(low[node], nums[neigh]);
        }
      }
    }
    if (cutVertex) articulation.add(node);
    else other.add(node);
  }
  parents[0] = 0;
  findArt(0);
  const artic = Array.from(articulation);
  artic.sort();
  const oth = Array.from(other);
  oth.sort();
  return [artic.sort((a, b) => a - b), oth.sort((a, b) => a - b)];
}

// remove node from the adjacency list graph
function removeNode(graph, node) {
  for (let neigh of Array.from(graph[node])) {
    graph[neigh].delete(node);
  }
  delete graph[node];
  return graph;
}

export {
  getCells,
  shuffleArray,
  getDimensions,
  getRandomColor,
  createGrid,
  getCutVertices,
  removeNode,
  getIndex,
};
