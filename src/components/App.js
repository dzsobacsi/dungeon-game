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
    this._dungeonToDraw = this._dungeonToDraw.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    this.props.step(e, this.props.player.position, this._dungeonToDraw())
  }

  _dungeonToDraw() {
    let newDg = copyBitmap(this.props.dungeon)
    this.props.enemies.forEach( e => {
      newDg[e.y][e.x] = 3
    })
    this.props.potions.forEach( e => {
      newDg[e.y][e.x] = 4
    })
    newDg[this.props.player.position.y][this.props.player.position.x] = 5
    return newDg
  }

  render() {
    return (
      <div>
        <h1>FCC Dungeon Crawler Game</h1>
        <Status state={this.props} />
        <Grid cells={this._dungeonToDraw()} />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    dungeon: state.dungeon,
    enemies: state.enemies,
    potions: state.potions,
    player:  state.player,
    exit:    state.exit,
    boss:    state.boss,
    weapons: state.weapons
  }
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
