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

let randomInteger = (min, max) => Math.floor(
  Math.random() * (max - min + 1) + min
)

let randomRoom = function(door, minsize=4, maxsize=10) {
  let x, y
  let w = randomInteger(minsize, maxsize)
  let h = randomInteger(minsize, maxsize)
  if (door) {
    let {drx, dry, wall: dir} = door
    switch (dir) {
      case 0:            //North
        y = dry - h
        x = randomInteger(drx - w + 1, drx)
        break;
      case 1:            //East
        y = randomInteger(dry - h + 1, dry)
        x = drx + 1
        break;
      case 2:            //South
        y = dry + 1
        x = randomInteger(drx - w + 1, drx)
        break;
      case 3:            //West
        y = randomInteger(dry - h + 1, dry)
        x = drx - w
        break;
    }
  }
  else {
    x = randomInteger(0, SIZE-maxsize)
    y = randomInteger(0, SIZE-maxsize)
  }
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

let isRoomOK = function(rooms, {x, y, w, h}) {
  //receives a rooms array and a room object as the new room
  if (x < 1 || y < 1 || x > SIZE - w - 1 || y > SIZE - h - 1) return false
  for (let rm of rooms) {
    if (areTheyOverlap(rm, {x, y, w, h})) return false
  }
  return true
}

let digRoom = function(bmp, {x, y, w, h}) {
  //receives a bmp and a room object
  let newBmp = copyBitmap(bmp)
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      newBmp[j][i] = 1
    }
  }
  return newBmp
}

let randomDoor = function(rooms) {
  // select a random room from the rooms Array
  let roomIndex = randomInteger(0, rooms.length-1)
  let {x: rx, y: ry, w: rw, h: rh} = rooms[roomIndex]
  // a wall might go from 0 to 3 correspondig the walls N, E, S, W
  let wall = randomInteger(0, 3)
  // a brick is a random cell in the wall
  let brick = Math.floor(
    Math.random() * (wall % 2 === 0 ? rw : rh)
  )
  let drx, dry         // door coordinates
  switch (wall) {
    case 0:            //North
      dry = ry - 1
      drx = rx + brick
      break;
    case 1:            //East
      dry = ry + brick
      drx = rx + rw
      break;
    case 2:            //South
      dry = ry + rh
      drx = rx + brick
      break;
    case 3:            //West
      dry = ry + brick
      drx = rx -1
      break;
  }
  //console.log({roomIndex, wall, brick, x, y})
  return {drx, dry, wall}
}

let digDoor = function(bmp, {drx, dry}) {
  //receives a bmp and a door object
  let newBmp = copyBitmap(bmp)
  newBmp[dry][drx] = 2
  return newBmp
}

let createDungeon = function(size) {
  let rooms = []
  let dg = zeroBitmap(size)
  let firstRoom = randomRoom()
  rooms.push(firstRoom)
  dg = digRoom(dg, firstRoom)
  for (let i = 0; i < 1000; i++) {
    let door = randomDoor(rooms)
    let newRoom = randomRoom(door)
    if (isRoomOK(rooms, newRoom)) {
      rooms.push(newRoom)
      dg = digDoor(dg, door)
      dg = digRoom(dg, newRoom)
    }
  }
  return dg
}

export default createDungeon(SIZE)
