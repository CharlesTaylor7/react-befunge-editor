import { gridLens } from '../lenses'
import * as R from 'ramda'

export default state => {
  const { executionPointer: { x, y } } = state;
  return R.view(gridLens(x, y), state);
}
