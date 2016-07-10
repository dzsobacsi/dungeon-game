import {createDungeon} from './emptyDungeon'
import thingsToDungeon from './thingsToDungeon'

const addHp = (hp, obj) => Object.assign({hp}, obj)
const addAttack = (attack, obj) => Object.assign({attack}, obj)

export default function(size, nrrooms, nrtunnels, nrenemies, nrpotions, nrweapons, maplevel=1, nrexit=1, nrboss=0) {
  const emptyDungeon = createDungeon(size, nrrooms, nrtunnels)
  const enemyMap  = thingsToDungeon(emptyDungeon, 3, nrenemies)
  const potionMap = thingsToDungeon(enemyMap.dungeon, 4, nrpotions)
  const weaponMap = thingsToDungeon(potionMap.dungeon, 8, nrweapons)
  const player    = thingsToDungeon(weaponMap.dungeon, 5, 1)
  const exit      = thingsToDungeon(player.dungeon, 6, nrexit)
  const bossMap   = thingsToDungeon(exit.dungeon, 7, nrboss)

  const enemies_hp = enemyMap.list.map(addHp.bind(this, 30+20*maplevel))
  const enemies = enemies_hp.map(addAttack.bind(this, 5+5*maplevel))
  const potions = potionMap.list.map(addHp.bind(this, 10+10*maplevel))
  const weapons = weaponMap.list.map(obj => Object.assign({name: 'sword', attack: 20}, obj))
  const boss_hp = bossMap.list.map(addHp.bind(this, 200))
  const boss    = boss_hp.map(addAttack.bind(this, 35))

  return {
    dungeon: emptyDungeon,
    enemies,
    potions,
    weapons,
    playerPosition: player.list[0],
    exitPosition: exit.list[0],
    boss: boss[0]
  }
}
