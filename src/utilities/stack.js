
class Empty {}

export const empty = new Empty();
export const push = (head, tail) => ({ head, tail });
export const isEmpty = (stack) => stack instanceof Empty;

export const pop = (stack, num) => {
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
