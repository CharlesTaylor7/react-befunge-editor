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
    const state = { stack: Stack.empty };
    expect(interpret(state, '1'))
      .toEqual({ stack: Stack.push(1, Stack.empty) })
  })
})
