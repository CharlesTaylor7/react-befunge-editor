import * as R from 'ramda'

class Empty {}

export default {
  empty: new Empty(),
  isEmpty: stack => stack instanceof Empty,
  push: R.curry((head, tail) => ({ head, tail })),
  pop: R.curry((stack, num) => {
    const result = [];
    for (let i = 0; i < num; i++){
      result.push(stack.head);
      stack = stack.tail;
      if (stack === undefined) {
        throw new Error(`Cannot pop ${num} elements!`)
      }
    }
    result.push(stack);
    return result;
  })
}
