const input = Deno.readTextFileSync('./12-input.txt');

type Square = [number, number];
type Matrix = Array<Array<number>>;

let start: Square = [0, 0];
let end: Square = [0, 0];
const heightMap: Matrix = [];
const stepsToSquare: Matrix = [];
input.split('\n').forEach((line, i) => {
  line.split('').forEach((height, j) => {
    if (heightMap[i] === undefined) {
      heightMap[i] = [];
      stepsToSquare[i] = [];
    }

    stepsToSquare[i][j] = Infinity;
    if (height === 'S') {
      start = [i, j];
      heightMap[i][j] = 0;
      stepsToSquare[i][j] = 0;
    } else if (height === 'E') {
      end = [i, j];
      heightMap[i][j] = 25;
    } else {
      heightMap[i][j] = height.charCodeAt(0) - 97;
    }
  });
});

function hasUp(square: Square): boolean {
  return 0 < square[0];
}

function canMoveUp(square: Square, heights: Matrix): boolean {
  if (!hasUp(square)) {
    throw new Error('No square up');
  }
  return heights[square[0] - 1][square[1]] < heights[square[0]][square[1]] + 2;
}

function hasLessStepsUp(square: Square, distances: Matrix): boolean {
  if (!hasUp(square)) {
    throw new Error('No square up');
  }
  return distances[square[0]][square[1]] + 1 < distances[square[0] - 1][square[1]];
}

function shouldMoveUp(square: Square, heights: Matrix, distances: Matrix): boolean {
  return hasUp(square) && canMoveUp(square, heights) && hasLessStepsUp(square, distances);
}

function hasRight(square: Square, heights: Matrix): boolean {
  return square[1] < heights[0].length - 1;
}

function canMoveRight(square: Square, heights: Matrix): boolean {
  if (!hasRight(square, heights)) {
    throw new Error('No square right');
  }
  return heights[square[0]][square[1] + 1] < heights[square[0]][square[1]] + 2;
}

function hasLessStepsRight(square: Square, distances: Matrix): boolean {
  if (!hasRight(square, distances)) {
    throw new Error('No square right');
  }
  return distances[square[0]][square[1]] + 1 < distances[square[0]][square[1] + 1];
}

function shouldMoveRight(square: Square, heights: Matrix, distances: Matrix): boolean {
  return hasRight(square, heights) && canMoveRight(square, heights) && hasLessStepsRight(square, distances);
}

function hasDown(square: Square, heights: Matrix): boolean {
  return square[0] < heights.length - 1;
}

function canMoveDown(square: Square, heights: Matrix): boolean {
  if (!hasDown(square, heights)) {
    throw new Error('No square down');
  }
  return heights[square[0] + 1][square[1]] < heights[square[0]][square[1]] + 2;
}

function hasLessStepsDown(square: Square, distances: Matrix): boolean {
  if (!hasDown(square, distances)) {
    throw new Error('No square down');
  }
  return distances[square[0]][square[1]] + 1 < distances[square[0] + 1][square[1]];
}

function shouldMoveDown(square: Square, heights: Matrix, distances: Matrix): boolean {
  return hasDown(square, heights) && canMoveDown(square, heights) && hasLessStepsDown(square, distances);
}

function hasLeft(square: Square): boolean {
  return 0 < square[1];
}

function canMoveLeft(square: Square, heights: Matrix): boolean {
  if (!hasLeft(square)) {
    throw new Error('No square left');
  }
  return heights[square[0]][square[1] - 1] < heights[square[0]][square[1]] + 2;
}

function hasLessStepsLeft(square: Square, distances: Matrix): boolean {
  if (!hasLeft(square)) {
    throw new Error('No square left');
  }
  return distances[square[0]][square[1]] + 1 < distances[square[0]][square[1] - 1];
}

function shouldMoveLeft(square: Square, heights: Matrix, distances: Matrix): boolean {
  return hasLeft(square) && canMoveLeft(square, heights) && hasLessStepsLeft(square, distances);
}

const nextSquares: Array<Square> = [start];
while (nextSquares.length > 0) {
  const ns = nextSquares.shift();
  if (ns === undefined) {
    throw new Error('Should not happen');
  }

  if (ns[0] === end[0] && ns[1] === end[1]) {
    break;
  }

  if (shouldMoveUp(ns, heightMap, stepsToSquare)) {
    stepsToSquare[ns[0] - 1][ns[1]] = stepsToSquare[ns[0]][ns[1]] + 1;
    nextSquares.push([ns[0] - 1, ns[1]]);
  }
  if (shouldMoveRight(ns, heightMap, stepsToSquare)) {
    stepsToSquare[ns[0]][ns[1] + 1] = stepsToSquare[ns[0]][ns[1]] + 1;
    nextSquares.push([ns[0], ns[1] + 1]);
  }
  if (shouldMoveDown(ns, heightMap, stepsToSquare)) {
    stepsToSquare[ns[0] + 1][ns[1]] = stepsToSquare[ns[0]][ns[1]] + 1;
    nextSquares.push([ns[0] + 1, ns[1]]);
  }
  if (shouldMoveLeft(ns, heightMap, stepsToSquare)) {
    stepsToSquare[ns[0]][ns[1] - 1] = stepsToSquare[ns[0]][ns[1]] + 1;
    nextSquares.push([ns[0], ns[1] - 1]);
  }
}

console.log(stepsToSquare[end[0]][end[1]]);
