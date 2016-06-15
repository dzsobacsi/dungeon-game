require('../../css/main.sass')
import React from 'react'
import Grid from './Grid'
import Status from './Status'

let App = props => (
  <div>
    <h1>FCC Dungeon Crawler Game</h1>
    <Status state={props.state}/>
    <Grid cells={props.dungeon} />
  </div>
)

export default App
