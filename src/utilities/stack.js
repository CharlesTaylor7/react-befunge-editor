import * as R from 'ramda'

class Empty {
  constructor() {
    this[Symbol.iterator] = function* () {}
    return Object.freeze(this);
  }
}

function* iterateStack() {
  yield this.__head;
  yield* this.__tail;
}

const isStack = stack =>
  R.any(
    constructor => constructor === stack.constructor.name,
    [Empty.name, Stack.name]
  );

class Stack {
  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.__head = head;
    this.__tail = tail;
    this[Symbol.iterator] = iterateStack.bind(this);
    return Object.freeze(this);
  }
}

const empty = new Empty();

const isEmpty = stack => stack.constructor.name === Empty.name;

const push = R.curry((head, tail) => new Stack(head, tail));

const pop = R.curry((num, stack) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    if (isEmpty(stack)) {
      result.push(0);
    }
    else {
      result.push(stack.__head);
      stack = stack.__tail;
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
