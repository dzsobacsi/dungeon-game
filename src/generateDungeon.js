import {createDungeon} from './emptyDungeon'
import thingsToDungeon from './thingsToDungeon'

export default function(size, nrrooms, nrtunnels, nrenemies, nrpotions, nrweapons, nrexit = 1, nrboss = 0) {
  const emptyDungeon = createDungeon(size, nrrooms, nrtunnels)
  const enemies  = thingsToDungeon(emptyDungeon, 3, nrenemies)
  const potions  = thingsToDungeon(enemies.dungeon, 4, nrpotions)
  const weapons  = thingsToDungeon(potions.dungeon, 8, nrweapons)
  const player   = thingsToDungeon(weapons.dungeon, 5, 1)
  const exit     = thingsToDungeon(player.dungeon, 6, nrexit)
  const boss     = thingsToDungeon(exit.dungeon, 7, nrboss)
  return {
    dungeon: boss.dungeon,
    enemies: enemies.list,
    potions: potions.list,
    playerPosition: player.list[0],
    exitPosition: exit.list[0]
  }
}
