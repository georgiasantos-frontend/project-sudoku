//funcao que vai a judar resolver o Sudoku
// se a celula atual estiver preenchida, vá para a proxima celula
export const solver = (grid, row = 0, col = 0) => {
  if (grid[row][col] !== -1) {
    const isLast = row >= 8 && col >= 8;
    if (!isLast) {
      const [newRow, newCol] = getNext(row, col);
      return solver(grid, newRow, newCol);
    }
  }

  for (let num = 1; num <= 9; num++) {
    //looping que vai observar se o NUM está satisfazendo as restricoes do sudoku
    if (checkValid(grid, row, col, num)) {
      grid[row][col] = num;
      const [newRow, newCol] = getNext(row, col);

      if (!newRow && !newCol) return true;
      if (solver(grid, newRow, newCol)) return true;
    }
  }

  grid[row][col] = -1;
  return false;
};

//se a coluna atingir o 8, vai aumentar o  numero de linhas
//se a linha atingir o 8 e a coluna atingir o 8, a proxima vai ser [0, 0]
//se a coluna nao atingir o 8, incrementar o numero de coluna
const getNext = (row, col) => {
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
};

const checkValid = (grid, row, col, num) => {
  //funcao vai verificar se o numero é unico na linha, na coluna e no quadrado 3x3
  if (
    checkRow(grid, row, num) &&
    checkCol(grid, col, num) &&
    checkBox(grid, row, col, num)
  )
    return true;

  return false;
};

const checkRow = (grid, row, num) => {
  //verifica se o número é unico na linha
  return grid[row].indexOf(num) === -1;
};

const checkCol = (grid, col, num) => {
  //verifi a se o numero é unico na coluna
  return grid.map((row) => row[col]).indexOf(num) === -1;
};

const checkBox = (grid, row, col, num) => {
  let boxArr = [],
    rowStart = row - (row % 3),
    colStart = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxArr.push(grid[rowStart + i][colStart + j]);
    }
  }
  return boxArr.indexOf(num) === -1;
};

//funcao para comparar os sudoku's
export const compareSudokus = (currentSudoku, solvedSudoku) => {
  //resposta
  const res = {
    isComplete: true,
    isSolvable: true,
  };

  // estrutura de repeticao vamos usar para comparar os array's
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
        if (currentSudoku[i][j] !== -1) {
          res.isSolvable = false;
        }
        res.isComplete = false;
      }
    }
  }
  return res;
};
