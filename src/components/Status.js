import React from 'react'
import Cell from './Cell'
import Info from './Info'
import Lamp from './Lamp'

let Status = props => {
  const ply = props.state.player
  return (
    <div className="status">
      <h3 id="legend-label">Legend</h3>
      <Cell type="type5" legend="legend-cell" /><span className="legend-span">You</span><br/>
      <Cell type="type3" legend="legend-cell" /><span className="legend-span">Enemy</span><br/>
      <Cell type="type4" legend="legend-cell" /><span className="legend-span">Health Potion</span><br/>
      <Cell type="type8" legend="legend-cell" /><span className="legend-span">Weapon</span><br/>
      <Cell type="type6" legend="legend-cell" /><span className="legend-span">Exit</span><br/>
      <Cell type="type7" legend="legend-cell" /><span className="legend-span">Boss</span><br/>
      <h3>Status</h3>
      <table>
        <tbody>
          <tr>
            <td>Health</td>
            <td>{ply.health} / {ply.maxHp}</td>
          </tr>
          <tr>
            <td>Weapon</td>
            <td>{ply.weapon}</td>
          </tr>
          <tr>
            <td>Attack</td>
            <td>{4*ply.level + ply.attack}</td>
          </tr>
          <tr>
            <td>XP</td>
            <td>{ply.xp}</td>
          </tr>
          <tr>
            <td>Level</td>
            <td>{ply.level}</td>
          </tr>
          <tr>
            <td>Map level</td>
            <td>{props.state.mapLevel}</td>
          </tr>
        </tbody>
      </table>
      <h3>Info</h3>
      <Info log={props.state.log} />
      <Lamp on={1 - props.state.darkness} click={props.click} />
    </div>
  )
}

export default Status
