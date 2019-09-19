import * as R from 'ramda'

// type position = { x: int, y: int }
const xLens = R.lensProp('x');
const yLens = R.lensProp('y');

// type direction = 'Up' | 'Right' | 'Down' | 'Left'
// type dimensions = { width: int, height: int }
export default ({ direction, dimensions, jumpSize = 1 }) => {
  const { width, height } = dimensions;
  switch(direction) {
    case "Right":
      return R.over(xLens, x => (x + jumpSize) % width);
      case "Down":
      return R.over(yLens, y => (y + jumpSize) % height);
    case "Left":
      return R.over(xLens, x => (x - jumpSize + 2 * width) % width);
    case "Up":
      return R.over(yLens, y => (y - jumpSize + 2 * height) % height);
    default:
      throw new Error('Unrecognized direction!')
  }
}
