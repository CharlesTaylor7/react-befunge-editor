import React, { useRef, useEffect } from "react"
import "./Cell.css"
import { connect } from "react-redux"

const Cell = ({ x, y, value, inFocus, gridDimensions, dispatch }) => {
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
    }
  }

  return (
    <div
      className="cell"
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

const mapStateToProps = (state, ownProps) => ({
  value: state.grid[ownProps.id],
  inFocus:
    ownProps.x === state.editorFocus.x &&
    ownProps.y === state.editorFocus.y,
  gridDimensions: state.dimensions,
});

export default connect(mapStateToProps)(Cell);
