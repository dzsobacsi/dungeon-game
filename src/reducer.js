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
  const gainedHp = Math.min(currentPotion.hp, state.player.maxHp - state.player.health)
  if (state.player.health === state.player.maxHp) return state
  return Object.assign({}, state, {
    potions: state.potions.filter( p => p.x !== newPos.x || p.y !== newPos.y),
    log: [`You found a health potion and gained ${gainedHp} HP`],
    player: Object.assign({}, state.player, {
      health: state.player.health + gainedHp,
      position: newPos
    })
  })
}

function getWeapon(state, dir) {
  const newPos = getNewPos(state, dir)
  const newWeapon = state.weapons.find( w => w.x === newPos.x && w.y === newPos.y)
  return Object.assign({}, state, {
    weapons: state.weapons.filter( w => w.x !== newPos.x || w.y !== newPos.y),
    log: [`You found a ${newWeapon.name}!`],
    player: Object.assign({}, state.player, {
      attack: newWeapon.attack,
      weapon: newWeapon.name,
      position: newPos
    })
  })
}

function attack(state, dir) {
  const newPos = getNewPos(state, dir)
  let fightAgainstTheBoss = false
  let currentEnemy = state.enemies.find( e => e.x === newPos.x && e.y === newPos.y)
  if (!currentEnemy) {
    currentEnemy = state.boss
    fightAgainstTheBoss = true
  }
  const otherEnemies = state.enemies.filter( e => e.x !== newPos.x || e.y !== newPos.y)
  let damage = Math.floor((4*state.player.level + state.player.attack) * (1.8*Math.random() + 0.5))
  damage = Math.min(damage, currentEnemy.hp)
  currentEnemy.hp -= damage
  const newXp = currentEnemy.originalHP
  if(currentEnemy.hp === 0) {           // enemy is defeated
    let logEntry = [`You have defeated your enemy!`, `You gained ${newXp} XP`]
    const newLevel = Math.floor((state.player.xp + newXp) / 300) + 1
    if(newLevel > state.player.level) logEntry.push('You reached a new level!')
    if (!fightAgainstTheBoss) {
      return Object.assign({}, state, {
        enemies: otherEnemies,
        log: logEntry,
        player: Object.assign({}, state.player, {
          xp: state.player.xp + newXp,
          level: newLevel,
          maxHp: 80+20*newLevel,
          position: newPos
        })
      })
    }
    else {                            // Boss dies, Player wins
      alert("You win!\nCongratulations!")
      return newGame(state)
    }
  }
  else {                               // enemy survives and attacks back
    let counterDamage = Math.floor(currentEnemy.attack * (Math.random() + 1))
    counterDamage = Math.min(counterDamage, state.player.health)
    const playerNewHealth = state.player.health - counterDamage
    if (playerNewHealth > 0) {
      let logEntry = [`You attacked your enemy and caused ${damage} damage`,
                      `Your enemy striked back and caused ${counterDamage} damage to you!`]
      return Object.assign({}, state, {
        enemies: fightAgainstTheBoss ? state.enemies : otherEnemies.concat(currentEnemy),
        boss: fightAgainstTheBoss ? currentEnemy : state.boss,
        log: logEntry,
        player: Object.assign({}, state.player, {
          health: playerNewHealth
        })
      })
    }
    else {                            // player died
      alert("You died!\nBetter luck next time!")
      return newGame(state)
    }
  }
}

function newGame(state) {
  const {dungeon, enemies, potions, weapons, playerPosition, exitPosition, boss} = generateDungeon(
    state.MAPSIZE,
    state.NUMBER_OF_ROOMS,
    state.NUMBER_OF_TUNNELS,
    state.NUMBER_OF_ENEMIES,
    state.NUMBER_OF_POTIONS,
    state.NUMBER_OF_WEAPONS
  )
  const logEntry = ['A new game started']
  return Object.assign({}, state, {
    dungeon,
    enemies,
    potions,
    weapons,
    exitPosition,
    boss,
    mapLevel: 1,
    log: logEntry,
    player: {
      health: 100,
      maxHp: 100,
      weapon: "stick",
      attack: 5,
      level: 1,
      xp: 0,
      position: playerPosition
    }
  })
}

function exit(state) {
  const nrExit = state.mapLevel < 3 ? 1 : 0
  const nrBoss = 1 - nrExit
  const {dungeon, enemies, potions, weapons, playerPosition, exitPosition, boss} = generateDungeon(
    state.MAPSIZE,
    state.NUMBER_OF_ROOMS,
    state.NUMBER_OF_TUNNELS,
    state.NUMBER_OF_ENEMIES,
    state.NUMBER_OF_POTIONS,
    state.NUMBER_OF_WEAPONS,
    state.mapLevel + 1,
    nrExit,
    nrBoss
  )
  const logEntry = state.mapLevel > 0 ? [`You reached map level ${state.mapLevel+1}!`] : []
  return Object.assign({}, state, {
    dungeon,
    enemies,
    potions,
    weapons,
    exitPosition,
    boss,
    mapLevel: state.mapLevel + 1,
    log: logEntry,
    player: Object.assign({}, state.player, {
      position: playerPosition
    })
  })
}

function switchLamp(state) {
  document.getElementById("lamp").classList.toggle("lamp-on")
  return Object.assign({}, state, {darkness: 1 - state.darkness})
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
    case 'LAMP':
      return switchLamp(state)
  }
  return state
}
