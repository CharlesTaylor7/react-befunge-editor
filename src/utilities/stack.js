
class Empty {}

export const empty = new Empty();
export const cons = (head, tail) => { head, tail };
export const isEmpty = (stack) => stack instanceof Empty;
