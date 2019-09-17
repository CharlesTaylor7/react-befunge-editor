
class Empty {}

export default {
  empty: new Empty(),
  isEmpty: stack => stack instanceof Empty,
  push: (head, tail) => ({ head, tail }),
  pop: (stack, num) => {
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
  }
}
