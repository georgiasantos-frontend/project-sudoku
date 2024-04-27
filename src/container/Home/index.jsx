import { Container, ButtonContainer, Button } from "./styles";

import { Table } from "../../components/Table";
import { useState } from "react";
import { getDeepCopy } from "../../utils/helpers";
import { solver, compareSudokus } from "../../utils/helpers/validators";

const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, 2],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, -1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1],
];

export const Home = () => {
  const [sudokuArr, setSudokuArr] = useState(initial);

  const CheckSudoku = () => {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudokus(sudokuArr, sudoku);

    if (compare.isComplete) return alert("Parabéns! Você resolveu o Sudoku");
    if (compare.isSolvable) return alert("Continue tentando!");

    return alert("Sudoku não foi resolvido. Tente novamente");
  };

  //resolver o sudoku
  const SolveSudoku = () => {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    setSudokuArr(sudoku);
  };

  //reiniciar o nosso sudoku
  const ResetSudoku = () => {
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
  };
  return (
    <Container>
      <p>DevClub Sudoku Game</p>
      <Table
        sudokuArr={sudokuArr}
        setSudokuArr={setSudokuArr}
        initalArr={initial}
      />
      <ButtonContainer>
        <Button onClick={CheckSudoku}>Checar</Button>
        <Button onClick={SolveSudoku}>Resolver</Button>
        <Button onClick={ResetSudoku}>Reiniciar</Button>
      </ButtonContainer>
    </Container>
  );
};
