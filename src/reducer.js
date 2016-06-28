//import {Map} from 'immutable';

function setState(state, newState) {
  return newState
}

function step(state, dir) {
  let {x: px, y: py} = state.player.position
  let newPos = {}
  switch (dir) {
    case 'NORTH':
      newPos.x = px
      newPos.y = py-1
      break
    case 'EAST':
      newPos.x = px+1
      newPos.y = py
      break
    case 'SOUTH':
      newPos.x = px
      newPos.y = py+1
      break
    case 'WEST':
      newPos.x = px-1
      newPos.y = py
      break
  }

  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: {
        x: newPos.x,
        y: newPos.y
      }
    })
  })
}

function drinkPotion(state, dir) {
  
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'STEP':
      return step(state, action.dir)
  }
  return state
}
