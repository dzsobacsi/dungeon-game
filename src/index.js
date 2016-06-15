import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import createDungeon from './dungeon'
//import {Map} from 'immutable'

const MAPSIZE = 50    //This should be the same as $grid-size in the CSS
const NUMBER_OF_ROOMS = 15
const NUMBER_OF_TUNNELS = 4

const myDungeon = createDungeon(MAPSIZE, NUMBER_OF_ROOMS, NUMBER_OF_TUNNELS)

const state = {
  player: {
    health: 100,
    weapon: "stick",
    attack: 5,
    level: 1,
    xp: 0
  },
  darkness: 0,
  enemies: [
    {
      position: {x: 3, y: 5},
      hp: 30,
      attack: 20
    },
    {
      position: {x: 13, y: 15},
      hp: 30,
      attack: 20
    }
  ],
  potions: [
    {
      position: {x: 13, y: 7},
      hp: 20
    }
  ]
}

ReactDOM.render(<App dungeon={myDungeon} state={state} />, document.getElementById("app"))
