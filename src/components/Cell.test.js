import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cell from './Cell'
import render from '../utilities/rtl-redux-render'

describe('cell', () => {
  it('receives focus when clicked on', () => {

    const { getByTestId } = render(<Cell position={{x: 1, y: 0}} />)

    const cellDiv = getByTestId('cell-div');
    const cellInput = getByTestId('cell-input');
    fireEvent.click(cellDiv);

    expect(cellInput).toBe(document.activeElement);
  })
})
