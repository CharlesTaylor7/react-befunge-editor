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

// program: string[]
// stdin: iterator<int | char>
function* run (program, stdin) {
  const store = newStore(init(program));

  let state = store.getState();

  while (!state.executionComplete) {
    executeAndAdvance(store.dispatch);
    state = store.getState();
    if (state.pendingInput) {
      const fromStream = stdin.next().value;
      const input = typeof fromStream === 'string'
        ? fromStream.charCodeAt(0)
        : fromStream;
      store.dispatch({ type: 'PUSH_INPUT', input });
      yield store.getState();
    } else {
      yield state;
    }
  }
}

const completesIn = (n, generator) => {
  let value;
  for(let i = 0; i < n + 1; i++) {
    const next = generator.next();
    if (next.done) return value;
    value = next.value;
  }
  throw new Error(`Iterable did not complete in ${n} or less steps.`)
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
      '>v',
      '^<',
    ];
    expect(() => completesIn(1000, run(program)))
      .toThrow('Iterable did not complete in 1000 or less steps.')
  })
  test('Infinite loop w/ unbounded stack growth', () => {
    const program = [
      '>1v',
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
  test('A self modifying program', () => {
    const program = [
      '930pv',
      '   @ ',
      '   , ',
      '   " ',
      '   ^<',
    ];
    expect(completesIn(100, run(program)))
      .toMatchObject({
        console: '^',
        stack: Stack.fromString('\t@,'),
        grid: {
          '3-0': '\t',
        }
      })
  })
  test('A quine', () => {
    const program = [
      '01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@',
    ];
    expect(completesIn(2500, run(program)))
      .toMatchObject({
        console: program[0],
      })
  })
  test.only('A factorial program', () => {
    const program = [
      '&>:1-:v v *_$.@',
      ' ^    _$>\\:^',
    ];
    // expect(completesIn(1000, run(program, [0].values())))
    // .toMatchObject({
    //   console: '1 ',
    // })
    expect(completesIn(1000, run(program, [1].values())))
    .toMatchObject({
      console: '1 ',
    })
    expect(completesIn(1000, run(program, [2].values())))
      .toMatchObject({
        console: '2 ',
      })
    expect(completesIn(1000, run(program, [3].values())))
      .toMatchObject({
        console: '6 ',
      })
    expect(completesIn(1000, run(program, [4].values())))
      .toMatchObject({
        console: '24 ',
      })
      expect(completesIn(1000, run(program, [5].values())))
      .toMatchObject({
        console: '120 ',
      })
  })
})
