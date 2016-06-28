//import {Map} from 'immutable';

function setState(state, newState) {
  return newState
}

function getNewPos(state, dir) {
  let {x, y} = state.player.position
  let newPos = {}
  switch (dir) {
    case 'NORTH':
      newPos.x = x
      newPos.y = y-1
      break
    case 'EAST':
      newPos.x = x+1
      newPos.y = y
      break
    case 'SOUTH':
      newPos.x = x
      newPos.y = y+1
      break
    case 'WEST':
      newPos.x = x-1
      newPos.y = y
      break
  }
  return newPos
}

function step(state, dir) {
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: getNewPos(state, dir)
    })
  })
}

function drinkPotion(state, dir) {
  let newPos = getNewPos(state, dir)
  return Object.assign({}, state, {
    potions: state.potions.filter( p => p.x !== newPos.x || p.y !== newPos.y),
    player: Object.assign({}, state.player, {
      health: state.player.health + state.potions.find( p => p.x === newPos.x && p.y === newPos.y).hp,
      position: newPos
    })
  })
}

function getWeapon(state, dir) {
  let newPos = getNewPos(state, dir)
  let newWeapon = state.weapons.find( w => w.x === newPos.x && w.y === newPos.y)
  return Object.assign({}, state, {
    weapons: state.weapons.filter( w => w.x !== newPos.x || w.y !== newPos.y),
    player: Object.assign({}, state.player, {
      attack: newWeapon.attack,
      weapon: newWeapon.name,
      position: newPos
    })
  })
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'STEP':
      return step(state, action.dir)
    case 'POTION':
      return drinkPotion(state, action.dir)
    case 'WEAPON':
      return getWeapon(state, action.dir)
  }
  return state
}
