import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import generateDungeon from './generateDungeon'
//import {Map} from 'immutable'

const MAPSIZE = 50    //This should be the same as $grid-size in the CSS
const NUMBER_OF_ROOMS = 15
const NUMBER_OF_TUNNELS = 4
const NUMBER_OF_ENEMIES = 20
const NUMBER_OF_POTIONS = 10
const NUMBER_OF_WEAPONS = 3

let {dungeon, enemies, potions, playerPosition, exitPosition} = generateDungeon(
  MAPSIZE,
  NUMBER_OF_ROOMS,
  NUMBER_OF_TUNNELS,
  NUMBER_OF_ENEMIES,
  NUMBER_OF_POTIONS,
  NUMBER_OF_WEAPONS
)

const state = {
  player: {
    health: 100,
    weapon: "stick",
    attack: 5,
    level: 1,
    xp: 0,
    position: playerPosition
  },
  darkness: 0,
  enemies,
  potions,
  exitPosition
}

ReactDOM.render(<App dungeon={dungeon} state={state} />, document.getElementById("app"))
