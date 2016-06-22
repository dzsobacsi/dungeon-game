require('../../css/main.sass')
import React from 'react'
import Grid from './Grid'
import Status from './Status'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

class App extends React.Component{
  constructor() {
    super()
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    this.props.step(e)
  }

  render() {
    return (
      <div>
        <h1>FCC Dungeon Crawler Game</h1>
        <Grid cells={this.props.dungeon} />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    dungeon: state.get('dungeon'),
    //player: state.get('player')
  }
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
