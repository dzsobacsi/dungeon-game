import React from 'react'

let Info = props => {
  const elementsToPrint = props.log.slice(-6).map(
    msg => <p className="msg">{msg}</p>
  )
  return <div className="info-box">{elementsToPrint}</div>
}

export default Info
