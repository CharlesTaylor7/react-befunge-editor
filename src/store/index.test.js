import newStore from '../store'
import executeAndAdvance from './actions/executeAndAdvance'
import * as R from 'ramda'

const init = program => {
  const lines = R.split('\n');

  const height = lines.length;
  const width = R.max(line => line.length, lines);
  const dimensions = { height, width };

  const grid = { };
  for (let j = 0; j < height; j++) {
    const line = lines[j];
    for (let i = 0; i < width; i++) {
      grid[`${i}-${j}`] = line[i];
    }
  }

  return { grid, dimensions };
}

const runProgram = (program) => {
  const store = newStore(init(program));

  while (!store.getState().executionComplete) {
    executeAndAdvance(store.dispatch);
  }
  return store.getState();
}

describe('interpreter', () => {
  test('Hello, World!', () => {
    expect(runProgram('"!dlroW ,olleH",,,,,,,,,,,,,@'))
      .toMatchObject({ console: "Hello, World!" })
  })
})
