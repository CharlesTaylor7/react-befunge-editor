import React, { useState, useRef } from "react"
import "./Cell.css"

export const Cell = () => {
  const [value, setValue] = useState();
  const inputElement = useRef(null);

  return (
    <div
      className="cell"
      onClick={() => inputElement.current.focus()}
    >
      <input
        className="input"
        type="text"
        maxLength="1"
        ref={inputElement}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
