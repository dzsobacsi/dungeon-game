//import {Map} from 'immutable';

function setState(state, newState) {
  return newState
}

function stepNorth(state) {
  let {x: px, y: py} = state.player.position
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: {
        x: px,
        y: py-1
      }
    })
  })
}

function stepEast(state) {
  let {x: px, y: py} = state.player.position
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: {
        x: px+1,
        y: py
      }
    })
  })
}

function stepSouth(state) {
  let {x: px, y: py} = state.player.position
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: {
        x: px,
        y: py+1
      }
    })
  })
}

function stepWest(state) {
  let {x: px, y: py} = state.player.position
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: {
        x: px-1,
        y: py
      }
    })
  })
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'STEP_NORTH':
      return stepNorth(state)
    case 'STEP_EAST':
      return stepEast(state)
    case 'STEP_SOUTH':
      return stepSouth(state)
    case 'STEP_WEST':
      return stepWest(state)
  }
  return state
}
