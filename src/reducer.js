//import {Map} from 'immutable';

function setState(state, newState) {
  return newState
}

function getNewPos(state, dir) {
  let {x, y} = state.player.position
  let newPos = {}
  switch (dir) {
    case 'NORTH':
      newPos.x = x
      newPos.y = y-1
      break
    case 'EAST':
      newPos.x = x+1
      newPos.y = y
      break
    case 'SOUTH':
      newPos.x = x
      newPos.y = y+1
      break
    case 'WEST':
      newPos.x = x-1
      newPos.y = y
      break
  }
  return newPos
}

function step(state, dir) {
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: getNewPos(state, dir)
    })
  })
}

function drinkPotion(state, dir) {
  let newPos = getNewPos(state, dir)
  return Object.assign({}, state, {
    potions: state.potions.filter( p => p.x !== newPos.x || p.y !== newPos.y),
    player: Object.assign({}, state.player, {
      health: state.player.health + state.potions.find( p => p.x === newPos.x && p.y === newPos.y).hp,
      position: newPos
    })
  })
}

function getWeapon(state, dir) {
  const newPos = getNewPos(state, dir)
  const newWeapon = state.weapons.find( w => w.x === newPos.x && w.y === newPos.y)
  return Object.assign({}, state, {
    weapons: state.weapons.filter( w => w.x !== newPos.x || w.y !== newPos.y),
    player: Object.assign({}, state.player, {
      attack: newWeapon.attack,
      weapon: newWeapon.name,
      position: newPos
    })
  })
}

function attack(state, dir) {
  const newPos = getNewPos(state, dir)
  let currentEnemy = state.enemies.find( e => e.x === newPos.x && e.y === newPos.y)
  const otherEnemies = state.enemies.filter( e => e.x !== newPos.x || e.y !== newPos.y)
  let damage = Math.floor((4*state.player.level + state.player.attack) * (2*Math.random() + 1))
  damage = Math.min(damage, currentEnemy.hp)
  currentEnemy.hp -= damage
  console.log(currentEnemy)
  if(currentEnemy.hp === 0) {           // enemy is defeated
    return Object.assign({}, state, {
      enemies: otherEnemies,
      player: Object.assign({}, state.player, {
        xp: state.player.xp + damage,
        level: Math.floor((state.player.xp + damage) / 500) + 1,
        position: newPos
      })
    })
  }
  else {                               // enemy remained alive and attacks back
    return Object.assign({}, state, {
      enemies: otherEnemies.concat(currentEnemy),
      player: Object.assign({}, state.player, {
        health: state.player.health - Math.floor(currentEnemy.attack * (Math.random() + 1)),
        xp: state.player.xp + damage,
        level: Math.floor((state.player.xp + damage) / 500) + 1
      })
    })
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'STEP':
      return step(state, action.dir)
    case 'POTION':
      return drinkPotion(state, action.dir)
    case 'WEAPON':
      return getWeapon(state, action.dir)
    case 'ATTACK':
      return attack(state, action.dir)
  }
  return state
}
