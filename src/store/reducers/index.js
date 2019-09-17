import * as R from 'ramda'
import * as Stack from '../../utilities/stack';
import { executeCurrent } from './instructions';
import move from '../../utilities/move';
import initialState from '..';

export default (state = initialState, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.mergeRight(state, { dimensions: { height, width }})
    }
    case "EDIT_CELL": {
      const { position: { x, y }, value} = action;
      const cellId = `${x}-${y}`;
      return R.mergeDeepRight(state, { grid: { [cellId]: value }});
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
      const position = move(state.heading, jumpSize)(state.currentInstruction);
      return R.mergeRight(state, { currentInstruction: position, activeBridge: false});
    }
    case "EXECUTE_CURRENT_INSTRUCTION": {
      return executeCurrent(state);
    }
    default:
      return state;
  }
}
