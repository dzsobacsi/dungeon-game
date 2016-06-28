export function step(key, plypos, dungeon) {
  let {x: plx, y: ply} = plypos
  let target
  let direction

  switch(key.keyCode) {
    case 38:
    case 87:
      target = dungeon[ply-1][plx]
      direction = 'NORTH'
      break
    case 39:
    case 68:
      target = dungeon[ply][plx+1]
      direction = 'EAST'
      break
    case 40:
    case 83:
      target = dungeon[ply+1][plx]
      direction = 'SOUTH'
      break
    case 37:
    case 65:
      target = dungeon[ply][plx-1]
      direction = 'WEST'
      break
  }

  if (target === 1 || target === 2) {
    return {
      type: 'STEP_'+direction
    }
  }
  else return {
    type: ''
  }

}
