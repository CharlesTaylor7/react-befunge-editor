import * as R from 'ramda'
import Stack from '../../utilities/stack'
import { gridLens } from '../lenses'
import { quot, rem } from '../../utilities/integerDivision'

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
      return runBinaryOpOnStack((a, b) => b - a)(state);
    case '*':
      return runBinaryOpOnStack((a, b) => a * b)(state);
    case '/':
      return runBinaryOpOnStack((a, b) => quot(b, a))(state);
    case '%':
      return runBinaryOpOnStack((a, b) => rem(b, a))(state);
    case '!':
      return R.over(R.lensPath(['stack', 'head']), x => x === 0 ? 1 : 0, state);
    case '`':
      return runBinaryOpOnStack((a, b) => b > a ? 1 : 0)(state);
    case '>':
      return R.set(R.lensProp('heading'), 'Right', state);
    case '<':
      return R.set(R.lensProp('heading'), 'Left', state);
    case '^':
      return R.set(R.lensProp('heading'), 'Up', state);
    case 'V':
      return R.set(R.lensProp('heading'), 'Down', state);
    
    default:
      return R.over(R.lensProp('stack'), Stack.push(instruction.charCodeAt(0)), state);
  }
}

const runBinaryOpOnStack = (op) =>
  R.over(R.lensProp('stack'), stack => {
    const [ a, b, rest ] = Stack.pop(2, stack);
    const head = op(a, b);
    return Stack.push(head, rest);
  });
