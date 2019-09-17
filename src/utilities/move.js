import * as R from 'ramda'

const xLens = R.lensProp('x');
const yLens = R.lensProp('y');

// type direction = 'Up' | 'Right' | 'Down' | 'Left'
// type position = { x: int, y: int }
export default (direction, jumpSize = 1) => {
  switch(direction) {
    case "Right":
      return R.over(xLens, x => x + jumpSize);
    case "Left":
      return R.over(xLens, x => x - jumpSize);
    case "Up":
      return R.over(yLens, y => y - jumpSize);
    case "Down":
      return R.over(yLens, y => y + jumpSize);
    default:
      throw new Error('Unrecognized direction!')
  }
}
