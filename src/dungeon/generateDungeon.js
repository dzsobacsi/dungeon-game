import {createDungeon} from './emptyDungeon'
import thingsToDungeon from './thingsToDungeon'

const addHp = (hp, obj) => Object.assign({hp}, obj)

export default function(size, nrrooms, nrtunnels, nrenemies, nrpotions, nrweapons, nrexit = 1, nrboss = 0) {
  const emptyDungeon = createDungeon(size, nrrooms, nrtunnels)
  const enemyMap  = thingsToDungeon(emptyDungeon, 3, nrenemies)
  const potionMap = thingsToDungeon(enemyMap.dungeon, 4, nrpotions)
  const weaponMap = thingsToDungeon(potionMap.dungeon, 8, nrweapons)
  const player    = thingsToDungeon(weaponMap.dungeon, 5, 1)
  const exit      = thingsToDungeon(player.dungeon, 6, nrexit)
  const boss      = thingsToDungeon(exit.dungeon, 7, nrboss)

  const enemies = enemyMap.list.map(addHp.bind(this, 60))
  const potions = potionMap.list.map(addHp.bind(this, 20))
  const weapons = weaponMap.list.map(obj => Object.assign({name: 'sword', attack: 20}, obj))

  return {
    dungeon: emptyDungeon,
    enemies,
    potions,
    weapons,
    playerPosition: player.list[0],
    exitPosition: exit.list[0]
  }
}