import newStore from '../store'
import executeAndAdvance from './actions/executeAndAdvance'
import * as R from 'ramda'
import wu from 'wu'
import Stack from '../utilities/stack'

const init = program => {
  const lines = R.split('\n', program);

  const height = lines.length;
  const width = height === 1
    ? lines[0].length
    : R.reduce(R.maxBy(line => line.length), 0, lines);

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
  const { value } = nth.next();

  if (!nth.next().done) {
    throw new Error(`Program did not complete in ${n} steps.`)
  }

  return value;
}

describe('interpreter', () => {
  test('Hello, World!', () => {
    const program = '"!dlroW ,olleH",,,,,,,,,,,,,@';
    const completion = completesIn(29, run(program));
    expect(completion)
      .toMatchObject({
        console: "Hello, World!",
        executionComplete: true,
        stringMode: false,
        stack: Stack.empty,
      })
  })
})
