import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cell from './Cell'
import render from '../utilities/rtl-redux-render'

describe('cell', () => {
  afterEach(cleanup);

  it('receives focus when clicked on', () => {

    const { getByTestId } = render(<Cell position={{x: 1, y: 3}} />)

    const cellDiv = getByTestId('cell-div');
    const cellInput = getByTestId('cell-input');
    fireEvent.click(cellDiv);

    expect(cellInput).toBe(document.activeElement);
  })

  it('advances focus to the next position after receiving input', () => {

    const { getAllByTestId, store } = render(
      <div>
        <Cell position={{x: 0, y: 0}} />
        <Cell position={{x: 1, y: 0}} />
      </div>,
      { dimensions: { width: 2, height: 1 }}
    );

    const [ input1, input2 ] = getAllByTestId('cell-input');
    fireEvent.change(input1, { target: { value: '$'}});

    expect(input1.value).toBe('$');
    expect(input2).toBe(document.activeElement);
    expect(store.editorFocus).toBe({ x: 2, y: 0});
  });
})
