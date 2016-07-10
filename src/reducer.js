import generateDungeon from './dungeon/generateDungeon'

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

// Lesson learned: keeping the state flat helps avoid this ugly
// nested Object.assing() structure
 function step(state, dir) {
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      position: getNewPos(state, dir)
    })
  })
}

function drinkPotion(state, dir) {
  const newPos = getNewPos(state, dir)
  const currentPotion = state.potions.find( p => p.x === newPos.x && p.y === newPos.y)
  return Object.assign({}, state, {
    potions: state.potions.filter( p => p.x !== newPos.x || p.y !== newPos.y),
    log: state.log.concat(`You have drunk a health potion and gained ${currentPotion.hp} HP`),
    player: Object.assign({}, state.player, {
      health: state.player.health + currentPotion.hp,
      position: newPos
    })
  })
}

function getWeapon(state, dir) {
  const newPos = getNewPos(state, dir)
  const newWeapon = state.weapons.find( w => w.x === newPos.x && w.y === newPos.y)
  return Object.assign({}, state, {
    weapons: state.weapons.filter( w => w.x !== newPos.x || w.y !== newPos.y),
    log: state.log.concat(`You have found a ${newWeapon.name}!`),
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
  const newXp = state.player.xp + damage
  const newLevel = Math.floor((state.player.xp + damage) / 500) + 1
  if(currentEnemy.hp === 0) {           // enemy is defeated
    let logEntry = [`You have defeated you enemy!`, `You gained ${damage} XP`]
    if(newLevel > state.player.level) logEntry.push('You reached a new level!')
    return Object.assign({}, state, {
      enemies: otherEnemies,
      log: state.log.concat(logEntry),
      player: Object.assign({}, state.player, {
        xp: newXp,
        level: newLevel,
        position: newPos
      })
    })
  }
  else {                               // enemy remained alive and attacks back
    const counterDamage = Math.floor(currentEnemy.attack * (Math.random() + 1))
    let logEntry = [`You attacked your enemy and caused ${damage} damage`,
                    `Your enemy striked back and caused ${counterDamage} damage to you!`,
                    `You gained ${damage} XP`]
    if(newLevel > state.player.level) logEntry.push('You reached a new level!')
    return Object.assign({}, state, {
      enemies: otherEnemies.concat(currentEnemy),
      log: state.log.concat(logEntry),
      player: Object.assign({}, state.player, {
        health: state.player.health - counterDamage,
        xp: newXp,
        level: newLevel
      })
    })
  }
}

function exit(state) {
  let nrExit = state.mapLevel < 3 ? 1 : 0
  let nrBoss = 1 - nrExit
  let {dungeon, enemies, potions, weapons, playerPosition, exitPosition} = generateDungeon(
    state.MAPSIZE,
    state.NUMBER_OF_ROOMS,
    state.NUMBER_OF_TUNNELS,
    state.NUMBER_OF_ENEMIES,
    state.NUMBER_OF_POTIONS,
    state.NUMBER_OF_WEAPONS,
    nrExit,
    nrBoss
  )
  let logEntry = [
    `You reached map level ${state.mapLevel+1}!`,
    'You gained 100 XP!'
  ]
  return Object.assign({}, state, {
    dungeon,
    enemies,
    potions,
    weapons,
    exitPosition,
    mapLevel: state.mapLevel + 1,
    log: state.log.concat(logEntry),
    player: Object.assign({}, state.player, {
      xp: state.player.xp + 100,
      position: playerPosition
    })
  })
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
    case 'EXIT':
      return exit(state)
  }
  return state
}
