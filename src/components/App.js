
require('../../css/main.sass')
import React from 'react'
import Grid from './Grid'
import {SIZE, dungeon} from '../dungeon'

let App = React.createClass({
  getDefaultProps: function() {
    return {
      bitmap: dungeon(SIZE)
    }
  },

  render: function() {
    return <Grid cells={this.props.bitmap} />
  }
})

export default App
