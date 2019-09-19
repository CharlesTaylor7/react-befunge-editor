import { div, rem } from './integerDivision'

describe('integerDivision', () => {
  it('handles positive numbers', () => {
    expect(div(1, 3)).toBe(0);
    expect(rem(1, 3)).toBe(1);
  });
  it('handles negative dividend', () => {
    expect(div(-1, 3)).toBe(0);
    expect(rem(-1, 3)).toBe(-1);

    expect(div(-2, 3)).toBe(0);
    expect(rem(-2, 3)).toBe(-2);
  })
  it('handles negative divisor', () => {
    expect(div(1, -3)).toBe(0);
    expect(rem(1, -3)).toBe(1);
  })
})
