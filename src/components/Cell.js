import React, { useRef, useState, useEffect } from "react"
import "./Cell.css"
import { connect } from "react-redux"

const Cell = ({ cellId, value, dispatch }) => {
  const inputElement = useRef(null);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    if (isEditting) inputElement.current.focus();
  }, [isEditting])

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
        onChange={e => dispatch({ type: "EDIT_CELL", instruction: e.target.value, cellId })}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  value: state.grid[ownProps.cellId]
});

export default connect(mapStateToProps)(Cell);
