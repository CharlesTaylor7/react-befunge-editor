import React, { useRef, useEffect } from "react"
import "./Cell.css"
import { connect } from "react-redux"
import * as R from 'ramda'

const Cell = ({ x, y, value, inFocus, isCurrentInstruction, gridDimensions, dispatch }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (inFocus) inputElement.current.focus();
  }, [inFocus]);

  const editCell = value => {
    dispatch({ type: "EDIT_CELL", x, y, value });
    if (value === '') return;

    const { width, height } = gridDimensions;
    const nextX = (x + 1) % width;
    const nextY = nextX === 0 ? (y + 1) % height : y;
    dispatch({
      type: "SET_EDITOR_FOCUS",
      x: nextX,
      y: nextY,
    });
  }

  const onKeyDown = key => {
    console.log("Key down: " + key);
    switch (key) {
      case "ArrowRight":
        dispatch({ type: "SET_EDITOR_FOCUS", x: x + 1, y});
        break;
      case "ArrowLeft":
        dispatch({ type: "SET_EDITOR_FOCUS", x: x - 1, y});
        break;
      case "ArrowUp":
        dispatch({ type: "SET_EDITOR_FOCUS", x, y: y - 1});
        break;
      case "ArrowDown":
        dispatch({ type: "SET_EDITOR_FOCUS", x, y: y + 1});
        break;
      case "Backspace":
        if (value === undefined || value === null || value === '') {
          dispatch({ type: "SET_EDITOR_FOCUS", x: x-1, y});
        }
        break;
    }
  }

  return (
    <div
      className={isCurrentInstruction ? 'highlighted cell': 'cell'}
      onClick={() => dispatch({type: "SET_EDITOR_FOCUS", x, y})}
      onKeyDown={e => onKeyDown(e.key)}
    >
      <input
        className="input"
        type="text"
        maxLength="1"
        ref={inputElement}
        value={value}
        onChange={e => editCell(e.target.value)}
      />
    </div>
  )
}

const samePosition = ({x: x1, y: y1}, {x: x2, y: y2}) =>
  x1 === x2 &&
  y1 === y2;

const mapStateToProps = (state, ownProps) => ({
  value: state.grid[ownProps.id],
  inFocus: R.equals({x: ownProps.x, y: ownProps.y}, state.editorFocus),
  isCurrentInstruction: R.equals({x: ownProps.x, y: ownProps.y}, state.currentInstruction),
  gridDimensions: state.dimensions,
});

export default connect(mapStateToProps)(Cell);
