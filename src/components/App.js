require('../../css/main.sass')
import React from 'react'
import Grid from './Grid'
import Status from './Status'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import {copyBitmap} from '../dungeon/emptyDungeon'

class App extends React.Component{
  constructor() {
    super()
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this._dungeonForActionCreator = this._dungeonForActionCreator.bind(this)
    this._dungeonToDraw = this._dungeonToDraw.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    this.props.step(e, this.props.player.position, this._dungeonForActionCreator())
  }

  _dungeonForActionCreator() {
    let newDg = copyBitmap(this.props.dungeon)
    this.props.enemies.forEach( e => {
      newDg[e.y][e.x] = 3
    })
    this.props.potions.forEach( e => {
      newDg[e.y][e.x] = 4
    })
    this.props.weapons.forEach( e => {
      newDg[e.y][e.x] = 8
    })
    newDg[this.props.player.position.y][this.props.player.position.x] = 5
    if(this.props.exitPosition) {
      newDg[this.props.exitPosition.y][this.props.exitPosition.x] = 6
    }
    if(this.props.boss) {
      newDg[this.props.boss.y][this.props.boss.x] = 7
    }
    return newDg
  }

  _dungeonToDraw() {
    const distanceFromPlayer = function(x, y, px, py) {
      const sq = x => x*x
      return Math.round(Math.sqrt(sq(px-x) + sq(py-y)))
    }
    const size = this.props.MAPSIZE
    const px = this.props.player.position.x
    const py = this.props.player.position.y

    let dgToDraw = this._dungeonForActionCreator()
    if (this.props.darkness) {
      for(let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
          if (distanceFromPlayer(i, j, px, py) > 8) dgToDraw[j][i] = 0
        }
      }
    }
    return dgToDraw
  }

  handleClick() {
    this.props.lampSwitch()
  }

  render() {
    return (
      <div>
        <h1>FCC Dungeon Crawler Game</h1>
        <p>Kill the Boss on level 4!</p>
        <Grid cells={this._dungeonToDraw()} />
        <Status state={this.props} click={this.handleClick}/>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    dungeon:      state.dungeon,
    darkness:     state.darkness,
    MAPSIZE:      state.MAPSIZE,
    enemies:      state.enemies,
    potions:      state.potions,
    player:       state.player,
    exitPosition: state.exitPosition,
    boss:         state.boss,
    weapons:      state.weapons,
    mapLevel:     state.mapLevel,
    log:          state.log
  }
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
