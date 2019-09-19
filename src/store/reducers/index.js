import * as R from 'ramda'
import { executeCurrent } from './instructions';
import move from '../../utilities/move';
import initialState from '../initialState';
import { gridLens } from '../lenses';

export default (state = initialState, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.mergeRight(state, { dimensions: { height, width }})
    }
    case "EDIT_CELL": {
      const { position, value} = action;
      return R.set(gridLens(position), value, state);
    }
    case "SET_EDITOR_FOCUS": {
      const { x, y } = action.position;
      const { dimensions: { width, height }} = state;

      if (x >= 0 && x < width && y >= 0 && y < height) {
        return R.mergeRight(state, { editorFocus: action.position });
      }
      return state;
    }
    case "ADVANCE": {
      const jumpSize = state.activeBridge ? 2 : 1;
      const position = move({
        jumpSize,
        direction: state.heading,
        dimensions: state.dimensions
      })(state.currentInstruction);

      return R.mergeRight(state, { currentInstruction: position, activeBridge: false});
    }
    case "EXECUTE": {
      return executeCurrent(state);
    }
    default:
      return state;
  }
}
