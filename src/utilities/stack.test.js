import Stack from './stack'

describe('Stack', () => {
  describe('#empty', () => {
    test('is self identical', () => {
      expect(Stack.empty)
        .toBe(Stack.empty)
    })
  })
  describe('#isEmpty', () => {
    test('the empty stack is empty', () => {
      expect(Stack.isEmpty(Stack.empty))
        .toBe(true)
    })
    test('a non empty stack is not empty', () => {
      expect(Stack.isEmpty(Stack.push('a', Stack.empty)))
        .toBe(false)
    })
  })
  describe('#fromArray', () => {
    test('from empty array is empty stack', () => {
      expect(Stack.fromArray([]))
        .toBe(Stack.empty)
    })
    test('can build from an array', () => {
      expect(Stack.fromArray([1, 2]))
        .toEqual(Stack.push(1, Stack.push(2, Stack.empty)))
    })
  })
  describe('#push', () => {
    test('is curried', () => {
      expect(Stack.push(1)(Stack.empty))
        .toEqual(Stack.push(1, Stack.empty))
    })
    test('2nd argument must be a stack', () => {
      expect(() => Stack.push(1, 1))
        .toThrow()
    })
  })
  describe('#pop', () => {
    test('is curried', () => {
      expect(Stack.pop(1)(Stack.fromArray(['a'])))
        .toEqual(Stack.pop(1, Stack.fromArray(['a'])))
    })
    test('can get top of stack', () => {
      expect(Stack.pop(1, Stack.fromArray(['a', 'b', 'c'])))
        .toEqual(['a', Stack.fromArray(['b', 'c'])])
    })
    test('can get many from top of stack', () => {
      const stack = Stack.fromArray(['a', 'b', 'c', 'd'])
      expect(Stack.pop(2, stack))
        .toEqual(['a', 'b', Stack.fromArray(['c', 'd'])])
    })
    test('popping zero returns singleton array', () => {
      const stack = Stack.fromArray(['a', 'b'])
      expect(Stack.pop(0, stack))
        .toEqual([stack])
    })
    test('popping more than stack depth yields 0 as placeholder', () => {
      expect(Stack.pop(2, Stack.fromArray(['a'])))
        .toEqual(['a', 0, Stack.empty])
    })
  })
  describe('is iterable', () => {
    test('iterate empty stack yields nothing', () => {
      expect(Array.from(Stack.empty))
        .toEqual([])
    })
    test('iterate non empty stack', () => {
      expect(Array.from(Stack.fromArray(['a', 'b'])))
        .toEqual(['a', 'b'])
    })
  })
  
})
