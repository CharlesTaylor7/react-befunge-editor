import Stack from './stack'

describe('Stack', () => {
  describe('#empty', () => {
    test('the empty stack is identical to itself', () => {
      expect(Stack.empty)
        .toBe(Stack.empty);
    })
  })
  describe('#isEmpty', () => {
    test('the empty stack is empty', () => {
      expect(Stack.isEmpty(Stack.empty))
        .toBe(true)
    })
    test('a non empty stack is not empty', () => {
      expect(Stack.isEmpty(Stack.push('a', Stack.empty)))
        .toBe(false);
    })
  })
  describe('#fromArray', () => {
    test('stack from empty array is empty stack', () => {
      expect(Stack.fromArray([]))
        .toBe(Stack.empty)
    })

    test('stack can be built from an array', () => {
      expect(Stack.fromArray([1, 2]))
        .toEqual(Stack.push(1, Stack.push(2, Stack.empty)))
    })
  })
  describe('#push', () => {
    test('push is curried', () => {
      expect(Stack.push(1)(Stack.empty))
        .toEqual(Stack.push(1, Stack.empty))
    })
    test('push 2nd argument must be a stack', () => {
      expect(() => Stack.push(1, 1))
        .toThrow()
    })
  })
  describe('#pop', () => {
    test('pop gets items from the top of the stack', () => {
      expect(Stack.pop(1, Stack.fromArray(['a', 'b', 'c'])))
        .toEqual(['a', Stack.fromArray(['b', 'c'])])
    })
    test('pop zero returns singleton array', () => {
      const stack = Stack.fromArray(['a', 'b']);
      expect(Stack.pop(0, stack))
        .toEqual([stack]);
    });
    test('pop can return many from top of the stack', () => {
      const stack = Stack.fromArray(['a', 'b', 'c', 'd']);
      expect(Stack.pop(2, stack))
        .toEqual(['a', 'b', Stack.fromArray(['c', 'd'])]);
    });
  })
})
