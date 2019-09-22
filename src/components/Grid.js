import React from "react"
import "./Grid.css"
import Cell from "./Cell"
import { connect } from 'react-redux'

const Grid = ({ dimensions: { height, width } }) => (
  <div className="grid">
    {Array(height * width)
      .fill()
      .map((_, i) => {
        const y = Math.floor(i / width);
        const x = i % width;
        return (
          <Cell
            key={`cell-${i}`}
            position={{x, y}}
          />
        )
      })
    }
  </div>
);

const mapStateToProps = ({ dimensions }) => ({
  dimensions,
});

export default connect(mapStateToProps)(Grid)
