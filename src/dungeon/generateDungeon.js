import {createDungeon} from './emptyDungeon'
import thingsToDungeon from './thingsToDungeon'

const addHp = (hp, obj) => Object.assign({hp, originalHP: hp}, obj)
const addAttack = (attack, obj) => Object.assign({attack}, obj)

export default function(size, nrrooms, nrtunnels, nrenemies, nrpotions, nrweapons, maplevel=1, nrexit=1, nrboss=0) {
  const weaponList = [
    {level: 1, name: 'dagger', attack: 10},
    {level: 1, name: 'axe', attack: 14},
    {level: 1, name: 'sword', attack: 18},
    {level: 2, name: 'pistol', attack: 22},
    {level: 2, name: 'rifle', attack: 26},
    {level: 2, name: 'shotgun', attack: 30},
    {level: 3, name: 'machinegun', attack: 34},
    {level: 3, name: 'hand granade', attack: 38},
    {level: 3, name: 'bazooka', attack: 42},
    {level: 4, name: 'laser gun', attack: 46},
    {level: 4, name: 'plasma gun', attack: 50},
    {level: 4, name: 'antimatter gun', attack: 54}
  ].filter(w => w.level === maplevel)

  const enemyHP = [0, 45, 75, 110, 150]

  const emptyDungeon = createDungeon(size, nrrooms, nrtunnels)
  const enemyMap  = thingsToDungeon(emptyDungeon, 3, nrenemies)
  const potionMap = thingsToDungeon(enemyMap.dungeon, 4, nrpotions)
  const weaponMap = thingsToDungeon(potionMap.dungeon, 8, nrweapons)
  const player    = thingsToDungeon(weaponMap.dungeon, 5, 1)
  const exit      = thingsToDungeon(player.dungeon, 6, nrexit)
  const bossMap   = thingsToDungeon(exit.dungeon, 7, nrboss)

  const enemies_hp = enemyMap.list.map(addHp.bind(this, enemyHP[maplevel]))
  const enemies = enemies_hp.map(addAttack.bind(this, 5+6*maplevel))
  const potions = potionMap.list.map(addHp.bind(this, 10+10*maplevel))
  const weapons = weaponMap.list.map((obj, i) => Object.assign(weaponList[i], obj))
  const boss_hp = bossMap.list.map(addHp.bind(this, 600))
  const boss    = boss_hp.map(addAttack.bind(this, 50))

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
