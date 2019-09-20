import interpret from './interpret'
import Stack from '../../utilities/Stack'

describe('interpret', () => {
  it('throws on unknown instructions', () => {
    expect(() => interpret({}, 'b'))
      .toThrow()
  }),
  it('does nothing with space', () => {
    const state = { };
    expect(interpret(state, ' '))
      .toBe(state)
  })
  it('pushes digits onto the stack', () => {
    const newState = interpret({ stack: Stack.empty }, '1')
    expect(Array.from(newState.stack))
      .toEqual([1])
  })
})
