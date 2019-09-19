import * as R from 'ramda'

class Empty {
  constructor() {
    this[Symbol.iterator] = function* () {}
  }
}

function* iterateStack() {
  yield this.head;
  yield* this.tail;
}

const isStack = stack =>
  stack instanceof Empty ||
  (stack.head !== undefined &&
    stack.tail !== undefined)

class Stack {
  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    this[Symbol.iterator] = iterateStack.bind(this);
  }
}

const empty = new Empty();

const isEmpty = stack => stack instanceof Empty;

const push = R.curry((head, tail) => new Stack(head, tail));

const pop = R.curry((num, stack) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    if (isEmpty(stack)) {
      result.push(0);
    }
    else {
      result.push(stack.head);
      stack = stack.tail;
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
