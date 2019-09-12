import React, { useRef, useState, useEffect } from "react"
import "./Cell.css"
import { connect } from "react-redux"

const Cell = ({ x, y, value, dispatch }) => {
  const inputElement = useRef(null);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    if (isEditting) inputElement.current.focus();
  }, [isEditting]);

  const setValue = value => dispatch({
    type: "EDIT_CELL",
    instruction: value,
    cellId: `${x}-${y}`
  });

  return (
    <div
      className="cell"
      onClick={() => setIsEditting(true)}
    >
      <input
        className="input"
        type="text"
        maxLength="1"
        ref={inputElement}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  value: state.grid[ownProps.id]
});

export default connect(mapStateToProps)(Cell);
