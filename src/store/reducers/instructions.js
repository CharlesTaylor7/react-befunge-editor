import * as R from 'ramda';
import Stack from '../../utilities/stack';
import { gridLens } from '../lenses';

export const executeCurrent = (state) => {
  const instruction = R.view(gridLens(state.currentInstruction), state);
  const number = Number(instruction);

  if (Number.isInteger(number)) {
    return R.over(R.lensProp('stack'), Stack.push(number), state);
  }

  switch (instruction) {
    case ' ':
    case undefined:
      return state;
    case '+':
      return runBinaryOpOnStack((a, b) => a + b)(state);
    case '-':
      return runBinaryOpOnStack((a, b) => a - b)(state);
    case '*':
      return runBinaryOpOnStack((a, b) => a * b)(state);
    case '/':
      return runBinaryOpOnStack((a, b) => a / b)(state);
    default:
      return R.over(R.lensProp('stack'), Stack.push(instruction.charCodeAt(0)), state);
  }
}

const runBinaryOpOnStack = (op) =>
  R.over(R.lensProp('stack'), stack => {
    const [ a, b, rest ] = Stack.pop(stack, 2);
    const head = op(a, b);
    return Stack.push(head, rest);
  });
