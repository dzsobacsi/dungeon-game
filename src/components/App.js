
require('../../css/main.sass')
import React from 'react'
import Grid from './Grid'
import dungeon from '../dungeon'

let App = React.createClass({
  getDefaultProps: function() {
    return {
      bitmap: dungeon
    }
  },

  render: function() {
    return <Grid cells={this.props.bitmap} />
  }
})

export default App
