const SIZE = 60 //This should be the same as $grid-size in the CSS

let createEmptyBitmap = function(size) {
  let bmp = new Array(size)
    for (let i=0; i<size; i++) {
      bmp[i] = new Array(size)
  }
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      bmp[i][j] = 0
    }
  }
  return bmp
}

let copyBitmap = function(bmp) {
  return bmp.map(
    row => row.slice()
  )
}

let initialBitmap = function(size) {
  let bmp = createEmptyBitmap(size)
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      bmp[i][j] = 0
    }
  }
  return bmp
}

let addNewRandomRoom = function(bmp) {
  let newBmp = copyBitmap(bmp)
  let x = Math.floor(Math.random()*(SIZE-11))+1
  let y = Math.floor(Math.random()*(SIZE-11))+1
  let w = Math.floor(Math.random()*8)+4
  let h = Math.floor(Math.random()*8)+4
  for (let i = y; i < y+h; i++) {
    for (let j = x; j < x+w; j++) {
      newBmp[i][j] = 1
    }
  }
  return newBmp
}

let dungeon = function(size) {
  let dg = initialBitmap(SIZE)
  let dg2 = addNewRandomRoom(dg)
  let dg3 = addNewRandomRoom(dg2)
  let dg4 = addNewRandomRoom(dg3)
  console.log("a dungeon is returned");
  return dg4
}

export {SIZE, dungeon}
