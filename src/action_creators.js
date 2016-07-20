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

  switch(target) {
    case 1:
    case 2:
      return {
        type: 'STEP',
        dir: direction
      }
    case 3:
    case 7:
      return {
        type: 'ATTACK',
        dir: direction
      }
    case 4:
      return {
        type: 'POTION',
        dir: direction
      }
    case 6:
      return {
        type: 'EXIT'
      }
    case 8:
      return {
        type: 'WEAPON',
        dir: direction
      }
    default:
      return {
        type: ''
      }
  }
}

export function lampSwitch() {
  return {
    type: 'LAMP'
  }
}
