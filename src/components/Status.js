import React from 'react'

let Status = props => {
  const ply = props.state.player
  return (
    <p>Health: {ply.health} Weapon: {ply.weapon} Attack: {4*ply.level + ply.attack}</p>
  )
}

export default Status
