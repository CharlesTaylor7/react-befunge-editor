import * as R from 'ramda'
import * as Stack from '../utilities/stack';
import { executeCurrent } from './instructions';

const initialState = {
  editorFocus: { x: 0, y: 0 },
  currentInstruction: { x: 0, y: 0 },
  // type heading = 'north' | 'east' | 'south' | 'west'
  heading: 'east',
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: {},
  dimensions: { height: 0, width: 0},
  // stack<int>
  stack: Stack.empty,
  // skip intermediate
  activeBridge: false,
  executionComplete: false,
}

export default (state = initialState, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.mergeRight(state, { dimensions: { height, width }})
    }
    case "EDIT_CELL": {
      const { x, y, value} = action;
      const cellId = `${x}-${y}`;
      return R.mergeDeepRight(state, { grid: { [cellId]: value }});
    }
    case "SET_EDITOR_FOCUS": {
      if (
        action.x < 0 || action.x >= state.dimensions.width ||
        action.y < 0 || action.y >= state.dimensions.height) {

        return state;
      }
      return R.mergeRight(state, { editorFocus: { x: action.x, y: action.y}});
    }
    case "ADVANCE": {
      const jumpSize = state.activeBridge ? 2 : 1;
      const alteration = () => {
        const { x, y} = state.currentInstruction;
        switch (state.heading) {
          case 'north': return { y: y + jumpSize};
          case 'east': return { x: x + jumpSize};
          case 'south': return { y: y - jumpSize};
          case 'west': return { x: x - jumpSize};
          default:
           throw new Error("Unrecognized heading!");
        }
      };
      return R.mergeDeepRight(state, { currentInstruction: alteration(), activeBridge: false});
    }
    case "EXECUTE_CURRENT_INSTRUCTION": {
      return executeCurrent(state);
    }
    default:
      return state;
  }
}
