import * as R from 'ramda'

class Empty { }

class Stack {
  constructor(head, tail) {
    if (!(tail instanceof Empty || tail instanceof Stack)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
  }
}

const empty = new Empty();

const isEmpty = stack => stack instanceof Empty;

const push = R.curry((head, tail) => new Stack(head, tail));

const pop = R.curry((num, stack) => {
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
});

const fromArray = array =>
  R.reduce(
    (stack, elem) => push(elem, stack),
    empty,
    R.reverse(array)
  );

export default {
  empty,
  isEmpty,
  push,
  pop,
  fromArray,
}
