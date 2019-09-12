import React, { useState } from "react"
import "./Grid.css"
import Cell from "./Cell"

export default () => {
  return (
    <div className="grid">
      {Array(81)
        .fill()
        .map((_, i) => {
          return (
            <Cell
              key={`cell-${i}`}
              y={Math.floor(i / 9)}
              x={i % 9}
            />
          )
        })
      }
    </div>
  )
};
