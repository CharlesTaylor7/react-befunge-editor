import newStore from '../store'
import executeAndAdvance from './actions/executeAndAdvance'
import * as R from 'ramda'
import wu from 'wu'

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

function* run (program) {
  const store = newStore(init(program));

  let state = store.getState();
  yield state;

  while (!state.executionComplete) {
    executeAndAdvance(store.dispatch);
    state = store.getState();
    yield state;
  }
}

const completesIn = (n, generator) => {
  const nth = wu.drop(n, generator);
  return nth.next();
}

describe('interpreter', () => {
  test('Hello, World!', () => {
    const program = '"!dlroW ,olleH",,,,,,,,,,,,,@';
    const completion = completesIn(13, run(program));
    expect(completion)
      .toMatchObject({ console: "Hello, World!" })
  })
})
