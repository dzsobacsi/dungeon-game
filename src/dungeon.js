const SIZE = 50 //This should be the same as $grid-size in the CSS

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

let zeroBitmap = function(size) {
  let bmp = createEmptyBitmap(size)
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      bmp[i][j] = 0
    }
  }
  return bmp
}

let randomRoom = function(minsize, maxsize) {
  let x = Math.floor(Math.random() * (SIZE - maxsize)) + 1
  let y = Math.floor(Math.random() * (SIZE - maxsize)) + 1
  let w = Math.floor(Math.random() * (maxsize - minsize + 1)) + minsize
  let h = Math.floor(Math.random() * (maxsize - minsize + 1)) + minsize
  return {x, y, w, h}
}

let areTheyOverlap = function(r1, r2) {
  //returns true even if they just touch each other
  let isPointInR2 = function(x, y) {
    if (x >= r2.x && x <= r2.x + r2.w && y >= r2.y && y <= r2.y + r2.h) return true
    else return false
  }
  for (let i = r1.x; i <= r1.x + r1.w; i++) {
    for (let j = r1.y; j <= r1.y + r1.h; j++) {
      if (isPointInR2(i, j)) return true
    }
  }
  return false
}

let createDungeon = function(size) {
  let rooms = []
  for (let i = 0; i < 5; i++) {
    let newRoom = randomRoom(4, 10)
    for (let j = 0; j < rooms.length; j++) {
      if (areTheyOverlap(rooms[j], newRoom)) console.log("overlapping rooms!", i, j);
    }
    rooms.push(newRoom)
  }
  let dg = zeroBitmap(size)
  for (let i = 0; i < rooms.length; i++) {
    console.log(i, ": ", rooms[i]);
    for (let j = rooms[i].x; j < rooms[i].x + rooms[i].w; j++) {
      for (let k = rooms[i].y; k < rooms[i].y + rooms[i].h; k++) {
        dg[k][j] = 1
      }
    }
  }
  return dg
}

export default createDungeon(SIZE)
