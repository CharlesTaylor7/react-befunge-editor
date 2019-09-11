import * as R from 'ramda'
import * as Stack from '../utilities/stack';

// type heading = 'north' | 'east' | 'south' | 'west'
// type instruction = [0-9] | '+' | '-' | '*' | '/' | '>' ... etc.
// type store = {
//   position: { x: int, y: int }
//   heading: heading
// cell ids are of the form "{i}-{j}"
//   grid: { [cellId: string]: instruction }
//   dimensions: { height: int, width: int}
//   stack: Stack<char>
//   execution_complete: bool
// }

const initialState = {
  position: { x: 0, y: 0},
  heading: 'east',
  grid: {},
  dimensions: { height: 0, width: 0},
  stack: Stack.empty,
  execution_complete: false,
}

export default (state = initialState, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.mergeRight(state, { dimensions: { height, width }})
    }
    case "ADVANCE": {
      const alteration = () => {
        const { x, y} = state.position;
        switch (state.heading) {
          case 'north': return { y: y + 1};
          case 'east': return { x: x + 1};
          case 'south': return { y: y - 1};
          case 'west': return { x: x - 1};
          default:
           throw new Error("Unrecognized heading!");
        }
      };
      const position = R.mergeRight(state.position, alteration());
      return R.mergeRight(state, { position });
    }
    case "EXECUTE_CURRENT_INSTRUCTION": {

    }
  }


  return state;
}
