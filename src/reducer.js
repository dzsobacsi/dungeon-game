import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function stepNorth(state, key) {
  console.log(key)
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'STEP_NORTH':
      return stepNorth(state, action.key)
  }
  return state
}
