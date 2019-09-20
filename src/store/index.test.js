import newStore from '../store'
import executeAndAdvance from './actions/executeAndAdvance'
import * as R from 'ramda'
import wu from 'wu'
import Stack from '../utilities/stack'

// type program: string[]
const init = program => {
  const height = program.length;
  const width = program.reduce(R.maxBy(line => line.length)).length;
  const dimensions = { height, width };

  const grid = { };
  for (let j = 0; j < height; j++) {
    const line = program[j];
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
    const program = [
      '"!dlroW ,olleH",,,,,,,,,,,,,@'
    ];
    expect(completesIn(29, run(program)))
      .toMatchObject({
        console: "Hello, World!",
        executionComplete: true,
        stringMode: false,
        stack: Stack.empty,
      })
  })
  test('Infinite loop', () => {
    const program = [
      '>V',
      '^<',
    ];
    expect(() => completesIn(1000, run(program)))
      .toThrow('Program did not complete in 1000 steps.')
  })
  test.only('Infinite loop w/ unbounded stack growth', () => {
    const program = [
      '>1V',
      '4 2',
      '^3<',
    ];
    const stackSnapshots = wu(run(program))
      .map(state => state.stack)
      .enumerate()
      .filter(([_, index]) => index % 8 === 0)
      .take(3)
      .map(pair => pair[0])
      .toArray();
    expect(stackSnapshots)
      .toEqual([
        Stack.empty,
        Stack.fromArray([4, 3, 2, 1]),
        Stack.fromArray([4, 3, 2, 1, 4, 3, 2, 1]),
      ])
  })
})
