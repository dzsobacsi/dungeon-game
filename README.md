# freeCodeCamp dungeon crawler game
This is a dungeon crawler game created as a solution of a freeCodeCamp data visualization challenge implemented with React and Redux

Live demo is available [here](http://codepen.io/dzsobacsi/full/xOWRby/)

## Features
* Random generated map
* You can move through the map discovering items
* You can walk around with the arrow keys or with A, W, S, D keys
* All area of the map can be discovered
* The map has 4 levels
* Objects on the map are placed at random
* You have a health level and a weapon
* You can pick up new weapon and health potions
* New weapon may be better or worse then the previous one
* Optional fog of war
* Damage based off of player's attack value
* Your attack value is based off your level and your weapon
* An attacked enemy strikes back unless it is defeated
* Beating an enemy increases your experience
* Higher experience leads to higher level
* Higher level makes you stronger: your attack and your maximum HP gets higher
* If you beat the Boss on Level 4, you win and the game is over
* If you lose all your health points, you die and the game is over

## Run locally
Checkout this repo and
```
> npm install
> npm start
```
The game will be running at http://localhost:8080/
