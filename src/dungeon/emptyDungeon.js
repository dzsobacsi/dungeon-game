const createEmptyBitmap = function(size) {
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

export const copyBitmap = function(bmp) {
  return bmp.map(
    row => row.slice()
  )
}

const zeroBitmap = function(size) {
  let bmp = createEmptyBitmap(size)
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      bmp[i][j] = 0
    }
  }
  return bmp
}

export const randomInteger = (min, max) => Math.floor(
  Math.random() * (max - min + 1) + min
)

const randomRoom = function(mapsize, door, minsize=6, maxsize=12) {
  let x, y
  let w = randomInteger(minsize, maxsize)
  let h = randomInteger(minsize, maxsize)
  let doors = []
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
    x = randomInteger(1, mapsize-maxsize)
    y = randomInteger(1, mapsize-maxsize)
  }
  return {x, y, w, h, doors}
}

const isPointInRoom = function(xx, yy, {x, y, w, h}) {
  // xx and yy are the point coordinates to be checked
  // {x, y, w, h} specifies a room object
  if (xx >= x && xx < x+w && yy >= y && yy < y+h) return true
  else return false
}

const areTheyOverlap = function(r1, r2) {
  //returns true even if they just touch each other
  const isPointInR2 = function(x, y) {
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

const isRoomOK = function(mapsize, rooms, {x, y, w, h}) {
  //receives a rooms array and a room object as the new room
  if (x < 1 || y < 1 || x > mapsize - w - 1 || y > mapsize - h - 1) return false
  for (let rm of rooms) {
    if (areTheyOverlap(rm, {x, y, w, h})) return false
  }
  return true
}

const digRoom = function(bmp, {x, y, w, h}) {
  //receives a bmp and a room object
  let newBmp = copyBitmap(bmp)
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      newBmp[j][i] = 1
    }
  }
  return newBmp
}

const randomDoor = function(rooms) {
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
  return {drx, dry, roomIndex, wall}
}

const digDoor = function(bmp, {drx, dry}) {
  //receives a bmp and a door object
  let newBmp = copyBitmap(bmp)
  newBmp[dry][drx] = 2
  return newBmp
}

const newCoord = function(drx, dry, direction, distance) {
  let xx, yy
  switch (direction) {
    case 0:            //North
      xx = drx
      yy = dry - distance
      break;
    case 1:            //East
      xx = drx + distance
      yy = dry
      break;
    case 2:            //South
      xx = drx
      yy = dry + distance
      break;
    case 3:            //West
      xx = drx - distance
      yy = dry
      break;
  }
  return {x: xx, y: yy}
}

const randomTunnel = function(mapsize, dg, rooms, {drx, dry, wall}) {
  for (let i = 1; i <= 10; i++) {
    let coord = newCoord(drx, dry, wall, i)
    let {x, y} = coord
    if (x < 1 || y < 1 || x >= mapsize - 1 || y >= mapsize - 1) return {OK: false}
    if (dg[y][x] === 2) return {OK: false}
    if (dg[y][x] === 1) {
      return {
        OK: true,
        length: i-1,
        end: rooms.findIndex(rm => isPointInRoom(x, y, rm))
      }
    }
  }
  return {OK: false}
}

const digTunnel = function(bmp, length, {drx, dry, wall}) {
  let newBmp = copyBitmap(bmp)
  for (let i = 1; i <= length; i++) {
    let coord = newCoord(drx, dry, wall, i)
    let {x, y} = coord
    newBmp[y][x] = 2
  }
  return newBmp
}

export const createDungeon = function(size, numberOfRooms, numberOfTunnels) {
  // TODO: implement additional exit criteria from the loop to make sure
  // that it is not infinite. Currently, if you give too big number of
  // rooms (numberOfRooms) or too big number of tunnels (numberOfTunnels)
  // to be generated, the loop will never exit
  let rooms = []
  let nrRooms = 1
  let dg = zeroBitmap(size)

  // here we generate the first room randomly and all the other rooms are
  // generated adjacent to an already existing room
  let firstRoom = randomRoom(size)
  rooms.push(firstRoom)
  dg = digRoom(dg, firstRoom)
  while (nrRooms < numberOfRooms) {
    let door = randomDoor(rooms)
    let newRoom = randomRoom(size, door)
    if (isRoomOK(size, rooms, newRoom)) {
      rooms[door.roomIndex].doors.push(door.wall)
      newRoom.doors.push((door.wall + 2) % 4)
      rooms.push(newRoom)
      dg = digDoor(dg, door)
      dg = digRoom(dg, newRoom)
      nrRooms++
    }
  }
  //console.log(rooms)

  // here we generate some tunnels between the rooms
  let nrTunnels = 0
  while (nrTunnels < numberOfTunnels) {
    let door = randomDoor(rooms)
    if (!rooms[door.roomIndex].doors.includes(door.wall)) {
      // if there is not yet any door on the wall where the new door is generated
      let newTunnel = randomTunnel(size, dg, rooms, door)
      if (newTunnel.OK) {
        rooms[door.roomIndex].doors.push(door.wall)
        rooms[newTunnel.end].doors.push((door.wall + 2) % 4)
        dg = digDoor(dg, door)
        dg = digTunnel(dg, newTunnel.length, door)
        nrTunnels++
      }
    }
  }
  return dg
}
