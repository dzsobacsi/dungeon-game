import React from 'react'
import Cell from './Cell'

let Grid = props => {
  let cells = props.cells.map(
    (row, i) => row.map(
      (cell, j) => {
        return <Cell type={"type" + cell} />
      }
    )
  )
  return <div>{cells}</div>
}

export default Grid
