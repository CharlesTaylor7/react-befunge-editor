import interpret from './interpret'

describe('interpret', () => {
  it('throws on unknown instructions', () => {
    expect(() => interpret({}, 'b'))
      .toThrow()
  })
})
