
const handleNegativeZero = number => number === -0 ? 0 : number;

export const rem = (dividend, divisor) => dividend % divisor;

export const div = (dividend, divisor) => {
  const subtracted = dividend - rem(dividend, divisor);
  const divided = subtracted / divisor;
  return handleNegativeZero(divided);
}
