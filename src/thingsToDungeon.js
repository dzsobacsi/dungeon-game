import {randomInteger, copyBitmap} from './emptyDungeon'

export default function(dungeon, indexOfThing, nrOfThing) {
  let newDg = copyBitmap(dungeon)
  let nr = 0
  let size = dungeon.length
  let things = []
  while (nr < nrOfThing) {
    let x = randomInteger(1, size-2)
    let y = randomInteger(1, size-2)
    if (newDg[y][x] === 1) {
      newDg[y][x] = indexOfThing
      things.push({x, y})
      nr++
    }
  }
  return {
    dungeon: newDg,
    list: things
  }
}
