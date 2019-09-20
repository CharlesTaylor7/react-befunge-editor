import newStore from '../store'
import executeAndAdvance from './actions/executeAndAdvance'

const runProgram = (program) => {
  const store = newStore();
  
  executeAndAdvance(store.dispatch);
  return store;
}

describe('interpreter', () => {
  test('Hello World!', () => {

  })
})
