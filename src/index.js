import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import generateDungeon from './dungeon/generateDungeon'
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import {AppContainer} from './components/App'

const MAPSIZE = 50    //This should be the same as $grid-size in the CSS
const NUMBER_OF_ROOMS = 15
const NUMBER_OF_TUNNELS = 4
const NUMBER_OF_ENEMIES = 20
const NUMBER_OF_POTIONS = 10
const NUMBER_OF_WEAPONS = 3

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreDevTools(reducer);

let {dungeon, enemies, potions, weapons, playerPosition, exitPosition, boss} = generateDungeon(
  MAPSIZE,
  NUMBER_OF_ROOMS,
  NUMBER_OF_TUNNELS,
  NUMBER_OF_ENEMIES,
  NUMBER_OF_POTIONS,
  NUMBER_OF_WEAPONS
)

store.dispatch({
  type: 'SET_STATE',
  state: {
    player: {
      health: 100,
      maxHp: 100,
      weapon: "stick",
      attack: 5,
      level: 1,
      tempXp: 0,
      xp: 0,
      position: playerPosition
    },
    dungeon,
    darkness: 1,
    enemies,
    potions,
    weapons,
    exitPosition,
    boss,
    mapLevel: 1,
    log: [],
    MAPSIZE,
    NUMBER_OF_ROOMS,
    NUMBER_OF_TUNNELS,
    NUMBER_OF_ENEMIES,
    NUMBER_OF_POTIONS,
    NUMBER_OF_WEAPONS
  }
})

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
)
