import * as R from 'ramda';
import Stack from '../utilities/stack';

export const executeCurrent = (state) => {
  const instruction = state.grid[`${state.position.x}-${state.position.y}`];
  const number = Number(instruction);

  if (Number.isInteger(number)) {
    return R.mergeRight(state, { stack: Stack.push(number, state.stack) });
  }

  switch (instruction) {
    case ' ':
    case undefined:
      return state;
    case '+':
      return runBinaryOpOnStack((a, b) => a + b);
    case '-':
      return runBinaryOpOnStack((a, b) => a - b);
    case '*':
      return runBinaryOpOnStack((a, b) => a * b);
    case '/':
      return runBinaryOpOnStack((a, b) => a / b);
    default:
        console.error(`Unable to interpret unknown instruction: ${instruction}`);
  }
}

const runBinaryOpOnStack = (op, state) => {
  const [ a, b, rest ] = Stack.pop(state.stack, 2);
  const combined = op(a, b);
  return R.mergeRight(state, { stack: Stack.push(combined, rest) });
}
